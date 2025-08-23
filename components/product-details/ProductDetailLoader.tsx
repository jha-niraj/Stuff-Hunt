"use client"

import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"
import type { ProductWithDetails } from "@/actions/product.action"

// Import the unified component
const UnifiedProductDetail = dynamic(() => import('./UnifiedProductDetail'), {
    loading: () => <ProductDetailSkeleton />
})

// Legacy components for backward compatibility (if needed)
// Currently using GenericProduct for all types to avoid type issues
// Individual components can be added later with proper type definitions

const GenericProduct = dynamic(() => import('./GenericProduct'), {
    loading: () => <ProductDetailSkeleton />
})

interface ProductDetailLoaderProps {
    product: ProductWithDetails
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
        // Transform ProductWithDetails to match UnifiedProductDetail props
        const transformedProduct = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice ?? undefined,
            images: product.images,
            brand: product.brand ?? undefined,
            category: product.category ?? undefined,
            subcategory: product.subcategory ?? undefined,
            productType: product.productType,
            shortDescription: product.shortDescription ?? undefined,
            detailedDescription: product.detailedDescription ?? undefined,
            keyFeatures: product.keyFeatures ?? undefined,
            inStock: product.inStock,
            stockQuantity: product.stockQuantity,
            colors: product.colors ?? undefined,
            sizes: product.sizes ?? undefined,
            weight: product.weight ?? undefined,
            dimensions: product.dimensions ?? undefined,
            material: product.material ?? undefined,
            aiMetadata: product.aiMetadata ?? undefined,
            averageRating: product.averageRating ?? undefined,
            reviewCount: product._count?.reviews ?? undefined,
            seller: product.seller
        }
        return <UnifiedProductDetail product={transformedProduct} />
    }

    // Legacy component mapping (for backward compatibility)
    // Transform ProductWithDetails to match GenericProduct props
    const transformedProductForGeneric = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        images: product.images,
        brand: product.brand ?? undefined,
        category: product.category ?? undefined,
        subcategory: product.subcategory ?? undefined,
        shortDescription: product.shortDescription ?? undefined,
        detailedDescription: product.detailedDescription ?? undefined,
        keyFeatures: product.keyFeatures ?? undefined,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        colors: product.colors ?? undefined,
        sizes: product.sizes ?? undefined,
        weight: product.weight ?? undefined,
        dimensions: product.dimensions ?? undefined,
        material: product.material ?? undefined,
        averageRating: product.averageRating ?? undefined,
        reviewCount: product._count?.reviews ?? undefined
    }

    return <GenericProduct product={transformedProductForGeneric} />
}

export { ProductDetailSkeleton }