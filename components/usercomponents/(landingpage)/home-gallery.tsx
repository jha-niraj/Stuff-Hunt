"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HomeGallery() {
	const items = Array.from({ length: 6 }).map((_, i) => ({
		src: `/placeholder.svg?height=900&width=900&query=embroidery%20portfolio%20${i + 1}`,
		alt: `Project ${i + 1}`,
	}))
	return (
		<section className="py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Gallery</h2>
					<p className="text-muted-foreground mt-1">Recent embroidery and applique highlights.</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
					{items.map((item, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ delay: i * 0.03 }}
							className="relative overflow-hidden rounded-xl border bg-muted"
						>
							<Image
								src={item.src || "/placeholder.svg"}
								alt={item.alt}
								width={900}
								height={900}
								className="aspect-square object-cover"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
