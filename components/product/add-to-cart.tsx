"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/stores/cart-store"
import type { Product } from "@/lib/products"
import { ShoppingCart, Check } from "lucide-react"
import { toast } from "sonner"

interface AddToCartProps {
  product: Product
  quantity?: number
  variantKey?: string
  metadata?: any
  className?: string
}

export function AddToCart({ product, quantity = 1, variantKey, metadata, className }: AddToCartProps) {
  const { add, isLoading } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!product.inStock) {
      toast.error("This product is currently out of stock")
      return
    }

    setIsAdding(true)
    try {
      await add(product, quantity, variantKey, metadata)
      setJustAdded(true)
      toast.success(`${product.name} added to cart`)
      
      // Reset the "just added" state after 2 seconds
      setTimeout(() => setJustAdded(false), 2000)
    } catch (error) {
      toast.error("Failed to add item to cart")
      console.error("Add to cart error:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const buttonText = justAdded ? "Added!" : "Add to cart"
  const ButtonIcon = justAdded ? Check : ShoppingCart
  const disabled = isAdding || isLoading || !product.inStock

  return (
    <Button 
      className={`gap-2 ${className}`} 
      onClick={handleAddToCart} 
      disabled={disabled}
      aria-label="Add to cart"
    >
      <ButtonIcon className="w-4 h-4" />
      {isAdding ? "Adding..." : buttonText}
    </Button>
  )
}
