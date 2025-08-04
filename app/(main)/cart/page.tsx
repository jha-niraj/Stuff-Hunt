'use client'

import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    selectedItems,
    selectedCount,
    selectedTotal,
    removeItem,
    updateQuantity,
    toggleSelection,
    selectAll,
    deselectAll,
    clearCart
  } = useCartStore()

  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = async () => {
    setIsClearing(true)
    clearCart()
    setTimeout(() => setIsClearing(false), 500)
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to proceed with checkout')
      return
    }
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout with:', selectedItems)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <ShoppingCart className="h-24 w-24 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const allSelected = items.length > 0 && items.every(item => item.selected)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Badge variant="secondary" className="text-sm">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Select All / Clear Cart */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => {
                  if (checked) {
                    selectAll()
                  } else {
                    deselectAll()
                  }
                }}
              />
              <span className="text-sm font-medium">
                Select All ({items.length} items)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              disabled={isClearing}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isClearing ? 'Clearing...' : 'Clear Cart'}
            </Button>
          </div>

          {/* Cart Items List */}
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 pt-2">
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={() => toggleSelection(item.id)}
                    />
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || '/placeholder-product.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Sold by {item.sellerName}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-600">
                            ₹{item.price.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Selected Items</span>
                  <span>{selectedCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Selected Subtotal</span>
                  <span>₹{selectedTotal.toLocaleString()}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total to Pay</span>
                <span>₹{selectedTotal.toLocaleString()}</span>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Checkout ({selectedCount} items)
                </Button>
                
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {selectedItems.length === 0 && (
                <p className="text-sm text-gray-600 text-center">
                  Select items to proceed with checkout
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
