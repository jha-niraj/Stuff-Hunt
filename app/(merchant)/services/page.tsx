"use client"

import { CheckCircle2, SyringeIcon as Needle, Package, Shirt, BadgeCheck, Palette, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesPage() {
	const services = [
		{
			icon: Needle,
			title: "Custom Embroidery",
			desc: "High‑fidelity stitching for logos, names, and detailed artwork.",
		},
		{
			icon: Shirt,
			title: "Apparel Decoration",
			desc: "Polos, hats, hoodies, totes, and more with consistent quality.",
		},
		{
			icon: Palette,
			title: "Design & Digitizing",
			desc: "Vectorization and digitizing tailored to the garment and thread.",
		},
		{
			icon: Package,
			title: "Bulk & Fulfillment",
			desc: "Reliable turnaround and kitting for teams and events.",
		},
	]
	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<motion.div
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="max-w-3xl"
					>
						<div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
							<BadgeCheck className="w-3.5 h-3.5" />
							Trusted partner services
						</div>
						<h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4">Services</h1>
						<p className="text-muted-foreground mt-3 md:text-lg">
							From intricate embroidery to end‑to‑end fulfillment. We help brands look sharp and stay consistent.
						</p>
					</motion.div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
						{
							services.map((s, i) => (
								<motion.div
									key={s.title}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.06 }}
									viewport={{ once: true, amount: 0.3 }}
									className="rounded-xl border p-6 bg-card"
								>
									<s.icon className="w-6 h-6" />
									<h3 className="text-lg font-semibold mt-3">{s.title}</h3>
									<p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
									<ul className="mt-4 space-y-2 text-sm">
										<li className="flex items-center gap-2">
											<CheckCircle2 className="w-4 h-4 text-green-600" />
											Consistent quality control
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle2 className="w-4 h-4 text-green-600" />
											Fast, reliable turnaround
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle2 className="w-4 h-4 text-green-600" />
											Proofing before production
										</li>
									</ul>
								</motion.div>
							))
						}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="rounded-xl border p-6 bg-card"
						>
							<Sparkles className="w-6 h-6" />
							<h3 className="text-lg font-semibold mt-3">Specialty Finishes</h3>
							<p className="text-sm text-muted-foreground mt-2">
								Metallic thread, puff embroidery, applique, and more for standout looks.
							</p>
						</motion.div>
					</div>
				</section>
			</main>
		</div>
	)
}