"use server"

import { prisma } from "@/lib/prisma"

// Product types based on Prisma schema
export interface ProductWithDetails {
	id: string
	slug: string
	name: string
	price: number
	originalPrice?: number | null
	shortDescription?: string | null
	detailedDescription?: string | null
	images: string[]
	viewCount: number
	isActive: boolean
	inStock: boolean
	stockQuantity: number
	colors?: string[]
	sizes?: string[]
	discountPercentage?: number | null
	brand?: string | null
	sku?: string | null
	createdAt: Date
	updatedAt: Date
	seller: {
		id: string
		name: string
		verificationBadge: boolean
	}
	categories: {
		id: string
		name: string
		description?: string | null
	}[]
	_count?: {
		reviews: number
		orderItems: number
		likes: number
	}
	averageRating?: number
}

export interface ProductFilters {
	category?: string
	minPrice?: number
	maxPrice?: number
	search?: string
	colors?: string[]
	sizes?: string[]
	brands?: string[]
	inStock?: boolean
	sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating' | 'popular'
	page?: number
	limit?: number
}

export interface ProductListResponse {
	success: boolean
	products: ProductWithDetails[]
	totalProducts: number
	totalPages: number
	currentPage: number
	error?: string
}

export interface ProductResponse {
	success: boolean
	product?: ProductWithDetails
	error?: string
}

// Get all products with filters and pagination
export async function getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
	try {
		const {
			category,
			minPrice,
			maxPrice,
			search,
			colors,
			sizes,
			brands,
			inStock,
			sortBy = 'newest',
			page = 1,
			limit = 20
		} = filters

		const skip = (page - 1) * limit

		// Build where clause
		const where: any = {
			isActive: true,
			...(inStock && { inStock: true }),
		}

		// Add price filters
		if (minPrice || maxPrice) {
			where.price = {}
			if (minPrice) where.price.gte = minPrice
			if (maxPrice) where.price.lte = maxPrice
		}

		// Add search filters
		if (search) {
			where.OR = [
				{ name: { contains: search, mode: 'insensitive' } },
				{ shortDescription: { contains: search, mode: 'insensitive' } },
				{ detailedDescription: { contains: search, mode: 'insensitive' } },
				{ brand: { contains: search, mode: 'insensitive' } },
			]
		}

		// Add category filter
		if (category) {
			where.categories = {
				some: {
					name: { equals: category, mode: 'insensitive' }
				}
			}
		}

		// Add color filters
		if (colors && colors.length > 0) {
			where.colors = {
				hasSome: colors
			}
		}

		// Add size filters
		if (sizes && sizes.length > 0) {
			where.sizes = {
				hasSome: sizes
			}
		}

		// Add brand filters
		if (brands && brands.length > 0) {
			where.brand = {
				in: brands,
				mode: 'insensitive'
			}
		}


		// Build orderBy clause
		let orderBy: any = { createdAt: 'desc' } // default

		switch (sortBy) {
			case 'oldest':
				orderBy = { createdAt: 'asc' }
				break
			case 'price_low':
				orderBy = { price: 'asc' }
				break
			case 'price_high':
				orderBy = { price: 'desc' }
				break
			case 'popular':
				orderBy = { viewCount: 'desc' }
				break
			case 'rating':
				// This would need a computed field or separate query
				orderBy = { createdAt: 'desc' }
				break
		}

		// Get products and total count
		const [products, totalProducts] = await Promise.all([
			prisma.product.findMany({
				where,
				orderBy,
				skip,
				take: limit,
				include: {
					seller: {
						select: {
							id: true,
							name: true,
							verificationBadge: true
						}
					},
					categories: {
						select: {
							id: true,
							name: true,
							description: true
						}
					},
					_count: {
						select: {
							reviews: true,
							orderItems: true,
							likes: true
						}
					}
				}
			}),
			prisma.product.count({ where })
		])

		// Calculate average ratings (this could be optimized with a computed field)
		const productsWithRatings = await Promise.all(
			products.map(async (product) => {
				const avgRating = await prisma.review.aggregate({
					where: { productId: product.id },
					_avg: { rating: true }
				})

				return {
					...product,
					averageRating: avgRating._avg.rating || 0
				}
			})
		)

		const totalPages = Math.ceil(totalProducts / limit)

		return {
			success: true,
			products: productsWithRatings,
			totalProducts,
			totalPages,
			currentPage: page
		}

	} catch (error) {
		console.error('Error fetching products:', error)
		return {
			success: false,
			products: [],
			totalProducts: 0,
			totalPages: 0,
			currentPage: 1,
			error: 'Failed to fetch products'
		}
	}
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<ProductResponse> {
	try {
		const product = await prisma.product.findUnique({
			where: {
				slug,
				isActive: true
			},
			include: {
				seller: {
					select: {
						id: true,
						name: true,
						verificationBadge: true
					}
				},
				categories: {
					select: {
						id: true,
						name: true,
						description: true
					}
				},
				_count: {
					select: {
						reviews: true,
						orderItems: true,
						likes: true
					}
				}
			}
		})

		if (!product) {
			return {
				success: false,
				error: 'Product not found'
			}
		}

		// Get average rating
		const avgRating = await prisma.review.aggregate({
			where: { productId: product.id },
			_avg: { rating: true }
		})

		// Increment view count
		await prisma.product.update({
			where: { id: product.id },
			data: { viewCount: { increment: 1 } }
		})

		return {
			success: true,
			product: {
				...product,
				averageRating: avgRating._avg.rating || 0
			}
		}

	} catch (error) {
		console.error('Error fetching product:', error)
		return {
			success: false,
			error: 'Failed to fetch product'
		}
	}
}

// Get related products
export async function getRelatedProducts(productId: string, categoryIds: string[], limit: number = 4): Promise<ProductWithDetails[]> {
	try {
		const products = await prisma.product.findMany({
			where: {
				id: { not: productId },
				isActive: true,
				categories: {
					some: {
						id: { in: categoryIds }
					}
				}
			},
			take: limit,
			orderBy: { viewCount: 'desc' },
			include: {
				seller: {
					select: {
						id: true,
						name: true,
						verificationBadge: true
					}
				},
				categories: {
					select: {
						id: true,
						name: true,
						description: true
					}
				},
				_count: {
					select: {
						reviews: true,
						orderItems: true,
						likes: true
					}
				}
			}
		})

		// If not enough related products, fill with popular products
		if (products.length < limit) {
			const additionalProducts = await prisma.product.findMany({
				where: {
					id: {
						notIn: [productId, ...products.map(p => p.id)]
					},
					isActive: true
				},
				take: limit - products.length,
				orderBy: { viewCount: 'desc' },
				include: {
					seller: {
						select: {
							id: true,
							name: true,
							verificationBadge: true
						}
					},
					categories: {
						select: {
							id: true,
							name: true,
							description: true
						}
					},
					_count: {
						select: {
							reviews: true,
							orderItems: true,
							likes: true
						}
					}
				}
			})

			products.push(...additionalProducts)
		}

		// Add average ratings
		const productsWithRatings = await Promise.all(
			products.map(async (product) => {
				const avgRating = await prisma.review.aggregate({
					where: { productId: product.id },
					_avg: { rating: true }
				})

				return {
					...product,
					averageRating: avgRating._avg.rating || 0
				}
			})
		)

		return productsWithRatings

	} catch (error) {
		console.error('Error fetching related products:', error)
		return []
	}
}

// Get featured products
export async function getFeaturedProducts(limit: number = 8): Promise<ProductWithDetails[]> {
	try {
		const products = await prisma.product.findMany({
			where: {
				isActive: true,
				inStock: true
			},
			take: limit,
			orderBy: [
				{ viewCount: 'desc' },
				{ createdAt: 'desc' }
			],
			include: {
				seller: {
					select: {
						id: true,
						name: true,
						verificationBadge: true
					}
				},
				categories: {
					select: {
						id: true,
						name: true,
						description: true
					}
				},
				_count: {
					select: {
						reviews: true,
						orderItems: true,
						likes: true
					}
				}
			}
		})

		// Add average ratings
		const productsWithRatings = await Promise.all(
			products.map(async (product) => {
				const avgRating = await prisma.review.aggregate({
					where: { productId: product.id },
					_avg: { rating: true }
				})

				return {
					...product,
					averageRating: avgRating._avg.rating || 0
				}
			})
		)

		return productsWithRatings

	} catch (error) {
		console.error('Error fetching featured products:', error)
		return []
	}
}

// Get products by IDs for comparison
export async function getProductsByIds(ids: string[]): Promise<ProductWithDetails[]> {
	try {
		const products = await prisma.product.findMany({
			where: {
				id: {
					in: ids,
				},
				isActive: true,
			},
			include: {
				seller: {
					select: {
						id: true,
						name: true,
						verificationBadge: true
					}
				},
				categories: {
					select: {
						id: true,
						name: true,
						description: true
					}
				},
				_count: {
					select: {
						reviews: true,
						orderItems: true,
						likes: true
					}
				}
			}
		})

		// Add average ratings
		const productsWithRatings = await Promise.all(
			products.map(async (product) => {
				const avgRating = await prisma.review.aggregate({
					where: { productId: product.id },
					_avg: { rating: true }
				})

				return {
					...product,
					averageRating: avgRating._avg.rating || 0
				}
			})
		)

		return productsWithRatings

	} catch (error) {
		console.error('Error fetching products by IDs:', error)
		return []
	}
}

// Get all categories
export async function getCategories() {
	try {
		const categories = await prisma.category.findMany({
			include: {
				_count: {
					select: {
						products: true
					}
				}
			},
			orderBy: { name: 'asc' }
		})

		return {
			success: true,
			categories
		}
	} catch (error) {
		console.error('Error fetching categories:', error)
		return {
			success: false,
			categories: [],
			error: 'Failed to fetch categories'
		}
	}
}

// Search products with AI filters
export async function searchProductsWithFilters(filters: {
	categories?: string[]
	attributes?: string[]
	colors?: string[]
	sizes?: string[]
	brands?: string[]
	priceRange?: { min?: number; max?: number }
	query?: string
	page?: number
	limit?: number
}) {
	try {
		const {
			categories,
			colors,
			sizes,
			brands,
			priceRange,
			query,
			page = 1,
			limit = 20
		} = filters

		const productFilters: ProductFilters = {
			search: query,
			colors,
			sizes,
			brands,
			minPrice: priceRange?.min,
			maxPrice: priceRange?.max,
			page,
			limit
		}

		// If categories are provided, use the first one as the main category filter
		if (categories && categories.length > 0) {
			productFilters.category = categories[0]
		}

		return await getProducts(productFilters)

	} catch (error) {
		console.error('Error searching products with filters:', error)
		return {
			success: false,
			products: [],
			totalProducts: 0,
			totalPages: 0,
			currentPage: 1,
			error: 'Failed to search products'
		}
	}
}