'use client'

import { ProductWithDetails } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/cart/AddToCartButton'
import { Eye, Star } from 'lucide-react'

interface ProductCardProps {
  product: ProductWithDetails
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const primaryImage = product.images[0] || '/placeholder-product.png'
  
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!product.isActive && (
            <Badge variant="secondary" className="text-xs">
              Inactive
            </Badge>
          )}
        </div>

        {/* Quick stats overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center text-white text-sm space-x-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {product.viewCount || 0}
            </div>
            {product.averageRating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                {product.averageRating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {product.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </div>
              
              {product.seller && (
                <p className="text-xs text-gray-500">
                  by {product.seller.name || product.seller.companyName}
                  {product.seller.verificationBadge && (
                    <Badge variant="outline" className="ml-1 text-xs">
                      Verified
                    </Badge>
                  )}
                </p>
              )}
            </div>

            {product._count && (
              <div className="text-right">
                <div className="flex items-center text-xs text-gray-500">
                  <Star className="w-3 h-3 mr-1" />
                  {product.averageRating?.toFixed(1) || 'N/A'} ({product._count.reviews})
                </div>
                <div className="text-xs text-gray-500">
                  {product._count.orders} sold
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton 
          product={product} 
          className="w-full"
        />
      </CardFooter>
    </Card>
  )
}
