"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MerchantPricingSection() {
	const [isAnnual, setIsAnnual] = useState(true)

	const pricingPlans = [
		{
			name: "Starter",
			monthlyPrice: "₹0",
			annualPrice: "₹0",
			commission: "5%",
			description: "Perfect for new sellers getting started.",
			features: [
				"Up to 100 product listings",
				"Basic analytics dashboard",
				"AI-powered product descriptions",
				"Standard customer support",
				"Mobile app access",
			],
			buttonText: "Start Free",
			buttonClass:
				"bg-zinc-300 shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] outline outline-0.5 outline-[#1e29391f] outline-offset-[-0.5px] text-gray-800 text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-zinc-400",
		},
		{
			name: "Professional",
			monthlyPrice: "₹1,999",
			annualPrice: "₹1,599",
			commission: "3%",
			description: "Ideal for growing businesses.",
			features: [
				"Unlimited product listings",
				"Advanced analytics & insights",
				"AI-powered recommendations",
				"Priority customer support",
				"Bulk upload tools",
				"Multi-channel integration",
				"Custom store branding",
			],
			buttonText: "Start Professional",
			buttonClass:
				"bg-primary-foreground shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] text-primary text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-primary-foreground/90",
			popular: true,
		},
		{
			name: "Enterprise",
			monthlyPrice: "₹9,999",
			annualPrice: "₹7,999",
			commission: "2%",
			description: "For large-scale operations.",
			features: [
				"Everything in Professional",
				"Dedicated account manager",
				"Custom API integrations",
				"Advanced fraud protection",
				"White-label solutions",
				"24/7 phone support",
			],
			buttonText: "Contact Sales",
			buttonClass:
				"bg-secondary shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] text-secondary-foreground text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-secondary/90",
		},
	]

	return (
		<section className="w-full px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14">
			<div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
				<div className="flex flex-col justify-start items-center gap-4">
					<h2 className="text-center text-foreground text-4xl md:text-5xl font-semibold leading-tight md:leading-[40px]">
						Pricing built for every seller
					</h2>
					<p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-tight">
						Choose a plan that fits your business size, from individual sellers starting out to <br /> growing
						businesses and large enterprises.
					</p>
				</div>
				<div className="pt-4">
					<div className="p-0.5 bg-muted rounded-lg outline outline-1 outline-[#0307120a] outline-offset-[-1px] flex justify-start items-center gap-1 md:mt-0">
						<button
							onClick={() => setIsAnnual(true)}
							className={`pl-2 pr-1 py-1 flex justify-start items-start gap-2 rounded-md ${isAnnual ? "bg-accent shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08)]" : ""}`}
						>
							<span
								className={`text-center text-sm font-medium leading-tight ${isAnnual ? "text-accent-foreground" : "text-zinc-400"}`}
							>
								Annually (Save 20%)
							</span>
						</button>
						<button
							onClick={() => setIsAnnual(false)}
							className={`px-2 py-1 flex justify-start items-start rounded-md ${!isAnnual ? "bg-accent shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08)]" : ""}`}
						>
							<span
								className={`text-center text-sm font-medium leading-tight ${!isAnnual ? "text-accent-foreground" : "text-zinc-400"}`}
							>
								Monthly
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="self-stretch px-5 flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6 mt-6 max-w-[1100px] mx-auto">
				{
					pricingPlans.map((plan) => (
						<div
							key={plan.name}
							className={`flex-1 p-4 overflow-hidden rounded-xl flex flex-col justify-start items-start gap-6 ${plan.popular ? "bg-primary shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.10)]" : "bg-gradient-to-b from-gray-50/5 to-gray-50/0"}`}
							style={plan.popular ? {} : { outline: "1px solid hsl(var(--border))", outlineOffset: "-1px" }}
						>
							<div className="self-stretch flex flex-col justify-start items-start gap-6">
								<div className="self-stretch flex flex-col justify-start items-start gap-8">
									<div
										className={`w-full h-5 text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground" : "text-zinc-200"}`}
									>
										{plan.name}
										{
											plan.popular && (
												<div className="ml-2 px-2 overflow-hidden rounded-full justify-center items-center gap-2.5 inline-flex mt-0 py-0.5 bg-gradient-to-b from-primary-light/50 to-primary-light bg-white">
													<div className="text-center text-primary-foreground text-xs font-normal leading-tight break-words">
														Most Popular
													</div>
												</div>
											)
										}
									</div>
									<div className="self-stretch flex flex-col justify-start items-start gap-1">
										<div className="flex justify-start items-center gap-1.5">
											<div
												className={`relative h-10 flex items-center text-3xl font-medium leading-10 ${plan.popular ? "text-primary-foreground" : "text-zinc-50"}`}
											>
												<span className="invisible">{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
												<span
													className="absolute inset-0 flex items-center transition-all duration-500"
													style={{
														opacity: isAnnual ? 1 : 0,
														transform: `scale(${isAnnual ? 1 : 0.8})`,
														filter: `blur(${isAnnual ? 0 : 4}px)`,
													}}
													aria-hidden={!isAnnual}
												>
													{plan.annualPrice}
												</span>
												<span
													className="absolute inset-0 flex items-center transition-all duration-500"
													style={{
														opacity: !isAnnual ? 1 : 0,
														transform: `scale(${!isAnnual ? 1 : 0.8})`,
														filter: `blur(${!isAnnual ? 0 : 4}px)`,
													}}
													aria-hidden={isAnnual}
												>
													{plan.monthlyPrice}
												</span>
											</div>
											<div
												className={`text-center text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-zinc-400"}`}
											>
												/month
											</div>
										</div>
										<div
											className={`text-center text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-zinc-400"} mb-2`}
										>
											+ {plan.commission} commission per sale
										</div>
										<div
											className={`self-stretch text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-zinc-400"}`}
										>
											{plan.description}
										</div>
									</div>
								</div>
								<Button
									className={`self-stretch px-5 py-2 rounded-[40px] flex justify-center items-center ${plan.buttonClass}`}
								>
									<div className="px-1.5 flex justify-center items-center gap-2">
										<span
											className={`text-center text-sm font-medium leading-tight ${plan.name === "Starter" ? "text-gray-800" : plan.name === "Professional" ? "text-primary" : "text-zinc-950"}`}
										>
											{plan.buttonText}
										</span>
									</div>
								</Button>
							</div>
							<div className="self-stretch flex flex-col justify-start items-start gap-4">
								<div
									className={`self-stretch text-sm font-medium leading-tight ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}
								>
									{plan.name === "Starter" ? "What's included:" : "Everything in Starter +"}
								</div>
								<div className="self-stretch flex flex-col justify-start items-start gap-3">
									{
										plan.features.map((feature) => (
											<div key={feature} className="self-stretch flex justify-start items-center gap-2">
												<div className="w-4 h-4 flex items-center justify-center">
													<Check
														className={`w-full h-full ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`}
														strokeWidth={2}
													/>
												</div>
												<div
													className={`leading-tight font-normal text-sm text-left ${plan.popular ? "text-primary-foreground" : "text-muted-foreground"}`}
												>
													{feature}
												</div>
											</div>
										))
									}
								</div>
							</div>
						</div>
					))
				}
			</div>
		</section>
	)
}