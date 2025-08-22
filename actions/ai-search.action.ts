"use server"

import { analyzeSearchQuery, analyzeImageSearch, type AISearchResult } from "@/lib/ai-search"

export async function searchWithAI(query: string): Promise<AISearchResult> {
	try {
		const result = await analyzeSearchQuery(query)
		return result
	} catch (error) {
		console.error('Server AI search error:', error)
		return {
			success: false,
			error: 'Failed to process search query'
		}
	}
}

export async function searchWithImage(imageBase64: string): Promise<AISearchResult> {
	try {
		const result = await analyzeImageSearch(imageBase64)
		return result
	} catch (error) {
		console.error('Server AI image search error:', error)
		return {
			success: false,
			error: 'Failed to process image'
		}
	}
}