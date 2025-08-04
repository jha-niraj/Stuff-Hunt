"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from "bcryptjs"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import {
	User,
	ApiResponse
} from "@/types"

// Response types for server actions
interface ProfileActionResponse extends ApiResponse {
	user?: User
}

interface ImageUploadActionResponse extends ApiResponse {
	imageUrl?: string
	user?: User
}

// Data types for inputs
interface UserProfileUpdateData {
	name?: string
	bio?: string
	location?: string
	website?: string
	interests?: string[]
	image?: string
}

interface PasswordChangeData {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Validation schemas
const updateProfileSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
	location: z.string().max(100, "Location must be less than 100 characters").optional(),
	website: z.string().url("Invalid website URL").optional().or(z.literal("")),
	interests: z.array(z.string()).max(10, "Maximum 10 interests allowed").optional(),
})

const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, "Current password is required"),
	newPassword: z.string().min(6, "New password must be at least 6 characters"),
	confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

// Get user profile
export async function getProfile(): Promise<ProfileActionResponse> {
	try {
		const session = await auth()

		if (!session?.user?.email) {
			return { success: false, error: "Unauthorized" }
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				phoneNumber: true,
				companyName: true,
				businessType: true,
				gstNumber: true,
				panNumber: true,
				businessAddress: true,
				kycStatus: true,
				verificationBadge: true,
				createdAt: true,
				onboardingCompleted: true,
				emailVerified: true,
				password: true,
				roleExplicitlyChosen: true,
				verificationToken: true,
				verificationTokenExpiry: true,
				resetToken: true,
				resetTokenExpiry: true,
			}
		})

		if (!user) {
			return { success: false, error: "User not found" }
		}

		return { success: true, user: user as User }
	} catch (error) {
		console.error("Error fetching profile:", error)
		return { success: false, error: "Internal server error" }
	}
}

// Update user profile
export async function updateProfile(data: UserProfileUpdateData): Promise<ProfileActionResponse> {
	try {
		const session = await auth()

		if (!session?.user?.email) {
			return { success: false, error: "Unauthorized" }
		}

		const validatedData = updateProfileSchema.parse(data)

		// Find the user first
		const existingUser = await prisma.user.findUnique({
			where: { email: session.user.email }
		})

		if (!existingUser) {
			return { success: false, error: "User not found" }
		}

		// Update the user profile
		const updatedUser = await prisma.user.update({
			where: { email: session.user.email },
			data: {
				...(validatedData.name && { name: validatedData.name }),
				...(validatedData.bio !== undefined && { bio: validatedData.bio || null }),
				...(validatedData.location !== undefined && { location: validatedData.location || null }),
				...(validatedData.website !== undefined && { website: validatedData.website || null }),
				...(validatedData.interests && { interests: validatedData.interests }),
			},
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				phoneNumber: true,
				companyName: true,
				businessType: true,
				gstNumber: true,
				panNumber: true,
				businessAddress: true,
				kycStatus: true,
				verificationBadge: true,
				createdAt: true,
				onboardingCompleted: true,
				emailVerified: true,
				password: true,
				roleExplicitlyChosen: true,
				verificationToken: true,
				verificationTokenExpiry: true,
				resetToken: true,
				resetTokenExpiry: true,
			}
		})

		revalidatePath('/profile')
		return { success: true, user: updatedUser as User }
	} catch (error) {
		console.error("Error updating profile:", error)

		if (error instanceof z.ZodError) {
			return { success: false, error: error.issues[0].message }
		}

		return { success: false, error: "Internal server error" }
	}
}

// Upload profile image
export async function uploadProfileImage(formData: FormData): Promise<ImageUploadActionResponse> {
	try {
		const session = await auth()

		if (!session?.user?.email) {
			return { success: false, error: "Unauthorized" }
		}

		const image = formData.get('image') as File

		if (!image) {
			return { success: false, error: "No image provided" }
		}

		// Check file size (5MB limit)
		if (image.size > 5 * 1024 * 1024) {
			return { success: false, error: "Image size must be less than 5MB" }
		}

		// Check file type
		if (!image.type.startsWith('image/')) {
			return { success: false, error: "File must be an image" }
		}

		// Convert file to buffer
		const bytes = await image.arrayBuffer()
		const buffer = Buffer.from(bytes)

		// Upload to Cloudinary
		const uploadResponse = await new Promise((resolve, reject) => {
			cloudinary.uploader.upload_stream(
				{
					folder: 'stuffhunt/profiles',
					transformation: [
						{ width: 400, height: 400, crop: 'fill' },
						{ quality: 'auto', fetch_format: 'auto' }
					]
				},
				(error, result) => {
					if (error) reject(error)
					else resolve(result)
				}
			).end(buffer)
		}) as any

		// Update user's image in database
		const updatedUser = await prisma.user.update({
			where: { email: session.user.email },
			data: { image: uploadResponse.secure_url },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				phoneNumber: true,
				companyName: true,
				businessType: true,
				gstNumber: true,
				panNumber: true,
				businessAddress: true,
				kycStatus: true,
				verificationBadge: true,
				createdAt: true,
				onboardingCompleted: true,
				emailVerified: true,
				password: true,
				roleExplicitlyChosen: true,
				verificationToken: true,
				verificationTokenExpiry: true,
				resetToken: true,
				resetTokenExpiry: true,
			}
		})

		revalidatePath('/profile')
		return {
			success: true,
			imageUrl: uploadResponse.secure_url,
			user: updatedUser as User
		}
	} catch (error) {
		console.error("Error uploading image:", error)
		return { success: false, error: "Failed to upload image" }
	}
}

// Change password
export async function changePassword(data: PasswordChangeData): Promise<ApiResponse> {
	try {
		const session = await auth()

		if (!session?.user?.email) {
			return { success: false, error: "Unauthorized" }
		}

		const validatedData = changePasswordSchema.parse(data)

		// Find the user
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			select: { id: true, password: true }
		})

		if (!user || !user.password) {
			return { success: false, error: "User not found or password not set" }
		}

		// Verify current password
		const isCurrentPasswordValid = await bcrypt.compare(
			validatedData.currentPassword,
			user.password
		)

		if (!isCurrentPasswordValid) {
			return { success: false, error: "Current password is incorrect" }
		}

		// Check if new password is different from current
		const isSamePassword = await bcrypt.compare(
			validatedData.newPassword,
			user.password
		)

		if (isSamePassword) {
			return { success: false, error: "New password must be different from current password" }
		}

		// Hash the new password
		const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12)

		// Update the password
		await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedNewPassword }
		})

		return {
			success: true,
			message: "Password changed successfully"
		}
	} catch (error) {
		console.error("Error changing password:", error)

		if (error instanceof z.ZodError) {
			return { success: false, error: error.issues[0].message }
		}

		return { success: false, error: "Internal server error" }
	}
}

// Get user stats (for future use)
export async function getUserStats() {
	try {
		const session = await auth()

		if (!session?.user?.email) {
			return { success: false, error: "Unauthorized" }
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: {
				orders: {
					select: {
						total: true,
						createdAt: true,
					}
				},
				_count: {
					select: {
						orders: true,
						products: true,
						reviews: true,
					}
				}
			}
		})

		if (!user) {
			return { success: false, error: "User not found" }
		}

		const stats = {
			totalOrders: user._count.orders,
			totalProducts: user._count.products,
			totalReviews: user._count.reviews,
			totalSpent: user.orders.reduce((sum, order) => sum + order.total, 0),
			memberSince: user.createdAt.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long'
			}),
		}

		return { success: true, stats }
	} catch (error) {
		console.error("Error fetching user stats:", error)
		return { success: false, error: "Internal server error" }
	}
}