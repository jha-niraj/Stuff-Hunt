import { notFound } from "next/navigation"
import { getProductBySlug } from "@/actions/product.action"
import { getProductComponent, PRODUCT_TYPE_MAPPINGS } from "@/lib/product-type-detector"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamic imports for product components
const ElectronicsLaptop = dynamic(() => import("@/components/product-details/ElectronicsLaptop"))
const ElectronicsSmartphone = dynamic(() => import("@/components/product-details/ElectronicsSmartphone"))
const ClothingApparel = dynamic(() => import("@/components/product-details/ClothingApparel"))
const GenericProduct = dynamic(() => import("@/components/product-details/GenericProduct"))

// Component mapping
const COMPONENT_MAP = {
	ElectronicsLaptop,
	ElectronicsSmartphone,
	ClothingApparel,
	GenericProduct,
	// Add more components as needed
	ElectronicsAudio: GenericProduct,
	ElectronicsCamera: GenericProduct,
	ElectronicsTablet: GenericProduct,
	ElectronicsSmartwatch: GenericProduct,
	ElectronicsGaming: GenericProduct,
	ElectronicsAccessories: GenericProduct,
	ClothingFootwear: GenericProduct,
	ClothingAccessories: GenericProduct,
	ClothingActivewear: GenericProduct,
	ClothingFormal: GenericProduct,
	ClothingCasual: GenericProduct,
	HomeFurniture: GenericProduct,
	HomeKitchen: GenericProduct,
	HomeDecor: GenericProduct,
	HomeBedding: GenericProduct,
	HomeBathroom: GenericProduct,
	HomeGarden: GenericProduct,
	HomeAppliances: GenericProduct,
	SportsFitness: GenericProduct,
	SportsOutdoor: GenericProduct,
	SportsTeam: GenericProduct,
	SportsWater: GenericProduct,
	BooksFiction: GenericProduct,
	BooksNonFiction: GenericProduct,
	BooksEducational: GenericProduct,
	BooksChildren: GenericProduct,
	BeautySkincare: GenericProduct,
	BeautyMakeup: GenericProduct,
	BeautyHaircare: GenericProduct,
	BeautyFragrance: GenericProduct,
	AutomotiveParts: GenericProduct,
	AutomotiveAccessories: GenericProduct,
	AutomotiveTools: GenericProduct,
}

interface ProductPageProps {
	params: Promise<{
		slug: string
	}>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const resolvedParams = await params
	const result = await getProductBySlug(resolvedParams.slug)

	if (!result.success || !result.product) {
		return {
			title: 'Product Not Found | StuffHunt',
			description: 'The product you are looking for could not be found.'
		}
	}

	const product = result.product
	const productTypeInfo = PRODUCT_TYPE_MAPPINGS[product.productType]

	// Generate dynamic meta based on product type
	const title = `${product.name} - ${product.brand || productTypeInfo.displayName} | StuffHunt`
	const description = product.shortDescription ||
		`${product.name} by ${product.brand || 'StuffHunt'}. ${productTypeInfo.displayName} in ${productTypeInfo.category}. ${product.detailedDescription?.slice(0, 100) || 'High quality product available now.'}`

	const keywords = [
		product.name,
		product.brand,
		productTypeInfo.category,
		productTypeInfo.subcategory,
		...(product.colors || []),
		'StuffHunt',
		'online shopping',
		'buy online'
	].filter(Boolean)

	return {
		title,
		description,
		keywords: keywords.join(', '),
		openGraph: {
			title,
			description,
			images: product.images.slice(0, 4).map(image => ({
				url: image,
				width: 800,
				height: 600,
				alt: product.name
			})),
			type: 'website',
			siteName: 'StuffHunt'
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: product.images[0] ? [product.images[0]] : []
		},
		alternates: {
			canonical: `/products/${resolvedParams.slug}`
		}
	}
}

// Loading component
function ProductDetailSkeleton() {
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="grid lg:grid-cols-2 gap-8 mb-8">
				<div className="space-y-4">
					<Skeleton className="aspect-square w-full rounded-lg" />
					<div className="flex gap-2">
						{
							[...Array(4)].map((_, i) => (
								<Skeleton key={i} className="w-20 h-20 rounded-lg" />
							))
						}
					</div>
				</div>
				<div className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-4 w-48" />
					</div>
					<Skeleton className="h-12 w-48" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<div className="flex gap-2">
							{
								[...Array(3)].map((_, i) => (
									<Skeleton key={i} className="h-8 w-16" />
								))
							}
						</div>
					</div>
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			</div>
		</div>
	)
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
	const resolvedParams = await params
	const result = await getProductBySlug(resolvedParams.slug)

	if (!result.success || !result.product) {
		notFound()
	}

	const product = result.product
	const componentName = getProductComponent(product.productType)
	const ProductComponent = COMPONENT_MAP[componentName as keyof typeof COMPONENT_MAP] || GenericProduct

	// Transform product to match component expectations
	const transformedProduct = {
		...product,
		originalPrice: product.originalPrice ?? undefined,
		brand: product.brand ?? undefined,
		shortDescription: product.shortDescription ?? undefined,
		detailedDescription: product.detailedDescription ?? undefined,
		keyFeatures: product.keyFeatures ?? undefined,
		category: product.category ?? undefined,
		subcategory: product.subcategory ?? undefined,
		weight: product.weight ?? undefined,
		dimensions: product.dimensions ?? undefined,
		material: product.material ?? undefined,
		sku: product.sku ?? undefined,
		discountPercentage: product.discountPercentage ?? undefined
	}

	return (
		<div className="min-h-screen bg-background">
			<Suspense fallback={<ProductDetailSkeleton />}>
				<ProductComponent product={transformedProduct} />
			</Suspense>
		</div>
	)
}