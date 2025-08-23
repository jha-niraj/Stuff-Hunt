"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Shirt, Thermometer, Droplets, ShoppingCart, Heart, Star, Shield,
	Truck, RotateCcw, Palette, Tag
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"

interface ApparelSpecs {
	material?: string
	fit?: string
	care?: string[]
	season?: string
	style?: string
	neckline?: string
	sleeves?: string
	pattern?: string
	occasion?: string
}

interface ClothingApparelProps {
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
		sizes?: string[]
		aiMetadata?: ApparelSpecs
		averageRating?: number
		reviewCount?: number
	}
}

export default function ClothingApparel({ product }: ClothingApparelProps) {
	const [selectedImage, setSelectedImage] = useState(0)
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
	const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
	const { add } = useCart()

	const specs = product.aiMetadata as ApparelSpecs || {}

	const handleAddToCart = () => {
		const variant = [selectedColor, selectedSize].filter(Boolean).join('|')
		add(product as Parameters<typeof add>[0], 1, variant || undefined)
		toast.success('Added to cart')
	}

	const sizeGuide = {
		'XS': { chest: '32-34', waist: '26-28', length: '26' },
		'S': { chest: '34-36', waist: '28-30', length: '27' },
		'M': { chest: '36-38', waist: '30-32', length: '28' },
		'L': { chest: '38-40', waist: '32-34', length: '29' },
		'XL': { chest: '40-42', waist: '34-36', length: '30' },
		'XXL': { chest: '42-44', waist: '36-38', length: '31' }
	}

	const productDetails = [
		{ icon: Shirt, label: 'Material', value: specs.material || 'Not specified' },
		{ icon: Tag, label: 'Fit', value: specs.fit || 'Regular' },
		{ icon: Thermometer, label: 'Season', value: specs.season || 'All Season' },
		{ icon: Palette, label: 'Style', value: specs.style || 'Casual' }
	]

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				<div className="space-y-4">
					<motion.div
						className="aspect-[3/4] bg-muted rounded-lg overflow-hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<Image
							src={product.images[selectedImage] || "/placeholder.svg"}
							alt={product.name}
							width={600}
							height={800}
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
											className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
												}`}
										>
											<Image
												src={image}
												alt={`${product.name} ${index + 1}`}
												width={80}
												height={96}
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
							<Badge variant="outline">Apparel</Badge>
							{
								specs.style && (
									<Badge variant="outline">{specs.style}</Badge>
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
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium">Size</label>
									<button className="text-sm text-primary hover:underline">
										Size Guide
									</button>
								</div>
								<div className="grid grid-cols-4 gap-2">
									{
										product.sizes.map((size) => (
											<button
												key={size}
												onClick={() => setSelectedSize(size)}
												className={`aspect-square rounded-md border text-sm font-medium transition-colors ${selectedSize === size
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
							<div className="space-y-3">
								<label className="text-sm font-medium">Color: {selectedColor}</label>
								<div className="flex gap-2 flex-wrap">
									{
										product.colors.map((color) => (
											<button
												key={color}
												onClick={() => setSelectedColor(color)}
												className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color
													? 'border-primary scale-110'
													: 'border-border hover:border-primary'
													}`}
												style={{
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
												}}
												title={color}
											/>
										))
									}
								</div>
							</div>
						)
					}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Product Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								{
									productDetails.map((detail, index) => (
										<div key={index} className="flex items-center gap-3">
											<detail.icon className="w-4 h-4 text-muted-foreground" />
											<div>
												<p className="text-sm font-medium">{detail.label}</p>
												<p className="text-sm text-muted-foreground">{detail.value}</p>
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
							disabled={!product.inStock || !selectedSize}
							className="flex-1"
							size="lg"
						>
							<ShoppingCart className="w-4 h-4 mr-2" />
							{!selectedSize ? 'Select Size' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="sizing">Size & Fit</TabsTrigger>
					<TabsTrigger value="care">Care Instructions</TabsTrigger>
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
								<div className="space-y-2">
									<h4 className="font-semibold">Material & Fabric</h4>
									<p className="text-sm text-muted-foreground">
										{specs.material || 'Material information not available'}
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-semibold">Style & Occasion</h4>
									<p className="text-sm text-muted-foreground">
										{specs.occasion || 'Suitable for casual and everyday wear'}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="sizing" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Size Guide & Fit Information</CardTitle>
							<CardDescription>
								Find your perfect fit with our detailed size guide
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<h4 className="font-semibold mb-3">Fit: {specs.fit || 'Regular'}</h4>
									<p className="text-sm text-muted-foreground mb-4">
										This item has a {specs.fit?.toLowerCase() || 'regular'} fit.
										{specs.fit === 'Slim' && ' It is designed to be close-fitting for a tailored look.'}
										{specs.fit === 'Relaxed' && ' It offers a comfortable, loose fit with room to move.'}
										{specs.fit === 'Regular' && ' It provides a comfortable fit that is not too tight or too loose.'}
									</p>
								</div>
								<div className="overflow-x-auto">
									<table className="w-full border-collapse border border-border">
										<thead>
											<tr className="bg-muted">
												<th className="border border-border p-2 text-left">Size</th>
												<th className="border border-border p-2 text-left">Chest (inches)</th>
												<th className="border border-border p-2 text-left">Waist (inches)</th>
												<th className="border border-border p-2 text-left">Length (inches)</th>
											</tr>
										</thead>
										<tbody>
											{
												Object.entries(sizeGuide).map(([size, measurements]) => (
													<tr key={size} className={selectedSize === size ? 'bg-primary/10' : ''}>
														<td className="border border-border p-2 font-medium">{size}</td>
														<td className="border border-border p-2">{measurements.chest}</td>
														<td className="border border-border p-2">{measurements.waist}</td>
														<td className="border border-border p-2">{measurements.length}</td>
													</tr>
												))
											}
										</tbody>
									</table>
								</div>
								<div className="bg-muted/50 p-4 rounded-lg">
									<h5 className="font-medium mb-2">How to Measure</h5>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
										<li>• <strong>Waist:</strong> Measure around your natural waistline</li>
										<li>• <strong>Length:</strong> Measure from shoulder to hem</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="care" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Care Instructions</CardTitle>
							<CardDescription>
								Keep your garment looking its best with proper care
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{
									specs.care && specs.care.length > 0 ? (
										<div className="space-y-2">
											<h4 className="font-semibold">Care Instructions</h4>
											<ul className="space-y-1">
												{
													specs.care.map((instruction, index) => (
														<li key={index} className="flex items-start gap-2 text-sm">
															<Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
															<span>{instruction}</span>
														</li>
													))
												}
											</ul>
										</div>
									) : (
										<div className="space-y-2">
											<h4 className="font-semibold">General Care Instructions</h4>
											<ul className="space-y-1 text-sm text-muted-foreground">
												<li>• Machine wash cold with like colors</li>
												<li>• Do not bleach</li>
												<li>• Tumble dry low heat</li>
												<li>• Iron on low heat if needed</li>
												<li>• Do not dry clean</li>
											</ul>
										</div>
									)
								}
								<div className="bg-muted/50 p-4 rounded-lg">
									<h5 className="font-medium mb-2">Material: {specs.material || 'Cotton Blend'}</h5>
									<p className="text-sm text-muted-foreground">
										{specs.material === 'Cotton' && 'Natural, breathable, and comfortable. May shrink slightly after first wash.'}
										{specs.material === 'Polyester' && 'Durable, wrinkle-resistant, and quick-drying. Easy to care for.'}
										{specs.material === 'Cotton Blend' && 'Combines the comfort of cotton with added durability and easy care.'}
										{!specs.material && 'Please check the garment label for specific material composition and care instructions.'}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="reviews" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Customer Reviews</CardTitle>
							<CardDescription>
								See what other customers are saying about this item
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