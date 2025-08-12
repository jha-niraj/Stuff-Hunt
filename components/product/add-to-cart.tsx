"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/stores/cart-store"
import type { Product } from "@/lib/products"
import { ShoppingCart } from "lucide-react"

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart()
  return (
    <Button className="gap-2" onClick={() => add(product, 1, undefined)} aria-label="Add to cart">
      <ShoppingCart className="w-4 h-4" />
      Add to cart
    </Button>
  )
}
