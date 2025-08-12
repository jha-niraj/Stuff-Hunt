"use client"

import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product/product-grid"
import { getFeaturedProducts, type ProductWithDetails } from "@/actions/product.action"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export function FeaturedGrid() {
	const [products, setProducts] = useState<ProductWithDetails[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadFeaturedProducts = async () => {
			try {
				const featuredProducts = await getFeaturedProducts(8)
				setProducts(featuredProducts)
			} catch (error) {
				console.error('Error loading featured products:', error)
				setProducts([])
			} finally {
				setLoading(false)
			}
		}

		loadFeaturedProducts()
	}, [])

	if (loading) {
		return (
			<section className="py-10 md:py-16">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-center py-12">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
						<span className="ml-2 text-muted-foreground">Loading featured products...</span>
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="py-10 md:py-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex items-end justify-between gap-4 mb-6"
				>
					<div>
						<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Featured</h2>
						<p className="text-muted-foreground mt-1">Our bestsellers and new arrivals.</p>
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