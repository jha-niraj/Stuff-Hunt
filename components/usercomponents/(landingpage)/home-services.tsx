"use client"

import { motion } from "framer-motion"
import { CheckCircle2, SyringeIcon as Needle, Package, Shirt, Palette } from "lucide-react"

export function HomeServices() {
	const services = [
		{ icon: Needle, title: "Custom Embroidery", desc: "High‑fidelity stitching for logos and artwork." },
		{ icon: Shirt, title: "Apparel Decoration", desc: "Polos, hats, hoodies, totes, and more." },
		{ icon: Palette, title: "Design & Digitizing", desc: "Vectorization and digitizing for crisp results." },
		{ icon: Package, title: "Bulk & Fulfillment", desc: "Reliable turnaround and kitting for events." },
	]
	return (
		<section className="py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Services</h2>
					<p className="text-muted-foreground mt-1">Everything you need from stitch to ship.</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{services.map((s, i) => (
						<motion.div
							key={s.title}
							initial={{ opacity: 0, y: 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ delay: i * 0.05 }}
							className="rounded-xl border p-6 bg-card"
						>
							<s.icon className="w-6 h-6" />
							<h3 className="text-lg font-semibold mt-3">{s.title}</h3>
							<p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
							<ul className="mt-4 space-y-2 text-sm">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-green-600" />
									Quality control
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="w-4 h-4 text-green-600" />
									Fast turnaround
								</li>
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
