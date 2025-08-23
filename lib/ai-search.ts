import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_API,
})

export interface AISearchResult {
	success: boolean
	searchQuery?: string
	filters?: {
		categories?: string[]
		attributes?: string[]
		colors?: string[]
		sizes?: string[]
		brands?: string[]
		priceRange?: {
			min?: number
			max?: number
		}
	}
	confidence?: number
	error?: string
}

export interface ProductContext {
	categories: string[]
	brands: string[]
	colors: string[]
	sizes: string[]
	priceRanges: {
		min: number
		max: number
		average: number
	}
}

// System prompt for AI search
const SEARCH_SYSTEM_PROMPT = `You are an AI assistant for an e-commerce platform called StuffHunt. Your job is to analyze user search queries (text or image descriptions) and convert them into structured search filters.

	Available product data context:
		- Categories: Electronics, Clothing, Home & Garden, Sports, Books, Beauty, Automotive, etc.
		- Common brands: Nike, Adidas, Apple, Samsung, Sony, Canon, Dell, HP, etc.
		- Colors: Black, White, Red, Blue, Green, Yellow, Pink, Purple, Orange, Brown, Gray, etc.
		- Sizes: XS, S, M, L, XL, XXL, 28, 30, 32, 34, 36, 38, 40, 42, etc.

	When a user provides a search query, analyze it and return a JSON response with the following structure:
	{
		"searchQuery": "refined search terms",
		"filters": {
			"categories": ["category1", "category2"],
			"attributes": ["attribute1", "attribute2"],
			"colors": ["color1", "color2"],
			"sizes": ["size1", "size2"],
			"brands": ["brand1", "brand2"],
			"priceRange": {
				"min": number,
				"max": number
			}
		},
  	"confidence": 0.85
	}

	Rules:
		1. Always include a refined searchQuery that captures the main intent
		2. Only include filters that are explicitly mentioned or strongly implied
		3. For colors, use standard color names (Black, White, Red, etc.)
		4. For categories, use broad categories (Electronics, Clothing, etc.)
		5. For price ranges, only include if explicitly mentioned or strongly implied
		6. Confidence should be 0.0-1.0 based on how certain you are about the interpretation
		7. If the query is too vague, focus on the searchQuery and minimal filters

	Examples:
		- "black wireless headphones under $100" → categories: ["Electronics"], colors: ["Black"], priceRange: {max: 100}
		- "red nike running shoes size 10" → categories: ["Sports"], colors: ["Red"], brands: ["Nike"], sizes: ["10"]
		- "laptop for gaming" → categories: ["Electronics"], attributes: ["gaming"]
`

export async function analyzeSearchQuery(
	query: string
): Promise<AISearchResult> {
	try {
		if (!process.env.OPENAI_API_KEY) {
			return {
				success: false,
				error: 'OpenAI API key not configured'
			}
		}

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: SEARCH_SYSTEM_PROMPT
				},
				{
					role: 'user',
					content: `Analyze this search query: "${query}"`
				}
			],
			temperature: 0.3,
			max_tokens: 500,
			response_format: { type: 'json_object' }
		})

		const response = completion.choices[0]?.message?.content
		if (!response) {
			return {
				success: false,
				error: 'No response from AI'
			}
		}

		const parsed = JSON.parse(response)

		return {
			success: true,
			searchQuery: parsed.searchQuery || query,
			filters: parsed.filters || {},
			confidence: parsed.confidence || 0.5
		}

	} catch (error) {
		console.error('AI search analysis error:', error)
		return {
			success: false,
			error: 'Failed to analyze search query',
			// Fallback to basic search
			searchQuery: query,
			confidence: 0.1
		}
	}
}

export async function analyzeImageSearch(
	imageBase64: string
): Promise<AISearchResult> {
	try {
		if (!process.env.OPENAI_API_KEY) {
			return {
				success: false,
				error: 'OpenAI API key not configured'
			}
		}

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content: SEARCH_SYSTEM_PROMPT + `
						For image analysis, describe what you see in the image and then convert that description into search filters. Focus on:
						- Product type and category
						- Colors visible in the image
						- Brand if visible
						- Style or attributes
						- Any text visible in the image
						`
				},
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: 'Analyze this product image and convert it to search filters:'
						},
						{
							type: 'image_url',
							image_url: {
								url: `data:image/jpeg;base64,${imageBase64}`
							}
						}
					]
				}
			],
			temperature: 0.3,
			max_tokens: 500,
			response_format: { type: 'json_object' }
		})

		const response = completion.choices[0]?.message?.content
		if (!response) {
			return {
				success: false,
				error: 'No response from AI'
			}
		}

		const parsed = JSON.parse(response)

		return {
			success: true,
			searchQuery: parsed.searchQuery || 'product search',
			filters: parsed.filters || {},
			confidence: parsed.confidence || 0.5
		}

	} catch (error) {
		console.error('AI image analysis error:', error)
		return {
			success: false,
			error: 'Failed to analyze image'
		}
	}
}

// Helper function to convert file to base64
export function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			const result = reader.result as string
			// Remove the data:image/jpeg;base64, prefix
			const base64 = result.split(',')[1]
			resolve(base64)
		}
		reader.onerror = error => reject(error)
	})
}