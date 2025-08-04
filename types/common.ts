// Common API response structure
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Generic pagination response
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
  error?: string
}

// Common error types
export interface ValidationError {
  field: string
  message: string
}

export interface FormErrors {
  [key: string]: string | undefined
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Generic store state
export interface BaseStoreState {
  loading: boolean
  error: string | null
}

// File upload types
export interface FileUpload {
  file: File
  preview?: string
  uploading?: boolean
  error?: string
}

export interface ImageUpload extends FileUpload {
  width?: number
  height?: number
  size: number
}

// Search and filter types
export interface SearchParams {
  query?: string
  filters?: Record<string, any>
  sort?: string
  page?: number
  limit?: number
}

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'stuffhunt_cart',
  USER_PREFERENCES: 'stuffhunt_user_prefs',
  RECENT_SEARCHES: 'stuffhunt_recent_searches',
  WISHLIST: 'stuffhunt_wishlist',
} as const

// Theme and UI types
export type Theme = 'light' | 'dark' | 'system'

export interface UIPreferences {
  theme: Theme
  language: string
  currency: string
  notifications: boolean
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
  requiresAuth?: boolean
  roles?: string[]
}

// Toast/notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

// Modal types
export interface Modal {
  id: string
  title: string
  content: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

// Generic action result
export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: ValidationError[]
}
