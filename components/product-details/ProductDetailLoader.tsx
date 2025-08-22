"use client"

import dynamic from 'next/dynamic'
import { ProductType } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"

// Import the unified component
const UnifiedProductDetail = dynamic(() => import('./UnifiedProductDetail'), {
  loading: () => <ProductDetailSkeleton />
})

// Legacy components for backward compatibility (if needed)
const ElectronicsLaptop = dynamic(() => import('./ElectronicsLaptop'), {
  loading: () => <ProductDetailSkeleton />
})

const ElectronicsSmartphone = dynamic(() => import('./ElectronicsSmartphone'), {
  loading: () => <ProductDetailSkeleton />
})

const ClothingApparel = dynamic(() => import('./ClothingApparel'), {
  loading: () => <ProductDetailSkeleton />
})

const GenericProduct = dynamic(() => import('./GenericProduct'), {
  loading: () => <ProductDetailSkeleton />
})

interface ProductDetailLoaderProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    images: string[]
    brand?: string
    category?: string
    subcategory?: string
    productType: ProductType
    shortDescription?: string
    detailedDescription?: string
    keyFeatures?: string
    inStock: boolean
    stockQuantity: number
    colors?: string[]
    sizes?: string[]
    weight?: number
    dimensions?: string
    material?: string
    aiMetadata?: any
    averageRating?: number
    reviewCount?: number
    seller?: {
      id: string
      name: string
      verificationBadge: boolean
    }
  }
  useUnified?: boolean // Flag to use unified component or legacy components
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          <Skeleton className="h-32 w-full" />
          
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      </div>
      
      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}

export default function ProductDetailLoader({ product, useUnified = true }: ProductDetailLoaderProps) {
  // Use unified component by default (new hybrid approach)
  if (useUnified) {
    return <UnifiedProductDetail product={product} />
  }

  // Legacy component mapping (for backward compatibility)
  const componentMap = {
    [ProductType.ELECTRONICS_LAPTOP]: ElectronicsLaptop,
    [ProductType.ELECTRONICS_SMARTPHONE]: ElectronicsSmartphone,
    [ProductType.CLOTHING_APPAREL]: ClothingApparel,
    // Add more mappings as needed
  }

  const Component = componentMap[product.productType] || GenericProduct

  return <Component product={product} />
}

export { ProductDetailSkeleton }