"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, Menu, X, BarChart3, Package, Settings } from "lucide-react"
import { useSession } from "next-auth/react"

export function MerchantNavbar() {
	const { data: session } = useSession()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<motion.nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
					? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
					: "bg-transparent"
				}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/merchantonboard" className="flex items-center gap-3">
						<span className="text-foreground text-xl font-semibold">StuffHunt</span>
						<div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
							<Store className="w-3 h-3" />
							Seller Hub
						</div>
					</Link>
					<div className="hidden md:flex items-center gap-8">
						<Link href="/merchantonboard#features" className="text-foreground/80 hover:text-foreground transition-colors">
							Features
						</Link>
						<Link href="/merchantonboard#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
							Pricing
						</Link>
						<Link href="/merchantonboard#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
							Success Stories
						</Link>
						<Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
							Support
						</Link>
					</div>
					<div className="hidden md:flex items-center gap-4">
						{
							session?.user?.role === "SELLER" ? (
								<>
									<Link href="/merchantdirectory">
										<Button variant="ghost" className="text-foreground hover:bg-muted px-4 py-2 rounded-full font-medium">
											<BarChart3 className="w-4 h-4 mr-2" />
											Dashboard
										</Button>
									</Link>
									<Link href="/merchant/products">
										<Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium shadow-sm">
											<Package className="w-4 h-4 mr-2" />
											My Products
										</Button>
									</Link>
								</>
							) : (
								<>
									<Link href="/signin?role=seller">
										<Button variant="ghost" className="text-foreground hover:bg-muted px-4 py-2 rounded-full font-medium">
											Sign In
										</Button>
									</Link>
									<Link href="/signup?role=seller">
										<Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium shadow-sm">
											Start Selling
										</Button>
									</Link>
								</>
							)
						}
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</Button>
				</div>
				{
					isMenuOpen && (
						<motion.div
							className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 mt-2 rounded-lg shadow-lg"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<div className="px-4 py-6 space-y-4">
								<Link
									href="/merchantonboard#features"
									className="block text-foreground/80 hover:text-foreground transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Features
								</Link>
								<Link
									href="/merchantonboard#pricing"
									className="block text-foreground/80 hover:text-foreground transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Pricing
								</Link>
								<Link
									href="/merchantonboard#testimonials"
									className="block text-foreground/80 hover:text-foreground transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Success Stories
								</Link>
								<Link
									href="/contact"
									className="block text-foreground/80 hover:text-foreground transition-colors py-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Support
								</Link>
								<div className="pt-4 border-t border-border/50 space-y-3">
									{
										session?.user?.role === "SELLER" ? (
											<>
												<Link href="/merchant/dashboard" onClick={() => setIsMenuOpen(false)}>
													<Button variant="ghost" className="w-full justify-start">
														<BarChart3 className="w-4 h-4 mr-2" />
														Dashboard
													</Button>
												</Link>
												<Link href="/merchant/products" onClick={() => setIsMenuOpen(false)}>
													<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
														<Package className="w-4 h-4 mr-2" />
														My Products
													</Button>
												</Link>
											</>
										) : (
											<>
												<Link href="/signin?role=seller" onClick={() => setIsMenuOpen(false)}>
													<Button variant="ghost" className="w-full justify-start">
														Sign In
													</Button>
												</Link>
												<Link href="/signup?role=seller" onClick={() => setIsMenuOpen(false)}>
													<Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
														Start Selling
													</Button>
												</Link>
											</>
										)
									}
								</div>
							</div>
						</motion.div>
					)
				}
			</div>
		</motion.nav>
	)
}