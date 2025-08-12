"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { getProducts, searchProductsWithFilters, type ProductWithDetails } from "@/actions/product.action"
import { searchParamsToFilters } from "@/actions/search.action"
import { type SearchFilters } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
						limit: 20
					})
				} else {
					// Use regular search
					const filters = {
						search: sp.get("q") || sp.get("query") || undefined,
						category: sp.get("category") || undefined,
						minPrice: sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined,
						maxPrice: sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined,
						sortBy: (sp.get("sort") as any) || 'newest',
						page: currentPage,
						limit: 20
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

	if (loading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-center py-12">
					<Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
					<span className="ml-2 text-muted-foreground">Loading products...</span>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* AI Search Results Header */}
			{isAIProcessed && aiFilters && (
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
								{aiFilters.categories.map((category: string) => (
									<Badge key={category} variant="outline" className="text-xs">
										{category}
									</Badge>
								))}
								{aiFilters.attributes.map((attr: string) => (
									<Badge key={attr} variant="outline" className="text-xs">
										{attr}
									</Badge>
								))}
								{aiFilters.colors?.map((color: string) => (
									<Badge key={color} variant="outline" className="text-xs">
										{color}
									</Badge>
								))}
								{aiFilters.priceRange?.max && (
									<Badge variant="outline" className="text-xs">
										Under ${aiFilters.priceRange.max}
									</Badge>
								)}
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
			)}

			{/* Search Results Count */}
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{totalProducts === 0 ? (
						"No products found"
					) : (
						`${totalProducts} product${totalProducts === 1 ? "" : "s"} found`
					)}
					{originalQuery && (
						<span> for "{originalQuery}"</span>
					)}
				</div>
			</div>

			{/* Products Grid with Filters */}
			<div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
				<aside className="lg:sticky top-24 h-max">
					<ProductFilters />
				</aside>
				<div>
					<ProductGrid products={products} />
					{products.length === 0 && !loading && (
						<div className="rounded-xl border p-8 text-center">
							<div className="text-muted-foreground mb-4">
								<h3 className="font-semibold mb-2">No products found</h3>
								<p className="text-sm">
									{isAIProcessed ? (
										"Try clearing AI filters or adjusting your search terms."
									) : (
										"Try adjusting your search or category filters."
									)}
								</p>
							</div>
							{isAIProcessed && (
								<Button variant="outline" onClick={clearAIFilters}>
									<X className="w-4 h-4 mr-2" />
									Clear AI filters
								</Button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
