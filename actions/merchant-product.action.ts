"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

// Types for Excel product data
export interface ExcelProductData {
  productName: string
  category: string
  subcategory: string
  brand: string
  priceINR: number
  discountPercent: number
  finalPriceINR: number
  productDescription: string
  keyFeatures: string
  productType: string
  imageURL1?: string
  imageURL2?: string
  imageURL3?: string
  imageURL4?: string
  imageURL5?: string
  stock: number
  extraOptions?: string
  sizeOptions?: string
  sellerName: string
  itemsTempQty?: number
  returnPolicy?: string
}

export interface MerchantProductsResponse {
  success: boolean
  products: any[]
  totalProducts: number
  totalPages: number
  currentPage: number
  error?: string
}

// Generate slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Upload single product
export async function uploadSingleProduct(productData: {
  name: string
  category: string
  subcategory?: string
  brand?: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  shortDescription?: string
  detailedDescription?: string
  keyFeatures?: string
  productType?: string
  images: string[]
  stockQuantity: number
  extraOptions?: string
  sizeOptions?: string
  returnPolicy?: string
}) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { success: false, error: 'Unauthorized' }
    }

    const slug = generateSlug(productData.name)
    
    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    })
    
    if (existingProduct) {
      return { success: false, error: 'Product with this name already exists' }
    }

    // Calculate final price
    const finalPrice = productData.discountPercentage 
      ? productData.price * (1 - productData.discountPercentage / 100)
      : productData.price

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug,
        price: productData.price,
        originalPrice: productData.originalPrice || productData.price,
        finalPrice,
        shortDescription: productData.shortDescription,
        detailedDescription: productData.detailedDescription,
        keyFeatures: productData.keyFeatures,
        productType: productData.productType,
        images: productData.images,
        stockQuantity: productData.stockQuantity,
        category: productData.category,
        subcategory: productData.subcategory,
        brand: productData.brand,
        extraOptions: productData.extraOptions,
        sizeOptions: productData.sizeOptions,
        returnPolicy: productData.returnPolicy,
        discountPercentage: productData.discountPercentage,
        sellerId: session.user.id,
        inStock: productData.stockQuantity > 0,
      }
    })

    // Create or connect categories
    if (productData.category) {
      const category = await prisma.category.upsert({
        where: { name: productData.category },
        update: {},
        create: { name: productData.category }
      })

      await prisma.product.update({
        where: { id: product.id },
        data: {
          categories: {
            connect: { id: category.id }
          }
        }
      })
    }

    revalidatePath('/merchant/products')
    return { success: true, product }

  } catch (error) {
    console.error('Error uploading product:', error)
    return { success: false, error: 'Failed to upload product' }
  }
}

// Upload products from Excel
export async function uploadProductsFromExcel(products: ExcelProductData[]) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { success: false, error: 'Unauthorized' }
    }

    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (const productData of products) {
      try {
        const slug = generateSlug(productData.productName)
        
        // Check if product already exists
        const existingProduct = await prisma.product.findUnique({
          where: { slug }
        })
        
        if (existingProduct) {
          results.failed++
          results.errors.push(`Product "${productData.productName}" already exists`)
          continue
        }

        // Collect image URLs
        const images = [
          productData.imageURL1,
          productData.imageURL2,
          productData.imageURL3,
          productData.imageURL4,
          productData.imageURL5
        ].filter(Boolean) as string[]

        // Create product
        const product = await prisma.product.create({
          data: {
            name: productData.productName,
            slug,
            price: productData.priceINR,
            originalPrice: productData.priceINR,
            finalPrice: productData.finalPriceINR,
            shortDescription: productData.productDescription,
            detailedDescription: productData.productDescription,
            keyFeatures: productData.keyFeatures,
            productType: productData.productType,
            images,
            stockQuantity: productData.stock,
            category: productData.category,
            subcategory: productData.subcategory,
            brand: productData.brand,
            extraOptions: productData.extraOptions,
            sizeOptions: productData.sizeOptions,
            returnPolicy: productData.returnPolicy,
            itemsTempQty: productData.itemsTempQty,
            discountPercentage: productData.discountPercent,
            sellerId: session.user.id,
            inStock: productData.stock > 0,
          }
        })

        // Create or connect categories
        if (productData.category) {
          const category = await prisma.category.upsert({
            where: { name: productData.category },
            update: {},
            create: { name: productData.category }
          })

          await prisma.product.update({
            where: { id: product.id },
            data: {
              categories: {
                connect: { id: category.id }
              }
            }
          })
        }

        results.successful++

      } catch (error) {
        results.failed++
        results.errors.push(`Failed to upload "${productData.productName}": ${error}`)
      }
    }

    revalidatePath('/merchant/products')
    return { 
      success: true, 
      message: `Upload completed: ${results.successful} successful, ${results.failed} failed`,
      results 
    }

  } catch (error) {
    console.error('Error uploading products from Excel:', error)
    return { success: false, error: 'Failed to upload products from Excel' }
  }
}

// Get merchant's products with pagination
export async function getMerchantProducts(page: number = 1, limit: number = 20): Promise<MerchantProductsResponse> {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { 
        success: false, 
        products: [], 
        totalProducts: 0, 
        totalPages: 0, 
        currentPage: 1,
        error: 'Unauthorized' 
      }
    }

    const skip = (page - 1) * limit

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where: { sellerId: session.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          categories: {
            select: {
              id: true,
              name: true
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
      prisma.product.count({
        where: { sellerId: session.user.id }
      })
    ])

    const totalPages = Math.ceil(totalProducts / limit)

    return {
      success: true,
      products,
      totalProducts,
      totalPages,
      currentPage: page
    }

  } catch (error) {
    console.error('Error fetching merchant products:', error)
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

// Delete product
export async function deleteProduct(productId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if product belongs to the seller
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: session.user.id
      }
    })

    if (!product) {
      return { success: false, error: 'Product not found or unauthorized' }
    }

    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath('/merchant/products')
    return { success: true, message: 'Product deleted successfully' }

  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}

// Update product status (active/inactive)
export async function updateProductStatus(productId: string, isActive: boolean) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if product belongs to the seller
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: session.user.id
      }
    })

    if (!product) {
      return { success: false, error: 'Product not found or unauthorized' }
    }

    await prisma.product.update({
      where: { id: productId },
      data: { isActive }
    })

    revalidatePath('/merchant/products')
    return { success: true, message: `Product ${isActive ? 'activated' : 'deactivated'} successfully` }

  } catch (error) {
    console.error('Error updating product status:', error)
    return { success: false, error: 'Failed to update product status' }
  }
}

// Update product details
export async function updateProduct(productId: string, updateData: Partial<{
  name: string
  price: number
  originalPrice: number
  finalPrice: number
  shortDescription: string
  detailedDescription: string
  keyFeatures: string
  productType: string
  images: string[]
  stockQuantity: number
  category: string
  subcategory: string
  brand: string
  extraOptions: string
  sizeOptions: string
  returnPolicy: string
  discountPercentage: number
  isActive: boolean
  inStock: boolean
}>) {
  try {
    const session = await auth()
    if (!session?.user?.id || session.user.role !== 'SELLER') {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if product belongs to the seller
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: session.user.id
      }
    })

    if (!product) {
      return { success: false, error: 'Product not found or unauthorized' }
    }

    // Update slug if name changed
    let slug = product.slug
    if (updateData.name && updateData.name !== product.name) {
      slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      // Check if new slug already exists
      const existingProduct = await prisma.product.findFirst({
        where: {
          slug,
          id: { not: productId }
        }
      })
      
      if (existingProduct) {
        slug = `${slug}-${Date.now()}`
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...updateData,
        slug,
        updatedAt: new Date()
      }
    })

    // Update categories if category changed
    if (updateData.category) {
      const category = await prisma.category.upsert({
        where: { name: updateData.category },
        update: {},
        create: { name: updateData.category }
      })

      await prisma.product.update({
        where: { id: productId },
        data: {
          categories: {
            set: [{ id: category.id }]
          }
        }
      })
    }

    revalidatePath('/merchant/products')
    revalidatePath(`/merchant/products/${productId}`)
    revalidatePath(`/products/${slug}`)
    
    return { success: true, product: updatedProduct, message: 'Product updated successfully' }

  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  }
}