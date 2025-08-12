"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/format"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clear } = useCart()

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-10 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Checkout</h1>
          <div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8 mt-8">
            <form
              className="rounded-xl border p-6 grid gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                // Mock order creation
                const orderId = "100346"
                clear()
                router.push(`/orders/${orderId}`)
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first">First name</Label>
                  <Input id="first" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last">Last name</Label>
                  <Input id="last" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP</Label>
                  <Input id="zip" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" placeholder="4242 4242 4242 4242" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="coupon">Coupon (optional)</Label>
                  <Input id="coupon" placeholder="SAVE10" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit">Place order</Button>
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
                      <div className="text-muted-foreground">Qty {i.quantity}</div>
                    </div>
                    <div className="text-sm font-medium">{formatCurrency(i.product.price * i.quantity)}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-muted-foreground">Subtotal</div>
                <div className="font-medium">{formatCurrency(total)}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-muted-foreground">Estimated shipping</div>
                <div className="font-medium">{formatCurrency(total > 75 ? 0 : 6.95)}</div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-muted-foreground">Taxes</div>
                <div className="font-medium">—</div>
              </div>
              <div className="flex items-center justify-between mt-4 text-lg font-semibold">
                <div>Total</div>
                <div>{formatCurrency(total + (total > 75 ? 0 : 6.95))}</div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
