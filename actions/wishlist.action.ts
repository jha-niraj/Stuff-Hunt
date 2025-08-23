"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export interface WishlistItem {
	id: string
	productId: string
	createdAt: Date
	product: {
		id: string
		name: string
		slug: string
		price: number
		originalPrice?: number | null
		images: string[]
		inStock: boolean
		stockQuantity: number
		brand?: string | null
		categories: {
			id: string
			name: string
		}[]
	}
}

export interface WishlistResponse {
	success: boolean
	items?: WishlistItem[]
	error?: string
}

export interface WishlistActionResponse {
	success: boolean
	message?: string
	error?: string
}

// Get user's wishlist
export async function getWishlist(): Promise<WishlistResponse> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return {
				success: false,
				error: "Authentication required"
			}
		}

		const wishlistItems = await prisma.wishlistItem.findMany({
			where: {
				userId: session.user.id
			},
			include: {
				product: {
					select: {
						id: true,
						name: true,
						slug: true,
						price: true,
						originalPrice: true,
						images: true,
						inStock: true,
						stockQuantity: true,
						brand: true,
						categories: {
							select: {
								id: true,
								name: true
							}
						}
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return {
			success: true,
			items: wishlistItems
		}

	} catch (error) {
		console.error('Error fetching wishlist:', error)
		return {
			success: false,
			error: 'Failed to fetch wishlist'
		}
	}
}

// Add product to wishlist
export async function addToWishlist(productId: string): Promise<WishlistActionResponse> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return {
				success: false,
				error: "Authentication required"
			}
		}

		// Check if product exists and is active
		const product = await prisma.product.findFirst({
			where: {
				id: productId,
				isActive: true
			}
		})

		if (!product) {
			return {
				success: false,
				error: "Product not found"
			}
		}

		// Check if already in wishlist
		const existingItem = await prisma.wishlistItem.findUnique({
			where: {
				userId_productId: {
					userId: session.user.id,
					productId: productId
				}
			}
		})

		if (existingItem) {
			return {
				success: false,
				error: "Product already in wishlist"
			}
		}

		// Add to wishlist
		await prisma.wishlistItem.create({
			data: {
				userId: session.user.id,
				productId: productId
			}
		})

		revalidatePath('/wishlist')
		
		return {
			success: true,
			message: "Product added to wishlist"
		}

	} catch (error) {
		console.error('Error adding to wishlist:', error)
		return {
			success: false,
			error: 'Failed to add to wishlist'
		}
	}
}

// Remove product from wishlist
export async function removeFromWishlist(productId: string): Promise<WishlistActionResponse> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return {
				success: false,
				error: "Authentication required"
			}
		}

		await prisma.wishlistItem.delete({
			where: {
				userId_productId: {
					userId: session.user.id,
					productId: productId
				}
			}
		})

		revalidatePath('/wishlist')
		
		return {
			success: true,
			message: "Product removed from wishlist"
		}

	} catch (error) {
		console.error('Error removing from wishlist:', error)
		return {
			success: false,
			error: 'Failed to remove from wishlist'
		}
	}
}

// Check if product is in user's wishlist
export async function isInWishlist(productId: string): Promise<boolean> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return false
		}

		const item = await prisma.wishlistItem.findUnique({
			where: {
				userId_productId: {
					userId: session.user.id,
					productId: productId
				}
			}
		})

		return !!item

	} catch (error) {
		console.error('Error checking wishlist status:', error)
		return false
	}
}

// Get wishlist count
export async function getWishlistCount(): Promise<number> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return 0
		}

		const count = await prisma.wishlistItem.count({
			where: {
				userId: session.user.id
			}
		})

		return count

	} catch (error) {
		console.error('Error getting wishlist count:', error)
		return 0
	}
}

// Clear entire wishlist
export async function clearWishlist(): Promise<WishlistActionResponse> {
	try {
		const session = await auth()
		
		if (!session?.user?.id) {
			return {
				success: false,
				error: "Authentication required"
			}
		}

		await prisma.wishlistItem.deleteMany({
			where: {
				userId: session.user.id
			}
		})

		revalidatePath('/wishlist')
		
		return {
			success: true,
			message: "Wishlist cleared"
		}

	} catch (error) {
		console.error('Error clearing wishlist:', error)
		return {
			success: false,
			error: 'Failed to clear wishlist'
		}
	}
}