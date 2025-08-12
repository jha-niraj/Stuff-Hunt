"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUp, Sparkles, Loader2 } from "lucide-react"
import { processSearchQuery } from "@/actions/search.action"
import { toast } from "sonner"
import { filtersToSearchParams } from "@/lib/search"

export function Hero({
	title = "Find Products with AI‑Powered Search",
	subtitle = "Upload an image or describe what you're looking for. Our AI will help you discover the perfect products instantly.",
	placeholder = "Describe what you’re looking for (e.g. blue jeans for work, under $50)…",
}: {
	title?: string
	subtitle?: string
	placeholder?: string
}) {
	const router = useRouter()
	const fileRef = useRef<HTMLInputElement | null>(null)
	const [q, setQ] = useState("")
	const [isPending, startTransition] = useTransition()

	async function handleAISearch() {
		if (!q.trim()) return

		startTransition(async () => {
			try {
				const result = await processSearchQuery(q.trim())
				
				if (result.success && result.filters) {
					// AI processing successful
					const searchParams = filtersToSearchParams(result.filters)
					searchParams.set("q", q.trim())
					searchParams.set("source", "hero")
					
					if (result.filters.confidence > 0.7) {
						toast.success("AI enhanced your search!", {
							description: `Found ${result.filters.categories.length} categories and ${result.filters.attributes.length} attributes`,
							duration: 3000,
						})
					}
					
					router.push(`/products?${searchParams.toString()}`)
				} else {
					// Fallback to text search
					const params = new URLSearchParams()
					params.set("q", q.trim())
					params.set("source", "hero")
					router.push(`/products?${params.toString()}`)
				}
			} catch (error) {
				console.error("Search error:", error)
				// Fallback to simple search
				const params = new URLSearchParams()
				params.set("q", q.trim())
				params.set("source", "hero")
				router.push(`/products?${params.toString()}`)
			}
		})
	}

	function handleImageUpload(file: File) {
		// For now, redirect to products with image indicator
		// In the future, this could use image recognition AI
		const params = new URLSearchParams()
		params.set("image", "1")
		params.set("filename", file.name)
		params.set("source", "hero")
		router.push(`/products?${params.toString()}`)
		
		toast.info("Image search coming soon!", {
			description: "For now, showing all products. Visual search will be available soon.",
		})
	}

	return (
		<section className="relative">
			<div className="container mx-auto px-4 py-14 md:py-24">
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-3xl mx-auto text-center"
				>
					<div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
						<Sparkles className="w-3.5 h-3.5" />
						Smart product discovery
					</div>
					<h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4">{title}</h1>
					{subtitle ? <p className="text-muted-foreground mt-4 md:text-lg hidden md:block">{subtitle}</p> : null}

					<form
						className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
						onSubmit={(e) => {
							e.preventDefault()
							handleAISearch()
						}}
					>
						<div className="relative w-full sm:max-w-xl">
							<Label htmlFor="hero-q" className="sr-only">
								Search prompt
							</Label>
							<Input
								id="hero-q"
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder={placeholder}
								className="h-12 pr-28"
								disabled={isPending}
							/>
							{q.length > 2 && (
								<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
									<Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
								</div>
							)}
							<div className="absolute right-1 top-1 bottom-1 flex items-center gap-1">
								<Input
									ref={fileRef}
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) => {
										const f = e.target.files?.[0]
										if (f) {
											handleImageUpload(f)
										}
									}}
								/>
								<Button
									type="button"
									variant="outline"
									className="bg-transparent h-10 gap-2"
									onClick={() => fileRef.current?.click()}
									aria-label="Upload reference image"
								>
									<ImageUp className="w-4 h-4" />
									Upload
								</Button>
							</div>
						</div>
						<Button type="submit" className="h-12" disabled={isPending || !q.trim()}>
							{isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Processing...
								</>
							) : (
								<>
									<Sparkles className="w-4 h-4 mr-2" />
									AI Search
								</>
							)}
						</Button>
					</form>
				</motion.div>
			</div>
		</section>
	)
}