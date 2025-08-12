import { Product as PrismaProduct, Category as PrismaCategory, OrderStatus } from '@prisma/client'

// Base types from Prisma
export type Product = PrismaProduct
export type Category = PrismaCategory

// Extended Product type with relations (matches the database structure)
export interface ProductWithDetails {
	id: string
	slug: string
	name: string
	price: number
	originalPrice?: number | null
	shortDescription?: string | null
	detailedDescription?: string | null
	images: string[]
	viewCount: number
	isActive: boolean
	inStock: boolean
	stockQuantity: number
	colors?: string[]
	sizes?: string[]
	discountPercentage?: number | null
	brand?: string | null
	sku?: string | null
	createdAt: Date
	updatedAt: Date
	seller: {
		id: string
		name: string
		verificationBadge: boolean
	}
	categories: {
		id: string
		name: string
		description?: string | null
	}[]
	_count?: {
		reviews: number
		orderItems: number
		likes: number
	}
	averageRating?: number
}

// Category with hierarchy
export interface CategoryWithChildren extends Category {
	children?: CategoryWithChildren[]
	parent?: Category | null
	_count?: {
		products: number
	}
}

// Product creation data
export interface ProductCreateData {
	name: string
	price: number
	shortDescription?: string
	detailedDescription?: string
	images: string[]
	categoryIds: string[]
	stock?: number
	features?: string[]
}

// Product update data
export interface ProductUpdateData {
	name?: string
	price?: number
	shortDescription?: string
	detailedDescription?: string
	images?: string[]
	categoryIds?: string[]
	isActive?: boolean
	stock?: number
	features?: string[]
}

// Product filters for search/listing
export interface ProductFilters {
	category?: string
	minPrice?: number
	maxPrice?: number
	search?: string
	sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating' | 'popular'
	inStock?: boolean
	sellerId?: string
}

// Pagination parameters
export interface PaginationParams {
	page?: number
	limit?: number
}

// Product listing response
export interface ProductListResponse {
	success: boolean
	products: ProductWithDetails[]
	currentPage: number
	totalPages: number
	totalProducts: number
	error?: string
}

// Single product response
export interface ProductResponse {
	success: boolean
	product?: ProductWithDetails
	error?: string
}

// Category response
export interface CategoryResponse {
	success: boolean
	categories?: CategoryWithChildren[]
	error?: string
}

// Product form errors
export interface ProductFormErrors {
	name?: string
	price?: string
	shortDescription?: string
	detailedDescription?: string
	images?: string
	categories?: string
	stock?: string
}

// Cart item (stored in localStorage)
export interface CartItem {
	id: string // product id
	name: string
	price: number
	image: string
	quantity: number
	selected: boolean // for checkout selection
	maxStock?: number
	sellerId: string
	sellerName: string
}

// Cart state
export interface CartState {
	items: CartItem[]
	totalItems: number
	totalPrice: number
	selectedItems: CartItem[]
	selectedCount: number
	selectedTotal: number
}

// Cart actions
export interface CartActions {
	addItem: (product: ProductWithDetails, quantity?: number) => void
	removeItem: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
	toggleSelection: (productId: string) => void
	selectAll: () => void
	deselectAll: () => void
	clearCart: () => void
	getCartSummary: () => CartState
}

// Order related types (OrderItem is defined in order.ts to avoid conflicts)
export interface OrderCreateData {
	items: {
		productId: string
		quantity: number
		price: number
	}[]
	totalAmount: number
	shippingAddress?: string
	paymentMethod: string
}

// Review types
export interface ProductReview {
	id: string
	rating: number
	comment?: string
	createdAt: Date
	user: {
		id: string
		name: string
		image?: string
	}
}

export interface ReviewCreateData {
	productId: string
	rating: number
	comment?: string
}

// Product analytics (for sellers)
export interface ProductAnalytics {
	views: number
	orders: number
	revenue: number
	averageRating: number
	totalReviews: number
	conversionRate: number
}

// Inventory management
export interface InventoryUpdate {
	productId: string
	stock: number
	operation: 'set' | 'add' | 'subtract'
}

export { OrderStatus }
