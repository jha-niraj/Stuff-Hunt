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

// Helper function to convert search params to filters
export function searchParamsToFilters(searchParams: URLSearchParams): SearchFilters | null {
	const categories = searchParams.get("categories")?.split(",") || []
	const attributes = searchParams.get("attributes")?.split(",") || []
	const colors = searchParams.get("colors")?.split(",") || []
	const sizes = searchParams.get("sizes")?.split(",") || []
	const brands = searchParams.get("brands")?.split(",") || []
	const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
	const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
	const confidence = Number(searchParams.get("confidence")) || 0

	if (categories.length === 0 && attributes.length === 0 && colors.length === 0 && sizes.length === 0 && brands.length === 0 && !minPrice && !maxPrice) {
		return null
	}

	return {
		categories,
		attributes,
		colors,
		sizes,
		brands,
		priceRange: minPrice || maxPrice ? { min: minPrice, max: maxPrice } : undefined,
		confidence
	}
}