import { ProductType } from "@prisma/client"

// Dynamic product attribute schemas
// This follows the JSON-driven approach used by major e-commerce platforms

export interface BaseProductSchema {
  [key: string]: any
}

// Electronics Schemas
export interface LaptopSchema extends BaseProductSchema {
  processor?: string
  ram?: string
  storage?: string
  display?: {
    size?: string
    resolution?: string
    type?: string
    refreshRate?: string
  }
  graphics?: string
  battery?: string
  weight?: number
  ports?: string[]
  connectivity?: string[]
  os?: string
  keyboard?: string
  webcam?: string
  audio?: string
}

export interface SmartphoneSchema extends BaseProductSchema {
  os?: string
  screenSize?: number
  camera?: {
    main?: string
    front?: string
    features?: string[]
    video?: string
  }
  battery?: string
  storage?: string[]
  connectivity?: string[]
  processor?: string
  ram?: string
  display?: {
    type?: string
    resolution?: string
    refreshRate?: string
  }
  sensors?: string[]
  waterResistance?: string
  charging?: {
    wired?: string
    wireless?: boolean
    fast?: boolean
  }
}

// Clothing Schemas
export interface ApparelSchema extends BaseProductSchema {
  material?: string
  fit?: string
  care?: string[]
  season?: string
  style?: string
  neckline?: string
  sleeves?: string
  pattern?: string
  occasion?: string
  gender?: string
  ageGroup?: string
  fabricWeight?: string
  stretch?: boolean
}

export interface FootwearSchema extends BaseProductSchema {
  material?: string
  sole?: string
  closure?: string
  heel?: string
  width?: string
  arch?: string
  style?: string
  occasion?: string
  waterproof?: boolean
  breathable?: boolean
  cushioning?: string
  support?: string
}

// Home & Garden Schemas
export interface FurnitureSchema extends BaseProductSchema {
  material?: string
  finish?: string
  assembly?: string
  capacity?: string
  style?: string
  room?: string
  color?: string
  warranty?: string
}

export interface KitchenSchema extends BaseProductSchema {
  material?: string
  capacity?: string
  power?: string
  features?: string[]
  dishwasherSafe?: boolean
  microwaveSafe?: boolean
  ovenSafe?: boolean
  warranty?: string
}

// Sports & Fitness Schemas
export interface FitnessSchema extends BaseProductSchema {
  weight?: string
  resistance?: string
  adjustable?: boolean
  features?: string[]
  accessories?: string[]
  targetMuscles?: string[]
  skillLevel?: string
  warranty?: string
}

// Books Schemas
export interface BookSchema extends BaseProductSchema {
  author?: string
  publisher?: string
  pages?: number
  language?: string
  isbn?: string
  edition?: string
  format?: string
  genre?: string
  publicationDate?: string
}

// Beauty Schemas
export interface BeautySchema extends BaseProductSchema {
  skinType?: string[]
  ingredients?: string[]
  benefits?: string[]
  application?: string
  coverage?: string
  finish?: string
  spf?: string
  crueltyFree?: boolean
  vegan?: boolean
  dermatologistTested?: boolean
}

// Automotive Schemas
export interface AutomotiveSchema extends BaseProductSchema {
  compatibility?: string[]
  material?: string
  installation?: string
  warranty?: string
  certification?: string[]
  features?: string[]
}

// Schema type mapping
export type ProductSchemaMap = {
  [ProductType.ELECTRONICS_LAPTOP]: LaptopSchema
  [ProductType.ELECTRONICS_SMARTPHONE]: SmartphoneSchema
  [ProductType.ELECTRONICS_HEADPHONES]: BaseProductSchema
  [ProductType.ELECTRONICS_CAMERA]: BaseProductSchema
  [ProductType.ELECTRONICS_TABLET]: SmartphoneSchema // Similar to smartphone
  [ProductType.ELECTRONICS_SMARTWATCH]: SmartphoneSchema
  [ProductType.ELECTRONICS_GAMING]: BaseProductSchema
  [ProductType.ELECTRONICS_AUDIO]: BaseProductSchema
  [ProductType.ELECTRONICS_ACCESSORIES]: BaseProductSchema
  
  [ProductType.CLOTHING_APPAREL]: ApparelSchema
  [ProductType.CLOTHING_FOOTWEAR]: FootwearSchema
  [ProductType.CLOTHING_ACCESSORIES]: BaseProductSchema
  [ProductType.CLOTHING_ACTIVEWEAR]: ApparelSchema
  [ProductType.CLOTHING_FORMAL]: ApparelSchema
  [ProductType.CLOTHING_CASUAL]: ApparelSchema
  
  [ProductType.HOME_FURNITURE]: FurnitureSchema
  [ProductType.HOME_KITCHEN]: KitchenSchema
  [ProductType.HOME_DECOR]: BaseProductSchema
  [ProductType.HOME_BEDDING]: BaseProductSchema
  [ProductType.HOME_BATHROOM]: BaseProductSchema
  [ProductType.HOME_GARDEN]: BaseProductSchema
  [ProductType.HOME_APPLIANCES]: KitchenSchema
  
  [ProductType.SPORTS_FITNESS]: FitnessSchema
  [ProductType.SPORTS_OUTDOOR]: BaseProductSchema
  [ProductType.SPORTS_TEAM_SPORTS]: BaseProductSchema
  [ProductType.SPORTS_WATER_SPORTS]: BaseProductSchema
  
  [ProductType.BOOKS_FICTION]: BookSchema
  [ProductType.BOOKS_NON_FICTION]: BookSchema
  [ProductType.BOOKS_EDUCATIONAL]: BookSchema
  [ProductType.BOOKS_CHILDREN]: BookSchema
  
  [ProductType.BEAUTY_SKINCARE]: BeautySchema
  [ProductType.BEAUTY_MAKEUP]: BeautySchema
  [ProductType.BEAUTY_HAIRCARE]: BeautySchema
  [ProductType.BEAUTY_FRAGRANCE]: BeautySchema
  
  [ProductType.AUTOMOTIVE_PARTS]: AutomotiveSchema
  [ProductType.AUTOMOTIVE_ACCESSORIES]: AutomotiveSchema
  [ProductType.AUTOMOTIVE_TOOLS]: AutomotiveSchema
  
  [ProductType.GENERIC_PRODUCT]: BaseProductSchema
}

// Helper function to get schema type for a product type
export function getProductSchema<T extends ProductType>(
  productType: T
): ProductSchemaMap[T] {
  // This is a type-safe way to get the schema for a product type
  return {} as ProductSchemaMap[T]
}

// Validation functions for each schema type
export const schemaValidators = {
  [ProductType.ELECTRONICS_LAPTOP]: (data: any): data is LaptopSchema => {
    return typeof data === 'object' && data !== null
  },
  
  [ProductType.ELECTRONICS_SMARTPHONE]: (data: any): data is SmartphoneSchema => {
    return typeof data === 'object' && data !== null
  },
  
  [ProductType.CLOTHING_APPAREL]: (data: any): data is ApparelSchema => {
    return typeof data === 'object' && data !== null
  },
  
  // Add more validators as needed
}

// Default schemas for new products
export const defaultSchemas: Partial<ProductSchemaMap> = {
  [ProductType.ELECTRONICS_LAPTOP]: {
    processor: '',
    ram: '',
    storage: '',
    display: {
      size: '',
      resolution: '',
      type: ''
    },
    graphics: '',
    battery: '',
    ports: [],
    connectivity: []
  },
  
  [ProductType.ELECTRONICS_SMARTPHONE]: {
    os: '',
    screenSize: 0,
    camera: {
      main: '',
      front: '',
      features: []
    },
    battery: '',
    storage: [],
    connectivity: [],
    processor: '',
    ram: ''
  },
  
  [ProductType.CLOTHING_APPAREL]: {
    material: '',
    fit: 'Regular',
    care: [],
    season: 'All Season',
    style: 'Casual',
    neckline: '',
    sleeves: ''
  }
}

// Helper function to merge user data with default schema
export function mergeWithDefaultSchema<T extends ProductType>(
  productType: T,
  userData: any
): ProductSchemaMap[T] {
  const defaultSchema = defaultSchemas[productType] || {}
  return { ...defaultSchema, ...userData } as ProductSchemaMap[T]
}