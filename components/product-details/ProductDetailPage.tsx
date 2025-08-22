"use client"

import { ProductType } from "@prisma/client"
import ProductDetailLoader from "./ProductDetailLoader"

// This component now acts as a wrapper that uses the new unified system
// For backward compatibility, you can set useUnified=false to use legacy components

interface ProductDetailPageProps {
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
  useUnified?: boolean // Optional flag to use unified system
}

export default function ProductDetailPage({ product, useUnified = true }: ProductDetailPageProps) {
  return (
    <ProductDetailLoader 
      product={product} 
      useUnified={useUnified}
    />
  )
}