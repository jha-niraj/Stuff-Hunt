"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/format"
import { createOrder, type CreateOrderData } from "@/actions/order.action"
import { toast } from "sonner"

export default function CheckoutPage() {
	const router = useRouter()
	const { items, total, clear, isLoading } = useCart()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [couponCode, setCouponCode] = useState("")
	const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

	const shippingCost = total > 75 ? 0 : 6.95
	const discountAmount = appliedCoupon?.discount || 0
	const finalTotal = total + shippingCost - discountAmount

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const formData = new FormData(e.currentTarget)
			
			const orderData: CreateOrderData = {
				items: items.map(item => ({
					productId: item.product.id,
					quantity: item.quantity,
					variantKey: item.variantKey,
					metadata: item.metadata
				})),
				shippingAddress: {
					firstName: formData.get("firstName") as string,
					lastName: formData.get("lastName") as string,
					company: formData.get("company") as string || undefined,
					address1: formData.get("address") as string,
					address2: formData.get("address2") as string || undefined,
					city: formData.get("city") as string,
					state: formData.get("state") as string,
					postalCode: formData.get("zip") as string,
					country: "US",
					phone: formData.get("phone") as string || undefined,
				},
				paymentMethod: "card",
				notes: formData.get("notes") as string || undefined,
				couponCode: appliedCoupon?.code
			}

			const result = await createOrder(orderData)
			
			if (result.success && result.order) {
				await clear()
				toast.success("Order placed successfully!")
				router.push(`/orders/${result.order.id}`)
			} else {
				toast.error(result.error || "Failed to place order")
			}
		} catch (error) {
			console.error("Checkout error:", error)
			toast.error("An error occurred while placing your order")
		} finally {
			setIsSubmitting(false)
		}
	}

	const applyCoupon = () => {
		// Mock coupon validation - in real app, this would be a server action
		if (couponCode.toUpperCase() === "SAVE10") {
			const discount = total * 0.1
			setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
			toast.success("Coupon applied successfully!")
		} else if (couponCode.toUpperCase() === "FREESHIP") {
			setAppliedCoupon({ code: couponCode.toUpperCase(), discount: shippingCost })
			toast.success("Free shipping applied!")
		} else {
			toast.error("Invalid coupon code")
		}
	}

	if (items.length === 0) {
		return (
			<div className="min-h-dvh flex flex-col">
				<main className="flex-1">
					<section className="container mx-auto px-4 py-10 md:py-16">
						<div className="text-center">
							<h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Your cart is empty</h1>
							<p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
							<Button asChild>
								<Link href="/products">Continue shopping</Link>
							</Button>
						</div>
					</section>
				</main>
			</div>
		)
	}

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Checkout</h1>
					<div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8 mt-8">
						<form className="rounded-xl border p-6 grid gap-6" onSubmit={handleSubmit}>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="firstName">First name</Label>
									<Input id="firstName" name="firstName" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="lastName">Last name</Label>
									<Input id="lastName" name="lastName" required />
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" name="email" type="email" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="phone">Phone (optional)</Label>
								<Input id="phone" name="phone" type="tel" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="company">Company (optional)</Label>
								<Input id="company" name="company" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="address">Address</Label>
								<Input id="address" name="address" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
								<Input id="address2" name="address2" />
							</div>
							<div className="grid md:grid-cols-3 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="city">City</Label>
									<Input id="city" name="city" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="state">State</Label>
									<Input id="state" name="state" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="zip">ZIP</Label>
									<Input id="zip" name="zip" required />
								</div>
							</div>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="card">Card number</Label>
									<Input id="card" name="card" placeholder="4242 4242 4242 4242" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="expiry">Expiry</Label>
									<Input id="expiry" name="expiry" placeholder="MM/YY" required />
								</div>
							</div>
							<div className="grid md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="cvc">CVC</Label>
									<Input id="cvc" name="cvc" required />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="notes">Order notes (optional)</Label>
									<Input id="notes" name="notes" placeholder="Special instructions..." />
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Button type="submit" disabled={isSubmitting || isLoading}>
									{isSubmitting ? "Placing order..." : "Place order"}
								</Button>
								<Button variant="ghost" asChild>
									<Link href="/cart">Back to cart</Link>
								</Button>
							</div>
						</form>
						<aside className="rounded-xl border p-6 h-max">
							<h2 className="font-semibold">Order summary</h2>
							<div className="divide-y mt-4">
								{items.map((i) => (
									<div
										key={`${i.product.slug}-${i.variantKey ?? "default"}`}
										className="py-3 flex items-center justify-between"
									>
										<div className="text-sm">
											<div className="font-medium">{i.product.name}</div>
											<div className="text-muted-foreground">
												{i.variantKey && `${i.variantKey} • `}Qty {i.quantity}
											</div>
										</div>
										<div className="text-sm font-medium">{formatCurrency(i.product.price * i.quantity)}</div>
									</div>
								))}
							</div>
							
							{/* Coupon section */}
							<div className="mt-4 pt-4 border-t">
								<div className="flex gap-2">
									<Input
										placeholder="Coupon code"
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										disabled={!!appliedCoupon}
									/>
									<Button 
										type="button" 
										variant="outline" 
										onClick={applyCoupon}
										disabled={!couponCode || !!appliedCoupon}
									>
										Apply
									</Button>
								</div>
								{appliedCoupon && (
									<div className="flex items-center justify-between mt-2 text-sm text-green-600">
										<span>Coupon: {appliedCoupon.code}</span>
										<button
											type="button"
											onClick={() => {
												setAppliedCoupon(null)
												setCouponCode("")
											}}
											className="text-red-500 hover:text-red-700"
										>
											Remove
										</button>
									</div>
								)}
							</div>

							<div className="mt-4 pt-4 border-t space-y-2">
								<div className="flex items-center justify-between">
									<div className="text-muted-foreground">Subtotal</div>
									<div className="font-medium">{formatCurrency(total)}</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="text-muted-foreground">Shipping</div>
									<div className="font-medium">{formatCurrency(shippingCost)}</div>
								</div>
								{appliedCoupon && (
									<div className="flex items-center justify-between text-green-600">
										<div>Discount ({appliedCoupon.code})</div>
										<div>-{formatCurrency(discountAmount)}</div>
									</div>
								)}
								<div className="flex items-center justify-between mt-4 pt-2 border-t text-lg font-semibold">
									<div>Total</div>
									<div>{formatCurrency(finalTotal)}</div>
								</div>
							</div>
						</aside>
					</div>
				</section>
			</main>
		</div>
	)
}
