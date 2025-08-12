import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { formatCurrency } from "@/lib/format"

export default function PricingPage() {
	const tiers = [
		{
			name: "Starter",
			price: 0,
			desc: "Best for samples or one‑offs. Pay per item.",
			features: ["No minimums", "Standard turnaround", "Email support"],
		},
		{
			name: "Team",
			price: 49,
			desc: "Unlock discounted rates and priority production.",
			features: ["10% off bulk", "Priority queue", "Live chat support"],
			highlight: true,
		},
		{
			name: "Business",
			price: 149,
			desc: "For ongoing programs and fulfillment needs.",
			features: ["Dedicated manager", "Custom kitting", "SLAs & reporting"],
		},
	]
	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<div className="max-w-2xl">
						<h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Pricing</h1>
						<p className="text-muted-foreground mt-3 md:text-lg">
							Transparent rates with volume discounts. Embroidery digitizing starts at {formatCurrency(25)}.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-10">
						{tiers.map((t) => (
							<Card key={t.name} className={t.highlight ? "border-primary" : ""}>
								<CardHeader>
									<CardTitle className="flex items-center justify-between">
										{t.name}
										{t.highlight ? (
											<span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
												Popular
											</span>
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
				</section>
			</main>
		</div>
	)
}
