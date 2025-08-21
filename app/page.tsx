"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Sparkles, ShoppingBag, Zap, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeaturedGrid } from "@/components/usercomponents/(landingpage)/featured-grid"
import { MoreProducts } from "@/components/usercomponents/(landingpage)/more-products"
import Link from "next/link"

const brands = ["Nike", "Adidas", "Apple", "Samsung", "Sony", "Canon", "Dell", "HP"]

const features = [
	{
		icon: Search,
		title: "AI-Powered Search",
		description:
			"Find exactly what you're looking for with our intelligent search. Just describe what you want and let AI do the magic.",
	},
	{
		icon: Sparkles,
		title: "Smart Recommendations",
		description:
			"Get personalized product suggestions based on your preferences, browsing history, and trending items.",
	},
	{
		icon: ShoppingBag,
		title: "Seamless Shopping",
		description:
			"Enjoy a smooth shopping experience with easy checkout, multiple payment options, and fast delivery.",
	},
	{
		icon: Zap,
		title: "Lightning Fast",
		description:
			"Browse millions of products instantly with our optimized search engine and lightning-fast page loads.",
	},
]

const stats = [
	{ number: "10M+", label: "Products Available" },
	{ number: "500K+", label: "Happy Customers" },
	{ number: "99.9%", label: "Customer Satisfaction" },
	{ number: "24/7", label: "Customer Support" },
]

const steps = [
	{
		icon: Search,
		title: "Discover Products",
		description:
			"Use our AI-powered search to find exactly what you need. Search by text, image, or just describe what you want.",
	},
	{
		icon: Heart,
		title: "Save Favorites",
		description:
			"Create wishlists, compare products, and save items for later. Get notified when prices drop on your favorites.",
	},
	{
		icon: ShoppingBag,
		title: "Shop & Enjoy",
		description:
			"Secure checkout, fast delivery, and easy returns. Track your orders and enjoy your new purchases!",
	},
]

// Hero Header Component
function HeroHeader() {
	return (
		<header className="w-full py-4 px-6">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-3">
						<Link href="/" className="flex items-center gap-3">
							<span className="text-foreground text-xl font-semibold">StuffHunt</span>
							<div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
								<Sparkles className="w-3 h-3" />
								Shop Smart
							</div>
						</Link>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Link href="/products" className="hidden md:block">
						<Button variant="ghost" className="text-foreground hover:bg-muted px-4 py-2 rounded-full font-medium">
							Browse Products
						</Button>
					</Link>
					<Link href="/signup" className="hidden md:block">
						<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm">
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</header>
	)
}

// Hero Section Component
function HeroSection() {
	return (
		<section
			className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4
         w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0"
		>
			<div className="absolute inset-0 z-0">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1220 810"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid slice"
				>
					<g clipPath="url(#clip0_186_1134)">
						<mask
							id="mask0_186_1134"
							style={{ maskType: "alpha" }}
							maskUnits="userSpaceOnUse"
							x="10"
							y="-1"
							width="1200"
							height="812"
						>
							<rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#paint0_linear_186_1134)" />
						</mask>
						<g mask="url(#mask0_186_1134)">
							{[...Array(35)].map((_, i) => (
								<g key={`row1-${i}`}>
									{[...Array(22)].map((_, j) => (
										<rect
											key={`${i}-${j}`}
											x={-20.0891 + i * 36}
											y={9.2 + j * 36}
											width="35.6"
											height="35.6"
											stroke="hsl(var(--foreground))"
											strokeOpacity="0.11"
											strokeWidth="0.4"
											strokeDasharray="2 2"
										/>
									))}
								</g>
							))}
							{/* Specific Rectangles with fill */}
							<rect x="699.711" y="81" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.08" />
							<rect x="195.711" y="153" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="1023.71" y="153" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="123.711" y="225" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="1095.71" y="225" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="951.711" y="297" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="231.711" y="333" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
							<rect x="303.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
							<rect x="87.7109" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="519.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.08" />
							<rect x="771.711" y="405" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.09" />
							<rect x="591.711" y="477" width="36" height="36" fill="hsl(var(--foreground))" fillOpacity="0.07" />
						</g>

						<g filter="url(#filter0_f_186_1134)">
							<path
								d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
								fill="url(#paint1_linear_186_1134)"
							/>
						</g>

						<g filter="url(#filter1_f_186_1134)">
							<path
								d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
								fill="url(#paint2_linear_186_1134)"
								fillOpacity="0.69"
							/>
						</g>

						<g style={{ mixBlendMode: "lighten" }} filter="url(#filter2_f_186_1134)">
							<path
								d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
								fill="url(#paint3_linear_186_1134)"
							/>
						</g>

						<g style={{ mixBlendMode: "overlay" }} filter="url(#filter3_f_186_1134)">
							<path
								d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
								fill="url(#paint4_radial_186_1134)"
								fillOpacity="0.64"
							/>
						</g>
					</g>

					<rect
						x="0.5"
						y="0.5"
						width="1219"
						height="809"
						rx="15.5"
						stroke="hsl(var(--foreground))"
						strokeOpacity="0.06"
					/>

					<defs>
						<filter
							id="filter0_f_186_1134"
							x="147.369"
							y="-467.818"
							width="1941.42"
							height="2035.46"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter1_f_186_1134"
							x="-554.207"
							y="-1169.39"
							width="3216.57"
							height="3310.61"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter2_f_186_1134"
							x="426.762"
							y="-452.424"
							width="1622.63"
							height="1716.67"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<filter
							id="filter3_f_186_1134"
							x="-253.163"
							y="-611.818"
							width="2221.95"
							height="2035.46"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
						</filter>
						<linearGradient
							id="paint0_linear_186_1134"
							x1="35.0676"
							y1="23.6807"
							x2="903.8"
							y2="632.086"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" stopOpacity="0" />
							<stop offset="1" stopColor="hsl(var(--muted-foreground))" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_186_1134"
							x1="1118.08"
							y1="-149.03"
							x2="1118.08"
							y2="1248.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_186_1134"
							x1="1054.08"
							y1="-213.03"
							x2="1054.08"
							y2="1184.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_186_1134"
							x1="1238.08"
							y1="-293.03"
							x2="1238.08"
							y2="1104.85"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.578125" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</linearGradient>
						<radialGradient
							id="paint4_radial_186_1134"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
						>
							<stop stopColor="hsl(var(--foreground))" />
							<stop offset="0.157789" stopColor="hsl(var(--primary-light))" />
							<stop offset="1" stopColor="hsl(var(--primary))" />
						</radialGradient>
						<clipPath id="clip0_186_1134">
							<rect width="1220" height="810" rx="16" fill="hsl(var(--foreground))" />
						</clipPath>
					</defs>
				</svg>
			</div>

			{/* Header positioned at top of hero container */}
			<div className="absolute top-0 left-0 right-0 z-20">
				<HeroHeader />
			</div>

			<div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-16 md:mt-[120px] lg:mt-[160px] px-4">
				<h1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
					Discover Amazing Products with AI-Powered Shopping
				</h1>
				<p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto">
					Find exactly what you're looking for with intelligent search, personalized recommendations, and seamless shopping experience.
				</p>
			</div>

			{/* Search Interface */}
			<div className="relative z-10 w-full max-w-2xl mx-auto px-4">
				<div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl">
					<div className="flex flex-col sm:flex-row gap-3">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search for anything... 'wireless headphones', 'running shoes', etc."
								className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
							/>
						</div>
						<Link href="/products">
							<Button className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium">
								<Search className="w-4 h-4 mr-2" />
								Search
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

// Animated Section Component
function AnimatedSection({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
	return (
		<motion.div
			id={id}
			className={className}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, delay }}
		>
			{children}
		</motion.div>
	)
}

// CTA Section Component
function CTASection() {
	return (
		<section className="w-full pt-20 md:pt-60 lg:pt-60 pb-10 md:pb-20 px-5 relative flex flex-col justify-center items-center overflow-visible">
			<div className="absolute inset-0 top-[-90px]">
				<svg
					className="w-full h-full"
					viewBox="0 0 1388 825"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid slice"
				>
					<mask
						id="mask0_182_1049"
						style={{ maskType: "alpha" }}
						maskUnits="userSpaceOnUse"
						x="269"
						y="27"
						width="850"
						height="493"
					>
						<rect x="269.215" y="27.4062" width="849.57" height="492.311" fill="url(#paint0_linear_182_1049)" />
					</mask>
					<g mask="url(#mask0_182_1049)">
						<g filter="url(#filter0_f_182_1049)">
							<ellipse
								cx="694"
								cy="-93.0414"
								rx="670.109"
								ry="354.908"
								fill="url(#paint1_radial_182_1049)"
								fillOpacity="0.8"
							/>
						</g>
						<ellipse cx="694" cy="-91.5385" rx="670.109" ry="354.908" fill="url(#paint2_linear_182_1049)" />
						<ellipse cx="694" cy="-93.0414" rx="670.109" ry="354.908" fill="url(#paint3_linear_182_1049)" />
					</g>
					<defs>
						<filter
							id="filter0_f_182_1049"
							x="-234.109"
							y="-705.949"
							width="1856.22"
							height="1225.82"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
							<feGaussianBlur stdDeviation="129" result="effect1_foregroundBlur_182_1049" />
						</filter>
						<linearGradient
							id="paint0_linear_182_1049"
							x1="1118.79"
							y1="273.562"
							x2="269.215"
							y2="273.562"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--background))" stopOpacity="0" />
							<stop offset="0.2" stopColor="hsl(var(--background))" stopOpacity="0.8" />
							<stop offset="0.8" stopColor="hsl(var(--background))" stopOpacity="0.8" />
							<stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
						</linearGradient>
						<radialGradient
							id="paint1_radial_182_1049"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(683.482 245.884) rotate(-3.78676) scale(469.009 248.4)"
						>
							<stop offset="0.1294" stopColor="hsl(var(--primary-dark))" />
							<stop offset="0.2347" stopColor="hsl(var(--primary))" />
							<stop offset="0.3" stopColor="hsl(var(--primary))" stopOpacity="0" />
						</radialGradient>
						<linearGradient
							id="paint2_linear_182_1049"
							x1="694"
							y1="-446.446"
							x2="694"
							y2="263.369"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="white" stopOpacity="0" />
							<stop offset="1" stopColor="white" stopOpacity="0.1" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_182_1049"
							x1="694"
							y1="-447.949"
							x2="694"
							y2="261.866"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="hsl(var(--background))" />
							<stop offset="1" stopColor="hsl(var(--background))" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className="relative z-10 flex flex-col justify-start items-center gap-9 max-w-4xl mx-auto">
				<div className="flex flex-col justify-start items-center gap-4 text-center">
					<h2 className="text-foreground text-4xl md:text-5xl lg:text-[68px] font-semibold leading-tight md:leading-tight lg:leading-[76px] break-words max-w-[435px]">
						Start Shopping Today
					</h2>
					<p className="text-muted-foreground text-sm md:text-base font-medium leading-[18.20px] md:leading-relaxed break-words max-w-2xl">
						Join millions of happy customers who discover amazing products every day with StuffHunt's AI-powered marketplace
					</p>
				</div>
				<Link href="/products">
					<Button
						className="px-[30px] py-2 bg-secondary text-secondary-foreground text-base font-medium leading-6 rounded-[99px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.13)] hover:bg-secondary/90 transition-all duration-200"
						size="lg"
					>
						Explore Products
					</Button>
				</Link>
			</div>
		</section>
	)
}

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background relative overflow-hidden pb-0">
			<div className="relative z-10">
				<main className="max-w-[1320px] mx-auto relative">
					<HeroSection />
					<div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
						<AnimatedSection>
							<motion.div
								className="w-[calc(100vw-32px)] md:w-[1160px]"
								initial={{ opacity: 0, y: 100, scale: 0.8 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 1.2,
									ease: [0.25, 0.46, 0.45, 0.94],
									delay: 0.5,
								}}
							>
								<motion.div
									className="bg-primary-light/50 rounded-2xl p-2 shadow-2xl"
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.3 }}
								>
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
										<Image
											src="/images/shopping-dashboard.png"
											alt="StuffHunt shopping interface showing AI search, product discovery, and personalized recommendations"
											width={1160}
											height={700}
											className="w-full h-full object-cover rounded-xl shadow-lg"
										/>
									</motion.div>
								</motion.div>
							</motion.div>
						</AnimatedSection>
					</div>
				</main>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-[411px] md:mt-[400px]" delay={0.1}>
					<section className="self-stretch py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
						<motion.div
							className="text-center text-gray-300 text-sm font-medium leading-tight"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							Trusted by customers worldwide
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
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">Why Choose StuffHunt?</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Experience the future of online shopping with AI-powered features designed to help you find exactly what you need, faster than ever.
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
								<h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">How It Works</h2>
								<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
									Discover, save, and shop for amazing products in just three simple steps with our intelligent platform.
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
					<FeaturedGrid />
				</AnimatedSection>
				<AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
					<MoreProducts />
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