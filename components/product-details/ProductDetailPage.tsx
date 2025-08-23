"use client"

import ProductDetailLoader from "./ProductDetailLoader"
import type { ProductWithDetails } from "@/actions/product.action"

// This component now acts as a wrapper that uses the new unified system
// For backward compatibility, you can set useUnified=false to use legacy components

interface ProductDetailPageProps {
	product: ProductWithDetails
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