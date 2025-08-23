import Link from "next/link"
import { OrderStatusBadge } from "@/components/orders/order-status-badge"
import { getUserOrders } from "@/actions/order.action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format"
import { Address } from "@/types"

// Type guard to check if the address is a valid Address object
function isAddress(address: unknown): address is Address {
	return (
		typeof address === 'object' &&
		address !== null &&
		'city' in address &&
		'state' in address
	)
}

export default async function OrdersPage() {
	const result = await getUserOrders()

	if (!result.success) {
		return (
			<div className="min-h-dvh flex flex-col">
				<main className="flex-1">
					<section className="container mx-auto px-4 py-10 md:py-16">
						<div className="mb-6">
							<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Orders</h1>
							<p className="text-muted-foreground mt-2">Track and review your recent purchases.</p>
						</div>
						<div className="text-center">
							<p className="text-muted-foreground">Failed to load orders. Please try again later.</p>
						</div>
					</section>
				</main>
			</div>
		)
	}

	const orders = result.orders || []

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<div className="mb-6">
						<h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Orders</h1>
						<p className="text-muted-foreground mt-2">Track and review your recent purchases.</p>
					</div>
					{
						orders.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
								<Button asChild>
									<Link href="/products">Start shopping</Link>
								</Button>
							</div>
						) : (
							<div className="grid gap-4">
								{
									orders.map((o) => (
										<Card key={o.id}>
											<CardHeader className="flex flex-row items-center justify-between">
												<CardTitle className="text-base font-medium">
													<Link href={`/orders/${o.id}`} className="hover:underline">
														Order #{o.orderNumber}
													</Link>
													<span className="text-muted-foreground ml-2">• {new Date(o.createdAt).toLocaleDateString()}</span>
												</CardTitle>
												<OrderStatusBadge status={o.status} />
											</CardHeader>
											<CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
												<div className="text-sm text-muted-foreground">
													{o.items.length} item{o.items.length > 1 ? "s" : ""} • {isAddress(o.shippingAddress) ? `${o.shippingAddress.city}, ${o.shippingAddress.state}` : 'Address not available'}
												</div>
												<div className="text-sm">
													Total <span className="font-semibold">{formatCurrency(o.total)}</span>
												</div>
												<Link href={`/orders/${o.id}`} className="text-sm underline">
													View details
												</Link>
											</CardContent>
										</Card>
									))
								}
							</div>
						)
					}
				</section>
			</main>
		</div>
	)
}