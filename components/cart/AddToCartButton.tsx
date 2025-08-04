'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/useCartStore'
import { ProductWithDetails } from '@/types'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { toast } from 'sonner'

interface AddToCartProps {
  product: ProductWithDetails
  className?: string
  showQuantityControls?: boolean
}

export default function AddToCartButton({ 
  product, 
  className = '',
  showQuantityControls = false 
}: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  
  const { addItem, items } = useCartStore()
  
  const existingItem = items.find(item => item.id === product.id)
  const isInCart = !!existingItem

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    try {
      addItem(product, quantity)
      toast.success(`Added ${quantity} ${product.name} to cart`)
      setQuantity(1) // Reset quantity after adding
    } catch {
      toast.error('Failed to add item to cart')
    } finally {
      setIsAdding(false)
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {showQuantityControls && (
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isAdding || !product.isActive}
        className="w-full"
        size="lg"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {isAdding ? 'Adding...' : isInCart ? `Add More to Cart` : 'Add to Cart'}
      </Button>

      {isInCart && (
        <p className="text-sm text-gray-600 text-center">
          {existingItem.quantity} already in cart
        </p>
      )}
    </div>
  )
}
