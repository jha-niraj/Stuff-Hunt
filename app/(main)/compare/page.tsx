"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X, ShoppingCart, Heart } from "lucide-react"
import { getProductsByIds, type ProductWithDetails } from "@/actions/product.action"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { useCompare } from "@/contexts/compare-context"
import { toast } from "sonner"

export default function ComparePage() {
	const searchParams = useSearchParams()
	const [products, setProducts] = useState<ProductWithDetails[]>([])
	const [loading, setLoading] = useState(true)
	const { add } = useCart()
	const { removeFromCompare, clearCompare } = useCompare()

	useEffect(() => {
		const productIds = searchParams.get('products')?.split(',') || []
		
		const fetchProducts = async () => {
			if (productIds.length === 0) {
				setLoading(false)
				return
			}

			try {
				const fetchedProducts = await getProductsByIds(productIds)
				setProducts(fetchedProducts)
			} catch (error) {
				console.error('Error fetching products:', error)
				toast.error('Failed to load products for comparison')
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [searchParams])

	const handleRemoveProduct = (productId: string) => {
		removeFromCompare(productId)
		setProducts(prev => prev.filter(p => p.id !== productId))
	}

	const handleAddToCart = (product: ProductWithDetails) => {
		add(product, 1, undefined)
		toast.success('Added to cart')
	}

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center py-12">
					<h1 className="text-2xl font-bold mb-4">No Products to Compare</h1>
					<p className="text-muted-foreground mb-6">
						Add products to compare from the products page
					</p>
					<Link href="/products">
						<Button>Browse Products</Button>
					</Link>
				</div>
			</div>
		)
	}

	const comparisonFeatures = [
		{ key: 'price', label: 'Price', format: (value: number) => formatCurrency(value) },
		{ key: 'category', label: 'Category', format: (value: string) => value || 'N/A' },
		{ key: 'brand', label: 'Brand', format: (value: string) => value || 'N/A' },
		{ key: 'inStock', label: 'Availability', format: (value: boolean) => value ? 'In Stock' : 'Out of Stock' },
		{ key: 'stockQuantity', label: 'Stock Quantity', format: (value: number) => value || 0 },
		{ key: 'weight', label: 'Weight', format: (value: number) => value ? `${value} kg` : 'N/A' },
		{ key: 'dimensions', label: 'Dimensions', format: (value: string) => value || 'N/A' },
		{ key: 'material', label: 'Material', format: (value: string) => value || 'N/A' },
	]

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/products">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Products
						</Button>
					</Link>
					<h1 className="text-2xl font-bold">Compare Products ({products.length})</h1>
				</div>
				<Button variant="outline" onClick={clearCompare}>
					Clear All
				</Button>
			</div>

			{/* Comparison Table */}
			<div className="overflow-x-auto">
				<div className="min-w-full">
					{/* Product Headers */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
						<div className="hidden md:block"></div> {/* Empty cell for feature labels */}
						{products.map((product) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="bg-card border rounded-lg p-4 relative"
							>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleRemoveProduct(product.id)}
									className="absolute top-2 right-2 h-6 w-6 p-0"
								>
									<X className="h-4 w-4" />
								</Button>
								
								<div className="space-y-4">
									<div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
										<Image
											src={product.images?.[0] ?? "/placeholder.svg"}
											alt={product.name}
											fill
											className="object-cover"
										/>
									</div>
									
									<div>
										<Link 
											href={`/products/${product.slug}`}
											className="font-semibold hover:underline line-clamp-2"
										>
											{product.name}
										</Link>
										<p className="text-lg font-bold text-primary mt-2">
											{formatCurrency(product.price)}
										</p>
									</div>

									<div className="flex gap-2">
										<Button
											size="sm"
											onClick={() => handleAddToCart(product)}
											className="flex-1"
										>
											<ShoppingCart className="w-4 h-4 mr-2" />
											Add to Cart
										</Button>
										<Button variant="outline" size="sm">
											<Heart className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Comparison Features */}
					<div className="space-y-2">
						{comparisonFeatures.map((feature) => (
							<div key={feature.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b">
								<div className="font-medium text-sm md:text-base">
									{feature.label}
								</div>
								{products.map((product) => (
									<div key={`${product.id}-${feature.key}`} className="text-sm md:text-base">
										{feature.format(product[feature.key as keyof ProductWithDetails] as never)}
									</div>
								))}
							</div>
						))}
					</div>

					{/* Product Descriptions */}
					<div className="mt-8">
						<h3 className="text-lg font-semibold mb-4">Descriptions</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="hidden md:block font-medium">Description</div>
							{products.map((product) => (
								<div key={`${product.id}-description`} className="text-sm text-muted-foreground">
									{product.shortDescription || product.detailedDescription || 'No description available'}
								</div>
							))}
						</div>
					</div>

					{/* Key Features */}
					<div className="mt-8">
						<h3 className="text-lg font-semibold mb-4">Key Features</h3>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="hidden md:block font-medium">Features</div>
							{products.map((product) => (
								<div key={`${product.id}-features`} className="text-sm">
									{product.keyFeatures ? (
										<ul className="list-disc list-inside space-y-1">
											{product.keyFeatures.split('\n').map((feature, index) => (
												<li key={index}>{feature.trim()}</li>
											))}
										</ul>
									) : (
										<span className="text-muted-foreground">No features listed</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}