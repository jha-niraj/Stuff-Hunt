'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Upload, Image as ImageIcon, Check, X, Loader2, ArrowLeft, Save, Sparkles, 
	FileSpreadsheet, ChevronDown, ChevronUp, Plus, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { uploadSingleProduct, uploadProductsFromExcel, type ExcelProductData } from '@/actions/merchant-product.action'
import { toast } from 'sonner'
import Image from 'next/image'
import * as XLSX from 'xlsx'

export default function ProductUploadPage() {
	const router = useRouter()
	
	// Excel upload state
	const [excelFile, setExcelFile] = useState<File | null>(null)
	const [excelData, setExcelData] = useState<ExcelProductData[]>([])
	const [excelUploading, setExcelUploading] = useState(false)
	const [excelPreview, setExcelPreview] = useState<ExcelProductData[]>([])
	
	// Single upload state
	const [singleUploadOpen, setSingleUploadOpen] = useState(false)
	const [singleUploading, setSingleUploading] = useState(false)
	const [previewImages, setPreviewImages] = useState<string[]>([])
	const [singleForm, setSingleForm] = useState({
		name: '',
		category: '',
		subcategory: '',
		brand: '',
		price: 0,
		originalPrice: 0,
		discountPercentage: 0,
		shortDescription: '',
		detailedDescription: '',
		keyFeatures: '',
		productType: '',
		images: [] as File[],
		stockQuantity: 1,
		extraOptions: '',
		sizeOptions: '',
		returnPolicy: ''
	})

	// Excel file handling
	const handleExcelUpload = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0]
		if (!file) return

		setExcelFile(file)
		
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer)
				const workbook = XLSX.read(data, { type: 'array' })
				const sheetName = workbook.SheetNames[0]
				const worksheet = workbook.Sheets[sheetName]
				const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[]

				// Map Excel columns to our data structure
				const mappedData: ExcelProductData[] = jsonData.map((row) => ({
					productName: row['Product Name'] || row['productName'] || '',
					category: row['Category'] || row['category'] || '',
					subcategory: row['Subcategory'] || row['subcategory'] || '',
					brand: row['Brand'] || row['brand'] || '',
					priceINR: parseFloat(row['Price (INR)'] || row['priceINR'] || '0'),
					discountPercent: parseFloat(row['Discount (%)'] || row['discountPercent'] || '0'),
					finalPriceINR: parseFloat(row['Final Price (INR)'] || row['finalPriceINR'] || '0'),
					productDescription: row['Product Description'] || row['productDescription'] || '',
					keyFeatures: row['Key Features'] || row['keyFeatures'] || '',
					productType: row['Product Type'] || row['productType'] || '',
					imageURL1: row['Image URL 1'] || row['imageURL1'] || '',
					imageURL2: row['Image URL 2'] || row['imageURL2'] || '',
					imageURL3: row['Image URL 3'] || row['imageURL3'] || '',
					imageURL4: row['Image URL 4'] || row['imageURL4'] || '',
					imageURL5: row['Image URL 5'] || row['imageURL5'] || '',
					stock: parseInt(row['Stock'] || row['stock'] || '0'),
					extraOptions: row['Extra Options'] || row['extraOptions'] || '',
					sizeOptions: row['Size Options'] || row['sizeOptions'] || '',
					sellerName: row['Seller Name'] || row['sellerName'] || '',
					itemsTempQty: parseInt(row['Items Temp Qty'] || row['itemsTempQty'] || '0'),
					returnPolicy: row['Return Policy'] || row['returnPolicy'] || ''
				}))

				setExcelData(mappedData)
				setExcelPreview(mappedData.slice(0, 5)) // Show first 5 for preview
				toast.success(`Excel file loaded with ${mappedData.length} products`)
			} catch (error) {
				console.error('Error parsing Excel file:', error)
				toast.error('Error parsing Excel file. Please check the format.')
			}
		}
		reader.readAsArrayBuffer(file)
	}, [])

	const { getRootProps: getExcelRootProps, getInputProps: getExcelInputProps, isDragActive: isExcelDragActive } = useDropzone({
		onDrop: handleExcelUpload,
		accept: {
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
			'application/vnd.ms-excel': ['.xls'],
			'text/csv': ['.csv']
		},
		maxFiles: 1,
		disabled: excelUploading
	})

	// Single product image handling
	const onImageDrop = useCallback((acceptedFiles: File[]) => {
		const files = acceptedFiles.slice(0, 5)
		const previews = files.map(file => URL.createObjectURL(file))
		setPreviewImages(prev => [...prev, ...previews].slice(0, 5))
		setSingleForm(prev => ({
			...prev,
			images: [...prev.images, ...files].slice(0, 5)
		}))
	}, [])

	const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
		onDrop: onImageDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.webp']
		},
		maxFiles: 5,
		disabled: singleUploading
	})

	const removeImage = (index: number) => {
		const newImages = singleForm.images.filter((_, i) => i !== index)
		const newPreviews = previewImages.filter((_, i) => i !== index)
		setPreviewImages(newPreviews)
		setSingleForm(prev => ({ ...prev, images: newImages }))
	}

	// Upload Excel products
	const handleExcelSubmit = async () => {
		if (!excelData.length) {
			toast.error('Please upload an Excel file first')
			return
		}

		setExcelUploading(true)
		try {
			const result = await uploadProductsFromExcel(excelData)
			if (result.success) {
				toast.success(result.message)
				router.push('/merchant/products')
			} else {
				toast.error(result.error || 'Failed to upload products')
			}
		} catch (error) {
			console.error('Error uploading Excel products:', error)
			toast.error('Failed to upload products from Excel')
		} finally {
			setExcelUploading(false)
		}
	}

	// Upload single product
	const handleSingleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!singleForm.images.length) {
			toast.error('Please upload at least one product image')
			return
		}

		if (!singleForm.name || !singleForm.price) {
			toast.error('Please fill in required fields')
			return
		}

		setSingleUploading(true)
		try {
			// Convert images to URLs (in real app, upload to cloud storage first)
			const imageUrls = singleForm.images.map(file => URL.createObjectURL(file))
			
			const result = await uploadSingleProduct({
				...singleForm,
				images: imageUrls
			})

			if (result.success) {
				toast.success('Product uploaded successfully!')
				router.push('/merchant/products')
			} else {
				toast.error(result.error || 'Failed to upload product')
			}
		} catch (error) {
			console.error('Error uploading single product:', error)
			toast.error('Failed to upload product')
		} finally {
			setSingleUploading(false)
		}
	}

	// Download Excel template
	const downloadTemplate = () => {
		const templateData = [{
			'Product Name': 'Sample Product',
			'Category': 'Electronics',
			'Subcategory': 'Smartphones',
			'Brand': 'Sample Brand',
			'Price (INR)': 10000,
			'Discount (%)': 10,
			'Final Price (INR)': 9000,
			'Product Description': 'Sample product description',
			'Key Features': 'Feature 1, Feature 2, Feature 3',
			'Product Type': 'Physical',
			'Image URL 1': 'https://example.com/image1.jpg',
			'Image URL 2': 'https://example.com/image2.jpg',
			'Image URL 3': '',
			'Image URL 4': '',
			'Image URL 5': '',
			'Stock': 100,
			'Extra Options': 'Color: Red, Blue',
			'Size Options': 'S, M, L, XL',
			'Seller Name': 'Your Store Name',
			'Items Temp Qty': 50,
			'Return Policy': '30 days return policy'
		}]

		const ws = XLSX.utils.json_to_sheet(templateData)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, 'Products')
		XLSX.writeFile(wb, 'product_upload_template.xlsx')
		toast.success('Template downloaded successfully!')
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
							<h1 className="text-2xl font-bold text-white">Upload Products</h1>
							<p className="text-gray-400">Upload products via Excel or add them individually</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8 space-y-8">
				{/* Excel Upload Section */}
				<Card className="bg-white/5 backdrop-blur-sm border-white/10">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<FileSpreadsheet className="w-5 h-5 text-[#FF6EC7]" />
							Bulk Upload via Excel
						</CardTitle>
						<CardDescription className="text-gray-400">
							Upload multiple products at once using an Excel file. Download our template to get started.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Template Download */}
						<div className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
							<div>
								<h4 className="text-white font-medium">Need a template?</h4>
								<p className="text-sm text-gray-400">Download our Excel template with sample data</p>
							</div>
							<Button
								type="button"
								variant="outline"
								onClick={downloadTemplate}
								className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
							>
								<Download className="w-4 h-4 mr-2" />
								Download Template
							</Button>
						</div>

						{/* Excel Upload Area */}
						<div
							{...getExcelRootProps()}
							className={`
								border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
								${isExcelDragActive
									? 'border-[#FF6EC7] bg-[#FF6EC7]/10'
									: 'border-white/20 hover:border-white/40 hover:bg-white/5'
								}
								${excelUploading ? 'opacity-50 cursor-not-allowed' : ''}
							`}
						>
							<input {...getExcelInputProps()} />
							<div className="flex flex-col items-center gap-4">
								<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
									<FileSpreadsheet className="w-8 h-8 text-white" />
								</div>
								<div className="text-white">
									<p className="text-lg font-semibold mb-1">
										{isExcelDragActive ? 'Drop Excel file here' : 'Upload Excel File'}
									</p>
									<p className="text-sm text-gray-400">
										Supports .xlsx, .xls, and .csv files
									</p>
								</div>
							</div>
						</div>

						{/* Excel Preview */}
						{excelPreview.length > 0 && (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h4 className="text-white font-medium">Preview ({excelData.length} products)</h4>
									<Badge variant="outline" className="border-green-500 text-green-400">
										{excelData.length} Products Ready
									</Badge>
								</div>
								
								<div className="overflow-x-auto">
									<table className="w-full text-sm">
										<thead>
											<tr className="border-b border-white/10">
												<th className="text-left text-gray-400 p-2">Product Name</th>
												<th className="text-left text-gray-400 p-2">Category</th>
												<th className="text-left text-gray-400 p-2">Price</th>
												<th className="text-left text-gray-400 p-2">Stock</th>
											</tr>
										</thead>
										<tbody>
											{excelPreview.map((product, index) => (
												<tr key={index} className="border-b border-white/5">
													<td className="text-white p-2">{product.productName}</td>
													<td className="text-gray-300 p-2">{product.category}</td>
													<td className="text-gray-300 p-2">₹{product.priceINR}</td>
													<td className="text-gray-300 p-2">{product.stock}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<Button
									onClick={handleExcelSubmit}
									disabled={excelUploading}
									className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
								>
									{excelUploading ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Uploading {excelData.length} Products...
										</>
									) : (
										<>
											<Upload className="w-4 h-4 mr-2" />
											Upload {excelData.length} Products
										</>
									)}
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Single Product Upload Section */}
				<Collapsible open={singleUploadOpen} onOpenChange={setSingleUploadOpen}>
					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CollapsibleTrigger asChild>
							<CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-white flex items-center gap-2">
											<Plus className="w-5 h-5 text-[#FF6EC7]" />
											Single Product Upload
										</CardTitle>
										<CardDescription className="text-gray-400">
											Add individual products with detailed information
										</CardDescription>
									</div>
									{singleUploadOpen ? (
										<ChevronUp className="w-5 h-5 text-gray-400" />
									) : (
										<ChevronDown className="w-5 h-5 text-gray-400" />
									)}
								</div>
							</CardHeader>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<form onSubmit={handleSingleSubmit}>
								<CardContent className="space-y-6">
									<div className="grid lg:grid-cols-2 gap-8">
										{/* Left Column - Image Upload */}
										<div className="space-y-6">
											{/* Image Upload Area */}
											<div className="space-y-4">
												<Label className="text-white">Product Images *</Label>
												<div
													{...getImageRootProps()}
													className={`
														border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer
														${isImageDragActive
															? 'border-[#FF6EC7] bg-[#FF6EC7]/10'
															: 'border-white/20 hover:border-white/40 hover:bg-white/5'
														}
													`}
												>
													<input {...getImageInputProps()} />
													<div className="flex flex-col items-center gap-3">
														<ImageIcon className="w-8 h-8 text-[#FF6EC7]" />
														<div className="text-white">
															<p className="font-medium">
																{isImageDragActive ? 'Drop images here' : 'Upload Images'}
															</p>
															<p className="text-sm text-gray-400">Up to 5 images</p>
														</div>
													</div>
												</div>

												{/* Image Previews */}
												{previewImages.length > 0 && (
													<div className="grid grid-cols-3 gap-3">
														{previewImages.map((preview, index) => (
															<div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-white/5">
																<Image
																	src={preview}
																	alt={`Preview ${index + 1}`}
																	fill
																	className="object-cover"
																/>
																<button
																	type="button"
																	onClick={() => removeImage(index)}
																	className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
																>
																	<X className="w-3 h-3 text-white" />
																</button>
															</div>
														))}
													</div>
												)}
											</div>
										</div>

										{/* Right Column - Product Details */}
										<div className="space-y-4">
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label className="text-white">Product Name *</Label>
													<Input
														value={singleForm.name}
														onChange={(e) => setSingleForm(prev => ({ ...prev, name: e.target.value }))}
														placeholder="Enter product name"
														className="bg-white/5 border-white/20 text-white"
														required
													/>
												</div>
												<div className="space-y-2">
													<Label className="text-white">Category *</Label>
													<Input
														value={singleForm.category}
														onChange={(e) => setSingleForm(prev => ({ ...prev, category: e.target.value }))}
														placeholder="e.g., Electronics"
														className="bg-white/5 border-white/20 text-white"
														required
													/>
												</div>
											</div>

											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label className="text-white">Brand</Label>
													<Input
														value={singleForm.brand}
														onChange={(e) => setSingleForm(prev => ({ ...prev, brand: e.target.value }))}
														placeholder="Brand name"
														className="bg-white/5 border-white/20 text-white"
													/>
												</div>
												<div className="space-y-2">
													<Label className="text-white">Product Type</Label>
													<Input
														value={singleForm.productType}
														onChange={(e) => setSingleForm(prev => ({ ...prev, productType: e.target.value }))}
														placeholder="e.g., Physical, Digital"
														className="bg-white/5 border-white/20 text-white"
													/>
												</div>
											</div>

											<div className="grid grid-cols-3 gap-4">
												<div className="space-y-2">
													<Label className="text-white">Price (₹) *</Label>
													<Input
														type="number"
														value={singleForm.price}
														onChange={(e) => setSingleForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
														placeholder="0"
														className="bg-white/5 border-white/20 text-white"
														required
													/>
												</div>
												<div className="space-y-2">
													<Label className="text-white">Discount (%)</Label>
													<Input
														type="number"
														value={singleForm.discountPercentage}
														onChange={(e) => setSingleForm(prev => ({ ...prev, discountPercentage: parseFloat(e.target.value) || 0 }))}
														placeholder="0"
														className="bg-white/5 border-white/20 text-white"
													/>
												</div>
												<div className="space-y-2">
													<Label className="text-white">Stock</Label>
													<Input
														type="number"
														value={singleForm.stockQuantity}
														onChange={(e) => setSingleForm(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 1 }))}
														placeholder="1"
														className="bg-white/5 border-white/20 text-white"
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label className="text-white">Short Description</Label>
												<Textarea
													value={singleForm.shortDescription}
													onChange={(e) => setSingleForm(prev => ({ ...prev, shortDescription: e.target.value }))}
													placeholder="Brief product description"
													className="bg-white/5 border-white/20 text-white resize-none"
													rows={2}
												/>
											</div>

											<div className="space-y-2">
												<Label className="text-white">Key Features</Label>
												<Textarea
													value={singleForm.keyFeatures}
													onChange={(e) => setSingleForm(prev => ({ ...prev, keyFeatures: e.target.value }))}
													placeholder="Key product features"
													className="bg-white/5 border-white/20 text-white resize-none"
													rows={2}
												/>
											</div>
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex gap-4 pt-4">
										<Button
											type="button"
											variant="outline"
											onClick={() => setSingleUploadOpen(false)}
											className="flex-1 border-white/20 text-white hover:bg-white/5"
											disabled={singleUploading}
										>
											Cancel
										</Button>
										<Button
											type="submit"
											disabled={singleUploading || !singleForm.images.length || !singleForm.name || !singleForm.price}
											className="flex-1 bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white"
										>
											{singleUploading ? (
												<>
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />
													Uploading...
												</>
											) : (
												<>
													<Save className="w-4 h-4 mr-2" />
													Upload Product
												</>
											)}
										</Button>
									</div>
								</CardContent>
							</form>
						</CollapsibleContent>
					</Card>
				</Collapsible>
			</div>
		</div>
	)
}