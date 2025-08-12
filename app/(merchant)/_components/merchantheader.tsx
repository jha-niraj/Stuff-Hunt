"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Store } from "lucide-react"
import Link from "next/link"

export function MerchantHeader() {
	const navItems = [
		{ name: "Features", href: "#features-section" },
		{ name: "How it Works", href: "#how-it-works-section" },
		{ name: "Pricing", href: "#pricing-section" },
		{ name: "Success Stories", href: "#testimonials-section" },
	]

	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault()
		const targetId = href.substring(1)
		const targetElement = document.getElementById(targetId)
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<header className="w-full py-4 px-6">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-3">
						<Link href="/" className="flex items-center gap-3">
							<span className="text-foreground text-xl font-semibold">StuffHunt</span>
							<div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
								<Store className="w-3 h-3" />
								Sellers
							</div>
						</Link>
					</div>
					<nav className="hidden md:flex items-center gap-2">
						{
							navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									onClick={(e) => handleScroll(e, item.href)}
									className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
								>
									{item.name}
								</Link>
							))
						}
					</nav>
				</div>
				<div className="flex items-center gap-4">
					<Link href="/seller/signin" className="hidden md:block">
						<Button variant="ghost" className="text-foreground hover:bg-muted px-4 py-2 rounded-full font-medium">
							Sign In
						</Button>
					</Link>
					<Link href="/seller/signup" className="hidden md:block">
						<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm">
							Start Selling
						</Button>
					</Link>
					<Sheet>
						<SheetTrigger asChild className="md:hidden">
							<Button variant="ghost" size="icon" className="text-foreground">
								<Menu className="h-7 w-7" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
							<SheetHeader>
								<SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-4 mt-6">
								{
									navItems.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											onClick={(e) => handleScroll(e, item.href)}
											className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
										>
											{item.name}
										</Link>
									))
								}
								<div className="flex flex-col gap-2 mt-4">
									<Link href="/seller/signin" className="w-full">
										<Button
											variant="ghost"
											className="w-full text-foreground hover:bg-muted px-4 py-2 rounded-full font-medium"
										>
											Sign In
										</Button>
									</Link>
									<Link href="/seller/signup" className="w-full">
										<Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm">
											Start Selling
										</Button>
									</Link>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}