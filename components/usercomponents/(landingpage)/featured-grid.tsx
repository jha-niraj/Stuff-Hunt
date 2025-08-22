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
					
					{/* Loading Skeletons */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="space-y-3">
								<div className="aspect-square bg-muted rounded-lg animate-pulse" />
								<div className="space-y-2">
									<div className="h-4 bg-muted rounded animate-pulse" />
									<div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
									<div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		)
	}

	return (
		<section className="py-10 md:py-16">
			<div className="max-w-7xl mx-auto px-4">
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
				
				{products.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center py-12"
					>
						<div className="max-w-md mx-auto">
							{/* <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
									className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
								/>
							</div> */}
							<h3 className="text-lg font-semibold text-foreground mb-2">No Featured Products Yet</h3>
							<p className="text-muted-foreground mb-6">
								We're working on adding amazing products for you. Check back soon or explore our full catalog.
							</p>
							<Link href="/products">
								<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
									Browse All Products
								</Button>
							</Link>
						</div>
					</motion.div>
				) : (
					<ProductGrid products={products} />
				)}
			</div>
		</section>
	)
}