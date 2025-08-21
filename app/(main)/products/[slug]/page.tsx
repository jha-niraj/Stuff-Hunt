"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, ShieldCheck, Truck, Star, ShoppingCart, Plus, Minus, X } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/actions/product.action"
import { formatCurrency } from "@/lib/format"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductGallery } from "@/components/product/product-gallery"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const [product, setProduct] = useState<any>(null)
	const [relatedProducts, setRelatedProducts] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [quantity, setQuantity] = useState(1)
	const [selectedColor, setSelectedColor] = useState<string>('')
	const [selectedSize, setSelectedSize] = useState<string>('')
	const [showCartModal, setShowCartModal] = useState(false)
	const { add, items, total } = useCart()

	useEffect(() => {
		const loadProduct = async () => {
			const resolvedParams = await params
			const { slug } = resolvedParams

			try {
				const result = await getProductBySlug(slug)
				if (!result.success || !result.product) {
					notFound()
					return
				}

				setProduct(result.product)

				// Load related products
				const categoryIds = result.product.categories.map((cat: any) => cat.id)
				const related = await getRelatedProducts(result.product.id, categoryIds, 4)
				setRelatedProducts(related)
			} catch (error) {
				console.error('Error loading product:', error)
				notFound()
			} finally {
				setLoading(false)
			}
		}

		loadProduct()
	}, [params])

	const handleAddToCart = async () => {
		if (!product) return

		try {
			await add(product, quantity, selectedColor || selectedSize ? `${selectedColor}|${selectedSize}` : undefined)
			toast.success(`${product.name} added to cart!`)
			setShowCartModal(true)
		} catch (error) {
			toast.error('Failed to add to cart')
		}
	}

	const parseOptions = (options: string) => {
		if (!options) return []
		return options.split(',').map(opt => opt.trim()).filter(Boolean)
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		)
	}

	if (!product) {
		return notFound()
	}

	return (
		<>
			<div className="min-h-dvh flex flex-col">
				<main className="flex-1">
					<section className="container mx-auto px-4 py-8 md:py-12">
						<div className="grid lg:grid-cols-2 gap-8">
							<ProductGallery images={product.images} alt={product.name} />
							<div className="lg:pl-4">
								{/* Product Status */}
								<div className="flex items-center gap-3">
									{product.inStock ? (
										<Badge className="bg-green-600 text-white hover:bg-green-600/90">
											In stock ({product.stockQuantity} available)
										</Badge>
									) : (
										<Badge variant="destructive">Out of stock</Badge>
									)}
									{product.productType && (
										<Badge variant="outline">{product.productType}</Badge>
									)}
								</div>

								{/* Product Info */}
								<h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">{product.name}</h1>
								{product.brand && (
									<p className="text-lg text-muted-foreground mt-1">by {product.brand}</p>
								)}
								<p className="text-muted-foreground mt-2">{product.shortDescription}</p>

								{/* Category & Reviews */}
								<div className="flex items-center gap-4 mt-4">
									{product.category && (
										<Badge variant="secondary">{product.category}</Badge>
									)}
									<div className="flex items-center gap-2">
										<div className="flex items-center">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${i < Math.floor(product.averageRating || 0)
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
														}`}
												/>
											))}
										</div>
										<span className="text-sm text-muted-foreground">
											({product._count?.reviews || 0} reviews)
										</span>
									</div>
								</div>

								{/* Pricing */}
								<div className="flex items-center justify-between mt-6">
									<div className="flex items-center gap-3">
										<div className="text-3xl font-semibold">
											{formatCurrency(product.finalPrice || product.price)}
										</div>
										{product.originalPrice && product.originalPrice > (product.finalPrice || product.price) && (
											<div className="text-lg text-muted-foreground line-through">
												{formatCurrency(product.originalPrice)}
											</div>
										)}
										{product.discountPercentage && product.discountPercentage > 0 && (
											<Badge className="bg-red-500 text-white">
												{product.discountPercentage}% OFF
											</Badge>
										)}
									</div>
									<Button
										variant="ghost"
										className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
										aria-label="Save to wishlist"
									>
										<Heart className="w-5 h-5" />
										<span className="text-sm">Save</span>
									</Button>
								</div>

								{/* Options */}
								<div className="mt-6 space-y-4">
									{/* Color Options */}
									{product.extraOptions && parseOptions(product.extraOptions).length > 0 && (
										<div className="space-y-2">
											<Label>Options</Label>
											<div className="flex flex-wrap gap-2">
												{parseOptions(product.extraOptions).map((option: string) => (
													<Button
														key={option}
														variant={selectedColor === option ? "default" : "outline"}
														onClick={() => setSelectedColor(option)}
														className="h-9 px-3 rounded-md text-sm"
													>
														{option}
													</Button>
												))}
											</div>
										</div>
									)}

									{/* Size Options */}
									{product.sizeOptions && parseOptions(product.sizeOptions).length > 0 && (
										<div className="space-y-2">
											<Label>Size</Label>
											<div className="flex flex-wrap gap-2">
												{parseOptions(product.sizeOptions).map((size: string) => (
													<Button
														key={size}
														variant={selectedSize === size ? "default" : "outline"}
														onClick={() => setSelectedSize(size)}
														className="h-9 px-3 rounded-md text-sm"
													>
														{size}
													</Button>
												))}
											</div>
										</div>
									)}

									{/* Quantity & Add to Cart */}
									<div className="flex items-center gap-3">
										<div className="flex items-center border rounded-md">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setQuantity(Math.max(1, quantity - 1))}
												disabled={quantity <= 1}
											>
												<Minus className="w-4 h-4" />
											</Button>
											<span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
												disabled={quantity >= product.stockQuantity}
											>
												<Plus className="w-4 h-4" />
											</Button>
										</div>
										<Button
											onClick={handleAddToCart}
											disabled={!product.inStock}
											className="flex-1 bg-primary hover:bg-primary/90"
										>
											<ShoppingCart className="w-4 h-4 mr-2" />
											Add to Cart
										</Button>
									</div>
								</div>

								{/* Additional Info */}
								<div className="mt-8 grid gap-4 text-sm">
									<div className="flex items-center gap-3 text-muted-foreground">
										<Truck className="w-4 h-4" />
										Free shipping over {formatCurrency(75)}
									</div>
									<div className="flex items-center gap-3 text-muted-foreground">
										<ShieldCheck className="w-4 h-4" />
										Secure checkout
									</div>
									<div className="text-sm text-muted-foreground">
										Sold by {product.seller.name}
										{product.seller.verificationBadge && (
											<Badge variant="secondary" className="ml-2 text-xs">
												Verified
											</Badge>
										)}
									</div>
								</div>

								{/* Product Details Tabs */}
								<Tabs defaultValue="details" className="mt-10">
									<TabsList>
										<TabsTrigger value="details">Details</TabsTrigger>
										<TabsTrigger value="features">Features</TabsTrigger>
										<TabsTrigger value="shipping">Shipping</TabsTrigger>
										{product.returnPolicy && <TabsTrigger value="returns">Returns</TabsTrigger>}
									</TabsList>
									<TabsContent value="details" className="text-sm text-muted-foreground">
										<div className="prose prose-sm max-w-none">
											<p>{product.detailedDescription || product.shortDescription}</p>
										</div>
									</TabsContent>
									<TabsContent value="features" className="text-sm text-muted-foreground">
										{product.keyFeatures ? (
											<div className="space-y-2">
												{product.keyFeatures.split('\n').map((feature: string, index: number) => (
													<div key={index} className="flex items-start gap-2">
														<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
														<span>{feature.trim()}</span>
													</div>
												))}
											</div>
										) : (
											<p>No specific features listed for this product.</p>
										)}
									</TabsContent>
									<TabsContent value="shipping" className="text-sm text-muted-foreground">
										<p>Standard shipping 3-5 business days. Expedited options available at checkout.</p>
									</TabsContent>
									{product.returnPolicy && (
										<TabsContent value="returns" className="text-sm text-muted-foreground">
											<p>{product.returnPolicy}</p>
										</TabsContent>
									)}
								</Tabs>
							</div>
						</div>
					</section>

					{/* Related Products */}
					{relatedProducts.length > 0 && (
						<section className="container mx-auto px-4 pb-12">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl md:text-2xl font-semibold tracking-tight">You might also like</h2>
								<Button variant="ghost" asChild>
									<Link href="/products">View all</Link>
								</Button>
							</div>
							<ProductGrid products={relatedProducts} />
						</section>
					)}
				</main>
			</div>

			{/* Cart Modal */}
			<Dialog open={showCartModal} onOpenChange={setShowCartModal}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<ShoppingCart className="w-5 h-5" />
							Added to Cart
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
							<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
								<ShoppingCart className="w-6 h-6 text-green-600" />
							</div>
							<div>
								<p className="font-medium text-green-800 dark:text-green-200">
									{product.name} added to cart!
								</p>
								<p className="text-sm text-green-600 dark:text-green-400">
									Quantity: {quantity}
								</p>
							</div>
						</div>

						{/* Cart Summary */}
						<div className="border rounded-lg p-4 space-y-3">
							<div className="flex items-center justify-between text-sm">
								<span>Items in cart:</span>
								<span className="font-medium">{items.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium">Total:</span>
								<span className="font-bold text-lg">{formatCurrency(total)}</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3">
							<Button
								variant="outline"
								onClick={() => setShowCartModal(false)}
								className="flex-1"
							>
								Continue Shopping
							</Button>
							<Button asChild className="flex-1">
								<Link href="/cart">
									View Cart
								</Link>
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}