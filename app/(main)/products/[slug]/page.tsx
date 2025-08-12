import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, ShieldCheck, Truck, Star } from "lucide-react"
import { getProductBySlug, getRelatedProducts } from "@/actions/product.action"
import { formatCurrency } from "@/lib/format"
import { ProductGrid } from "@/components/product/product-grid"
import { AddToCart } from "@/components/product/add-to-cart"
import { ProductGallery } from "@/components/product/product-gallery"
import Link from "next/link"

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const result = await getProductBySlug(slug)

	if (!result.success || !result.product) {
		return notFound()
	}

	const product = result.product
	const categoryIds = product.categories.map(cat => cat.id)
	const relatedProducts = await getRelatedProducts(product.id, categoryIds, 4)

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-8 md:py-12">
					<div className="grid lg:grid-cols-2 gap-8">
						<ProductGallery images={product.images} alt={product.name} />
						<div className="lg:pl-4">
							<div className="flex items-center gap-3">
								{
									product.inStock ? (
										<Badge className="bg-green-600 text-white hover:bg-green-600/90">In stock</Badge>
									) : (
										<Badge variant="destructive">Out of stock</Badge>
									)
								}
							</div>
							<h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">{product.name}</h1>
							<p className="text-muted-foreground mt-2">{product.shortDescription}</p>
							<div className="flex items-center gap-2 mt-4">
								<div className="flex items-center">
									{
										Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${i < Math.floor(product.averageRating || 0)
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
													}`}
											/>
										))
									}
								</div>
								<span className="text-sm text-muted-foreground">
									({product._count?.reviews || 0} reviews)
								</span>
							</div>
							<div className="flex items-center justify-between mt-6">
								<div className="flex items-center gap-3">
									<div className="text-3xl font-semibold">{formatCurrency(product.price)}</div>
									{
										product.originalPrice && product.originalPrice > product.price && (
											<div className="text-lg text-muted-foreground line-through">
												{formatCurrency(product.originalPrice)}
											</div>
										)
									}
								</div>
								<Button
									className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
									aria-label="Save to wishlist"
								>
									<Heart className="w-5 h-5" />
									<span className="text-sm">Save</span>
								</Button>
							</div>
							<div className="mt-6 space-y-4">
								{
									product.colors && product.colors.length > 0 && (
										<div className="space-y-2">
											<Label>Color</Label>
											<div className="flex flex-wrap gap-2">
												{
													product.colors.map((color: string) => (
														<Button
															key={color}
															className="h-9 px-3 rounded-md border text-sm hover:bg-accent"
															aria-label={`Choose ${color}`}
														>
															{color}
														</Button>
													))
												}
											</div>
										</div>
									)
								}
								{
									product.sizes && product.sizes.length > 0 && (
										<div className="space-y-2">
											<Label>Size</Label>
											<div className="flex flex-wrap gap-2">
												{
													product.sizes.map((size: string) => (
														<Button
															key={size}
															className="h-9 px-3 rounded-md border text-sm hover:bg-accent"
															aria-label={`Choose size ${size}`}
														>
															{size}
														</Button>
													))
												}
											</div>
										</div>
									)
								}
								<div className="flex items-center gap-3">
									<div className="grid gap-1">
										<Label htmlFor="qty">Quantity</Label>
										<Input id="qty" type="number" min={1} defaultValue={1} className="w-24" />
									</div>
									<AddToCart product={product} />
								</div>
							</div>
							<div className="mt-8 grid gap-4 text-sm">
								<div className="flex items-center gap-3 text-muted-foreground">
									<Truck className="w-4 h-4" />
									Free shipping over {formatCurrency(75)}
								</div>
								<div className="flex items-center gap-3 text-muted-foreground">
									<ShieldCheck className="w-4 h-4" />
									Secure checkout
								</div>
								<div className="text-sm text-muted-foreground">
									Sold by {product.seller.name}
									{
										product.seller.verificationBadge && (
											<Badge variant="secondary" className="ml-2 text-xs">
												Verified
											</Badge>
										)
									}
								</div>
							</div>
							<Tabs defaultValue="details" className="mt-10">
								<TabsList>
									<TabsTrigger value="details">Details</TabsTrigger>
									<TabsTrigger value="care">Care</TabsTrigger>
									<TabsTrigger value="shipping">Shipping</TabsTrigger>
								</TabsList>
								<TabsContent value="details" className="text-sm text-muted-foreground">
									<div className="prose prose-sm max-w-none">
										<p>{product.detailedDescription || product.shortDescription}</p>
									</div>
								</TabsContent>
								<TabsContent value="care" className="text-sm text-muted-foreground">
									Machine wash cold. Do not bleach. Tumble dry low. Cool iron if needed.
								</TabsContent>
								<TabsContent value="shipping" className="text-sm text-muted-foreground">
									Standard shipping 3-5 business days. Expedited options available at checkout.
								</TabsContent>
							</Tabs>
							<div className="mt-10">
								<Accordion type="single" collapsible>
									<AccordionItem value="customization">
										<AccordionTrigger>Customization & Embroidery</AccordionTrigger>
										<AccordionContent>
											Upload your artwork during checkout notes. Our team will prepare a proof for approval within 24-48
											hours.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</div>
					</div>
				</section>
				{
					relatedProducts.length > 0 && (
						<section className="container mx-auto px-4 pb-12">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl md:text-2xl font-semibold tracking-tight">You might also like</h2>
								<Button variant="ghost" asChild>
									<Link href="/products">View all</Link>
								</Button>
							</div>
							<ProductGrid products={relatedProducts} />
						</section>
					)
				}
			</main>
		</div>
	)
}