"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type CartItemData = {
	productId: string
	quantity: number
	variantKey?: string
	metadata?: any
}

// Sync cart from localStorage to database when user logs in
export async function syncCartToDatabase(cartItems: CartItemData[]) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		const userId = session.user.id

		// Clear existing cart items for this user
		await prisma.cartItem.deleteMany({
			where: { userId }
		})

		// Add new cart items
		if (cartItems.length > 0) {
			await prisma.cartItem.createMany({
				data: cartItems.map(item => ({
					userId,
					productId: item.productId,
					quantity: item.quantity,
					variantKey: item.variantKey,
					metadata: item.metadata
				}))
			})
		}

		revalidatePath("/cart")
		return { success: true }
	} catch (error) {
		console.error("Error syncing cart to database:", error)
		return { success: false, error: "Failed to sync cart" }
	}
}

// Get cart items from database
export async function getCartFromDatabase() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return { success: false, error: "User not authenticated" }
		}

		const cartItems = await prisma.cartItem.findMany({
			where: { userId: session.user.id },
			include: {
				product: {
					include: {
						seller: {
							select: {
								id: true,
								name: true,
								verificationBadge: true
							}
						}
					}
				}
			},
			orderBy: { createdAt: 'desc' }
		})

		return { success: true, cartItems }
	} catch (error) {
		console.error("Error getting cart from database:", error)
		return { success: false, error: "Failed to get cart" }
	}
}

// Add item to cart (database)
export async function addToCartDatabase(productId: string, quantity: number = 1, variantKey?: string, metadata?: any) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		const userId = session.user.id

		// Check if item already exists
		const existingItem = await prisma.cartItem.findUnique({
			where: {
				userId_productId_variantKey: {
					userId,
					productId,
					variantKey: variantKey || ""
				}
			}
		})

		if (existingItem) {
			// Update quantity
			await prisma.cartItem.update({
				where: { id: existingItem.id },
				data: {
					quantity: existingItem.quantity + quantity,
					updatedAt: new Date()
				}
			})
		} else {
			// Create new cart item
			await prisma.cartItem.create({
				data: {
					userId,
					productId,
					quantity,
					variantKey,
					metadata
				}
			})
		}

		revalidatePath("/cart")
		return { success: true }
	} catch (error) {
		console.error("Error adding to cart:", error)
		return { success: false, error: "Failed to add to cart" }
	}
}

// Remove item from cart (database)
export async function removeFromCartDatabase(productId: string, variantKey?: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		await prisma.cartItem.delete({
			where: {
				userId_productId_variantKey: {
					userId: session.user.id,
					productId,
					variantKey: variantKey || ""
				}
			}
		})

		revalidatePath("/cart")
		return { success: true }
	} catch (error) {
		console.error("Error removing from cart:", error)
		return { success: false, error: "Failed to remove from cart" }
	}
}

// Update cart item quantity (database)
export async function updateCartItemQuantity(productId: string, quantity: number, variantKey?: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		if (quantity <= 0) {
			return removeFromCartDatabase(productId, variantKey)
		}

		await prisma.cartItem.update({
			where: {
				userId_productId_variantKey: {
					userId: session.user.id,
					productId,
					variantKey: variantKey || ""
				}
			},
			data: {
				quantity,
				updatedAt: new Date()
			}
		})

		revalidatePath("/cart")
		return { success: true }
	} catch (error) {
		console.error("Error updating cart item:", error)
		return { success: false, error: "Failed to update cart item" }
	}
}

// Clear cart (database)
export async function clearCartDatabase() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		await prisma.cartItem.deleteMany({
			where: { userId: session.user.id }
		})

		revalidatePath("/cart")
		return { success: true }
	} catch (error) {
		console.error("Error clearing cart:", error)
		return { success: false, error: "Failed to clear cart" }
	}
}