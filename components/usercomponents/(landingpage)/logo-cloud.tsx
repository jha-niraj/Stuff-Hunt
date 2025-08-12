"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function LogoCloud() {
	const logos = Array.from({ length: 6 }).map((_, i) => ({
		src: "/placeholder-logo.svg",
		alt: `Logo ${i + 1}`,
	}))

	return (
		<section className="py-8 md:py-10">
			<div className="container mx-auto px-4">
				<div className="text-center text-sm text-muted-foreground mb-4">Trusted by brands and teams</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
					{logos.map((l, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ delay: i * 0.05 }}
							className="flex items-center justify-center"
						>
							<Image
								src={l.src || "/placeholder.svg"}
								alt={l.alt}
								width={140}
								height={70}
								className="h-8 w-auto opacity-70"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
