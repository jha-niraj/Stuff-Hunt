import { Hero } from "@/components/sections/hero"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { FeaturedGrid } from "@/components/sections/featured-grid"
import { ValueProps } from "@/components/sections/value-props"
import { CTASection } from "@/components/sections/cta-section"
import { HomeServices } from "@/components/sections/home-services"
import { HomeGallery } from "@/components/sections/home-gallery"
import { HomePricing } from "@/components/sections/home-pricing"
import { HomeFAQ } from "@/components/sections/home-faq"
import { SiteHeader } from "@/components/navbar"
import { SiteFooter } from "@/components/footer"
import { MoreProducts } from "@/components/sections/more-products"

export default function Page() {
	return (
		<div className="min-h-dvh flex flex-col">
			<SiteHeader />
			<main className="flex-1">
				<Hero />
				<LogoCloud />
				<FeaturedGrid />
				<MoreProducts />
				{/* Move Services, Gallery, Pricing, FAQ onto the home page only (after products) */}
				<HomeServices />
				<HomeGallery />
				<HomePricing />
				<HomeFAQ />
				<ValueProps />
				<CTASection />
			</main>
			<SiteFooter />
		</div>
	)
}