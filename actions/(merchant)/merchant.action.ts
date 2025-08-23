"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from 'cloudinary'
import OpenAI from 'openai'
import { revalidatePath } from "next/cache"
import {
	MerchantDashboardData,
	ProductUploadFormData,
	AIImageAnalysisResponse,
	ProductCreationResult,
	AIProductRecognition,
	ProductSearchMetadata,
	ApiResponse
} from "@/types"

// Configure OpenAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface MerchantDashboardResponse extends ApiResponse {
	data?: MerchantDashboardData
}

export async function getMerchantDashboard(): Promise<MerchantDashboardResponse> {
	try {
		const session = await auth()

		if (!session?.user || session.user.role !== 'SELLER') {
			return {
				success: false,
				error: 'Unauthorized - Seller access required'
			}
		}

		const sellerId = session.user.id

		// Fetch merchant statistics
		const [
			totalProducts,
			totalOrders,
			recentProducts,
			recentOrders,
			orderSums,
			ratingData
		] = await Promise.all([
			// Total products count
			prisma.product.count({
				where: { sellerId, isActive: true }
			}),

			// Total orders count
			prisma.order.count({
				where: {
					items: {
						some: {
							product: { sellerId }
						}
					}
				}
			}),

			// Recent products (last 5)
			prisma.product.findMany({
				where: { sellerId },
				orderBy: { createdAt: 'desc' },
				take: 5,
				select: {
					id: true,
					name: true,
					price: true,
					isActive: true,
					createdAt: true,
					viewCount: true,
					_count: {
						select: { orderItems: true }
					}
				}
			}),

			// Recent orders (last 5)
			prisma.order.findMany({
				where: {
					items: {
						some: {
							product: { sellerId }
						}
					}
				},
				orderBy: { createdAt: 'desc' },
				take: 5,
				include: {
					buyer: {
						select: { name: true, email: true }
					},
					items: {
						where: {
							product: { sellerId }
						},
						include: {
							product: {
								select: { name: true }
							}
						}
					}
				}
			}),

			// Order totals for revenue calculation
			prisma.orderItem.aggregate({
				where: {
					product: { sellerId }
				},
				_sum: {
					totalPrice: true,
					quantity: true
				}
			}),

			// Rating data
			prisma.review.aggregate({
				where: {
					product: { sellerId }
				},
				_avg: { rating: true },
				_count: { rating: true }
			})
		])

		const totalRevenue = orderSums._sum.totalPrice || 0
		const averageRating = ratingData._avg.rating || 0

		// Calculate growth (mock data for now - would need historical data)
		const monthlyGrowth = {
			products: 12,
			orders: 23,
			revenue: 18,
			rating: 0.2
		}

		const dashboardData: MerchantDashboardData = {
			stats: {
				totalProducts,
				totalOrders,
				totalRevenue,
				averageRating,
				monthlyGrowth
			},
			recentProducts: recentProducts.map((product: any) => ({
				id: product.id,
				name: product.name,
				price: product.price,
				status: product.isActive ? 'ACTIVE' : 'INACTIVE',
				createdAt: product.createdAt,
				viewCount: product.viewCount,
				orderCount: product._count.orderItems
			})),
			recentOrders: recentOrders.map((order: any) => ({
				id: order.id,
				customerName: order.buyer.name,
				customerEmail: order.buyer.email,
				amount: order.total,
				status: order.status,
				createdAt: order.createdAt,
				items: order.items.map((item: any) => ({
					productName: item.product.name,
					quantity: item.quantity,
					price: item.totalPrice
				}))
			}))
		}

		return {
			success: true,
			data: dashboardData
		}

	} catch (error) {
		console.error('Error fetching merchant dashboard:', error)
		return {
			success: false,
			error: 'Failed to fetch dashboard data'
		}
	}
}

export async function analyzeProductImageAction(
	image: File,
	prompt?: string
): Promise<AIImageAnalysisResponse> {
	try {
		const session = await auth()

		if (!session?.user || session.user.role !== 'SELLER') {
			return {
				success: false,
				error: 'Unauthorized - Seller access required',
				confidence: 0
			}
		}

		// Convert image to base64
		const arrayBuffer = await image.arrayBuffer()
		const base64 = Buffer.from(arrayBuffer).toString('base64')
		const imageUrl = `data:${image.type};base64,${base64}`

		// Create comprehensive prompt for product analysis
		const analysisPrompt = `
Analyze this product image and extract detailed information. ${prompt ? `Additional context: ${prompt}` : ''}

Please provide a comprehensive analysis in the following JSON format:
{
  "title": "Clear, SEO-friendly product name",
  "shortDescription": "Brief 1-2 sentence description for listings",
  "detailedDescription": "Comprehensive description with features and benefits",
  "category": "Primary product category",
  "subcategory": "Specific subcategory if applicable",
  "targetAgeGroup": "Target age group (if applicable)",
  "suggestedSizes": ["array of size options if applicable"],
  "colors": ["array of visible colors"],
  "materials": ["array of materials if identifiable"],
  "brand": "Brand name if visible or identifiable",
  "features": ["array of key features and benefits"],
  "tags": ["array of descriptive tags for search"],
  "searchKeywords": ["array of SEO keywords for search optimization"]
}

Focus on accuracy and be specific about visible details. If you're unsure about something, provide your best estimate but indicate uncertainty.
`

		const response = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: analysisPrompt },
						{
							type: "image_url",
							image_url: {
								url: imageUrl,
								detail: "high"
							}
						}
					]
				}
			],
			max_tokens: 1000,
			temperature: 0.3
		})

		const analysis = response.choices[0]?.message?.content

		if (!analysis) {
			return {
				success: false,
				error: 'No analysis received from AI',
				confidence: 0
			}
		}

		try {
			// Parse the JSON response
			const parsedAnalysis: AIProductRecognition = JSON.parse(analysis)

			// Generate search metadata
			const searchMetadata: ProductSearchMetadata = {
				primaryKeywords: parsedAnalysis.searchKeywords || [],
				secondaryKeywords: parsedAnalysis.tags || [],
				semanticTags: [
					...(parsedAnalysis.features || []),
					...(parsedAnalysis.colors || []),
					...(parsedAnalysis.materials || [])
				],
				categoryHierarchy: [
					parsedAnalysis.category,
					parsedAnalysis.subcategory
				].filter(Boolean) as string[],
				attributes: {
					colors: parsedAnalysis.colors || [],
					materials: parsedAnalysis.materials || [],
					sizes: parsedAnalysis.suggestedSizes || [],
					targetAge: parsedAnalysis.targetAgeGroup || '',
					brand: parsedAnalysis.brand || ''
				},
				searchBoostTerms: [
					parsedAnalysis.title,
					parsedAnalysis.category,
					...(parsedAnalysis.features || [])
				].filter(Boolean)
			}

			return {
				success: true,
				analysis: parsedAnalysis,
				metadata: searchMetadata,
				confidence: 0.85 // High confidence for GPT-4 vision
			}

		} catch (parseError) {
			console.error('Error parsing AI response:', parseError)
			return {
				success: false,
				error: 'Failed to parse AI analysis response',
				confidence: 0
			}
		}

	} catch (error) {
		console.error('Error analyzing product image:', error)
		return {
			success: false,
			error: 'Failed to analyze image',
			confidence: 0
		}
	}
}

export async function createProductAction(
	data: ProductUploadFormData
): Promise<ProductCreationResult> {
	try {
		const session = await auth()

		if (!session?.user || session.user.role !== 'SELLER') {
			return {
				success: false,
				error: 'Unauthorized - Seller access required'
			}
		}

		const sellerId = session.user.id

		// Upload images to Cloudinary
		const imageUrls: string[] = []

		for (const image of data.images) {
			const arrayBuffer = await image.arrayBuffer()
			const base64 = Buffer.from(arrayBuffer).toString('base64')
			const imageUrl = `data:${image.type};base64,${base64}`

			const result = await cloudinary.uploader.upload(imageUrl, {
				folder: 'stuffhunt/products',
				transformation: [
					{ width: 800, height: 800, crop: 'fill', quality: 'auto' }
				]
			})

			imageUrls.push(result.secure_url)
		}

		// Combine AI metadata with search metadata
		const combinedMetadata = {
			aiGenerated: data.aiGenerated || {},
			searchMetadata: data.searchMetadata || {},
			generatedAt: new Date().toISOString()
		}

		// Generate slug from product name
		const slug = data.name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '')

		// Create product in database
		const product = await prisma.product.create({
			data: {
				name: data.name,
				slug: slug,
				price: data.price,
				shortDescription: data.shortDescription,
				detailedDescription: data.detailedDescription,
				images: imageUrls,
				isActive: data.isActive,
				sellerId,
				aiMetadata: combinedMetadata as any, // Type assertion for Prisma Json field
				categories: {
					connect: data.categoryIds.map(id => ({ id }))
				}
			},
			include: {
				categories: true,
				seller: {
					select: {
						id: true,
						name: true,
						companyName: true,
						verificationBadge: true
					}
				}
			}
		})

		// Revalidate relevant pages
		revalidatePath('/merchant/dashboard')
		revalidatePath('/products')

		return {
			success: true,
			product: product as any, // Type assertion since Prisma types are complex
			aiSuggestions: data.aiGenerated
		}

	} catch (error) {
		console.error('Error creating product:', error)
		return {
			success: false,
			error: 'Failed to create product'
		}
	}
}
