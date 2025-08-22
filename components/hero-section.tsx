"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Upload, X, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { searchWithAI, searchWithImage } from "@/actions/ai-search.action"
import { fileToBase64 } from "@/lib/ai-search"

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
				
				// Redirect to products page
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
				
				// Redirect to products page
				window.location.href = `/products?${params.toString()}`
			} else {
				// Fallback to regular search
				window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`
			}
		} catch (error) {
			console.error('Search error:', error)
			// Fallback to regular search
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

	return (
		<section className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0">
			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 opacity-20"
					animate={{
						background: [
							"linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
							"linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 50%, hsl(var(--secondary)) 100%)",
							"linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
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
							<rect x="699.711" y="81" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.08" />
							<rect x="195.711" y="153" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="1023.71" y="153" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="123.711" y="225" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="1095.71" y="225" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="951.711" y="297" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="231.711" y="333" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
							<rect x="303.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
							<rect x="87.7109" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="519.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.08" />
							<rect x="771.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="591.711" y="477" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
						</g>
						<g filter="url(#filter0_f_186_1134)">
							<path
								d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
								fill="url(#paint1_linear_186_1134)"
							/>
						</g>
						<g filter="url(#filter1_f_186_1134)">
							<path
								d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
								fill="url(#paint2_linear_186_1134)"
								fillOpacity="0.69"
							/>
						</g>
						<g style={{ mixBlendMode: "lighten" }} filter="url(#filter2_f_186_1134)">
							<path
								d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
								fill="url(#paint3_linear_186_1134)"
							/>
						</g>
						<g style={{ mixBlendMode: "overlay" }} filter="url(#filter3_f_186_1134)">
							<path
								d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
								fill="url(#paint4_radial_186_1134)"
								fillOpacity="0.64"
							/>
						</g>
					</g>
					<rect
						x="0.5"
						y="0.5"
						width="1219"
						height="809"
						rx="15.5"
						stroke="hsl(var(--foreground))"
						strokeOpacity="0.06"
					/>
					<defs>
						<filter
							id="filter0_f_186_1134"
							x="147.369"
							y="-467.818"
							width="1941.42"
							height="2035.46"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter1_f_186_1134"
							x="-554.207"
							y="-1169.39"
							width="3216.57"
							height="3310.61"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter2_f_186_1134"
							x="426.762"
							y="-452.424"
							width="1622.63"
							height="1716.67"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter3_f_186_1134"
							x="-253.163"
							y="-611.818"
							width="2221.95"
							height="2035.46"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
						</filter>
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
						<linearGradient
							id="paint1_linear_186_1134"
							x1="1118.08"
							y1="-149.03"
							x2="1118.08"
							y2="1248.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_186_1134"
							x1="1054.08"
							y1="-213.03"
							x2="1054.08"
							y2="1184.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_186_1134"
							x1="1238.08"
							y1="-293.03"
							x2="1238.08"
							y2="1104.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<radialGradient
							id="paint4_radial_186_1134"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.157789" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</radialGradient>
						<clipPath id="clip0_186_1134">
							<rect width="1220" height="810" rx="16" fill="hsl(var(--foreground))" />
						</clipPath>
					</defs>
				</svg>
			</div>
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
			<motion.div
				className="relative z-10 w-full max-w-2xl mx-auto px-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}
			>
				<div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl">
					{
						uploadedImage && (
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
									{
										isAnalyzing ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												Analyzing Image...
											</>
										) : (
											"Analyze Image with AI"
										)
									}
								</Button>
							</div>
						)
					}
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="flex-1">
							<Input
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