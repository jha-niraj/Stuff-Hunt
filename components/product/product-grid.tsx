"use client"

import type { ProductWithDetails } from "@/actions/product.action"
import { ProductCard } from "./product-card"

export function ProductGrid({ products = [] }: { products: ProductWithDetails[] }) {
	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
			{
				products.map((product) => (
					<ProductCard key={product.slug} product={product} />
				))
			}
		</div>
	)
}