import { create } from 'zustand'
import {
	MerchantStore,
	MerchantDashboardData,
	ProductUploadFormData,
	AIProductRecognition,
	ProductCreationResult
} from '@/types'

// We'll create these actions later
import {
	getMerchantDashboard,
	analyzeProductImageAction,
	createProductAction
} from '@/actions/(merchant)/merchant.action'

export const useMerchantStore = create<MerchantStore>((set, get) => ({
	// Dashboard Data
	dashboardData: null,
	dashboardLoading: false,
	dashboardError: null,

	// Product Upload
	uploadForm: {
		images: [],
		name: '',
		shortDescription: '',
		detailedDescription: '',
		price: 0,
		categoryIds: [],
		stock: 1,
		isActive: true
	},
	uploadLoading: false,
	uploadError: null,
	aiSuggestions: null,
	aiAnalysisLoading: false,

	// Actions
	fetchDashboardData: async () => {
		set({ dashboardLoading: true, dashboardError: null })

		try {
			const result = await getMerchantDashboard()

			if (result.success && result.data) {
				set({
					dashboardData: result.data,
					dashboardLoading: false
				})
			} else {
				set({
					dashboardError: result.error || 'Failed to fetch dashboard data',
					dashboardLoading: false
				})
			}
		} catch (error) {
			set({
				dashboardError: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
				dashboardLoading: false
			})
		}
	},

	analyzeProductImage: async (image: File, prompt?: string) => {
		set({ aiAnalysisLoading: true, uploadError: null })

		try {
			const result = await analyzeProductImageAction(image, prompt)

			if (result.success && result.analysis) {
				set({
					aiSuggestions: result.analysis,
					aiAnalysisLoading: false,
					// Auto-fill form with AI suggestions
					uploadForm: {
						...get().uploadForm,
						name: result.analysis.title,
						shortDescription: result.analysis.shortDescription,
						detailedDescription: result.analysis.detailedDescription
					}
				})
			} else {
				set({
					uploadError: result.error || 'Failed to analyze image',
					aiAnalysisLoading: false
				})
			}
		} catch (error) {
			set({
				uploadError: error instanceof Error ? error.message : 'Failed to analyze image',
				aiAnalysisLoading: false
			})
		}
	},

	createProduct: async (data: ProductUploadFormData): Promise<ProductCreationResult> => {
		set({ uploadLoading: true, uploadError: null })

		try {
			const result = await createProductAction(data)

			if (result.success) {
				// Clear form on success
				get().clearUploadForm()
				set({ uploadLoading: false })

				// Refresh dashboard data
				get().fetchDashboardData()
			} else {
				set({
					uploadError: result.error || 'Failed to create product',
					uploadLoading: false
				})
			}

			return result
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to create product'
			set({
				uploadError: errorMessage,
				uploadLoading: false
			})

			return {
				success: false,
				error: errorMessage
			}
		}
	},

	updateUploadForm: (data: Partial<ProductUploadFormData>) => {
		set({
			uploadForm: { ...get().uploadForm, ...data }
		})
	},

	clearUploadForm: () => {
		set({
			uploadForm: {
				images: [],
				name: '',
				shortDescription: '',
				detailedDescription: '',
				price: 0,
				categoryIds: [],
				stock: 1,
				isActive: true
			},
			aiSuggestions: null,
			uploadError: null
		})
	},

	setAISuggestions: (suggestions: AIProductRecognition | null) => {
		set({ aiSuggestions: suggestions })
	}
}))
