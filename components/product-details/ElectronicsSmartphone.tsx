"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Card, CardContent, CardDescription,
	CardHeader, CardTitle
} from "@/components/ui/card"
import {
	Smartphone, Camera, Battery, HardDrive, Zap, ShoppingCart, Heart,
	Star, Shield, Truck, RotateCcw, Monitor
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"

interface SmartphoneSpecs {
	os?: string
	screenSize?: number
	camera?: {
		main?: string
		front?: string
		features?: string[]
	}
	battery?: string
	storage?: string[]
	connectivity?: string[]
	processor?: string
	ram?: string
	display?: {
		type?: string
		resolution?: string
	}
}

interface ElectronicsSmartphoneProps {
	product: {
		id: string
		name: string
		slug: string
		price: number
		originalPrice?: number
		images: string[]
		brand?: string
		shortDescription?: string
		detailedDescription?: string
		keyFeatures?: string
		inStock: boolean
		stockQuantity: number
		colors?: string[]
		sizes?: string[] // Storage variants
		aiMetadata?: SmartphoneSpecs
		averageRating?: number
		reviewCount?: number
	}
}

export default function ElectronicsSmartphone({ product }: ElectronicsSmartphoneProps) {
	const [selectedImage, setSelectedImage] = useState(0)
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
	const [selectedStorage, setSelectedStorage] = useState(product.sizes?.[0] || '')
	const { add } = useCart()

	const specs = product.aiMetadata as SmartphoneSpecs || {}

	const handleAddToCart = () => {
		const variant = [selectedColor, selectedStorage].filter(Boolean).join('|')
		add(product as Parameters<typeof add>[0], 1, variant || undefined)
		toast.success('Added to cart')
	}

	const keySpecs = [
		{ icon: Monitor, label: 'Display', value: specs.screenSize ? `${specs.screenSize}"` : 'Not specified' },
		{ icon: Camera, label: 'Main Camera', value: specs.camera?.main || 'Not specified' },
		{ icon: Battery, label: 'Battery', value: specs.battery || 'Not specified' },
		{ icon: HardDrive, label: 'Storage', value: selectedStorage || specs.storage?.[0] || 'Not specified' },
		{ icon: Zap, label: 'Processor', value: specs.processor || 'Not specified' },
		{ icon: Smartphone, label: 'OS', value: specs.os || 'Not specified' }
	]

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				<div className="space-y-4">
					<motion.div
						className="aspect-[3/4] bg-muted rounded-lg overflow-hidden max-w-md mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Image
							src={product.images[selectedImage] || "/placeholder.svg"}
							alt={product.name}
							width={400}
							height={533}
							className="w-full h-full object-cover"
						/>
					</motion.div>
					{
						product.images.length > 1 && (
							<div className="flex gap-2 overflow-x-auto justify-center">
								{
									product.images.map((image, index) => (
										<button
											key={index}
											onClick={() => setSelectedImage(index)}
											className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
												}`}
										>
											<Image
												src={image}
												alt={`${product.name} ${index + 1}`}
												width={64}
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
							<Badge variant="outline">Smartphone</Badge>
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
								<label className="text-sm font-medium">Storage</label>
								<div className="flex gap-2 flex-wrap">
									{
										product.sizes.map((storage) => (
											<button
												key={storage}
												onClick={() => setSelectedStorage(storage)}
												className={`px-4 py-2 rounded-md border text-sm transition-colors ${selectedStorage === storage
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-border hover:border-primary'
													}`}
											>
												{storage}
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
								<label className="text-sm font-medium">Color</label>
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
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Key Specifications</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{
									keySpecs.map((spec, index) => (
										<div key={index} className="flex items-center gap-3">
											<spec.icon className="w-4 h-4 text-muted-foreground" />
											<div>
												<p className="text-sm font-medium">{spec.label}</p>
												<p className="text-sm text-muted-foreground">{spec.value}</p>
											</div>
										</div>
									))
								}
							</div>
						</CardContent>
					</Card>
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
							<span>1 Year Warranty</span>
						</div>
						<div className="flex items-center gap-1">
							<Truck className="w-4 h-4" />
							<span>Free Shipping</span>
						</div>
						<div className="flex items-center gap-1">
							<RotateCcw className="w-4 h-4" />
							<span>30-Day Returns</span>
						</div>
					</div>
				</div>
			</div>
			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="specifications">Specifications</TabsTrigger>
					<TabsTrigger value="camera">Camera</TabsTrigger>
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
							<CardTitle>Technical Specifications</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<h4 className="font-semibold">Performance</h4>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Operating System</span>
											<span>{specs.os || 'Not specified'}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Processor</span>
											<span>{specs.processor || 'Not specified'}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">RAM</span>
											<span>{specs.ram || 'Not specified'}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Battery</span>
											<span>{specs.battery || 'Not specified'}</span>
										</div>
									</div>
								</div>
								<div className="space-y-4">
									<h4 className="font-semibold">Display</h4>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="text-muted-foreground">Screen Size</span>
											<span>{specs.screenSize ? `${specs.screenSize}"` : 'Not specified'}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Display Type</span>
											<span>{specs.display?.type || 'Not specified'}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">Resolution</span>
											<span>{specs.display?.resolution || 'Not specified'}</span>
										</div>
									</div>
								</div>
							</div>
							{
								specs.storage && (
									<div className="mt-6 space-y-2">
										<h4 className="font-semibold">Storage Options</h4>
										<div className="flex flex-wrap gap-2">
											{
												specs.storage.map((storage, index) => (
													<Badge key={index} variant="outline">
														{storage}
													</Badge>
												))
											}
										</div>
									</div>
								)
							}
							{
								specs.connectivity && (
									<div className="mt-6 space-y-2">
										<h4 className="font-semibold">Connectivity</h4>
										<div className="flex flex-wrap gap-2">
											{
												specs.connectivity.map((conn, index) => (
													<Badge key={index} variant="outline">
														{conn}
													</Badge>
												))
											}
										</div>
									</div>
								)
							}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="camera" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Camera Specifications</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{
								specs.camera ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<h4 className="font-semibold">Main Camera</h4>
											<p className="text-lg">{specs.camera.main || 'Not specified'}</p>
										</div>
										<div className="space-y-2">
											<h4 className="font-semibold">Front Camera</h4>
											<p className="text-lg">{specs.camera.front || 'Not specified'}</p>
										</div>
										{
											specs.camera.features && (
												<div className="md:col-span-2 space-y-2">
													<h4 className="font-semibold">Camera Features</h4>
													<div className="flex flex-wrap gap-2">
														{
															specs.camera.features.map((feature, index) => (
																<Badge key={index} variant="outline">
																	{feature}
																</Badge>
															))
														}
													</div>
												</div>
											)
										}
									</div>
								) : (
									<p className="text-muted-foreground">Camera specifications not available.</p>
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
								See what other customers are saying about this smartphone
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