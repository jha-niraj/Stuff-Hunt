"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { allProducts, type Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { SearchFilters } from "@/types"
import { searchParamsToFilters } from "@/lib/search"

function filterProducts(products: Product[], params: URLSearchParams, aiFilters?: SearchFilters | null) {
	let result = [...products]

	// Handle AI-enhanced search
	if (aiFilters) {
		// Filter by AI-detected categories
		if (aiFilters.categories.length > 0) {
			result = result.filter((p) => {
				const productCategory = p.category?.toLowerCase() || ""
				return aiFilters.categories.some(cat =>
					productCategory.includes(cat.toLowerCase()) ||
					p.name.toLowerCase().includes(cat.toLowerCase()) ||
					p.shortDescription?.toLowerCase().includes(cat.toLowerCase())
				)
			})
		}

		// Filter by AI-detected attributes
		if (aiFilters.attributes.length > 0) {
			result = result.filter((p) => {
				const searchText = `${p.name} ${p.shortDescription} ${p.description}`.toLowerCase()
				return aiFilters.attributes.some(attr =>
					searchText.includes(attr.toLowerCase())
				)
			})
		}

		// Filter by AI-detected colors
		if (aiFilters.colors && aiFilters.colors.length > 0) {
			result = result.filter((p) => {
				if (!p.colors) return false
				return aiFilters.colors!.some(color =>
					p.colors!.some(pColor =>
						pColor.toLowerCase().includes(color.toLowerCase())
					)
				)
			})
		}

		// Filter by AI-detected sizes
		if (aiFilters.sizes && aiFilters.sizes.length > 0) {
			result = result.filter((p) => {
				if (!p.sizes) return false
				return aiFilters.sizes!.some(size =>
					p.sizes!.includes(size)
				)
			})
		}

		// Filter by AI-detected price range
		if (aiFilters.priceRange) {
			if (aiFilters.priceRange.min) {
				result = result.filter((p) => p.price >= aiFilters.priceRange!.min!)
			}
			if (aiFilters.priceRange.max) {
				result = result.filter((p) => p.price <= aiFilters.priceRange!.max!)
			}
		}
	} else {
		// Fallback to traditional search
		const q = (params.get("q") || params.get("query") || "").toLowerCase().trim()
		if (q) {
			result = result.filter((p) => {
				const searchText = `${p.name} ${p.category} ${p.shortDescription} ${p.description}`.toLowerCase()
				return searchText.includes(q)
			})
		}
	}

	// Apply manual filters from UI
	const category = params.get("category")
	if (category && category !== "All") {
		result = result.filter((p) => p.category === category)
	}

	// Apply sorting
	const sort = params.get("sort") || "featured"
	if (sort === "price-asc") {
		result.sort((a, b) => a.price - b.price)
	} else if (sort === "price-desc") {
		result.sort((a, b) => b.price - a.price)
	} else if (sort === "name") {
		result.sort((a, b) => a.name.localeCompare(b.name))
	}
	// "featured" keeps natural order

	return result
}

export function ProductsClient() {
	const sp = useSearchParams()
	const router = useRouter()

	// Parse AI filters from URL
	const aiFilters = useMemo(() => searchParamsToFilters(sp), [sp])
	const originalQuery = sp.get("q") || ""
	const isAIProcessed = sp.get("aiProcessed") === "true"
	const confidence = Number(sp.get("confidence")) || 0

	const filtered = useMemo(() =>
		filterProducts(allProducts, sp, aiFilters),
		[sp, aiFilters]
	)

	const clearAIFilters = () => {
		const newParams = new URLSearchParams()
		if (originalQuery) {
			newParams.set("q", originalQuery)
			newParams.set("source", "text")
		}
		router.push(`/products?${newParams.toString()}`)
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
								{aiFilters.categories.map((category) => (
									<Badge key={category} variant="outline" className="text-xs">
										{category}
									</Badge>
								))}
								{aiFilters.attributes.map((attr) => (
									<Badge key={attr} variant="outline" className="text-xs">
										{attr}
									</Badge>
								))}
								{aiFilters.colors?.map((color) => (
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
					{filtered.length === 0 ? (
						"No products found"
					) : (
						`${filtered.length} product${filtered.length === 1 ? "" : "s"} found`
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
					<ProductGrid products={filtered} />
					{filtered.length === 0 && (
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
