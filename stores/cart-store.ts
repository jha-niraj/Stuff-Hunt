"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ProductWithDetails } from "@/actions/product.action"
import {
	syncCartToDatabase,
	getCartFromDatabase,
	addToCartDatabase,
	removeFromCartDatabase,
	updateCartItemQuantity,
	clearCartDatabase,
	type CartItemData
} from "@/actions/cart.action"

export type CartItem = {
	product: ProductWithDetails
	quantity: number
	variantKey?: string // e.g., "Black|L"
	metadata?: any
}

type State = {
	items: CartItem[]
	isLoading: boolean
	isAuthenticated: boolean
}

type Actions = {
	add: (product: ProductWithDetails, quantity?: number, variantKey?: string, metadata?: any) => Promise<void>
	remove: (slug: string, variantKey?: string) => Promise<void>
	updateQuantity: (slug: string, quantity: number, variantKey?: string) => Promise<void>
	clear: () => Promise<void>
	setAuthenticated: (authenticated: boolean) => void
	syncWithDatabase: () => Promise<void>
	loadFromDatabase: () => Promise<void>
	setItems: (items: CartItem[]) => void
	setLoading: (loading: boolean) => void
}

type Getters = {
	total: number
	itemCount: number
}

export const useCart = create<State & Actions & Getters>()(
	persist(
		(set, get) => ({
			items: [],
			isLoading: false,
			isAuthenticated: false,

			// Getters
			get total() {
				return get().items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0)
			},
			get itemCount() {
				return get().items.reduce((sum, i) => sum + i.quantity, 0)
			},

			// Actions
			setItems: (items) => set({ items }),
			setLoading: (loading) => set({ isLoading: loading }),
			setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

			add: async (product, quantity = 1, variantKey, metadata) => {
				const { items, isAuthenticated } = get()

				// Update localStorage immediately for better UX
				const newItems = [...items]
				const idx = newItems.findIndex((i) => i.product.slug === product.slug && i.variantKey === variantKey)

				if (idx >= 0) {
					newItems[idx] = { ...newItems[idx], quantity: newItems[idx].quantity + quantity }
				} else {
					newItems.push({ product, quantity, variantKey, metadata })
				}

				set({ items: newItems })

				// If user is authenticated, also update database
				if (isAuthenticated) {
					try {
						await addToCartDatabase(product.id, quantity, variantKey, metadata)
					} catch (error) {
						console.error("Failed to add to database cart:", error)
						// Revert localStorage change if database update fails
						set({ items })
					}
				}
			},

			remove: async (slug, variantKey) => {
				const { items, isAuthenticated } = get()
				const originalItems = [...items]
				const newItems = items.filter((i) => !(i.product.slug === slug && i.variantKey === variantKey))

				set({ items: newItems })

				// If user is authenticated, also update database
				if (isAuthenticated) {
					try {
						const item = originalItems.find(i => i.product.slug === slug && i.variantKey === variantKey)
						if (item) {
							await removeFromCartDatabase(item.product.id, variantKey)
						}
					} catch (error) {
						console.error("Failed to remove from database cart:", error)
						// Revert localStorage change if database update fails
						set({ items: originalItems })
					}
				}
			},

			updateQuantity: async (slug, quantity, variantKey) => {
				const { items, isAuthenticated } = get()
				const originalItems = [...items]

				if (quantity <= 0) {
					return get().remove(slug, variantKey)
				}

				const newItems = items.map(item =>
					item.product.slug === slug && item.variantKey === variantKey
						? { ...item, quantity }
						: item
				)

				set({ items: newItems })

				// If user is authenticated, also update database
				if (isAuthenticated) {
					try {
						const item = originalItems.find(i => i.product.slug === slug && i.variantKey === variantKey)
						if (item) {
							await updateCartItemQuantity(item.product.id, quantity, variantKey)
						}
					} catch (error) {
						console.error("Failed to update database cart:", error)
						// Revert localStorage change if database update fails
						set({ items: originalItems })
					}
				}
			},

			clear: async () => {
				const { isAuthenticated } = get()
				const originalItems = get().items

				set({ items: [] })

				// If user is authenticated, also clear database
				if (isAuthenticated) {
					try {
						await clearCartDatabase()
					} catch (error) {
						console.error("Failed to clear database cart:", error)
						// Revert localStorage change if database update fails
						set({ items: originalItems })
					}
				}
			},

			// Sync localStorage cart to database when user logs in
			syncWithDatabase: async () => {
				const { items } = get()
				set({ isLoading: true })

				try {
					const cartData: CartItemData[] = items.map(item => ({
						productId: item.product.id,
						quantity: item.quantity,
						variantKey: item.variantKey,
						metadata: item.metadata
					}))

					await syncCartToDatabase(cartData)
					set({ isAuthenticated: true })
				} catch (error) {
					console.error("Failed to sync cart with database:", error)
				} finally {
					set({ isLoading: false })
				}
			},

			// Load cart from database when user is already logged in
			loadFromDatabase: async () => {
				set({ isLoading: true })

				try {
					const result = await getCartFromDatabase()
					if (result.success && result.cartItems) {
						const items: CartItem[] = result.cartItems.map(dbItem => ({
							product: {
								id: dbItem.product.id,
								slug: dbItem.product.slug,
								name: dbItem.product.name,
								price: dbItem.product.price,
								images: dbItem.product.images,
								shortDescription: dbItem.product.shortDescription,
								inStock: dbItem.product.inStock,
								seller: dbItem.product.seller
							} as ProductWithDetails,
							quantity: dbItem.quantity,
							variantKey: dbItem.variantKey || undefined,
							metadata: dbItem.metadata
						}))

						set({ items, isAuthenticated: true })
					}
				} catch (error) {
					console.error("Failed to load cart from database:", error)
				} finally {
					set({ isLoading: false })
				}
			}
		}),
		{
			name: "cart",
			// Only persist items, isLoading and isAuthenticated should be reset on page load
			partialize: (state) => ({ items: state.items })
		},
	),
)