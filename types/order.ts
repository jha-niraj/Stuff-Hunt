import { OrderStatus, PaymentStatus } from "@prisma/client"
import { User } from "./user"
import { Product } from "./product"

// Address Types
export interface Address {
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

// Order Item Types
export interface OrderItem {
	id: string
	quantity: number
	unitPrice: number
	totalPrice: number
	variantKey?: string | null
	metadata?: Record<string, unknown> | null
	product: Product & {
		seller: {
			id: string
			name: string
			verificationBadge: boolean
		}
	}
}

// Order Coupon Types
export interface OrderCoupon {
	id: string
	discountAmount: number
	coupon: {
		id: string
		code: string
		name: string
	}
}

// Main Order Type
export interface Order {
	id: string
	orderNumber: string
	status: OrderStatus
	subtotal: number
	shippingCost: number
	taxAmount: number
	discountAmount: number
	total: number
	paymentStatus: PaymentStatus
	paymentMethod?: string | null
	paymentId?: string | null
	shippingAddress: Address | Record<string, unknown>
	billingAddress?: Address | Record<string, unknown> | null
	trackingNumber?: string | null
	estimatedDelivery?: Date | null
	deliveredAt?: Date | null
	notes?: string | null
	metadata?: Record<string, unknown> | null
	createdAt: Date
	updatedAt: Date
	buyerId: string
	buyer: User
	items: OrderItem[]
	couponsUsed?: OrderCoupon[]
}

// Order Creation Data
export interface CreateOrderData {
	items: {
		productId: string
		quantity: number
		variantKey?: string
		metadata?: Record<string, unknown>
	}[]
	shippingAddress: Address
	billingAddress?: Address
	paymentMethod?: string
	notes?: string
	couponCode?: string
}

// Order API Response Types
export interface OrderResponse {
	success: boolean
	order?: Order
	error?: string
}

export interface OrdersResponse {
	success: boolean
	orders?: Order[]
	error?: string
}

// Order Status Badge Props
export interface OrderStatusBadgeProps {
	status: OrderStatus
}

// Order Summary Types
export interface OrderSummary {
	subtotal: number
	shippingCost: number
	taxAmount: number
	discountAmount: number
	total: number
}

// Order Filter Types
export interface OrderFilters {
	status?: OrderStatus
	dateFrom?: Date
	dateTo?: Date
	minAmount?: number
	maxAmount?: number
}