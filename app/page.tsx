"use client"

import { HeroSection } from "@/components/(usercomponents)/herosection"
import { AnimatedSection } from "@/components/animatedsection"
import Image from "next/image"
import { Search, ImageIcon, ShoppingCart, Zap, Upload, ShoppingBag } from "lucide-react"
import { TestimonialGridSection } from "@/components/(usercomponents)/testimonials"
import { FAQSection } from "@/components/(usercomponents)/faqsection"
import { CTASection } from "@/components/(usercomponents)/ctasection"
import Footer from "@/components/footer"

const features = [
	{
		icon: Search,
		title: "Smart Search",
		description: "Use natural language to find exactly what you're looking for. Our AI understands context and intent.",
	},
	{
		icon: ImageIcon,
		title: "Visual Search",
		description: "Upload any image and find similar products across thousands of retailers instantly.",
	},
	{
		icon: ShoppingCart,
		title: "Universal Cart",
		description: "Add products from different stores to one cart and checkout seamlessly.",
	},
	{
		icon: Zap,
		title: "Instant Results",
		description: "Get product recommendations and price comparisons in milliseconds, not minutes.",
	},
]
const steps = [
	{
		icon: Upload,
		title: "Upload or Describe",
		description: "Upload an image of what you want or describe it in natural language.",
	},
	{
		icon: Search,
		title: "AI Finds Matches",
		description: "Our AI searches across thousands of products to find the best matches.",
	},
	{
		icon: ShoppingBag,
		title: "Shop & Compare",
		description: "Compare prices, read reviews, and buy from your preferred retailers.",
	},
]
const stats = [
	{ number: "10M+", label: "Products Indexed" },
	{ number: "500+", label: "Partner Retailers" },
	{ number: "99.9%", label: "Search Accuracy" },
	{ number: "< 1s", label: "Average Response Time" },
]

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-background relative overflow-hidden pb-0">
			<div className="relative z-10">
				<main className="max-w-[1320px] mx-auto relative">
					<HeroSection />
				</main>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[411px] md:mt-[400px]" delay={0.1}>
					<section className="self-stretch py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
						<div className="text-center text-gray-300 text-sm font-medium leading-tight">
							Trusted by fast-growing startups
						</div>
						<div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
							{Array.from({ length: 8 }).map((_, i) => (
								<Image
									key={i}
									src={`/logos/logo0${i + 1}.svg`}
									alt={`Company Logo ${i + 1}`}
									width={400}
									height={120}
									className="w-full max-w-[400px] h-auto object-contain grayscale opacity-70"
								/>
							))}
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.15}>
					<section className="w-full px-5 py-16 md:py-24">
						<div className="max-w-6xl mx-auto">
							<div className="text-center mb-16">
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">Why Choose Our Platform?</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Experience the future of online shopping with AI-powered features that make finding and buying products
									effortless.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
								{features.map((feature, index) => (
									<div key={index} className="text-center group">
										<div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
											<feature.icon className="w-8 h-8 text-primary" />
										</div>
										<h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
										<p className="text-muted-foreground leading-relaxed">{feature.description}</p>
									</div>
								))}
							</div>
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection
					id="how-it-works-section"
					className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
					delay={0.2}
				>
					<section className="w-full px-5 py-16 md:py-24 bg-muted/30">
						<div className="max-w-6xl mx-auto">
							<div className="text-center mb-16">
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">How It Works</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Finding the perfect product is just three simple steps away.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
								{steps.map((step, index) => (
									<div key={index} className="text-center relative">
										<div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
											<step.icon className="w-10 h-10 text-primary-foreground" />
										</div>
										<div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
											{index + 1}
										</div>
										<h3 className="text-xl font-semibold text-foreground mb-3 mt-4">{step.title}</h3>
										<p className="text-muted-foreground leading-relaxed">{step.description}</p>

										{index < steps.length - 1 && (
											<div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border transform -translate-y-1/2" />
										)}
									</div>
								))}
							</div>
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection id="stats-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<section className="w-full px-5 py-16 md:py-24">
						<div className="max-w-6xl mx-auto">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{stats.map((stat, index) => (
									<div key={index} className="text-center">
										<div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
										<div className="text-muted-foreground font-medium">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<TestimonialGridSection />
				</AnimatedSection>
				<AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<FAQSection />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<CTASection />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<Footer />
				</AnimatedSection>
			</div>
		</div>
	)
}