"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { getWishlist, removeFromWishlist, clearWishlist, type WishlistItem } from "@/actions/wishlist.action"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"

export default function WishlistPage() {
	const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
	const [loading, setLoading] = useState(true)
	const [removing, setRemoving] = useState<string | null>(null)
	const { add } = useCart()

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await getWishlist()
				if (response.success && response.items) {
					setWishlistItems(response.items)
				} else {
					toast.error(response.error || 'Failed to load wishlist')
				}
			} catch (error) {
				console.error('Error fetching wishlist:', error)
				toast.error('Failed to load wishlist')
			} finally {
				setLoading(false)
			}
		}

		fetchWishlist()
	}, [])

	const handleRemoveItem = async (productId: string) => {
		setRemoving(productId)
		try {
			const response = await removeFromWishlist(productId)
			if (response.success) {
				setWishlistItems(prev => prev.filter(item => item.productId !== productId))
				toast.success('Removed from wishlist')
			} else {
				toast.error(response.error || 'Failed to remove item')
			}
		} catch (error) {
			console.error('Error removing item:', error)
			toast.error('Failed to remove item')
		} finally {
			setRemoving(null)
		}
	}

	const handleClearWishlist = async () => {
		try {
			const response = await clearWishlist()
			if (response.success) {
				setWishlistItems([])
				toast.success('Wishlist cleared')
			} else {
				toast.error(response.error || 'Failed to clear wishlist')
			}
		} catch (error) {
			console.error('Error clearing wishlist:', error)
			toast.error('Failed to clear wishlist')
		}
	}

	const handleAddToCart = (item: WishlistItem) => {
		add(item.product as any, 1, undefined)
		toast.success('Added to cart')
	}

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/products">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Products
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold flex items-center gap-2">
							<Heart className="w-6 h-6 text-red-500" />
							My Wishlist ({wishlistItems.length})
						</h1>
						<p className="text-muted-foreground">Save your favorite products for later</p>
					</div>
				</div>
				{wishlistItems.length > 0 && (
					<Button variant="outline" onClick={handleClearWishlist}>
						<Trash2 className="w-4 h-4 mr-2" />
						Clear All
					</Button>
				)}
			</div>

			{/* Wishlist Items */}
			{wishlistItems.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center py-12"
				>
					<div className="max-w-md mx-auto">
						<Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
						<h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
						<p className="text-muted-foreground mb-6">
							Start adding products you love to your wishlist. You can save items while browsing and come back to them later.
						</p>
						<Link href="/products">
							<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
								Browse Products
							</Button>
						</Link>
					</div>
				</motion.div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{wishlistItems.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-card border rounded-lg overflow-hidden group"
						>
							<div className="relative">
								<Link href={`/products/${item.product.slug}`}>
									<div className="aspect-square bg-muted relative overflow-hidden">
										<Image
											src={item.product.images?.[0] ?? "/placeholder.svg"}
											alt={item.product.name}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
								</Link>
								
								{/* Remove Button */}
								<Button
									variant="secondary"
									size="sm"
									onClick={() => handleRemoveItem(item.productId)}
									disabled={removing === item.productId}
									className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
								>
									{removing === item.productId ? (
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
									) : (
										<Heart className="h-4 w-4 fill-current text-red-500" />
									)}
								</Button>

								{/* Stock Status */}
								{!item.product.inStock && (
									<div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
										Out of Stock
									</div>
								)}
							</div>

							<div className="p-4 space-y-3">
								<div>
									<Link 
										href={`/products/${item.product.slug}`}
										className="font-medium hover:underline line-clamp-2"
									>
										{item.product.name}
									</Link>
									<p className="text-sm text-muted-foreground">
										{item.product.categories[0]?.name || 'Uncategorized'}
									</p>
									{item.product.brand && (
										<p className="text-xs text-muted-foreground">
											Brand: {item.product.brand}
										</p>
									)}
								</div>

								<div className="flex items-center justify-between">
									<div>
										<span className="text-lg font-bold text-primary">
											{formatCurrency(item.product.price)}
										</span>
										{item.product.originalPrice && item.product.originalPrice > item.product.price && (
											<span className="text-sm text-muted-foreground line-through ml-2">
												{formatCurrency(item.product.originalPrice)}
											</span>
										)}
									</div>
								</div>

								<div className="flex gap-2">
									<Button
										size="sm"
										onClick={() => handleAddToCart(item)}
										disabled={!item.product.inStock}
										className="flex-1"
									>
										<ShoppingCart className="w-4 h-4 mr-2" />
										{item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleRemoveItem(item.productId)}
										disabled={removing === item.productId}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>

								<p className="text-xs text-muted-foreground">
									Added {new Date(item.createdAt).toLocaleDateString()}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	)
}