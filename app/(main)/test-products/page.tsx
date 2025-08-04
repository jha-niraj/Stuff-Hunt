'use client'

import { ProductWithDetails } from '@/types'
import ProductCard from '@/components/products/ProductCard'
import { useCartStore } from '@/stores/useCartStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TestProductsPage() {
  const { items, totalItems, selectedTotal } = useCartStore()

  // Mock products for testing
  const mockProducts: ProductWithDetails[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 2999,
      shortDescription: 'High-quality wireless headphones with noise cancellation',
      detailedDescription: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
      viewCount: 150,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: 'seller1',
      seller: {
        id: 'seller1',
        name: 'TechStore',
        companyName: 'TechStore Electronics',
        verificationBadge: true
      },
      _count: {
        reviews: 45,
        orders: 120
      },
      averageRating: 4.5,
      categories: []
    },
    {
      id: '2', 
      name: 'Smart Fitness Watch',
      price: 8999,
      shortDescription: 'Track your fitness goals with this advanced smartwatch',
      detailedDescription: 'Feature-rich smartwatch with heart rate monitoring, GPS, water resistance, and 7-day battery life.',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
      viewCount: 89,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: 'seller2',
      seller: {
        id: 'seller2',
        name: 'FitGear',
        companyName: 'FitGear Wearables',
        verificationBadge: false
      },
      _count: {
        reviews: 32,
        orders: 67
      },
      averageRating: 4.2,
      categories: []
    },
    {
      id: '3',
      name: 'Organic Green Tea',
      price: 499,
      shortDescription: 'Premium organic green tea leaves from the hills',
      detailedDescription: 'Hand-picked organic green tea leaves sourced directly from mountain tea gardens. Rich in antioxidants.',
      images: ['https://images.unsplash.com/photo-1594736797933-d0cc4e961213?w=500&h=500&fit=crop'],
      viewCount: 67,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: 'seller3',
      seller: {
        id: 'seller3',
        name: 'TeaBliss',
        companyName: 'TeaBliss Organics',
        verificationBadge: true
      },
      _count: {
        reviews: 28,
        orders: 89
      },
      averageRating: 4.7,
      categories: []
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Test Products - Cart Demo</h1>
          <p className="text-gray-600">
            Add some products to your cart to test the cart functionality
          </p>
        </div>

        {/* Cart Summary */}
        {totalItems > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {totalItems} items in cart • Total: ₹{selectedTotal.toLocaleString()}
                  </p>
                </div>
                <Link href="/cart">
                  <Button>View Cart</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Current Cart Items (for debugging) */}
        {items.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Current Cart Items (Debug)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        Qty: {item.quantity} • ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <span className={`ml-2 text-xs ${item.selected ? 'text-green-600' : 'text-gray-400'}`}>
                        {item.selected ? '✓ Selected' : '○ Not selected'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
