import { create } from 'zustand'
import { User, UserProfileUpdateData, PasswordChangeData } from '@/types'
import { 
  getProfile, 
  updateProfile, 
  uploadProfileImage, 
  changePassword 
} from '@/actions/profile.action'

// Define the user state interface
interface UserState {
	user: User | null
	loading: boolean
	error: string | null

	// Actions
	setUser: (user: User | null) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void
	updateUser: (updates: Partial<User>) => void
	clearUser: () => void

	// Async actions
	fetchUser: () => Promise<void>
	updateProfile: (data: UserProfileUpdateData) => Promise<void>
	uploadProfileImage: (formData: FormData) => Promise<void>
	changePassword: (data: PasswordChangeData) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	loading: false,
	error: null,

	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error }),

	updateUser: (updates) => set((state) => ({
		user: state.user ? { ...state.user, ...updates } : null
	})),

	clearUser: () => set({ user: null, error: null }),

	fetchUser: async () => {
		set({ loading: true, error: null })

		try {
			const result = await getProfile()

			if (result.success && result.user) {
				set({ user: result.user, loading: false })
			} else {
				set({ error: result.error || 'Failed to fetch user', loading: false })
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to fetch user',
				loading: false
			})
		}
	},

	updateProfile: async (data) => {
		set({ loading: true, error: null })

		try {
			const result = await updateProfile(data)

			if (result.success && result.user) {
				set({ user: result.user, loading: false })
			} else {
				set({ error: result.error || 'Failed to update profile', loading: false })
				throw new Error(result.error || 'Failed to update profile')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},

	uploadProfileImage: async (formData) => {
		set({ loading: true, error: null })

		try {
			const result = await uploadProfileImage(formData)

			if (result.success && result.imageUrl && result.user) {
				set({ user: result.user, loading: false })
			} else {
				set({ error: result.error || 'Failed to upload image', loading: false })
				throw new Error(result.error || 'Failed to upload image')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},

	changePassword: async (data) => {
		set({ loading: true, error: null })

		try {
			const result = await changePassword(data)

			if (result.success) {
				set({ loading: false })
			} else {
				set({ error: result.error || 'Failed to change password', loading: false })
				throw new Error(result.error || 'Failed to change password')
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to change password'
			set({ error: errorMessage, loading: false })
			throw error
		}
	},
}))
