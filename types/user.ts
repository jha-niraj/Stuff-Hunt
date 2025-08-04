import { User as PrismaUser, Role } from '@prisma/client'

// Base User type from Prisma
export type User = PrismaUser

// Extended User type with optional profile fields
export interface UserWithProfile {
	id: string
	email: string
	name: string
	image: string
	role: Role
	bio?: string | null
	location?: string | null
	website?: string | null
	interests?: string[]
	// Include other User fields as needed
	createdAt: Date
	onboardingCompleted: boolean
	companyName?: string | null
	businessType?: string | null
	phoneNumber?: string | null
	kycStatus: string
	verificationBadge: boolean
}

// User profile update data
export interface UserProfileUpdateData {
	name?: string
	bio?: string
	location?: string
	website?: string
	interests?: string[]
	image?: string
}

// Business information for sellers
export interface BusinessInfo {
	companyName: string
	businessType: string
	gstNumber?: string
	panNumber: string
	businessAddress: string
	phoneNumber: string
}

// Password change data
export interface PasswordChangeData {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

// User stats (for analytics)
export interface UserStats {
	totalOrders: number
	totalSpent: number
	memberSince: string
	favoriteCategories: string[]
}

// API Response types
export interface ProfileResponse {
	success: boolean
	user?: User
	error?: string
}

export interface ProfileUpdateResponse {
	success: boolean
	user?: User
	error?: string
}

export interface ImageUploadResponse {
	success: boolean
	imageUrl?: string
	user?: User
	error?: string
}

export interface PasswordChangeResponse {
	success: boolean
	message?: string
	error?: string
}

// Form validation types
export interface ProfileFormErrors {
	name?: string
	bio?: string
	location?: string
	website?: string
	interests?: string
}

export interface BusinessFormErrors {
	companyName?: string
	businessType?: string
	gstNumber?: string
	panNumber?: string
	businessAddress?: string
	phoneNumber?: string
}

export interface PasswordFormErrors {
	currentPassword?: string
	newPassword?: string
	confirmPassword?: string
}

// User roles and permissions
export { Role }

export interface UserPermissions {
	canManageProducts: boolean
	canViewAnalytics: boolean
	canAccessSellerDashboard: boolean
	canUpdateBusinessInfo: boolean
}

// Helper function to get user permissions
export function getUserPermissions(role: Role): UserPermissions {
	return {
		canManageProducts: role === 'SELLER' || role === 'ADMIN',
		canViewAnalytics: role === 'SELLER' || role === 'ADMIN',
		canAccessSellerDashboard: role === 'SELLER' || role === 'ADMIN',
		canUpdateBusinessInfo: role === 'SELLER' || role === 'ADMIN',
	}
}
