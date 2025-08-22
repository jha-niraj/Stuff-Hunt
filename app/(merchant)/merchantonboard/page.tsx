"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Bot, TrendingUp, BarChart3, Zap, Store, Upload } from "lucide-react"

import { AnimatedSection } from "@/components/animatedsection"
import { MerchantHeroSection } from "../_components/merchanthero"
import { MerchantTestimonialsSection } from "../_components/merchanttestimonials";
import { MerchantPricingSection } from "../_components/merchantpricing";
import { MerchantFAQSection } from "../_components/merchantfaqs";
import { MerchantCTASection } from "../_components/merchantcta";
import { Footer } from "@/components/footer";
import { MerchantBentoSection } from "../_components/merchantbento";
import { MerchantNavbar } from "@/components/merchantnavbar";

const brands = ["Flipkart", "Amazon", "Myntra", "Nykaa", "BigBasket", "Zomato", "Swiggy", "Paytm"]

const features = [
	{
		icon: Bot,
		title: "AI-Powered Listings",
		description:
			"Upload product images and let our AI generate compelling descriptions, tags, and categorizations automatically. Save hours of manual work.",
	},
	{
		icon: TrendingUp,
		title: "Smart Discovery",
		description:
			"Your products get discovered through advanced AI matching algorithms. Customers find you through text search and visual recognition.",
	},
	{
		icon: BarChart3,
		title: "Advanced Analytics",
		description:
			"Track sales performance, customer behavior, and market trends with detailed insights. Make data-driven decisions to grow your business.",
	},
	{
		icon: Zap,
		title: "Instant Setup",
		description:
			"Get your store live in minutes with our streamlined onboarding process. Start selling immediately with zero technical complexity.",
	},
]
const stats = [
	{ number: "10M+", label: "Products Indexed" },
	{ number: "500+", label: "Partner Retailers" },
	{ number: "99.9%", label: "Search Accuracy" },
	{ number: "< 1s", label: "Average Response Time" },
]
const steps = [
	{
		icon: Store,
		title: "Create Your Store",
		description:
			"Sign up and set up your store profile in minutes. Add your business details, branding, and payment information.",
	},
	{
		icon: Upload,
		title: "List Your Products",
		description:
			"Upload product images and let our AI generate descriptions, tags, and categories. Bulk upload tools make it easy to list hundreds of products.",
	},
	{
		icon: TrendingUp,
		title: "Start Selling",
		description:
			"Your products go live instantly. Track orders, manage inventory, and watch your sales grow with our analytics dashboard.",
	},
]

export default function LandingPage() {

	return (
		<div className="min-h-screen bg-background relative overflow-hidden pb-0">
			<MerchantNavbar />
			<div className="relative z-10">
				<main className="max-w-[1320px] mx-auto relative">
					<MerchantHeroSection />
				</main>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[100px] md:mt-[150px]" delay={0.1}>
					<section className="self-stretch py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
						<motion.div
							className="text-center text-gray-300 text-sm font-medium leading-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							Trusted by sellers from leading platforms
						</motion.div>
						<div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
							{
								Array.from({ length: 8 }).map((_, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: i * 0.1 }}
										whileHover={{ scale: 1.05 }}
									>
										<Image
											src={`/logos/logo0${i + 1}.svg`}
											alt={`${brands[i]} Logo`}
											width={400}
											height={120}
											className="w-full max-w-[400px] h-auto object-contain grayscale opacity-70 hover:opacity-90 transition-opacity"
										/>
									</motion.div>
								))
							}
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.15}>
					<section className="w-full px-5 py-16 md:py-24">
						<div className="max-w-6xl mx-auto">
							<motion.div
								className="text-center mb-16"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8 }}
							>
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">Why Sell on StuffHunt?</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Powerful AI-driven tools and features designed to help you sell more, reach more customers, and grow your
									business faster.
								</p>
							</motion.div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
								{
									features.map((feature, index) => (
										<motion.div
											key={index}
											className="text-center group"
											initial={{ opacity: 0, y: 50 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.6, delay: index * 0.1 }}
											whileHover={{ y: -10 }}
										>
											<motion.div
												className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors"
												whileHover={{ scale: 1.1, rotate: 5 }}
												transition={{ duration: 0.3 }}
											>
												<feature.icon className="w-8 h-8 text-primary" />
											</motion.div>
											<h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
											<p className="text-muted-foreground leading-relaxed">{feature.description}</p>
										</motion.div>
									))
								}
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
							<motion.div
								className="text-center mb-16"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8 }}
							>
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">How to Start Selling</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Get your business online and start reaching millions of customers in just three simple steps.
								</p>
							</motion.div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
								{
									steps.map((step, index) => (
										<motion.div
											key={index}
											className="text-center relative"
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.6, delay: index * 0.2 }}
										>
											<motion.div
												className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center relative z-10"
												whileHover={{ scale: 1.1 }}
												transition={{ duration: 0.3 }}
											>
												<step.icon className="w-10 h-10 text-primary-foreground" />
											</motion.div>
											<motion.div
												className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-20"
												initial={{ scale: 0 }}
												whileInView={{ scale: 1 }}
												viewport={{ once: true }}
												transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
											>
												{index + 1}
											</motion.div>
											<h3 className="text-xl font-semibold text-foreground mb-3 mt-4">{step.title}</h3>
											<p className="text-muted-foreground leading-relaxed">{step.description}</p>

											{
												index < steps.length - 1 && (
													<motion.div
														className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border transform -translate-y-1/2"
														initial={{ scaleX: 0 }}
														whileInView={{ scaleX: 1 }}
														viewport={{ once: true }}
														transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
													/>
												)
											}
										</motion.div>
									))
								}
							</div>
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection id="stats-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<section className="w-full px-5 py-16 md:py-24">
						<div className="max-w-6xl mx-auto">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
								{
									stats.map((stat, index) => (
										<motion.div
											key={index}
											className="text-center"
											initial={{ opacity: 0, y: 30 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.6, delay: index * 0.1 }}
											whileHover={{ scale: 1.05 }}
										>
											<motion.div
												className="text-3xl md:text-4xl font-bold text-primary mb-2"
												initial={{ scale: 0 }}
												whileInView={{ scale: 1 }}
												viewport={{ once: true }}
												transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring", bounce: 0.4 }}
											>
												{stat.number}
											</motion.div>
											<div className="text-muted-foreground font-medium">{stat.label}</div>
										</motion.div>
									))
								}
							</div>
						</div>
					</section>
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
					<MerchantBentoSection />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<MerchantTestimonialsSection />
				</AnimatedSection>
				<AnimatedSection
					id="pricing-section"
					className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
					delay={0.2}
				>
					<MerchantPricingSection />
				</AnimatedSection>
				<AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<MerchantFAQSection />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<MerchantCTASection />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<Footer />
				</AnimatedSection>
			</div>
		</div>
	)
}