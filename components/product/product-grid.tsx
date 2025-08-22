"use client"

import type { ProductWithDetails } from "@/actions/product.action"
import { ProductCard } from "./product-card"

interface ProductGridProps {
	products?: ProductWithDetails[]
	loading?: boolean
	skeletonCount?: number
}

function ProductSkeleton() {
	return (
		<div className="rounded-xl border overflow-hidden bg-card animate-pulse">
			<div className="aspect-square bg-muted"></div>
			<div className="p-4 space-y-3">
				<div className="space-y-2">
					<div className="h-4 bg-muted rounded w-3/4"></div>
					<div className="h-3 bg-muted rounded w-1/2"></div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex -space-x-1">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="w-5 h-5 rounded-full bg-muted"></div>
						))}
					</div>
					<div className="h-8 w-16 bg-muted rounded"></div>
				</div>
			</div>
		</div>
	)
}

export function ProductGrid({ products = [], loading = false, skeletonCount = 8 }: ProductGridProps) {
	if (loading) {
		return (
			<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<ProductSkeleton key={i} />
				))}
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="max-w-md mx-auto">
					<div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
						<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
					</div>
					<h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
					<p className="text-muted-foreground">
						Try adjusting your search criteria or browse our categories to find what you're looking for.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
			{products.map((product) => (
				<ProductCard key={product.slug} product={product} />
			))}
		</div>
	)
}