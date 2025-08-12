"use client"

import { ProductGrid } from "@/components/product/product-grid"
import { allProducts } from "@/lib/products"

export function MoreProducts() {
	// Show a larger slice on the home page
	const products = allProducts.slice(0, 12)
	return (
		<section className="py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">More to explore</h2>
					<p className="text-muted-foreground mt-1">Discover even more styles and categories.</p>
				</div>
				<ProductGrid products={products} />
			</div>
		</section>
	)
}