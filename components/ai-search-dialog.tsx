"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Upload, X, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import {
	Dialog, DialogContent, DialogDescription, 
	DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { searchWithAI, searchWithImage } from "@/actions/ai-search.action"
import { fileToBase64 } from "@/lib/ai-search"

interface AISearchDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function AISearchDialog({ open, onOpenChange }: AISearchDialogProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const [uploadedImage, setUploadedImage] = useState<File | null>(null)
	const [isAnalyzing, setIsAnalyzing] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				toast.error("Image size should be less than 5MB")
				return
			}
			setUploadedImage(file)
		}
	}

	const analyzeImage = async () => {
		if (!uploadedImage) return

		setIsAnalyzing(true)
		try {
			// Convert image to base64
			const base64 = await fileToBase64(uploadedImage)
			
			// Analyze with AI
			const result = await searchWithImage(base64)
			
			if (result.success && result.searchQuery) {
				setSearchQuery(result.searchQuery)
				toast.success("Image analyzed successfully!")
				
				// Build search URL with AI filters
				const params = new URLSearchParams()
				params.set("q", result.searchQuery)
				params.set("aiProcessed", "true")
				params.set("confidence", (result.confidence || 0).toString())
				
				if (result.filters) {
					if (result.filters.categories?.length) {
						params.set("categories", result.filters.categories.join(","))
					}
					if (result.filters.colors?.length) {
						params.set("colors", result.filters.colors.join(","))
					}
					if (result.filters.brands?.length) {
						params.set("brands", result.filters.brands.join(","))
					}
					if (result.filters.priceRange?.max) {
						params.set("maxPrice", result.filters.priceRange.max.toString())
					}
					if (result.filters.priceRange?.min) {
						params.set("minPrice", result.filters.priceRange.min.toString())
					}
				}
				
				// Close dialog and redirect
				onOpenChange(false)
				window.location.href = `/products?${params.toString()}`
			} else {
				toast.error(result.error || "Failed to analyze image")
			}
		} catch (error) {
			console.error('Image analysis error:', error)
			toast.error("Failed to analyze image. Please try again.")
		} finally {
			setIsAnalyzing(false)
		}
	}

	const handleSearch = async () => {
		if (!searchQuery.trim()) return

		setIsAnalyzing(true)
		try {
			// Analyze search query with AI
			const result = await searchWithAI(searchQuery.trim())
			
			if (result.success) {
				// Build search URL with AI filters
				const params = new URLSearchParams()
				params.set("q", result.searchQuery || searchQuery.trim())
				params.set("aiProcessed", "true")
				params.set("confidence", (result.confidence || 0).toString())
				
				if (result.filters) {
					if (result.filters.categories?.length) {
						params.set("categories", result.filters.categories.join(","))
					}
					if (result.filters.colors?.length) {
						params.set("colors", result.filters.colors.join(","))
					}
					if (result.filters.brands?.length) {
						params.set("brands", result.filters.brands.join(","))
					}
					if (result.filters.priceRange?.max) {
						params.set("maxPrice", result.filters.priceRange.max.toString())
					}
					if (result.filters.priceRange?.min) {
						params.set("minPrice", result.filters.priceRange.min.toString())
					}
				}
				
				// Close dialog and redirect
				onOpenChange(false)
				window.location.href = `/products?${params.toString()}`
			} else {
				// Fallback to regular search
				onOpenChange(false)
				window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`
			}
		} catch (error) {
			console.error('Search error:', error)
			// Fallback to regular search
			onOpenChange(false)
			window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`
		} finally {
			setIsAnalyzing(false)
		}
	}

	const removeImage = () => {
		setUploadedImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !isAnalyzing) {
			handleSearch()
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Sparkles className="w-5 h-5 text-primary" />
						AI-Powered Search
					</DialogTitle>
					<DialogDescription>
						Search for products using text or upload an image for AI analysis
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Image Upload Area */}
					{uploadedImage && (
						<motion.div 
							className="relative"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
									<Upload className="w-5 h-5 text-primary" />
								</div>
								<div className="flex-1">
									<p className="text-sm font-medium text-foreground">{uploadedImage.name}</p>
									<p className="text-xs text-muted-foreground">
										{(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
									</p>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={removeImage}
									className="h-8 w-8 p-0"
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
							<Button
								onClick={analyzeImage}
								disabled={isAnalyzing}
								className="w-full mt-3 bg-primary hover:bg-primary/90"
							>
								{isAnalyzing ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Analyzing Image...
									</>
								) : (
									<>
										<Sparkles className="w-4 h-4 mr-2" />
										Analyze Image with AI
									</>
								)}
							</Button>
						</motion.div>
					)}

					{/* Search Input */}
					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row gap-3">
							<div className="flex-1">
								<input
									type="text"
									placeholder="Search for anything... 'wireless headphones', 'running shoes', etc."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyPress={handleKeyPress}
									className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
									autoFocus
								/>
							</div>
							<div className="flex gap-2">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
								/>
								<Button
									variant="outline"
									onClick={() => fileInputRef.current?.click()}
									className="px-4 py-3 rounded-xl"
									disabled={isAnalyzing}
								>
									<Upload className="w-4 h-4" />
								</Button>
								<Button 
									onClick={handleSearch}
									disabled={!searchQuery.trim() || isAnalyzing}
									className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
								>
									<Search className="w-4 h-4 mr-2" />
									Search
								</Button>
							</div>
						</div>
						
						<p className="text-xs text-muted-foreground text-center">
							Upload an image or describe what you&apos;re looking for
						</p>
					</div>

					{/* Quick Search Suggestions */}
					<div className="space-y-2">
						<p className="text-sm font-medium text-foreground">Popular searches:</p>
						<div className="flex flex-wrap gap-2">
							{["Wireless Headphones", "Running Shoes", "Laptop", "Smartphone", "Watch"].map((suggestion) => (
								<Button
									key={suggestion}
									variant="outline"
									size="sm"
									onClick={() => setSearchQuery(suggestion)}
									className="text-xs"
								>
									{suggestion}
								</Button>
							))}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}