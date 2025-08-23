"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { getProducts, searchProductsWithFilters, type ProductWithDetails } from "@/actions/product.action"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { searchParamsToFilters } from "@/lib/search"
import {
	Pagination, PaginationContent, PaginationEllipsis,
	PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"

export function ProductsClient() {
	const sp = useSearchParams()
	const router = useRouter()
	const [products, setProducts] = useState<ProductWithDetails[]>([])
	const [loading, setLoading] = useState(true)
	const [totalProducts, setTotalProducts] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	// Parse AI filters from URL
	const aiFilters = useMemo(() => searchParamsToFilters(sp), [sp])
	const originalQuery = sp.get("q") || ""
	const isAIProcessed = sp.get("aiProcessed") === "true"
	const confidence = Number(sp.get("confidence")) || 0

	// Update current page when URL changes
	useEffect(() => {
		const page = Number(sp.get("page")) || 1
		setCurrentPage(page)
	}, [sp])

	// Load products based on search parameters
	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true)
			try {
				let result

				if (isAIProcessed && aiFilters) {
					// Use AI-enhanced search
					result = await searchProductsWithFilters({
						categories: aiFilters.categories,
						attributes: aiFilters.attributes,
						colors: aiFilters.colors,
						sizes: aiFilters.sizes,
						brands: aiFilters.brands,
						priceRange: aiFilters.priceRange,
						query: originalQuery,
						page: currentPage,
						limit: 12
					})
				} else {
					// Use regular search
					const sortBy = sp.get("sort") as 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating' | 'popular' | null
					const filters = {
						search: sp.get("q") || sp.get("query") || undefined,
						category: sp.get("category") || undefined,
						minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
						maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
						sortBy: sortBy || 'newest',
						page: currentPage,
						limit: 12
					}

					result = await getProducts(filters)
				}

				if (result.success) {
					setProducts(result.products)
					setTotalProducts(result.totalProducts)
					setTotalPages(result.totalPages)
				} else {
					console.error('Failed to load products:', result.error)
					setProducts([])
					setTotalProducts(0)
					setTotalPages(1)
				}
			} catch (error) {
				console.error('Error loading products:', error)
				setProducts([])
				setTotalProducts(0)
				setTotalPages(1)
			} finally {
				setLoading(false)
			}
		}

		loadProducts()
	}, [sp, aiFilters, isAIProcessed, originalQuery, currentPage])

	const clearAIFilters = () => {
		const newParams = new URLSearchParams()
		if (originalQuery) {
			newParams.set("q", originalQuery)
			newParams.set("source", "text")
		}
		router.push(`/products?${newParams.toString()}`)
	}

	const handlePageChange = (page: number) => {
		const newParams = new URLSearchParams(sp.toString())
		newParams.set("page", page.toString())
		router.push(`/products?${newParams.toString()}`)
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const generatePaginationItems = () => {
		const items = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			// Show all pages if total pages is small
			for (let i = 1; i <= totalPages; i++) {
				items.push(i)
			}
		} else {
			// Show first page
			items.push(1)

			if (currentPage > 3) {
				items.push('ellipsis1')
			}

			// Show pages around current page
			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)

			for (let i = start; i <= end; i++) {
				items.push(i)
			}

			if (currentPage < totalPages - 2) {
				items.push('ellipsis2')
			}

			// Show last page
			if (totalPages > 1) {
				items.push(totalPages)
			}
		}

		return items
	}

	// Remove the loading check here since we're handling it in ProductGrid

	return (
		<div className="space-y-6">
			{
				isAIProcessed && aiFilters && (
					<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
						<div className="flex items-start justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<Sparkles className="w-5 h-5 text-blue-600" />
									<h3 className="font-semibold text-blue-900 dark:text-blue-100">
										AI Enhanced Search Results
									</h3>
									<Badge variant="secondary" className="text-xs">
										{Math.round(confidence * 100)}% confidence
									</Badge>
								</div>
								<p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
									{originalQuery ? `Showing results for "${originalQuery}"` : "AI processed your search"}
								</p>
								<div className="flex flex-wrap gap-2">
									{
										aiFilters.categories.map((category: string) => (
											<Badge key={category} variant="outline" className="text-xs">
												{category}
											</Badge>
										))
									}
									{
										aiFilters.attributes.map((attr: string) => (
											<Badge key={attr} variant="outline" className="text-xs">
												{attr}
											</Badge>
										))
									}
									{
										aiFilters.colors?.map((color: string) => (
											<Badge key={color} variant="outline" className="text-xs">
												{color}
											</Badge>
										))
									}
									{
										aiFilters.priceRange?.max && (
											<Badge variant="outline" className="text-xs">
												Under ${aiFilters.priceRange.max}
											</Badge>
										)
									}
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={clearAIFilters}
								className="text-blue-600 hover:text-blue-800"
							>
								<X className="w-4 h-4 mr-1" />
								Clear AI filters
							</Button>
						</div>
					</div>
				)
			}
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{
						totalProducts === 0 ? (
							"No products found"
						) : (
							`${totalProducts} product${totalProducts === 1 ? "" : "s"} found`
						)
					}
					{
						originalQuery && (
							<span> for &quot;{originalQuery}&quot;</span>
						)
					}
				</div>
			</div>
			<div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
				<aside className="lg:sticky top-24 h-max">
					<ProductFilters />
				</aside>
				<div className="space-y-6">
					<ProductGrid products={products} loading={loading} skeletonCount={12} />
					{
						products.length === 0 && !loading && (
							<div className="rounded-xl border p-8 text-center">
								<div className="text-muted-foreground mb-4">
									<h3 className="font-semibold mb-2">No products found</h3>
									<p className="text-sm">
										{
											isAIProcessed ? (
												"Try clearing AI filters or adjusting your search terms."
											) : (
												"Try adjusting your search or category filters."
											)
										}
									</p>
								</div>
								{
									isAIProcessed && (
										<Button variant="outline" onClick={clearAIFilters}>
											<X className="w-4 h-4 mr-2" />
											Clear AI filters
										</Button>
									)
								}
							</div>
						)
					}
					{
						totalPages > 1 && products.length > 0 && (
							<div className="flex flex-col items-center gap-4">
								<div className="text-sm text-muted-foreground">
									Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, totalProducts)} of {totalProducts} products
								</div>
								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												href="#"
												onClick={(e) => {
													e.preventDefault()
													if (currentPage > 1) handlePageChange(currentPage - 1)
												}}
												className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
											/>
										</PaginationItem>
										{
											generatePaginationItems().map((item, index) => (
												<PaginationItem key={index}>
													{
														typeof item === 'number' ? (
															<PaginationLink
																href="#"
																onClick={(e) => {
																	e.preventDefault()
																	handlePageChange(item)
																}}
																isActive={currentPage === item}
																className="cursor-pointer"
															>
																{item}
															</PaginationLink>
														) : (
															<PaginationEllipsis />
														)
													}
												</PaginationItem>
											))
										}
										<PaginationItem>
											<PaginationNext
												href="#"
												onClick={(e) => {
													e.preventDefault()
													if (currentPage < totalPages) handlePageChange(currentPage + 1)
												}}
												className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}