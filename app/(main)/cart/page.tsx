"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/stores/cart-store"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useAuthDialog } from "@/components/auth/use-auth-dialog"

export default function CartPage() {
	const router = useRouter()
	const { status } = useSession()
	const { openAuth } = useAuthDialog()
	const { items, remove, total, clear, updateQuantity, isLoading } = useCart()
	const hasItems = items.length > 0

	function handleCheckout() {
		if (status !== "authenticated") {
			// Open modal auth and keep user on cart with callback to /checkout
			openAuth({ callbackUrl: "/checkout", reason: "checkout" })
			// Also add auth params to URL so refresh maintains state
			const u = new URL(window.location.href)
			u.searchParams.set("auth", "1")
			u.searchParams.set("callbackUrl", "/checkout")
			router.replace(`${u.pathname}${u.search}`)
			return
		}
		router.push("/checkout")
	}

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Cart</h1>
					{!hasItems ? (
						<div className="mt-8 rounded-xl border p-6">
							<p className="text-muted-foreground">Your cart is empty.</p>
							<Button asChild className="mt-4">
								<Link href="/products">Continue shopping</Link>
							</Button>
						</div>
					) : (
						<div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8 mt-8">
							<div className="rounded-xl border divide-y">
								{items.map((item) => (
									<div
										key={`${item.product.slug}-${item.variantKey ?? "default"}`}
										className="p-4 grid grid-cols-[72px_1fr_auto] gap-4"
									>
										<div className="relative overflow-hidden rounded-md bg-muted">
											<Image
												src={item.product.images?.[0] ?? "/placeholder.svg?height=300&width=300&query=product"}
												alt={item.product.name}
												width={300}
												height={300}
												className="aspect-square object-cover"
											/>
										</div>
										<div>
											<div className="font-medium">{item.product.name}</div>
											<div className="text-sm text-muted-foreground mt-1">
												{item.variantKey ?? "Default"} • Qty {item.quantity}
											</div>
											<div className="flex items-center gap-2 mt-2">
												<button
													className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
													onClick={() => updateQuantity(item.product.slug, item.quantity - 1, item.variantKey)}
													disabled={item.quantity <= 1 || isLoading}
												>
													-
												</button>
												<span className="text-xs px-2">{item.quantity}</span>
												<button
													className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
													onClick={() => updateQuantity(item.product.slug, item.quantity + 1, item.variantKey)}
													disabled={isLoading}
												>
													+
												</button>
												<button
													className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground ml-2"
													onClick={() => remove(item.product.slug, item.variantKey)}
													disabled={isLoading}
												>
													<Trash2 className="w-3.5 h-3.5" />
													Remove
												</button>
											</div>
										</div>
										<div className="text-right font-medium">{formatCurrency(item.product.price * item.quantity)}</div>
									</div>
								))}
							</div>
							<aside className="rounded-xl border p-6 h-max">
								<div className="flex items-center justify-between">
									<div className="text-muted-foreground">Subtotal</div>
									<div className="font-medium">{formatCurrency(total)}</div>
								</div>
								<p className="text-xs text-muted-foreground mt-2">Taxes and shipping calculated at checkout.</p>
								<Button className="w-full mt-4" onClick={handleCheckout} disabled={isLoading}>
									{isLoading ? "Loading..." : "Checkout"}
								</Button>
								<Button variant="ghost" className="w-full mt-2" onClick={() => clear()} disabled={isLoading}>
									Clear cart
								</Button>
								<Button variant="outline" asChild className="w-full mt-2 bg-transparent">
									<Link href="/products">Continue shopping</Link>
								</Button>
							</aside>
						</div>
					)}
				</section>
			</main>
		</div>
	)
}
