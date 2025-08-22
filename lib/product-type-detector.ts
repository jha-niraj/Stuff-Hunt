import { ProductType } from "@prisma/client"

export interface ProductTypeMapping {
    component: string
    displayName: string
    category: string
    subcategory?: string
}

// Product type mappings for component selection
export const PRODUCT_TYPE_MAPPINGS: Record<ProductType, ProductTypeMapping> = {
    // Electronics
    ELECTRONICS_LAPTOP: {
        component: 'ElectronicsLaptop',
        displayName: 'Laptop',
        category: 'Electronics',
        subcategory: 'Laptops'
    },
    ELECTRONICS_SMARTPHONE: {
        component: 'ElectronicsSmartphone',
        displayName: 'Smartphone',
        category: 'Electronics',
        subcategory: 'Smartphones'
    },
    ELECTRONICS_HEADPHONES: {
        component: 'ElectronicsAudio',
        displayName: 'Headphones',
        category: 'Electronics',
        subcategory: 'Audio'
    },
    ELECTRONICS_CAMERA: {
        component: 'ElectronicsCamera',
        displayName: 'Camera',
        category: 'Electronics',
        subcategory: 'Cameras'
    },
    ELECTRONICS_TABLET: {
        component: 'ElectronicsTablet',
        displayName: 'Tablet',
        category: 'Electronics',
        subcategory: 'Tablets'
    },
    ELECTRONICS_SMARTWATCH: {
        component: 'ElectronicsSmartwatch',
        displayName: 'Smartwatch',
        category: 'Electronics',
        subcategory: 'Wearables'
    },
    ELECTRONICS_GAMING: {
        component: 'ElectronicsGaming',
        displayName: 'Gaming Device',
        category: 'Electronics',
        subcategory: 'Gaming'
    },
    ELECTRONICS_AUDIO: {
        component: 'ElectronicsAudio',
        displayName: 'Audio Device',
        category: 'Electronics',
        subcategory: 'Audio'
    },
    ELECTRONICS_ACCESSORIES: {
        component: 'ElectronicsAccessories',
        displayName: 'Electronics Accessory',
        category: 'Electronics',
        subcategory: 'Accessories'
    },

    // Clothing
    CLOTHING_APPAREL: {
        component: 'ClothingApparel',
        displayName: 'Apparel',
        category: 'Clothing',
        subcategory: 'Apparel'
    },
    CLOTHING_FOOTWEAR: {
        component: 'ClothingFootwear',
        displayName: 'Footwear',
        category: 'Clothing',
        subcategory: 'Shoes'
    },
    CLOTHING_ACCESSORIES: {
        component: 'ClothingAccessories',
        displayName: 'Clothing Accessory',
        category: 'Clothing',
        subcategory: 'Accessories'
    },
    CLOTHING_ACTIVEWEAR: {
        component: 'ClothingActivewear',
        displayName: 'Activewear',
        category: 'Clothing',
        subcategory: 'Activewear'
    },
    CLOTHING_FORMAL: {
        component: 'ClothingFormal',
        displayName: 'Formal Wear',
        category: 'Clothing',
        subcategory: 'Formal'
    },
    CLOTHING_CASUAL: {
        component: 'ClothingCasual',
        displayName: 'Casual Wear',
        category: 'Clothing',
        subcategory: 'Casual'
    },

    // Home & Garden
    HOME_FURNITURE: {
        component: 'HomeFurniture',
        displayName: 'Furniture',
        category: 'Home & Garden',
        subcategory: 'Furniture'
    },
    HOME_KITCHEN: {
        component: 'HomeKitchen',
        displayName: 'Kitchen Item',
        category: 'Home & Garden',
        subcategory: 'Kitchen'
    },
    HOME_DECOR: {
        component: 'HomeDecor',
        displayName: 'Home Decor',
        category: 'Home & Garden',
        subcategory: 'Decor'
    },
    HOME_BEDDING: {
        component: 'HomeBedding',
        displayName: 'Bedding',
        category: 'Home & Garden',
        subcategory: 'Bedding'
    },
    HOME_BATHROOM: {
        component: 'HomeBathroom',
        displayName: 'Bathroom Item',
        category: 'Home & Garden',
        subcategory: 'Bathroom'
    },
    HOME_GARDEN: {
        component: 'HomeGarden',
        displayName: 'Garden Item',
        category: 'Home & Garden',
        subcategory: 'Garden'
    },
    HOME_APPLIANCES: {
        component: 'HomeAppliances',
        displayName: 'Home Appliance',
        category: 'Home & Garden',
        subcategory: 'Appliances'
    },

    // Sports & Outdoors
    SPORTS_FITNESS: {
        component: 'SportsFitness',
        displayName: 'Fitness Equipment',
        category: 'Sports & Outdoors',
        subcategory: 'Fitness'
    },
    SPORTS_OUTDOOR: {
        component: 'SportsOutdoor',
        displayName: 'Outdoor Gear',
        category: 'Sports & Outdoors',
        subcategory: 'Outdoor'
    },
    SPORTS_TEAM_SPORTS: {
        component: 'SportsTeam',
        displayName: 'Team Sports',
        category: 'Sports & Outdoors',
        subcategory: 'Team Sports'
    },
    SPORTS_WATER_SPORTS: {
        component: 'SportsWater',
        displayName: 'Water Sports',
        category: 'Sports & Outdoors',
        subcategory: 'Water Sports'
    },

    // Books & Media
    BOOKS_FICTION: {
        component: 'BooksFiction',
        displayName: 'Fiction Book',
        category: 'Books & Media',
        subcategory: 'Fiction'
    },
    BOOKS_NON_FICTION: {
        component: 'BooksNonFiction',
        displayName: 'Non-Fiction Book',
        category: 'Books & Media',
        subcategory: 'Non-Fiction'
    },
    BOOKS_EDUCATIONAL: {
        component: 'BooksEducational',
        displayName: 'Educational Book',
        category: 'Books & Media',
        subcategory: 'Educational'
    },
    BOOKS_CHILDREN: {
        component: 'BooksChildren',
        displayName: 'Children\'s Book',
        category: 'Books & Media',
        subcategory: 'Children'
    },

    // Beauty & Personal Care
    BEAUTY_SKINCARE: {
        component: 'BeautySkincare',
        displayName: 'Skincare Product',
        category: 'Beauty & Personal Care',
        subcategory: 'Skincare'
    },
    BEAUTY_MAKEUP: {
        component: 'BeautyMakeup',
        displayName: 'Makeup Product',
        category: 'Beauty & Personal Care',
        subcategory: 'Makeup'
    },
    BEAUTY_HAIRCARE: {
        component: 'BeautyHaircare',
        displayName: 'Haircare Product',
        category: 'Beauty & Personal Care',
        subcategory: 'Haircare'
    },
    BEAUTY_FRAGRANCE: {
        component: 'BeautyFragrance',
        displayName: 'Fragrance',
        category: 'Beauty & Personal Care',
        subcategory: 'Fragrance'
    },

    // Automotive
    AUTOMOTIVE_PARTS: {
        component: 'AutomotiveParts',
        displayName: 'Auto Parts',
        category: 'Automotive',
        subcategory: 'Parts'
    },
    AUTOMOTIVE_ACCESSORIES: {
        component: 'AutomotiveAccessories',
        displayName: 'Auto Accessories',
        category: 'Automotive',
        subcategory: 'Accessories'
    },
    AUTOMOTIVE_TOOLS: {
        component: 'AutomotiveTools',
        displayName: 'Auto Tools',
        category: 'Automotive',
        subcategory: 'Tools'
    },

    // Generic
    GENERIC_PRODUCT: {
        component: 'GenericProduct',
        displayName: 'Product',
        category: 'General',
        subcategory: 'Product'
    }
}

// Auto-detect product type based on category and subcategory
export function detectProductType(category?: string, subcategory?: string, productName?: string): ProductType {
    if (!category) return ProductType.GENERIC_PRODUCT

    const categoryLower = category.toLowerCase()
    const subcategoryLower = subcategory?.toLowerCase() || ''
    const nameLower = productName?.toLowerCase() || ''

    // Electronics detection
    if (categoryLower.includes('electronics') || categoryLower.includes('tech')) {
        if (subcategoryLower.includes('laptop') || nameLower.includes('laptop')) {
            return ProductType.ELECTRONICS_LAPTOP
        }
        if (subcategoryLower.includes('phone') || subcategoryLower.includes('smartphone') || nameLower.includes('phone')) {
            return ProductType.ELECTRONICS_SMARTPHONE
        }
        if (subcategoryLower.includes('headphone') || subcategoryLower.includes('audio') || nameLower.includes('headphone')) {
            return ProductType.ELECTRONICS_HEADPHONES
        }
        if (subcategoryLower.includes('camera') || nameLower.includes('camera')) {
            return ProductType.ELECTRONICS_CAMERA
        }
        if (subcategoryLower.includes('tablet') || nameLower.includes('tablet')) {
            return ProductType.ELECTRONICS_TABLET
        }
        if (subcategoryLower.includes('watch') || nameLower.includes('smartwatch')) {
            return ProductType.ELECTRONICS_SMARTWATCH
        }
        if (subcategoryLower.includes('gaming') || nameLower.includes('gaming')) {
            return ProductType.ELECTRONICS_GAMING
        }
        return ProductType.ELECTRONICS_ACCESSORIES
    }

    // Clothing detection
    if (categoryLower.includes('clothing') || categoryLower.includes('apparel') || categoryLower.includes('fashion')) {
        if (subcategoryLower.includes('shoe') || subcategoryLower.includes('footwear') || nameLower.includes('shoe')) {
            return ProductType.CLOTHING_FOOTWEAR
        }
        if (subcategoryLower.includes('active') || subcategoryLower.includes('sport') || nameLower.includes('athletic')) {
            return ProductType.CLOTHING_ACTIVEWEAR
        }
        if (subcategoryLower.includes('formal') || nameLower.includes('formal')) {
            return ProductType.CLOTHING_FORMAL
        }
        if (subcategoryLower.includes('accessory') || nameLower.includes('accessory')) {
            return ProductType.CLOTHING_ACCESSORIES
        }
        return ProductType.CLOTHING_APPAREL
    }

    // Home & Garden detection
    if (categoryLower.includes('home') || categoryLower.includes('garden') || categoryLower.includes('furniture')) {
        if (subcategoryLower.includes('furniture') || nameLower.includes('furniture')) {
            return ProductType.HOME_FURNITURE
        }
        if (subcategoryLower.includes('kitchen') || nameLower.includes('kitchen')) {
            return ProductType.HOME_KITCHEN
        }
        if (subcategoryLower.includes('decor') || nameLower.includes('decor')) {
            return ProductType.HOME_DECOR
        }
        if (subcategoryLower.includes('bedding') || nameLower.includes('bedding')) {
            return ProductType.HOME_BEDDING
        }
        if (subcategoryLower.includes('bathroom') || nameLower.includes('bathroom')) {
            return ProductType.HOME_BATHROOM
        }
        if (subcategoryLower.includes('garden') || nameLower.includes('garden')) {
            return ProductType.HOME_GARDEN
        }
        if (subcategoryLower.includes('appliance') || nameLower.includes('appliance')) {
            return ProductType.HOME_APPLIANCES
        }
        return ProductType.HOME_DECOR
    }

    // Sports detection
    if (categoryLower.includes('sport') || categoryLower.includes('fitness') || categoryLower.includes('outdoor')) {
        if (subcategoryLower.includes('fitness') || nameLower.includes('fitness')) {
            return ProductType.SPORTS_FITNESS
        }
        if (subcategoryLower.includes('outdoor') || nameLower.includes('outdoor')) {
            return ProductType.SPORTS_OUTDOOR
        }
        if (subcategoryLower.includes('team') || nameLower.includes('team')) {
            return ProductType.SPORTS_TEAM_SPORTS
        }
        if (subcategoryLower.includes('water') || nameLower.includes('water')) {
            return ProductType.SPORTS_WATER_SPORTS
        }
        return ProductType.SPORTS_FITNESS
    }

    // Books detection
    if (categoryLower.includes('book') || categoryLower.includes('media')) {
        if (subcategoryLower.includes('fiction') || nameLower.includes('fiction')) {
            return ProductType.BOOKS_FICTION
        }
        if (subcategoryLower.includes('educational') || nameLower.includes('educational')) {
            return ProductType.BOOKS_EDUCATIONAL
        }
        if (subcategoryLower.includes('children') || nameLower.includes('children')) {
            return ProductType.BOOKS_CHILDREN
        }
        return ProductType.BOOKS_NON_FICTION
    }

    // Beauty detection
    if (categoryLower.includes('beauty') || categoryLower.includes('cosmetic') || categoryLower.includes('personal care')) {
        if (subcategoryLower.includes('skincare') || nameLower.includes('skincare')) {
            return ProductType.BEAUTY_SKINCARE
        }
        if (subcategoryLower.includes('makeup') || nameLower.includes('makeup')) {
            return ProductType.BEAUTY_MAKEUP
        }
        if (subcategoryLower.includes('hair') || nameLower.includes('hair')) {
            return ProductType.BEAUTY_HAIRCARE
        }
        if (subcategoryLower.includes('fragrance') || subcategoryLower.includes('perfume') || nameLower.includes('perfume')) {
            return ProductType.BEAUTY_FRAGRANCE
        }
        return ProductType.BEAUTY_SKINCARE
    }

    // Automotive detection
    if (categoryLower.includes('automotive') || categoryLower.includes('car') || categoryLower.includes('auto')) {
        if (subcategoryLower.includes('parts') || nameLower.includes('parts')) {
            return ProductType.AUTOMOTIVE_PARTS
        }
        if (subcategoryLower.includes('tools') || nameLower.includes('tools')) {
            return ProductType.AUTOMOTIVE_TOOLS
        }
        return ProductType.AUTOMOTIVE_ACCESSORIES
    }

    return ProductType.GENERIC_PRODUCT
}

// Get component name for a product type
export function getProductComponent(productType: ProductType): string {
    return PRODUCT_TYPE_MAPPINGS[productType]?.component || 'GenericProduct'
}

// Get display name for a product type
export function getProductTypeDisplayName(productType: ProductType): string {
    return PRODUCT_TYPE_MAPPINGS[productType]?.displayName || 'Product'
}