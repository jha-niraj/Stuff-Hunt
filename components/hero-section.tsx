"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Upload, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function HeroSection() {
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
			// Here you would integrate with OpenAI Vision API
			// For now, we'll simulate the analysis
			await new Promise(resolve => setTimeout(resolve, 2000))
			
			// Simulate AI response
			const mockAnalysis = "wireless bluetooth headphones black over-ear"
			setSearchQuery(mockAnalysis)
			toast.success("Image analyzed successfully!")
			
			// Redirect to products page with search query
			window.location.href = `/products?search=${encodeURIComponent(mockAnalysis)}`
		} catch (error) {
			toast.error("Failed to analyze image. Please try again.")
		} finally {
			setIsAnalyzing(false)
		}
	}

	const handleSearch = () => {
		if (searchQuery.trim()) {
			window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
		}
	}

	const removeImage = () => {
		setUploadedImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	return (
		<section className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0">
			{/* Animated Background */}
			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 opacity-30"
					animate={{
						background: [
							"linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--primary)) 100%)",
							"linear-gradient(90deg, hsl(var(--primary-light)) 0%, hsl(var(--primary)) 50%, hsl(var(--primary-light)) 100%)",
							"linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--primary)) 100%)",
						]
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						repeatType: "reverse"
					}}
				/>
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1220 810"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid slice"
				>
					<g clipPath="url(#clip0_186_1134)">
						<mask
							id="mask0_186_1134"
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="10"
							y="-1"
							width="1200"
							height="812"
						>
							<rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#paint0_linear_186_1134)" />
						</mask>
						<g mask="url(#mask0_186_1134)">
							{[...Array(35)].map((_, i) => (
								<g key={`row1-${i}`}>
									{[...Array(22)].map((_, j) => (
										<motion.rect
											key={`${i}-${j}`}
											x={-20.0891 + i * 36}
											y={9.2 + j * 36}
											width="35.6"
											height="35.6"
											stroke="hsl(var(--foreground))"
											strokeOpacity="0.11"
											strokeWidth="0.4"
											strokeDasharray="2 2"
											animate={{
												opacity: [0.1, 0.3, 0.1]
											}}
											transition={{
												duration: 3 + (i + j) * 0.1,
												repeat: Infinity,
												repeatType: "reverse"
											}}
										/>
									))}
								</g>
							))}
						</g>
					</g>
					<defs>
						<linearGradient
							id="paint0_linear_186_1134"
							x1="35.0676"
							y1="23.6807"
							x2="903.8"
							y2="632.086"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" stopOpacity="0" />
							<stop offset="1" stopColor="hsl(var(--muted-foreground))" />
						</linearGradient>
						<clipPath id="clip0_186_1134">
							<rect width="1220" height="810" rx="16" fill="hsl(var(--foreground))" />
						</clipPath>
					</defs>
				</svg>
			</div>

			{/* Content */}
			<motion.div 
				className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-20 md:mt-[120px] lg:mt-[160px] px-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<motion.h1 
					className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Discover Amazing Products with AI-Powered Shopping
				</motion.h1>
				<motion.p 
					className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					Find exactly what you're looking for with intelligent search, personalized recommendations, and seamless shopping experience.
				</motion.p>
			</motion.div>

			{/* Enhanced Search Interface */}
			<motion.div 
				className="relative z-10 w-full max-w-2xl mx-auto px-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}
			>
				<div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl">
					{/* Image Upload Area */}
					{uploadedImage && (
						<div className="mb-4 relative">
							<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
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
									"Analyze Image with AI"
								)}
							</Button>
						</div>
					)}

					<div className="flex flex-col sm:flex-row gap-3">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search for anything... 'wireless headphones', 'running shoes', etc."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
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
							>
								<Upload className="w-4 h-4" />
							</Button>
							<Button 
								onClick={handleSearch}
								className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
							>
								<Search className="w-4 h-4 mr-2" />
								Search
							</Button>
						</div>
					</div>
					
					<p className="text-xs text-muted-foreground mt-3 text-center">
						Upload an image or describe what you're looking for
					</p>
				</div>
			</motion.div>
		</section>
	)
}