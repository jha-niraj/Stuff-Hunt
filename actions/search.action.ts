"use server"

import { SearchFilters } from "@/types"
import OpenAI from "openai"
import { cache } from "react"

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API,
})

export type AISearchResult = {
	success: boolean
	filters?: SearchFilters
	originalQuery: string
	processedQuery?: string
	error?: string
	fallbackToText?: boolean
}

// Cache AI responses for 1 hour to reduce API calls
const getCachedAIResponse = cache(async (query: string): Promise<AISearchResult> => {
	return processSearchWithAI(query)
})

async function processSearchWithAI(query: string): Promise<AISearchResult> {
	try {
		const prompt = `
You are a product search assistant for an e-commerce platform. Analyze the user's search query and extract structured information to help filter products.

User Query: "${query}"

Extract the following information and respond with ONLY a valid JSON object:

{
  "categories": ["array of relevant product categories like clothing, electronics, home, etc."],
  "attributes": ["array of specific attributes like material, style, features"],
  "priceRange": {
    "min": number or null,
    "max": number or null
  },
  "colors": ["array of colors mentioned"],
  "sizes": ["array of sizes mentioned like S, M, L, XL, or specific measurements"],
  "brands": ["array of brand names if mentioned"],
  "intent": "brief description of user intent like casual, formal, work, sports, etc.",
  "confidence": number between 0-1 indicating how confident you are in the extraction
}

Guidelines:
- If no price is mentioned, set priceRange to null
- Categories should be broad (clothing, electronics, home, sports, etc.)
- Attributes should be specific (cotton, wireless, waterproof, etc.)
- Colors should be standard color names
- Sizes should be standardized (S, M, L, XL for clothing, or specific measurements)
- Intent should capture the use case or style preference
- Confidence should reflect how clear and specific the query is

Examples:
Query: "blue jeans for work under $50"
Response: {
  "categories": ["clothing", "jeans", "workwear"],
  "attributes": ["denim", "professional"],
  "priceRange": {"min": null, "max": 50},
  "colors": ["blue"],
  "sizes": [],
  "brands": [],
  "intent": "professional workwear",
  "confidence": 0.9
}

Query: "wireless headphones"
Response: {
  "categories": ["electronics", "audio", "headphones"],
  "attributes": ["wireless", "bluetooth"],
  "priceRange": null,
  "colors": [],
  "sizes": [],
  "brands": [],
  "intent": "audio entertainment",
  "confidence": 0.8
}
`

		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: "You are a product search assistant. Always respond with valid JSON only, no additional text or formatting."
				},
				{
					role: "user",
					content: prompt
				}
			],
			temperature: 0.3,
			max_tokens: 500,
		})

		const response = completion.choices[0]?.message?.content?.trim()

		if (!response) {
			throw new Error("No response from AI")
		}

		// Parse the JSON response
		let filters: SearchFilters
		try {
			filters = JSON.parse(response)
		} catch (parseError) {
			console.error("Failed to parse AI response:", response)
			throw new Error("Invalid JSON response from AI")
		}

		// Validate the response structure
		if (!filters.categories || !Array.isArray(filters.categories)) {
			throw new Error("Invalid AI response structure")
		}

		return {
			success: true,
			filters,
			originalQuery: query,
			processedQuery: `AI processed: ${filters.categories.join(", ")} ${filters.attributes?.join(", ") || ""}`.trim()
		}

	} catch (error) {
		console.error("AI search processing error:", error)

		// Return fallback result
		return {
			success: false,
			originalQuery: query,
			error: error instanceof Error ? error.message : "AI processing failed",
			fallbackToText: true
		}
	}
}

// Main search action that uses caching
export async function processSearchQuery(query: string): Promise<AISearchResult> {
	if (!query || query.trim().length === 0) {
		return {
			success: false,
			originalQuery: query,
			error: "Empty query",
			fallbackToText: true
		}
	}

	const trimmedQuery = query.trim().toLowerCase()

	// For very short queries, skip AI processing
	if (trimmedQuery.length < 3) {
		return {
			success: false,
			originalQuery: query,
			error: "Query too short",
			fallbackToText: true
		}
	}

	try {
		return await getCachedAIResponse(trimmedQuery)
	} catch (error) {
		console.error("Search processing error:", error)
		return {
			success: false,
			originalQuery: query,
			error: "Processing failed",
			fallbackToText: true
		}
	}
}

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