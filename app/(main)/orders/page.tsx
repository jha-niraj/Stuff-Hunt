import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OrderStatusBadge } from "@/components/orders/order-status-badge"
import { getAllOrders } from "@/lib/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"

export default function OrdersPage() {
  const orders = getAllOrders()
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-10 md:py-16">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Orders</h1>
            <p className="text-muted-foreground mt-2">Track and review your recent purchases.</p>
          </div>

          <div className="grid gap-4">
            {orders.map((o) => (
              <Card key={o.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    <Link href={`/orders/${o.id}`} className="hover:underline">
                      Order #{o.id}
                    </Link>
                    <span className="text-muted-foreground ml-2">• {new Date(o.createdAt).toLocaleDateString()}</span>
                  </CardTitle>
                  <OrderStatusBadge status={o.status} />
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    {o.items.length} item{o.items.length > 1 ? "s" : ""} • {o.shippingAddress.city},{" "}
                    {o.shippingAddress.state}
                  </div>
                  <div className="text-sm">
                    Total <span className="font-semibold">{formatCurrency(o.total)}</span>
                  </div>
                  <Link href={`/orders/${o.id}`} className="text-sm underline">
                    View details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
