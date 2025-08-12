import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { formatCurrency } from "@/lib/format"

export function HomePricing() {
	const tiers = [
		{
			name: "Starter",
			price: 0,
			desc: "Best for samples or one‑offs.",
			features: ["No minimums", "Standard turnaround"],
		},
		{
			name: "Team",
			price: 49,
			desc: "Discounted rates & priority.",
			features: ["10% off bulk", "Priority queue"],
			highlight: true,
		},
		{ name: "Business", price: 149, desc: "For ongoing programs.", features: ["Dedicated manager", "Kitting & SLAs"] },
	]
	return (
		<section className="py-10 md:py-16">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Pricing</h2>
					<p className="text-muted-foreground mt-1">Transparent and flexible options.</p>
				</div>
				<div className="grid md:grid-cols-3 gap-6 md:gap-8">
					{tiers.map((t) => (
						<Card key={t.name} className={t.highlight ? "border-primary" : ""}>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									{t.name}
									{t.highlight ? (
										<span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Popular</span>
									) : null}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-semibold">
									{t.price === 0 ? "Pay as you go" : `${formatCurrency(t.price)}/mo`}
								</div>
								<p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
								<ul className="mt-4 space-y-2 text-sm">
									{t.features.map((f) => (
										<li key={f} className="flex items-center gap-2">
											<Check className="w-4 h-4 text-green-600" />
											{f}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
