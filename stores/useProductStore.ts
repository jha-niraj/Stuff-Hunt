import { create } from 'zustand'
import { Product, Category, ProductWithDetails } from '@/types'

// Product state interface
interface ProductState {
	products: ProductWithDetails[]
	categories: Category[]
	currentProduct: ProductWithDetails | null
	loading: boolean
	error: string | null

	// Pagination and filtering
	currentPage: number
	totalPages: number
	totalProducts: number
	filters: {
		category?: string
		minPrice?: number
		maxPrice?: number
		search?: string
		sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating'
	}

	// Actions
	setProducts: (products: ProductWithDetails[]) => void
	setCategories: (categories: Category[]) => void
	setCurrentProduct: (product: ProductWithDetails | null) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void
	setFilters: (filters: Partial<ProductState['filters']>) => void
	setCurrentPage: (page: number) => void
	addProduct: (product: ProductWithDetails) => void
	updateProduct: (id: string, updates: Partial<ProductWithDetails>) => void
	removeProduct: (id: string) => void
	clearProducts: () => void

	// Async actions
	fetchProducts: (params?: {
		page?: number
		limit?: number
		category?: string
		search?: string
		minPrice?: number
		maxPrice?: number
		sortBy?: string
	}) => Promise<void>
	fetchSellerProducts: () => Promise<void>
	fetchProductById: (id: string) => Promise<void>
	fetchCategories: () => Promise<void>
	createProduct: (data: {
		name: string
		description: string
		price: number
		categoryId: string
		images: string[]
		stock: number
		features?: string[]
	}) => Promise<void>
	updateProductAPI: (id: string, data: Partial<ProductWithDetails>) => Promise<void>
	deleteProduct: (id: string) => Promise<void>
}

// API functions
async function fetchProductsAPI(params: any = {}) {
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, value.toString())
		}
	})

	const response = await fetch(`/api/products?${searchParams}`)
	if (!response.ok) {
		throw new Error('Failed to fetch products')
	}
	return response.json()
}

async function fetchSellerProductsAPI() {
	const response = await fetch('/api/products/seller')
	if (!response.ok) {
		throw new Error('Failed to fetch seller products')
	}
	return response.json()
}

async function fetchProductByIdAPI(id: string) {
	const response = await fetch(`/api/products/${id}`)
	if (!response.ok) {
		throw new Error('Failed to fetch product')
	}
	return response.json()
}

async function fetchCategoriesAPI() {
	const response = await fetch('/api/categories')
	if (!response.ok) {
		throw new Error('Failed to fetch categories')
	}
	return response.json()
}

async function createProductAPI(data: any) {
	const response = await fetch('/api/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Failed to create product')
	}

	return response.json()
}

async function updateProductAPICall(id: string, data: any) {
	const response = await fetch(`/api/products/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Failed to update product')
	}

	return response.json()
}

async function deleteProductAPI(id: string) {
	const response = await fetch(`/api/products/${id}`, {
		method: 'DELETE',
	})

	if (!response.ok) {
		throw new Error('Failed to delete product')
	}

	return response.json()
}

export const useProductStore = create<ProductState>((set, get) => ({
	products: [],
	categories: [],
	currentProduct: null,
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalProducts: 0,
	filters: {},

	setProducts: (products) => set({ products }),
	setCategories: (categories) => set({ categories }),
	setCurrentProduct: (product) => set({ currentProduct: product }),
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error }),
	setFilters: (filters) => set((state) => ({
		filters: { ...state.filters, ...filters },
		currentPage: 1 // Reset to first page when filters change
	})),
	setCurrentPage: (page) => set({ currentPage: page }),

	addProduct: (product) => set((state) => ({
		products: [product, ...state.products],
		totalProducts: state.totalProducts + 1
	})),

	updateProduct: (id, updates) => set((state) => ({
		products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
		currentProduct: state.currentProduct?.id === id
			? { ...state.currentProduct, ...updates }
			: state.currentProduct
	})),

	removeProduct: (id) => set((state) => ({
		products: state.products.filter(p => p.id !== id),
		totalProducts: Math.max(0, state.totalProducts - 1),
		currentProduct: state.currentProduct?.id === id ? null : state.currentProduct
	})),

	clearProducts: () => set({
		products: [],
		currentProduct: null,
		currentPage: 1,
		totalPages: 1,
		totalProducts: 0
	}),

	fetchProducts: async (params = {}) => {
		set({ loading: true, error: null })

		try {
			const state = get()
			const requestParams = {
				page: state.currentPage,
				limit: 12,
				...state.filters,
				...params
			}

			const result = await fetchProductsAPI(requestParams)

			if (result.success) {
				set({
					products: result.products || [],
					currentPage: result.currentPage || 1,
					totalPages: result.totalPages || 1,
					totalProducts: result.totalProducts || 0,
					loading: false
				})
			} else {
				set({ error: result.error || 'Failed to fetch products', loading: false })
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to fetch products',
				loading: false
			})
		}
	},

	fetchSellerProducts: async () => {
		set({ loading: true, error: null })

		try {
			const result = await fetchSellerProductsAPI()

			if (result.success) {
				set({ products: result.products || [], loading: false })
			} else {
				set({ error: result.error || 'Failed to fetch seller products', loading: false })
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to fetch seller products',
				loading: false
			})
		}
	},

	fetchProductById: async (id) => {
		set({ loading: true, error: null })

		try {
			const result = await fetchProductByIdAPI(id)

			if (result.success && result.product) {
				set({ currentProduct: result.product, loading: false })
			} else {
				set({ error: result.error || 'Failed to fetch product', loading: false })
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to fetch product',
				loading: false
			})
		}
	},

	fetchCategories: async () => {
		try {
			const result = await fetchCategoriesAPI()

			if (result.success) {
				set({ categories: result.categories || [] })
			}
		} catch (error) {
			console.error('Failed to fetch categories:', error)
		}
	},

	createProduct: async (data) => {
		set({ loading: true, error: null })

		try {
			const result = await createProductAPI(data)

			if (result.success && result.product) {
				get().addProduct(result.product)
			} else {
				set({ error: result.error || 'Failed to create product', loading: false })
				throw new Error(result.error || 'Failed to create product')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to create product'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},

	updateProductAPI: async (id, data) => {
		set({ loading: true, error: null })

		try {
			const result = await updateProductAPICall(id, data)

			if (result.success && result.product) {
				get().updateProduct(id, result.product)
				set({ loading: false })
			} else {
				set({ error: result.error || 'Failed to update product', loading: false })
				throw new Error(result.error || 'Failed to update product')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to update product'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},

	deleteProduct: async (id) => {
		set({ loading: true, error: null })

		try {
			const result = await deleteProductAPI(id)

			if (result.success) {
				get().removeProduct(id)
				set({ loading: false })
			} else {
				set({ error: result.error || 'Failed to delete product', loading: false })
				throw new Error(result.error || 'Failed to delete product')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to delete product'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},
}))
