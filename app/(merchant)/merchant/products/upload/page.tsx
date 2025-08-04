'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Upload, Image as ImageIcon, Check, X, Loader2, ArrowLeft, Save, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useMerchantStore } from '@/stores/useMerchantStore'
import { useProductStore } from '@/stores/useProductStore'
import { toast } from 'sonner'
import Image from 'next/image'

export default function ProductUploadPage() {
	const router = useRouter()
	const [previewImages, setPreviewImages] = useState<string[]>([])

	const {
		uploadForm,
		uploadLoading,
		uploadError,
		aiSuggestions,
		aiAnalysisLoading,
		analyzeProductImage,
		createProduct,
		updateUploadForm
	} = useMerchantStore()

	const { fetchCategories } = useProductStore()

	useState(() => {
		fetchCategories()
	})

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		// Limit to 5 images
		const files = acceptedFiles.slice(0, 5)

		// Create preview URLs
		const previews = files.map(file => URL.createObjectURL(file))
		setPreviewImages(prev => [...prev, ...previews].slice(0, 5))

		// Update form
		updateUploadForm({
			images: [...(uploadForm.images || []), ...files].slice(0, 5)
		})

		// Analyze the first uploaded image with AI
		if (files.length > 0 && !aiSuggestions) {
			toast.info('🤖 Analyzing product image with AI...')
			await analyzeProductImage(files[0])
		}
	}, [uploadForm.images, aiSuggestions, analyzeProductImage, updateUploadForm])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.webp']
		},
		maxFiles: 5,
		disabled: uploadLoading
	})

	const removeImage = (index: number) => {
		const newImages = uploadForm.images?.filter((_, i) => i !== index) || []
		const newPreviews = previewImages.filter((_, i) => i !== index)

		setPreviewImages(newPreviews)
		updateUploadForm({ images: newImages })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!uploadForm.images?.length) {
			toast.error('Please upload at least one product image')
			return
		}

		if (!uploadForm.name || !uploadForm.price) {
			toast.error('Please fill in required fields')
			return
		}

		try {
			const result = await createProduct({
				images: uploadForm.images,
				name: uploadForm.name,
				shortDescription: uploadForm.shortDescription || '',
				detailedDescription: uploadForm.detailedDescription || '',
				price: uploadForm.price,
				categoryIds: uploadForm.categoryIds || [],
				stock: uploadForm.stock || 1,
				isActive: uploadForm.isActive ?? true,
				aiGenerated: aiSuggestions || {
					title: uploadForm.name || '',
					shortDescription: uploadForm.shortDescription || '',
					detailedDescription: uploadForm.detailedDescription || '',
					category: '',
					features: [],
					tags: [],
					searchKeywords: []
				},
				searchMetadata: {
					primaryKeywords: [],
					secondaryKeywords: [],
					semanticTags: [],
					categoryHierarchy: [],
					attributes: {},
					searchBoostTerms: []
				}
			})

			if (result.success) {
				toast.success('🎉 Product created successfully!')
				router.push('/merchant/dashboard')
			}
		} catch {
			toast.error('Failed to create product')
		}
	}

	const acceptAISuggestion = (field: string, value: unknown) => {
		if (!aiSuggestions) return
		updateUploadForm({ [field]: value })
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
			{/* Header */}
			<div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => router.back()}
							className="text-white hover:bg-white/10"
						>
							<ArrowLeft className="w-5 h-5" />
						</Button>
						<div>
							<h1 className="text-2xl font-bold text-white">Upload New Product</h1>
							<p className="text-gray-400">Add a new product to your store with AI assistance</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<form onSubmit={handleSubmit} className="space-y-8">
					<div className="grid lg:grid-cols-2 gap-8">
						{/* Left Column - Image Upload */}
						<div className="space-y-6">
							{/* Image Upload Area */}
							<Card className="bg-white/5 backdrop-blur-sm border-white/10">
								<CardHeader>
									<CardTitle className="text-white flex items-center gap-2">
										<ImageIcon className="w-5 h-5 text-[#FF6EC7]" />
										Product Images
									</CardTitle>
									<CardDescription className="text-gray-400">
										Upload up to 5 high-quality images. The first image will be analyzed by AI.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{/* Dropzone */}
									<div
										{...getRootProps()}
										className={`
                      border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
                      ${isDragActive
												? 'border-[#FF6EC7] bg-[#FF6EC7]/10'
												: 'border-white/20 hover:border-white/40 hover:bg-white/5'
											}
                      ${uploadLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
									>
										<input {...getInputProps()} />
										<div className="flex flex-col items-center gap-4">
											<div className="w-16 h-16 bg-gradient-to-br from-[#FF6EC7] to-[#DF87F3] rounded-2xl flex items-center justify-center">
												<Upload className="w-8 h-8 text-white" />
											</div>

											{aiAnalysisLoading ? (
												<div className="flex items-center gap-2 text-[#FF6EC7]">
													<Loader2 className="w-4 h-4 animate-spin" />
													<span>AI is analyzing your image...</span>
												</div>
											) : (
												<>
													<div className="text-white">
														<p className="text-lg font-semibold mb-1">
															{isDragActive ? 'Drop images here' : 'Upload product images'}
														</p>
														<p className="text-sm text-gray-400">
															Drag & drop or click to browse
														</p>
													</div>
													<Badge variant="outline" className="border-[#FF6EC7] text-[#FF6EC7]">
														AI-Powered Analysis
													</Badge>
												</>
											)}
										</div>
									</div>

									{/* Image Previews */}
									{previewImages.length > 0 && (
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
											{previewImages.map((preview, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													className="relative group aspect-square rounded-lg overflow-hidden bg-white/5"
												>
													<Image
														src={preview}
														alt={`Preview ${index + 1}`}
														fill
														className="object-cover"
													/>

													{/* Remove Button */}
													<button
														type="button"
														onClick={() => removeImage(index)}
														className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<X className="w-3 h-3 text-white" />
													</button>

													{/* Primary Badge */}
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

							{/* AI Suggestions */}
							<AnimatePresence>
								{aiSuggestions && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
									>
										<Card className="bg-gradient-to-br from-[#FF6EC7]/10 to-[#DF87F3]/10 border-[#FF6EC7]/20">
											<CardHeader>
												<CardTitle className="text-white flex items-center gap-2">
													<Sparkles className="w-5 h-5 text-[#FF6EC7]" />
													AI Suggestions
												</CardTitle>
												<CardDescription className="text-gray-300">
													Click to apply these AI-generated suggestions to your product
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-3">
												{/* Title Suggestion */}
												{aiSuggestions.title && (
													<div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
														<div className="flex-1">
															<p className="text-xs text-gray-400 mb-1">Suggested Title</p>
															<p className="text-white font-medium">{aiSuggestions.title}</p>
														</div>
														<Button
															type="button"
															size="sm"
															variant="ghost"
															onClick={() => acceptAISuggestion('name', aiSuggestions.title)}
															className="text-[#FF6EC7] hover:bg-[#FF6EC7]/10"
														>
															<Check className="w-4 h-4" />
														</Button>
													</div>
												)}

												{/* Description Suggestion */}
												{aiSuggestions.shortDescription && (
													<div className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
														<div className="flex-1">
															<p className="text-xs text-gray-400 mb-1">Suggested Description</p>
															<p className="text-white text-sm">{aiSuggestions.shortDescription}</p>
														</div>
														<Button
															type="button"
															size="sm"
															variant="ghost"
															onClick={() => acceptAISuggestion('shortDescription', aiSuggestions.shortDescription)}
															className="text-[#FF6EC7] hover:bg-[#FF6EC7]/10 mt-1"
														>
															<Check className="w-4 h-4" />
														</Button>
													</div>
												)}

												{/* Features */}
												{aiSuggestions.features && aiSuggestions.features.length > 0 && (
													<div className="p-3 bg-white/5 rounded-lg">
														<p className="text-xs text-gray-400 mb-2">Detected Features</p>
														<div className="flex flex-wrap gap-2">
															{aiSuggestions.features.map((feature, index) => (
																<Badge key={index} variant="outline" className="border-[#DF87F3] text-[#DF87F3]">
																	{feature}
																</Badge>
															))}
														</div>
													</div>
												)}
											</CardContent>
										</Card>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Right Column - Product Details */}
						<div className="space-y-6">
							<Card className="bg-white/5 backdrop-blur-sm border-white/10">
								<CardHeader>
									<CardTitle className="text-white">Product Details</CardTitle>
									<CardDescription className="text-gray-400">
										Fill in the product information. AI suggestions can help speed up the process.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									{/* Product Name */}
									<div className="space-y-2">
										<Label htmlFor="name" className="text-white">
											Product Name *
										</Label>
										<Input
											id="name"
											value={uploadForm.name || ''}
											onChange={(e) => updateUploadForm({ name: e.target.value })}
											placeholder="Enter product name"
											className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
											required
										/>
									</div>

									{/* Price */}
									<div className="space-y-2">
										<Label htmlFor="price" className="text-white">
											Price (₹) *
										</Label>
										<Input
											id="price"
											type="number"
											min="0"
											step="0.01"
											value={uploadForm.price || ''}
											onChange={(e) => updateUploadForm({ price: parseFloat(e.target.value) || 0 })}
											placeholder="0.00"
											className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
											required
										/>
									</div>

									{/* Short Description */}
									<div className="space-y-2">
										<Label htmlFor="shortDescription" className="text-white">
											Short Description
										</Label>
										<Textarea
											id="shortDescription"
											value={uploadForm.shortDescription || ''}
											onChange={(e) => updateUploadForm({ shortDescription: e.target.value })}
											placeholder="Brief description for product listings"
											className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
											rows={3}
										/>
									</div>

									{/* Detailed Description */}
									<div className="space-y-2">
										<Label htmlFor="detailedDescription" className="text-white">
											Detailed Description
										</Label>
										<Textarea
											id="detailedDescription"
											value={uploadForm.detailedDescription || ''}
											onChange={(e) => updateUploadForm({ detailedDescription: e.target.value })}
											placeholder="Comprehensive product description with features and benefits"
											className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
											rows={5}
										/>
									</div>

									<Separator className="bg-white/10" />

									{/* Stock */}
									<div className="space-y-2">
										<Label htmlFor="stock" className="text-white">
											Stock Quantity
										</Label>
										<Input
											id="stock"
											type="number"
											min="0"
											value={uploadForm.stock || 1}
											onChange={(e) => updateUploadForm({ stock: parseInt(e.target.value) || 1 })}
											className="bg-white/5 border-white/20 text-white"
										/>
									</div>

									{/* Active Status */}
									<div className="flex items-center justify-between">
										<div className="space-y-1">
											<Label className="text-white">Product Status</Label>
											<p className="text-sm text-gray-400">
												Active products are visible to customers
											</p>
										</div>
										<Switch
											checked={uploadForm.isActive ?? true}
											onCheckedChange={(checked) => updateUploadForm({ isActive: checked })}
										/>
									</div>
								</CardContent>
							</Card>

							{/* Action Buttons */}
							<div className="flex gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => router.back()}
									className="flex-1 border-white/20 text-white hover:bg-white/5"
									disabled={uploadLoading}
								>
									<X className="w-4 h-4 mr-2" />
									Cancel
								</Button>

								<Button
									type="submit"
									disabled={uploadLoading || !uploadForm.images?.length}
									className="flex-1 bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
								>
									{uploadLoading ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Creating Product...
										</>
									) : (
										<>
											<Save className="w-4 h-4 mr-2" />
											Create Product
										</>
									)}
								</Button>
							</div>

							{uploadError && (
								<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
									<p className="text-red-400 text-sm">{uploadError}</p>
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
