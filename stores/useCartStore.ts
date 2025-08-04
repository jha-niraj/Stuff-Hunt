import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartState, ProductWithDetails } from '@/types'

interface CartStore extends CartState {
  // Actions
  addItem: (product: ProductWithDetails, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleSelection: (productId: string) => void
  selectAll: () => void
  deselectAll: () => void
  clearCart: () => void
  getCartSummary: () => CartState
}

// Helper functions
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const selectedItems = items.filter(item => item.selected)
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const selectedTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return {
    totalItems,
    totalPrice,
    selectedItems,
    selectedCount,
    selectedTotal
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      selectedItems: [],
      selectedCount: 0,
      selectedTotal: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          
          let newItems: CartItem[]
          
          if (existingItem) {
            // Update quantity if item already exists
            newItems = state.items.map(item =>
              item.id === product.id
                ? { 
                    ...item, 
                    quantity: item.quantity + quantity,
                  }
                : item
            )
          } else {
            // Add new item
            const newItem: CartItem = {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] || '',
              quantity: quantity, // Since we don't have stock tracking in DB yet
              selected: true, // Default to selected
              maxStock: 999, // Default max stock
              sellerId: product.sellerId,
              sellerName: product.seller?.name || product.seller?.companyName || 'Unknown Seller'
            }
            newItems = [...state.items, newItem]
          }

          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== productId)
          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => {
          const newItems = state.items.map(item =>
            item.id === productId
              ? { 
                  ...item, 
                  quantity: quantity
                }
              : item
          )
          
          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      toggleSelection: (productId) => {
        set((state) => {
          const newItems = state.items.map(item =>
            item.id === productId
              ? { ...item, selected: !item.selected }
              : item
          )
          
          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      selectAll: () => {
        set((state) => {
          const newItems = state.items.map(item => ({ ...item, selected: true }))
          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      deselectAll: () => {
        set((state) => {
          const newItems = state.items.map(item => ({ ...item, selected: false }))
          const totals = calculateTotals(newItems)
          
          return {
            items: newItems,
            ...totals
          }
        })
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          selectedItems: [],
          selectedCount: 0,
          selectedTotal: 0
        })
      },

      getCartSummary: () => {
        const state = get()
        return {
          items: state.items,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
          selectedItems: state.selectedItems,
          selectedCount: state.selectedCount,
          selectedTotal: state.selectedTotal
        }
      }
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ 
        items: state.items // Only persist items, recalculate totals on load
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Recalculate totals when loading from localStorage
          const totals = calculateTotals(state.items)
          Object.assign(state, totals)
        }
      }
    }
  )
)
