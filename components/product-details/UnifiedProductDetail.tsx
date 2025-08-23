"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ShoppingCart, Heart, Star, Shield,
	Truck, RotateCcw, Share2
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"
import { ProductType } from "@prisma/client"

// Import category-specific subcomponents
import { DynamicSpecifications } from "./subcomponents/DynamicSpecifications"
import { CategorySpecificDetails } from "./subcomponents/CategorySpecificDetails"
import { ProductReviews } from "./subcomponents/ProductReviews"

interface UnifiedProductDetailProps {
	product: {
		id: string
		name: string
		slug: string
		price: number
		originalPrice?: number
		images: string[]
		brand?: string
		category?: string
		subcategory?: string
		productType: ProductType
		shortDescription?: string
		detailedDescription?: string
		keyFeatures?: string
		inStock: boolean
		stockQuantity: number
		colors?: string[]
		sizes?: string[]
		weight?: number
		dimensions?: string
		material?: string
		aiMetadata?: Record<string, unknown> // Dynamic schema based on product type
		averageRating?: number
		reviewCount?: number
		seller?: {
			id: string
			name: string
			verificationBadge: boolean
		}
	}
}

export default function UnifiedProductDetail({ product }: UnifiedProductDetailProps) {
	const [selectedImage, setSelectedImage] = useState(0)
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
	const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
	const { add } = useCart()

	const handleAddToCart = () => {
		const variant = [selectedColor, selectedSize].filter(Boolean).join('|')
		add(product as Parameters<typeof add>[0], 1, variant || undefined)
		toast.success('Added to cart')
	}

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: product.name,
					text: product.shortDescription || `Check out ${product.name}`,
					url: window.location.href,
				})
			} catch (error) {
				console.log('Error sharing:', error)
			}
		} else {
			navigator.clipboard.writeText(window.location.href)
			toast.success('Link copied to clipboard!')
		}
	}

	// Determine category type for conditional rendering
	const categoryType = product.productType.toString().split('_')[0].toLowerCase()
	const isClothing = categoryType === 'clothing'
	const requiresSize = isClothing || (product.sizes && product.sizes.length > 0)

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{/* Main Product Section - Common for all products */}
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				{/* Product Images Gallery - Common Component */}
				<div className="space-y-4">
					<motion.div
						className={`bg-muted rounded-lg overflow-hidden ${isClothing ? 'aspect-[3/4]' : 'aspect-square'
							}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Image
							src={product.images[selectedImage] || "/placeholder.svg"}
							alt={product.name}
							width={600}
							height={isClothing ? 800 : 600}
							className="w-full h-full object-cover"
						/>
					</motion.div>

					{product.images.length > 1 && (
						<div className="flex gap-2 overflow-x-auto">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`flex-shrink-0 w-20 ${isClothing ? 'h-24' : 'h-20'
										} rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
										}`}
								>
									<Image
										src={image}
										alt={`${product.name} ${index + 1}`}
										width={80}
										height={isClothing ? 96 : 80}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Product Info - Common Structure */}
				<div className="space-y-6">
					{/* Header Section - Common */}
					<div>
						<div className="flex items-center gap-2 mb-2">
							{product.brand && (
								<Badge variant="secondary">{product.brand}</Badge>
							)}
							{product.category && (
								<Badge variant="outline">{product.category}</Badge>
							)}
							{product.seller?.verificationBadge && (
								<Badge variant="default" className="bg-green-100 text-green-800">
									<Shield className="w-3 h-3 mr-1" />
									Verified
								</Badge>
							)}
						</div>
						<h1 className="text-3xl font-bold mb-2">{product.name}</h1>

						{/* Rating - Common */}
						{product.averageRating && (
							<div className="flex items-center gap-2 mb-4">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-4 h-4 ${i < Math.floor(product.averageRating!)
													? 'fill-yellow-400 text-yellow-400'
													: 'text-gray-300'
												}`}
										/>
									))}
								</div>
								<span className="text-sm text-muted-foreground">
									{product.averageRating.toFixed(1)} ({product.reviewCount || 0} reviews)
								</span>
							</div>
						)}
					</div>

					{/* Price Section - Common */}
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<span className="text-3xl font-bold text-primary">
								{formatCurrency(product.price)}
							</span>
							{product.originalPrice && product.originalPrice > product.price && (
								<>
									<span className="text-xl text-muted-foreground line-through">
										{formatCurrency(product.originalPrice)}
									</span>
									<Badge variant="destructive">
										{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
									</Badge>
								</>
							)}
						</div>
						<p className="text-sm text-muted-foreground">
							{product.inStock
								? `${product.stockQuantity} units available`
								: 'Out of stock'
							}
						</p>
					</div>

					{/* Variant Selection - Common with dynamic labels */}
					{(product.sizes && product.sizes.length > 0) && (
						<div className="space-y-2">
							<label className="text-sm font-medium">
								{isClothing ? 'Size' :
									categoryType === 'electronics' ? 'Storage/Variant' :
										'Options'}
							</label>
							<div className={`flex gap-2 flex-wrap ${isClothing ? 'grid grid-cols-4' : ''}`}>
								{product.sizes.map((size) => (
									<button
										key={size}
										onClick={() => setSelectedSize(size)}
										className={`${isClothing ? 'aspect-square' : 'px-3 py-1'
											} rounded-md border text-sm font-medium transition-colors ${selectedSize === size
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-border hover:border-primary'
											}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Color Selection - Common with enhanced clothing display */}
					{(product.colors && product.colors.length > 0) && (
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Color{selectedColor && `: ${selectedColor}`}
							</label>
							<div className="flex gap-2 flex-wrap">
								{product.colors.map((color) => (
									<button
										key={color}
										onClick={() => setSelectedColor(color)}
										className={`${isClothing
												? 'w-12 h-12 rounded-full border-2'
												: 'px-3 py-1 rounded-md border text-sm'
											} transition-all ${selectedColor === color
												? isClothing
													? 'border-primary scale-110'
													: 'border-primary bg-primary text-primary-foreground'
												: 'border-border hover:border-primary'
											}`}
										style={isClothing ? {
											backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
												color.toLowerCase() === 'black' ? '#000000' :
													color.toLowerCase() === 'red' ? '#ef4444' :
														color.toLowerCase() === 'blue' ? '#3b82f6' :
															color.toLowerCase() === 'green' ? '#22c55e' :
																color.toLowerCase() === 'yellow' ? '#eab308' :
																	color.toLowerCase() === 'pink' ? '#ec4899' :
																		color.toLowerCase() === 'purple' ? '#a855f7' :
																			color.toLowerCase() === 'gray' ? '#6b7280' :
																				'#94a3b8'
										} : undefined}
										title={color}
									>
										{!isClothing && color}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Dynamic Key Specifications - Category Specific */}
					<DynamicSpecifications
						product={product}
						productType={product.productType}
					/>

					{/* Action Buttons - Common */}
					<div className="flex gap-3">
						<Button
							onClick={handleAddToCart}
							disabled={!product.inStock || (requiresSize && !selectedSize)}
							className="flex-1"
							size="lg"
						>
							<ShoppingCart className="w-4 h-4 mr-2" />
							{!product.inStock ? 'Out of Stock' :
								(requiresSize && !selectedSize) ? 'Select Size' : 'Add to Cart'}
						</Button>
						<Button variant="outline" size="lg">
							<Heart className="w-4 h-4" />
						</Button>
						<Button variant="outline" size="lg" onClick={handleShare}>
							<Share2 className="w-4 h-4" />
						</Button>
					</div>

					{/* Trust Badges - Common */}
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Shield className="w-4 h-4" />
							<span>Quality Guarantee</span>
						</div>
						<div className="flex items-center gap-1">
							<Truck className="w-4 h-4" />
							<span>Free Shipping</span>
						</div>
						<div className="flex items-center gap-1">
							<RotateCcw className="w-4 h-4" />
							<span>Easy Returns</span>
						</div>
					</div>

					{/* Seller Information - Common */}
					{product.seller && (
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="font-medium">Sold by {product.seller.name}</p>
										{product.seller.verificationBadge && (
											<p className="text-sm text-green-600 flex items-center gap-1">
												<Shield className="w-3 h-3" />
												Verified Seller
											</p>
										)}
									</div>
									<Button variant="outline" size="sm">
										View Store
									</Button>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>

			{/* Detailed Information Tabs - Common Structure with Dynamic Content */}
			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="specifications">Specifications</TabsTrigger>
					<TabsTrigger value="details">
						{isClothing ? 'Size & Care' :
							categoryType === 'electronics' ? 'Tech Details' :
								'Details'}
					</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Product Overview</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{product.shortDescription && (
								<p className="text-muted-foreground">{product.shortDescription}</p>
							)}
							{product.detailedDescription && (
								<div className="prose prose-sm max-w-none">
									<p>{product.detailedDescription}</p>
								</div>
							)}

							{/* Key Features - Common */}
							{product.keyFeatures && (
								<div className="mt-6">
									<h4 className="font-semibold mb-3">Key Features</h4>
									<div className="space-y-2">
										{product.keyFeatures.split('\n').map((feature, index) => (
											<div key={index} className="flex items-start gap-2">
												<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
												<span className="text-sm">{feature.trim()}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="specifications" className="mt-6">
					<DynamicSpecifications
						product={product}
						productType={product.productType}
						detailed={true}
					/>
				</TabsContent>

				<TabsContent value="details" className="mt-6">
					<CategorySpecificDetails
						product={product}
						productType={product.productType}
						selectedSize={selectedSize}
					/>
				</TabsContent>

				<TabsContent value="reviews" className="mt-6">
					<ProductReviews
						productId={product.id}
						averageRating={product.averageRating}
						reviewCount={product.reviewCount}
					/>
				</TabsContent>
			</Tabs>
		</div>
	)
}