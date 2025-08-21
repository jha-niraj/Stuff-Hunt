"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	ArrowLeft, Save, Loader2, Upload, X, Plus, Trash2, Eye, EyeOff,
	Package, DollarSign, Tag, Image as ImageIcon, FileText, Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProductBySlug, updateProduct } from '@/actions/merchant-product.action'
import { toast } from 'sonner'
import Image from 'next/image'

interface ProductData {
	id: string
	name: string
	slug: string
	price: number
	originalPrice?: number
	finalPrice?: number
	shortDescription?: string
	detailedDescription?: string
	keyFeatures?: string
	productType?: string
	images: string[]
	stockQuantity: number
	category?: string
	subcategory?: string
	brand?: string
	extraOptions?: string
	sizeOptions?: string
	returnPolicy?: string
	discountPercentage?: number
	isActive: boolean
	inStock: boolean
	createdAt: Date
	updatedAt: Date
}

export default function MerchantProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
	const router = useRouter()
	const [productId, setProductId] = useState<string>('')
	const [product, setProduct] = useState<ProductData | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [hasChanges, setHasChanges] = useState(false)

	// Form state
	const [formData, setFormData] = useState<Partial<ProductData>>({})
	const [newImages, setNewImages] = useState<string[]>([])

	// Load product data
	useEffect(() => {
		const loadProduct = async () => {
			const resolvedParams = await params
			setProductId(resolvedParams.productId)
			
			try {
				const result = await getProductBySlug(resolvedParams.productId)
				if (result.success && result.product) {
					setProduct(result.product as ProductData)
					setFormData(result.product as ProductData)
				} else {
					toast.error('Product not found')
					router.push('/merchant/products')
				}
			} catch (error) {
				console.error('Error loading product:', error)
				toast.error('Failed to load product')
				router.push('/merchant/products')
			} finally {
				setLoading(false)
			}
		}

		loadProduct()
	}, [params, router])

	// Handle form changes
	const handleInputChange = (field: keyof ProductData, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		setHasChanges(true)
	}

	// Handle image upload
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files) return

		Array.from(files).forEach(file => {
			const reader = new FileReader()
			reader.onload = (e) => {
				const imageUrl = e.target?.result as string
				setNewImages(prev => [...prev, imageUrl])
				setFormData(prev => ({
					...prev,
					images: [...(prev.images || []), imageUrl]
				}))
				setHasChanges(true)
			}
			reader.readAsDataURL(file)
		})
	}

	// Remove image
	const removeImage = (index: number) => {
		setFormData(prev => ({
			...prev,
			images: prev.images?.filter((_, i) => i !== index) || []
		}))
		setHasChanges(true)
	}

	// Calculate final price
	const calculateFinalPrice = () => {
		if (formData.discountPercentage && formData.price) {
			return formData.price * (1 - formData.discountPercentage / 100)
		}
		return formData.price || 0
	}

	// Save changes
	const handleSave = async () => {
		if (!hasChanges || !product) {
			toast.info('No changes to save')
			return
		}

		setSaving(true)
		try {
			const finalPrice = calculateFinalPrice()
			const updateData = {
				...formData,
				finalPrice,
				inStock: (formData.stockQuantity || 0) > 0
			}

			const result = await updateProduct(product.id, updateData)
			if (result.success) {
				toast.success('Product updated successfully!')
				setHasChanges(false)
				setProduct(prev => ({ ...prev!, ...updateData }))
			} else {
				toast.error(result.error || 'Failed to update product')
			}
		} catch (error) {
			console.error('Error updating product:', error)
			toast.error('Failed to update product')
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
				<div className="flex items-center gap-3 text-white">
					<Loader2 className="w-6 h-6 animate-spin" />
					<span>Loading product...</span>
				</div>
			</div>
		)
	}

	if (!product) {
		return null
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
			{/* Header */}
			<div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => router.push('/merchant/products')}
								className="text-white hover:bg-white/10"
							>
								<ArrowLeft className="w-5 h-5" />
							</Button>
							<div>
								<h1 className="text-2xl font-bold text-white">Edit Product</h1>
								<p className="text-gray-400">{product.name}</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							{hasChanges && (
								<Badge variant="outline" className="border-yellow-500 text-yellow-400">
									Unsaved Changes
								</Badge>
							)}
							<Button
								onClick={handleSave}
								disabled={!hasChanges || saving}
								className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
							>
								{saving ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Saving...
									</>
								) : (
									<>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<Tabs defaultValue="basic" className="space-y-6">
					<TabsList className="bg-white/5 border-white/10">
						<TabsTrigger value="basic" className="data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white">
							<Package className="w-4 h-4 mr-2" />
							Basic Info
						</TabsTrigger>
						<TabsTrigger value="pricing" className="data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white">
							<DollarSign className="w-4 h-4 mr-2" />
							Pricing
						</TabsTrigger>
						<TabsTrigger value="media" className="data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white">
							<ImageIcon className="w-4 h-4 mr-2" />
							Media
						</TabsTrigger>
						<TabsTrigger value="details" className="data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white">
							<FileText className="w-4 h-4 mr-2" />
							Details
						</TabsTrigger>
						<TabsTrigger value="settings" className="data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white">
							<Settings className="w-4 h-4 mr-2" />
							Settings
						</TabsTrigger>
					</TabsList>

					{/* Basic Information */}
					<TabsContent value="basic" className="space-y-6">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-white">Basic Information</CardTitle>
								<CardDescription className="text-gray-400">
									Essential product details and categorization
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Product Name *</Label>
										<Input
											value={formData.name || ''}
											onChange={(e) => handleInputChange('name', e.target.value)}
											placeholder="Enter product name"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Product Type</Label>
										<Input
											value={formData.productType || ''}
											onChange={(e) => handleInputChange('productType', e.target.value)}
											placeholder="e.g., Physical, Digital"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Category</Label>
										<Input
											value={formData.category || ''}
											onChange={(e) => handleInputChange('category', e.target.value)}
											placeholder="e.g., Electronics"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Subcategory</Label>
										<Input
											value={formData.subcategory || ''}
											onChange={(e) => handleInputChange('subcategory', e.target.value)}
											placeholder="e.g., Smartphones"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Brand</Label>
										<Input
											value={formData.brand || ''}
											onChange={(e) => handleInputChange('brand', e.target.value)}
											placeholder="Brand name"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-white">Short Description</Label>
									<Textarea
										value={formData.shortDescription || ''}
										onChange={(e) => handleInputChange('shortDescription', e.target.value)}
										placeholder="Brief product description for listings"
										className="bg-white/5 border-white/20 text-white resize-none"
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Pricing */}
					<TabsContent value="pricing" className="space-y-6">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-white">Pricing & Inventory</CardTitle>
								<CardDescription className="text-gray-400">
									Set pricing, discounts, and stock levels
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Price (₹) *</Label>
										<Input
											type="number"
											value={formData.price || ''}
											onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
											placeholder="0"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Original Price (₹)</Label>
										<Input
											type="number"
											value={formData.originalPrice || ''}
											onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)}
											placeholder="0"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Discount (%)</Label>
										<Input
											type="number"
											value={formData.discountPercentage || ''}
											onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value) || 0)}
											placeholder="0"
											min="0"
											max="100"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Final Price (₹)</Label>
										<div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
											<span className="text-green-400 font-semibold">
												₹{calculateFinalPrice().toFixed(2)}
											</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Stock Quantity</Label>
										<Input
											type="number"
											value={formData.stockQuantity || ''}
											onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
											placeholder="0"
											min="0"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Stock Status</Label>
										<div className="p-3 bg-white/5 border border-white/20 rounded-md">
											<Badge 
												variant={formData.stockQuantity && formData.stockQuantity > 0 ? "default" : "destructive"}
												className={formData.stockQuantity && formData.stockQuantity > 0 ? "bg-green-500" : ""}
											>
												{formData.stockQuantity && formData.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
											</Badge>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Media */}
					<TabsContent value="media" className="space-y-6">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-white">Product Images</CardTitle>
								<CardDescription className="text-gray-400">
									Upload and manage product images (up to 5 images)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Image Upload */}
								<div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
									<input
										type="file"
										multiple
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
										id="image-upload"
									/>
									<label htmlFor="image-upload" className="cursor-pointer">
										<div className="flex flex-col items-center gap-3">
											<Upload className="w-8 h-8 text-[#FF6EC7]" />
											<div className="text-white">
												<p className="font-medium">Upload Images</p>
												<p className="text-sm text-gray-400">Click to browse or drag & drop</p>
											</div>
										</div>
									</label>
								</div>

								{/* Image Grid */}
								{formData.images && formData.images.length > 0 && (
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
										{formData.images.map((image, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												className="relative group aspect-square rounded-lg overflow-hidden bg-white/5"
											>
												<Image
													src={image}
													alt={`Product image ${index + 1}`}
													fill
													className="object-cover"
												/>
												<button
													type="button"
													onClick={() => removeImage(index)}
													className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
												>
													<X className="w-3 h-3 text-white" />
												</button>
												{index === 0 && (
													<Badge className="absolute bottom-2 left-2 bg-[#FF6EC7] text-white">
														Primary
													</Badge>
												)}
											</motion.div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					{/* Details */}
					<TabsContent value="details" className="space-y-6">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-white">Product Details</CardTitle>
								<CardDescription className="text-gray-400">
									Detailed descriptions, features, and specifications
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									<Label className="text-white">Detailed Description</Label>
									<Textarea
										value={formData.detailedDescription || ''}
										onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
										placeholder="Comprehensive product description with features and benefits"
										className="bg-white/5 border-white/20 text-white resize-none"
										rows={6}
									/>
								</div>

								<div className="space-y-2">
									<Label className="text-white">Key Features</Label>
									<Textarea
										value={formData.keyFeatures || ''}
										onChange={(e) => handleInputChange('keyFeatures', e.target.value)}
										placeholder="List key product features (one per line or comma-separated)"
										className="bg-white/5 border-white/20 text-white resize-none"
										rows={4}
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Size Options</Label>
										<Input
											value={formData.sizeOptions || ''}
											onChange={(e) => handleInputChange('sizeOptions', e.target.value)}
											placeholder="e.g., S, M, L, XL"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Extra Options</Label>
										<Input
											value={formData.extraOptions || ''}
											onChange={(e) => handleInputChange('extraOptions', e.target.value)}
											placeholder="e.g., Color: Red, Blue"
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-white">Return Policy</Label>
									<Textarea
										value={formData.returnPolicy || ''}
										onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
										placeholder="Describe your return policy for this product"
										className="bg-white/5 border-white/20 text-white resize-none"
										rows={3}
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Settings */}
					<TabsContent value="settings" className="space-y-6">
						<Card className="bg-white/5 backdrop-blur-sm border-white/10">
							<CardHeader>
								<CardTitle className="text-white">Product Settings</CardTitle>
								<CardDescription className="text-gray-400">
									Visibility and status settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
									<div className="space-y-1">
										<Label className="text-white">Product Status</Label>
										<p className="text-sm text-gray-400">
											Active products are visible to customers
										</p>
									</div>
									<Switch
										checked={formData.isActive ?? true}
										onCheckedChange={(checked) => handleInputChange('isActive', checked)}
									/>
								</div>

								<Separator className="bg-white/10" />

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label className="text-white">Created</Label>
										<div className="p-3 bg-white/5 border border-white/20 rounded-md">
											<span className="text-gray-300">
												{new Date(product.createdAt).toLocaleDateString()}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<Label className="text-white">Last Updated</Label>
										<div className="p-3 bg-white/5 border border-white/20 rounded-md">
											<span className="text-gray-300">
												{new Date(product.updatedAt).toLocaleDateString()}
											</span>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-white">Product Slug</Label>
									<div className="p-3 bg-white/5 border border-white/20 rounded-md">
										<span className="text-gray-300 font-mono">
											/products/{product.slug}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}