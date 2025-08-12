"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/products"

export type CartItem = {
  product: Product
  quantity: number
  variantKey?: string // e.g., "Black|L"
}

type State = {
  items: CartItem[]
}
type Actions = {
  add: (product: Product, quantity?: number, variantKey?: string) => void
  remove: (slug: string, variantKey?: string) => void
  clear: () => void
}
type Getters = {
  total: number
}

export const useCart = create<State & Actions & Getters>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, quantity = 1, variantKey) => {
        const items = [...get().items]
        const idx = items.findIndex((i) => i.product.slug === product.slug && i.variantKey === variantKey)
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity }
        } else {
          items.push({ product, quantity, variantKey })
        }
        set({ items })
      },
      remove: (slug, variantKey) => {
        set({ items: get().items.filter((i) => !(i.product.slug === slug && i.variantKey === variantKey)) })
      },
      clear: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
      },
    }),
    { name: "cart" },
  ),
)
