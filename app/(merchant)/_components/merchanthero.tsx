"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, TrendingUp, Users } from "lucide-react"

export function MerchantHeroSection() {
	return (
		<section className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full h-[400px] md:w-[1220px] md:h-[600px] lg:h-[810px] md:px-0">
			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute inset-0 opacity-20"
					animate={{
						background: [
							"linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
							"linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 50%, hsl(var(--secondary)) 100%)",
							"linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)",
						]
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						repeatType: "reverse"
					}}
				/>
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
										<motion.rect
											key={`${i}-${j}`}
											x={-20.0891 + i * 36}
											y={9.2 + j * 36}
											width="35.6"
											height="35.6"
											stroke="hsl(var(--foreground))"
											strokeOpacity="0.11"
											strokeWidth="0.4"
											strokeDasharray="2 2"
											animate={{
												opacity: [0.1, 0.3, 0.1]
											}}
											transition={{
												duration: 3 + (i + j) * 0.1,
												repeat: Infinity,
												repeatType: "reverse"
											}}
										/>
									))}
								</g>
							))}
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
			<motion.div
				className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] mt-20 md:mt-[120px] lg:mt-[160px] px-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<motion.h1
					className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Grow Your Business with AI-Powered Marketplace
				</motion.h1>
				<motion.p
					className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mx-auto"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					Join thousands of successful sellers on StuffHunt. Reach millions of customers with intelligent product
					discovery and automated store management.
				</motion.p>
			</motion.div>
			<motion.div
				className="relative z-10 w-full max-w-2xl mx-auto px-4"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8 }}
			>
				<div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl">
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<Store className="w-4 h-4 text-primary" />
								<span>Easy Setup</span>
							</div>
							<div className="flex items-center gap-2">
								<TrendingUp className="w-4 h-4 text-primary" />
								<span>AI-Powered</span>
							</div>
							<div className="flex items-center gap-2">
								<Users className="w-4 h-4 text-primary" />
								<span>Millions of Customers</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row gap-3 mt-6">
						<Link href="/signup" className="flex-1">
							<Button className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium">
								Start Selling Today
							</Button>
						</Link>
						<Link href="/signin">
							<Button variant="outline" className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium">
								Sign In
							</Button>
						</Link>
					</div>
					<p className="text-xs text-muted-foreground mt-3 text-center">
						Free to start • No setup fees • 24/7 support
					</p>
				</div>
			</motion.div>
		</section>
	)
}