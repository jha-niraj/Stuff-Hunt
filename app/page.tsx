import { Hero } from "@/components/usercomponents/(landingpage)/hero"
import { LogoCloud } from "@/components/usercomponents/(landingpage)/logo-cloud"
import { FeaturedGrid } from "@/components/usercomponents/(landingpage)/featured-grid"
import { ValueProps } from "@/components/usercomponents/(landingpage)/value-props"
import { CTASection } from "@/components/usercomponents/(landingpage)/cta-section"
import { HomeServices } from "@/components/usercomponents/(landingpage)/home-services"
import { HomeGallery } from "@/components/usercomponents/(landingpage)/home-gallery"
import { HomePricing } from "@/components/usercomponents/(landingpage)/home-pricing"
import { HomeFAQ } from "@/components/usercomponents/(landingpage)/home-faq"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MoreProducts } from "@/components/usercomponents/(landingpage)/more-products"

export default function Page() {
	return (
		<div className="min-h-dvh flex flex-col">
			<Navbar />
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
			<Footer />
		</div>
	)
}