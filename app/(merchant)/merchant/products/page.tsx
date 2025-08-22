"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, EyeOff,
	Package, TrendingUp, DollarSign, ShoppingCart, ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { getMerchantProducts, deleteProduct, updateProductStatus } from '@/actions/merchant-product.action'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
	id: string
	name: string
	slug: string
	price: number
	finalPrice?: number
	images: string[]
	stockQuantity: number
	isActive: boolean
	inStock: boolean
	category?: string
	brand?: string
	createdAt: Date
	categories: { id: string; name: string }[]
	_count: {
		reviews: number
		orderItems: number
		likes: number
	}
}

export default function MerchantProductsPage() {
	const router = useRouter()
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [totalProducts, setTotalProducts] = useState(0)

	// Load products
	const loadProducts = async (page: number = 1) => {
		setLoading(true)
		try {
			const result = await getMerchantProducts(page, 20)
			if (result.success) {
				setProducts(result.products as Product[])
				setTotalPages(result.totalPages)
				setTotalProducts(result.totalProducts)
				setCurrentPage(result.currentPage)
			} else {
				toast.error(result.error || 'Failed to load products')
			}
		} catch (error) {
			console.error('Error loading products:', error)
			toast.error('Failed to load products')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadProducts(currentPage)
	}, [currentPage])

	// Handle product status toggle
	const handleStatusToggle = async (productId: string, isActive: boolean) => {
		try {
			const result = await updateProductStatus(productId, isActive)
			if (result.success) {
				toast.success(result.message)
				loadProducts(currentPage)
			} else {
				toast.error(result.error || 'Failed to update product status')
			}
		} catch (error) {
			console.error('Error updating product status:', error)
			toast.error('Failed to update product status')
		}
	}

	// Handle product deletion
	const handleDelete = async (productId: string, productName: string) => {
		if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
			return
		}

		try {
			const result = await deleteProduct(productId)
			if (result.success) {
				toast.success(result.message)
				loadProducts(currentPage)
			} else {
				toast.error(result.error || 'Failed to delete product')
			}
		} catch (error) {
			console.error('Error deleting product:', error)
			toast.error('Failed to delete product')
		}
	}

	// Filter products based on search term
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Generate pagination items
	const generatePaginationItems = () => {
		const items = []
		const maxVisiblePages = 5
		
		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				items.push(i)
			}
		} else {
			items.push(1)
			
			if (currentPage > 3) {
				items.push('ellipsis1')
			}
			
			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)
			
			for (let i = start; i <= end; i++) {
				items.push(i)
			}
			
			if (currentPage < totalPages - 2) {
				items.push('ellipsis2')
			}
			
			if (totalPages > 1) {
				items.push(totalPages)
			}
		}
		
		return items
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
			{/* Header */}
			<div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => router.push('/merchant/dashboard')}
								className="text-white hover:bg-white/10"
							>
								<ArrowLeft className="w-5 h-5" />
							</Button>
							<div>
								<h1 className="text-2xl font-bold text-white">My Products</h1>
								<p className="text-gray-400">Manage your product inventory</p>
							</div>
						</div>
						<Link href="/merchant/products/upload">
							<Button className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white">
								<Plus className="w-4 h-4 mr-2" />
								Add Products
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm">Total Products</p>
									<p className="text-2xl font-bold text-white">{totalProducts}</p>
								</div>
								<Package className="w-8 h-8 text-[#FF6EC7]" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm">Active Products</p>
									<p className="text-2xl font-bold text-white">
										{products.filter(p => p.isActive).length}
									</p>
								</div>
								<Eye className="w-8 h-8 text-green-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm">Out of Stock</p>
									<p className="text-2xl font-bold text-white">
										{products.filter(p => !p.inStock).length}
									</p>
								</div>
								<TrendingUp className="w-8 h-8 text-red-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm">Total Sales</p>
									<p className="text-2xl font-bold text-white">
										{products.reduce((sum, p) => sum + (p._count?.orderItems || 0), 0)}
									</p>
								</div>
								<ShoppingCart className="w-8 h-8 text-blue-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Search and Filters */}
				<Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
					<CardContent className="p-6">
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="flex-1 relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
								<Input
									placeholder="Search products by name, category, or brand..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
								/>
							</div>
							<Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
								<Filter className="w-4 h-4 mr-2" />
								Filters
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Products Grid */}
				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 animate-pulse">
								<div className="aspect-square bg-white/10 rounded-t-lg" />
								<CardContent className="p-4">
									<div className="h-4 bg-white/10 rounded mb-2" />
									<div className="h-3 bg-white/10 rounded mb-4" />
									<div className="flex justify-between">
										<div className="h-3 bg-white/10 rounded w-16" />
										<div className="h-3 bg-white/10 rounded w-12" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : filteredProducts.length === 0 ? (
					<Card className="bg-white/5 backdrop-blur-sm border-white/10">
						<CardContent className="p-12 text-center">
							<Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
							<p className="text-gray-400 mb-6">
								{searchTerm ? 'No products match your search criteria.' : 'You haven\'t added any products yet.'}
							</p>
							<Link href="/merchant/products/upload">
								<Button className="bg-gradient-to-r from-[#FF6EC7] to-[#DF87F3] hover:from-[#FF6EC7]/90 hover:to-[#DF87F3]/90 text-white">
									<Plus className="w-4 h-4 mr-2" />
									Add Your First Product
								</Button>
							</Link>
						</CardContent>
					</Card>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
							{filteredProducts.map((product, index) => (
								<motion.div
									key={product.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors group">
										<div className="relative aspect-square overflow-hidden rounded-t-lg">
											<Image
												src={product.images[0] || '/placeholder-product.png'}
												alt={product.name}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-300"
											/>
											<div className="absolute top-2 right-2 flex gap-2">
												{!product.isActive && (
													<Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
														Inactive
													</Badge>
												)}
												{!product.inStock && (
													<Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
														Out of Stock
													</Badge>
												)}
											</div>
										</div>
										<CardContent className="p-4">
											<div className="space-y-3">
												<div>
													<h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#FF6EC7] transition-colors">
														{product.name}
													</h3>
													<p className="text-sm text-gray-400">
														{product.categories[0]?.name || product.category || 'Uncategorized'}
													</p>
												</div>

												<div className="flex items-center justify-between">
													<div>
														<p className="text-lg font-bold text-white">
															₹{product.finalPrice || product.price}
														</p>
														{product.finalPrice && product.finalPrice < product.price && (
															<p className="text-sm text-gray-400 line-through">
																₹{product.price}
															</p>
														)}
													</div>
													<div className="text-right">
														<p className="text-sm text-gray-400">Stock: {product.stockQuantity}</p>
														<p className="text-xs text-gray-500">
															{product._count?.orderItems || 0} sold
														</p>
													</div>
												</div>

												<div className="flex items-center justify-between pt-2 border-t border-white/10">
													<div className="flex items-center gap-2">
														<Switch
															checked={product.isActive}
															onCheckedChange={(checked) => handleStatusToggle(product.id, checked)}
														/>
														<span className="text-xs text-gray-400">
															{product.isActive ? 'Active' : 'Inactive'}
														</span>
													</div>

													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
																<MoreHorizontal className="w-4 h-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end" className="bg-black/90 border-white/20">
															<DropdownMenuItem 
																onClick={() => router.push(`/products/${product.slug}`)}
																className="text-white hover:bg-white/10"
															>
																<Eye className="w-4 h-4 mr-2" />
																View Product
															</DropdownMenuItem>
															<DropdownMenuItem 
																onClick={() => router.push(`/merchant/products/${product.id}/edit`)}
																className="text-white hover:bg-white/10"
															>
																<Edit className="w-4 h-4 mr-2" />
																Edit Product
															</DropdownMenuItem>
															<DropdownMenuItem 
																onClick={() => handleDelete(product.id, product.name)}
																className="text-red-400 hover:bg-red-500/10"
															>
																<Trash2 className="w-4 h-4 mr-2" />
																Delete Product
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex flex-col items-center gap-4">
								<div className="text-sm text-gray-400">
									Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalProducts)} of {totalProducts} products
								</div>
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious 
												href="#"
												onClick={(e) => {
													e.preventDefault()
													if (currentPage > 1) setCurrentPage(currentPage - 1)
												}}
												className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer text-white hover:bg-white/10"}
											/>
										</PaginationItem>
										
										{generatePaginationItems().map((item, index) => (
											<PaginationItem key={index}>
												{typeof item === 'number' ? (
													<PaginationLink
														href="#"
														onClick={(e) => {
															e.preventDefault()
															setCurrentPage(item)
														}}
														isActive={currentPage === item}
														className="cursor-pointer text-white hover:bg-white/10 data-[state=active]:bg-[#FF6EC7] data-[state=active]:text-white"
													>
														{item}
													</PaginationLink>
												) : (
													<PaginationEllipsis className="text-gray-400" />
												)}
											</PaginationItem>
										))}
										
										<PaginationItem>
											<PaginationNext 
												href="#"
												onClick={(e) => {
													e.preventDefault()
													if (currentPage < totalPages) setCurrentPage(currentPage + 1)
												}}
												className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer text-white hover:bg-white/10"}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}