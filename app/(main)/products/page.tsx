import { ProductsClient } from "@/components/product/products-client"

export default function ProductsPage() {
	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-8 md:py-12">
					<div className="mb-6 md:mb-8">
						<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Products</h1>
						<p className="text-muted-foreground mt-2">
							Explore our collection of premium custom apparel and accessories.
						</p>
					</div>
					<ProductsClient />
				</section>
			</main>
		</div>
	)
}