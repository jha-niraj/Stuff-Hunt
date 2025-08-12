"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type CreateOrderData = {
	items: {
		productId: string
		quantity: number
		variantKey?: string
		metadata?: any
	}[]
	shippingAddress: {
		firstName: string
		lastName: string
		company?: string
		address1: string
		address2?: string
		city: string
		state: string
		postalCode: string
		country: string
		phone?: string
	}
	billingAddress?: {
		firstName: string
		lastName: string
		company?: string
		address1: string
		address2?: string
		city: string
		state: string
		postalCode: string
		country: string
		phone?: string
	}
	paymentMethod?: string
	notes?: string
	couponCode?: string
}

// Create a new order
export async function createOrder(orderData: CreateOrderData) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		const userId = session.user.id

		// Get product details and calculate totals
		const productIds = orderData.items.map(item => item.productId)
		const products = await prisma.product.findMany({
			where: { id: { in: productIds } },
			include: { seller: true }
		})

		if (products.length !== productIds.length) {
			throw new Error("Some products were not found")
		}

		// Calculate order totals
		let subtotal = 0
		const orderItems = orderData.items.map(item => {
			const product = products.find(p => p.id === item.productId)
			if (!product) throw new Error(`Product ${item.productId} not found`)

			const unitPrice = product.price
			const totalPrice = unitPrice * item.quantity
			subtotal += totalPrice

			return {
				productId: item.productId,
				quantity: item.quantity,
				unitPrice,
				totalPrice,
				variantKey: item.variantKey,
				metadata: item.metadata
			}
		})

		// Calculate shipping (free over $75, otherwise $6.95)
		const shippingCost = subtotal > 75 ? 0 : 6.95

		// Apply coupon if provided
		let discountAmount = 0
		let couponId: string | undefined

		if (orderData.couponCode) {
			const coupon = await prisma.coupon.findFirst({
				where: {
					code: orderData.couponCode,
					isActive: true,
					OR: [
						{ expiresAt: null },
						{ expiresAt: { gte: new Date() } }
					]
				}
			})

			if (coupon && subtotal >= (coupon.minimumAmount || 0)) {
				if (coupon.type === "PERCENTAGE") {
					discountAmount = Math.min(
						(subtotal * coupon.value) / 100,
						coupon.maximumDiscount || Infinity
					)
				} else if (coupon.type === "FIXED_AMOUNT") {
					discountAmount = Math.min(coupon.value, subtotal)
				} else if (coupon.type === "FREE_SHIPPING") {
					discountAmount = shippingCost
				}
				couponId = coupon.id
			}
		}

		const total = subtotal + shippingCost - discountAmount

		// Generate order number
		const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

		// Create order in database
		const order = await prisma.order.create({
			data: {
				orderNumber,
				buyerId: userId,
				subtotal,
				shippingCost,
				discountAmount,
				total,
				shippingAddress: orderData.shippingAddress,
				billingAddress: orderData.billingAddress,
				paymentMethod: orderData.paymentMethod,
				notes: orderData.notes,
				items: {
					create: orderItems
				},
				...(couponId && {
					couponsUsed: {
						create: {
							couponId,
							discountAmount
						}
					}
				})
			},
			include: {
				items: {
					include: {
						product: {
							include: {
								seller: true
							}
						}
					}
				}
			}
		})

		// Update coupon usage count
		if (couponId) {
			await prisma.coupon.update({
				where: { id: couponId },
				data: { usageCount: { increment: 1 } }
			})
		}

		// Clear user's cart after successful order
		await prisma.cartItem.deleteMany({
			where: { userId }
		})

		revalidatePath("/orders")
		revalidatePath("/cart")

		return { success: true, order }
	} catch (error) {
		console.error("Error creating order:", error)
		return { success: false, error: "Failed to create order" }
	}
}

// Get user's orders
export async function getUserOrders() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		const orders = await prisma.order.findMany({
			where: { buyerId: session.user.id },
			include: {
				items: {
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
					}
				}
			},
			orderBy: { createdAt: 'desc' }
		})

		return { success: true, orders }
	} catch (error) {
		console.error("Error getting user orders:", error)
		return { success: false, error: "Failed to get orders" }
	}
}

// Get order by ID
export async function getOrderById(orderId: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
				buyerId: session.user.id
			},
			include: {
				items: {
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
					}
				},
				couponsUsed: {
					include: {
						coupon: true
					}
				}
			}
		})

		if (!order) {
			throw new Error("Order not found")
		}

		return { success: true, order }
	} catch (error) {
		console.error("Error getting order:", error)
		return { success: false, error: "Failed to get order" }
	}
}

// Update order status (for sellers/admins)
export async function updateOrderStatus(orderId: string, status: string, trackingNumber?: string) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			throw new Error("User not authenticated")
		}

		// Check if user has permission to update this order
		const order = await prisma.order.findFirst({
			where: { id: orderId },
			include: {
				items: {
					include: {
						product: {
							select: {
								sellerId: true
							}
						}
					}
				}
			}
		})

		if (!order) {
			throw new Error("Order not found")
		}

		// Check if user is seller of any item in the order or is admin
		const isSellerOfOrder = order.items.some(item => item.product.sellerId === session.user.id)
		const isAdmin = session.user.role === "ADMIN"

		if (!isSellerOfOrder && !isAdmin) {
			throw new Error("Not authorized to update this order")
		}

		const updateData: any = { status }
		if (trackingNumber) {
			updateData.trackingNumber = trackingNumber
		}
		if (status === "DELIVERED") {
			updateData.deliveredAt = new Date()
		}

		const updatedOrder = await prisma.order.update({
			where: { id: orderId },
			data: updateData
		})

		revalidatePath("/orders")
		revalidatePath(`/orders/${orderId}`)

		return { success: true, order: updatedOrder }
	} catch (error) {
		console.error("Error updating order status:", error)
		return { success: false, error: "Failed to update order status" }
	}
}