"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product/product-grid"
import { getProducts, type ProductWithDetails } from "@/actions/product.action"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export function MoreProducts() {
	const [products, setProducts] = useState<ProductWithDetails[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadMoreProducts = async () => {
			try {
				const result = await getProducts({ 
					sortBy: 'newest',
					page: 1,
					limit: 4
				})
				if (result.success) {
					setProducts(result.products)
				}
			} catch (error) {
				console.error('Error loading more products:', error)
				setProducts([])
			} finally {
				setLoading(false)
			}
		}

		loadMoreProducts()
	}, [])

	if (loading) {
		return (
			<section className="py-10 md:py-16 bg-muted/30">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-center py-12">
						<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
						<span className="ml-2 text-muted-foreground">Loading products...</span>
					</div>
				</div>
			</section>
		)
	}

	if (products.length === 0) {
		return null // Don't show section if no products
	}

	return (
		<section className="py-10 md:py-16 bg-muted/30">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex items-end justify-between gap-4 mb-6"
				>
					<div>
						<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">More Products</h2>
						<p className="text-muted-foreground mt-1">Discover more amazing products.</p>
					</div>
					<Button variant="ghost" asChild>
						<Link href="/products">View all</Link>
					</Button>
				</motion.div>
				<ProductGrid products={products} />
			</div>
		</section>
	)
}