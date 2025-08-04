"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Search } from "lucide-react"
import { AuthDialog } from "@/components/authdialog"
import Image from "next/image"

export function SearchInterface() {
	const [prompt, setPrompt] = useState("")
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [showAuthDialog, setShowAuthDialog] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null)

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setSelectedImage(file)
			const reader = new FileReader()
			reader.onload = (e) => {
				setImagePreview(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSearch = () => {
		if (!prompt.trim() && !selectedImage) return
		setShowAuthDialog(true)
	}

	const handleAuthChoice = (choice: "signin" | "continue") => {
		const searchParams = new URLSearchParams()
		if (prompt) searchParams.set("prompt", prompt)
		if (selectedImage) searchParams.set("hasImage", "true")

		if (choice === "signin") {
			window.location.href = `/signin?${searchParams.toString()}`
		} else {
			window.location.href = `/explore?${searchParams.toString()}`
		}
	}

	return (
		<>
			<div className="relative z-10 w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
				<div className="space-y-4">
					{/* Text Input */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
						<Input
							placeholder="Describe what you're looking for..."
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							className="pl-10 h-12 text-base bg-background/50 border-border"
						/>
					</div>

					{/* Image Upload */}
					<div className="flex items-center gap-4">
						<div className="flex-1">
							<label htmlFor="image-upload" className="cursor-pointer">
								<div className="flex items-center gap-2 p-3 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
									<Upload className="h-5 w-5 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">
										{selectedImage ? selectedImage.name : "Upload an image (optional)"}
									</span>
								</div>
							</label>
							<input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
						</div>

						{imagePreview && (
							<div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
								<Image 
									src={imagePreview || "/placeholder.svg"} 
									alt="Preview" 
									className="w-full h-full object-cover"
									height={32}
									width={32} 
								/>
								<button
									onClick={() => {
										setSelectedImage(null)
										setImagePreview(null)
									}}
									className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs"
								>
									×
								</button>
							</div>
						)}
					</div>

					{/* Search Button */}
					<Button
						onClick={handleSearch}
						disabled={!prompt.trim() && !selectedImage}
						className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground"
						size="lg"
					>
						<Search className="mr-2 h-5 w-5" />
						Search Products
					</Button>
				</div>
			</div>

			<AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onChoice={handleAuthChoice} />
		</>
	)
}