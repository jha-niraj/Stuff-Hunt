import { Product, User, OrderStatus } from '@/types'

// Merchant Dashboard Statistics
export interface MerchantDashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  averageRating: number
  monthlyGrowth: {
    products: number
    orders: number
    revenue: number
    rating: number
  }
}

// Recent Product for Dashboard
export interface RecentProduct {
  id: string
  name: string
  price: number
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  createdAt: Date
  viewCount: number
  orderCount: number
}

// Recent Order for Dashboard
export interface RecentOrder {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: OrderStatus
  createdAt: Date
  items: {
    productName: string
    quantity: number
    price: number
  }[]
}

// Merchant Dashboard Data
export interface MerchantDashboardData {
  stats: MerchantDashboardStats
  recentProducts: RecentProduct[]
  recentOrders: RecentOrder[]
}

// Product Upload with AI Recognition
export interface AIProductRecognition {
  title: string
  shortDescription: string
  detailedDescription: string
  category: string
  subcategory?: string
  targetAgeGroup?: string
  suggestedSizes?: string[]
  colors?: string[]
  materials?: string[]
  brand?: string
  features?: string[]
  tags?: string[]
  searchKeywords?: string[]
}

// AI Metadata for search optimization
export interface ProductSearchMetadata {
  primaryKeywords: string[]
  secondaryKeywords: string[]
  semanticTags: string[]
  categoryHierarchy: string[]
  attributes: Record<string, string | string[]>
  searchBoostTerms: string[]
}

// Product Upload Form Data
export interface ProductUploadFormData {
  images: File[]
  name: string
  shortDescription: string
  detailedDescription: string
  price: number
  categoryIds: string[]
  stock: number
  isActive: boolean
  aiGenerated: AIProductRecognition
  searchMetadata: ProductSearchMetadata
}

// Product Creation Result
export interface ProductCreationResult {
  success: boolean
  error?: string
  product?: Product
  aiSuggestions?: AIProductRecognition
}

// AI Image Analysis Request
export interface AIImageAnalysisRequest {
  imageBase64: string
  prompt?: string
}

// AI Image Analysis Response
export interface AIImageAnalysisResponse {
  success: boolean
  error?: string
  analysis?: AIProductRecognition
  metadata?: ProductSearchMetadata
  confidence: number
}

// Store Types for Merchant
export interface MerchantStore {
  // Dashboard Data
  dashboardData: MerchantDashboardData | null
  dashboardLoading: boolean
  dashboardError: string | null

  // Product Upload
  uploadForm: Partial<ProductUploadFormData>
  uploadLoading: boolean
  uploadError: string | null
  aiSuggestions: AIProductRecognition | null
  aiAnalysisLoading: boolean

  // Actions
  fetchDashboardData: () => Promise<void>
  analyzeProductImage: (image: File, prompt?: string) => Promise<void>
  createProduct: (data: ProductUploadFormData) => Promise<ProductCreationResult>
  updateUploadForm: (data: Partial<ProductUploadFormData>) => void
  clearUploadForm: () => void
  setAISuggestions: (suggestions: AIProductRecognition | null) => void
}
