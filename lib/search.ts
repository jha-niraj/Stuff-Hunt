import { SearchFilters } from "@/types"

// Helper function to convert AI filters to URL search params
export function filtersToSearchParams(filters: SearchFilters): URLSearchParams {
	const params = new URLSearchParams()

	if (filters.categories.length > 0) {
		params.set("categories", filters.categories.join(","))
	}

	if (filters.attributes.length > 0) {
		params.set("attributes", filters.attributes.join(","))
	}

	if (filters.colors && filters.colors.length > 0) {
		params.set("colors", filters.colors.join(","))
	}

	if (filters.sizes && filters.sizes.length > 0) {
		params.set("sizes", filters.sizes.join(","))
	}

	if (filters.brands && filters.brands.length > 0) {
		params.set("brands", filters.brands.join(","))
	}

	if (filters.priceRange) {
		if (filters.priceRange.min) {
			params.set("minPrice", filters.priceRange.min.toString())
		}
		if (filters.priceRange.max) {
			params.set("maxPrice", filters.priceRange.max.toString())
		}
	}

	if (filters.intent) {
		params.set("intent", filters.intent)
	}

	params.set("aiProcessed", "true")
	params.set("confidence", filters.confidence.toString())

	return params
}

// Helper function to parse search params back to filters
export function searchParamsToFilters(searchParams: URLSearchParams): SearchFilters | null {
	if (!searchParams.get("aiProcessed")) {
		return null
	}

	return {
		categories: searchParams.get("categories")?.split(",") || [],
		attributes: searchParams.get("attributes")?.split(",") || [],
		colors: searchParams.get("colors")?.split(",") || [],
		sizes: searchParams.get("sizes")?.split(",") || [],
		brands: searchParams.get("brands")?.split(",") || [],
		priceRange: {
			min: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
			max: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
		},
		intent: searchParams.get("intent") || undefined,
		confidence: Number(searchParams.get("confidence")) || 0,
	}
}