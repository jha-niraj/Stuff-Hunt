import { PrismaClient, ProductType } from '@prisma/client'
import { detectProductType } from '../lib/product-type-detector'

const prisma = new PrismaClient()

async function migrateProductTypes() {
  console.log('Starting product type migration...')
  
  try {
    // Get all products that need type detection
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { productType: ProductType.GENERIC_PRODUCT },
          { productType: null as any }
        ]
      },
      select: {
        id: true,
        name: true,
        category: true,
        subcategory: true,
        productType: true
      }
    })

    console.log(`Found ${products.length} products to migrate`)

    let updated = 0
    
    for (const product of products) {
      const detectedType = detectProductType(
        product.category || undefined,
        product.subcategory || undefined,
        product.name
      )

      if (detectedType !== product.productType) {
        await prisma.product.update({
          where: { id: product.id },
          data: { productType: detectedType }
        })
        
        console.log(`Updated ${product.name}: ${product.productType} -> ${detectedType}`)
        updated++
      }
    }

    console.log(`Migration completed! Updated ${updated} products.`)
    
    // Show summary of product types
    const typeCounts = await prisma.product.groupBy({
      by: ['productType'],
      _count: true,
      where: { isActive: true }
    })

    console.log('\nProduct type distribution:')
    typeCounts.forEach(({ productType, _count }) => {
      console.log(`${productType}: ${_count}`)
    })

  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateProductTypes()
}

export { migrateProductTypes }