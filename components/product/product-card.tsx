"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { type ProductWithDetails } from "@/actions/product.action"
import { formatCurrency } from "@/lib/format"
import { Plus, Heart, GitCompare } from "lucide-react"
import { useCart } from "@/stores/cart-store"
import { useCompare } from "@/contexts/compare-context"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist.action"

type Props = {
	product: ProductWithDetails
}

export function ProductCard({ product }: Props) {
	const { add } = useCart()
	const { addToCompare, removeFromCompare, isInCompare } = useCompare()
	const [isWishlisted, setIsWishlisted] = useState(false)
	const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

	// Check if product is in wishlist on mount
	useEffect(() => {
		const checkWishlistStatus = async () => {
			try {
				const inWishlist = await isInWishlist(product.id)
				setIsWishlisted(inWishlist)
			} catch (error) {
				console.error('Error checking wishlist status:', error)
			}
		}
		checkWishlistStatus()
	}, [product.id])

	const handleCompareToggle = () => {
		if (isInCompare(product.id)) {
			removeFromCompare(product.id)
		} else {
			addToCompare({
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.images?.[0] ?? "/placeholder.svg",
				slug: product.slug
			})
		}
	}

	const handleWishlistToggle = async () => {
		setIsAddingToWishlist(true)
		try {
			if (isWishlisted) {
				const response = await removeFromWishlist(product.id)
				if (response.success) {
					setIsWishlisted(false)
					toast.success('Removed from wishlist')
				} else {
					toast.error(response.error || 'Failed to remove from wishlist')
				}
			} else {
				const response = await addToWishlist(product.id)
				if (response.success) {
					setIsWishlisted(true)
					toast.success('Added to wishlist')
				} else {
					toast.error(response.error || 'Failed to add to wishlist')
				}
			}
		} catch (error) {
			console.log("Error Occurred: " + error);
			toast.error('Failed to update wishlist')
		} finally {
			setIsAddingToWishlist(false)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			className="group rounded-xl border overflow-hidden bg-card relative"
		>
			<div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
				<Button
					variant="secondary"
					size="sm"
					onClick={handleWishlistToggle}
					disabled={isAddingToWishlist}
					className={cn(
						"h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background",
						isWishlisted && "text-red-500 hover:text-red-600"
					)}
				>
					<Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onClick={handleCompareToggle}
					className={cn(
						"h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background",
						isInCompare(product.id) && "text-primary bg-primary/10"
					)}
				>
					<GitCompare className="h-4 w-4" />
				</Button>
			</div>
			<Link href={`/products/${product.slug}`} className="block">
				<div className="relative bg-muted">
					<Image
						src={product.images?.[0] ?? "/placeholder.svg?height=900&width=900&query=product"}
						alt={product.name}
						width={900}
						height={900}
						className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			</Link>
			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<div>
						<Link href={`/products/${product.slug}`} className="font-medium line-clamp-1 hover:underline">
							{product.name}
						</Link>
						<div className="text-xs text-muted-foreground mt-1">
							{product.categories[0]?.name || 'Uncategorized'}
						</div>
					</div>
					<div className="font-semibold shrink-0">{formatCurrency(product.price)}</div>
				</div>
				<div className="mt-3 flex items-center justify-between">
					<div className="flex -space-x-1">
						{
							(product.colors ?? []).slice(0, 3).map((color: string) => (
								<span key={color} className="inline-block w-5 h-5 rounded-full border bg-muted" title={color} />
							))
						}
					</div>
					<div className="flex items-center gap-2">
						<div className="hidden sm:flex items-center gap-1">
							<input
								type="checkbox"
								id={`compare-${product.id}`}
								checked={isInCompare(product.id)}
								onChange={handleCompareToggle}
								className="rounded border-gray-300 text-primary focus:ring-primary"
							/>
							<label htmlFor={`compare-${product.id}`} className="text-xs text-muted-foreground cursor-pointer">
								Compare
							</label>
						</div>
						<Button
							size="sm"
							variant="outline"
							className="gap-2 bg-transparent"
							onClick={() => add(product, 1, undefined)}
							aria-label="Quick add to cart"
						>
							<Plus className="w-4 h-4" />
							Add
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	)
}