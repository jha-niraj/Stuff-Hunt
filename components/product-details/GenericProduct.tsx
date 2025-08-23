"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
	Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import {
	Card, CardContent, CardDescription,
	CardHeader, CardTitle
} from "@/components/ui/card"
import {
	ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Info
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"
import { Label } from "../ui/label"

interface GenericProductProps {
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
		averageRating?: number
		reviewCount?: number
	}
}

export default function GenericProduct({ product }: GenericProductProps) {
	const [selectedImage, setSelectedImage] = useState(0)
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
	const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
	const { add } = useCart()

	const handleAddToCart = () => {
		const variant = [selectedColor, selectedSize].filter(Boolean).join('|')
		add(product as Parameters<typeof add>[0], 1, variant || undefined)
		toast.success('Added to cart')
	}

	const productSpecs = [
		...(product.brand ? [{ label: 'Brand', value: product.brand }] : []),
		...(product.category ? [{ label: 'Category', value: product.category }] : []),
		...(product.material ? [{ label: 'Material', value: product.material }] : []),
		...(product.weight ? [{ label: 'Weight', value: `${product.weight} kg` }] : []),
		...(product.dimensions ? [{ label: 'Dimensions', value: product.dimensions }] : [])
	]

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				<div className="space-y-4">
					<motion.div
						className="aspect-square bg-muted rounded-lg overflow-hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Image
							src={product.images[selectedImage] || "/placeholder.svg"}
							alt={product.name}
							width={600}
							height={600}
							className="w-full h-full object-cover"
						/>
					</motion.div>
					{
						product.images.length > 1 && (
							<div className="flex gap-2 overflow-x-auto">
								{
									product.images.map((image, index) => (
										<button
											key={index}
											onClick={() => setSelectedImage(index)}
											className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
												}`}
										>
											<Image
												src={image}
												alt={`${product.name} ${index + 1}`}
												width={80}
												height={80}
												className="w-full h-full object-cover"
											/>
										</button>
									))
								}
							</div>
						)
					}
				</div>
				<div className="space-y-6">
					<div>
						<div className="flex items-center gap-2 mb-2">
							{
								product.brand && (
									<Badge variant="secondary">{product.brand}</Badge>
								)
							}
							{
								product.category && (
									<Badge variant="outline">{product.category}</Badge>
								)
							}
						</div>
						<h1 className="text-3xl font-bold mb-2">{product.name}</h1>
						{
							product.averageRating && (
								<div className="flex items-center gap-2 mb-4">
									<div className="flex items-center">
										{
											[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${i < Math.floor(product.averageRating!)
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
														}`}
												/>
											))
										}
									</div>
									<span className="text-sm text-muted-foreground">
										{product.averageRating.toFixed(1)} ({product.reviewCount || 0} reviews)
									</span>
								</div>
							)
						}
					</div>
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<span className="text-3xl font-bold text-primary">
								{formatCurrency(product.price)}
							</span>
							{
								product.originalPrice && product.originalPrice > product.price && (
									<>
										<span className="text-xl text-muted-foreground line-through">
											{formatCurrency(product.originalPrice)}
										</span>
										<Badge variant="destructive">
											{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
										</Badge>
									</>
								)
							}
						</div>
						<p className="text-sm text-muted-foreground">
							{
								product.inStock
									? `${product.stockQuantity} units available`
									: 'Out of stock'
							}
						</p>
					</div>
					{
						product.sizes && product.sizes.length > 0 && (
							<div className="space-y-2">
								<label className="text-sm font-medium">Size/Variant</label>
								<div className="flex gap-2 flex-wrap">
									{
										product.sizes.map((size) => (
											<button
												key={size}
												onClick={() => setSelectedSize(size)}
												className={`px-3 py-1 rounded-md border text-sm transition-colors ${selectedSize === size
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-border hover:border-primary'
													}`}
											>
												{size}
											</button>
										))
									}
								</div>
							</div>
						)
					}
					{
						product.colors && product.colors.length > 0 && (
							<div className="space-y-2">
								<Label className="text-sm font-medium">Color</Label>
								<div className="flex gap-2 flex-wrap">
									{
										product.colors.map((color) => (
											<button
												key={color}
												onClick={() => setSelectedColor(color)}
												className={`px-3 py-1 rounded-md border text-sm transition-colors ${selectedColor === color
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-border hover:border-primary'
													}`}
											>
												{color}
											</button>
										))
									}
								</div>
							</div>
						)
					}
					{
						productSpecs.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="text-lg flex items-center gap-2">
										<Info className="w-4 h-4" />
										Product Information
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{
											productSpecs.map((spec, index) => (
												<div key={index} className="flex justify-between">
													<span className="text-muted-foreground">{spec.label}</span>
													<span className="font-medium">{spec.value}</span>
												</div>
											))
										}
									</div>
								</CardContent>
							</Card>
						)
					}
					<div className="flex gap-3">
						<Button
							onClick={handleAddToCart}
							disabled={!product.inStock}
							className="flex-1"
							size="lg"
						>
							<ShoppingCart className="w-4 h-4 mr-2" />
							{product.inStock ? 'Add to Cart' : 'Out of Stock'}
						</Button>
						<Button variant="outline" size="lg">
							<Heart className="w-4 h-4" />
						</Button>
					</div>
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
				</div>
			</div>
			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="specifications">Specifications</TabsTrigger>
					<TabsTrigger value="reviews">Reviews</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Product Overview</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{
								product.shortDescription && (
									<p className="text-muted-foreground">{product.shortDescription}</p>
								)
							}
							{
								product.detailedDescription && (
									<div className="prose prose-sm max-w-none">
										<p>{product.detailedDescription}</p>
									</div>
								)
							}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="specifications" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Product Specifications</CardTitle>
						</CardHeader>
						<CardContent>
							{
								productSpecs.length > 0 ? (
									<div className="space-y-3">
										{
											productSpecs.map((spec, index) => (
												<div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
													<span className="font-medium">{spec.label}</span>
													<span className="text-muted-foreground">{spec.value}</span>
												</div>
											))
										}
									</div>
								) : (
									<p className="text-muted-foreground">No detailed specifications available.</p>
								)
							}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="reviews" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Customer Reviews</CardTitle>
							<CardDescription>
								See what other customers are saying about this product
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">Reviews will be loaded here...</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}