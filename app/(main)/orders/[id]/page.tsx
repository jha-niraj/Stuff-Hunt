import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getOrderById } from "@/lib/orders"
import { OrderStatusBadge } from "@/components/orders/order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const order = getOrderById(id)
	if (!order) return notFound()

	return (
		<div className="min-h-dvh flex flex-col">
			<SiteHeader />
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
						<div>
							<h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Order #{order.id}</h1>
							<div className="text-sm text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleString()}</div>
						</div>
						<OrderStatusBadge status={order.status} />
					</div>

					<div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Items</CardTitle>
							</CardHeader>
							<CardContent className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead className="w-[90px]">Qty</TableHead>
											<TableHead className="w-[120px]">Price</TableHead>
											<TableHead className="w-[120px] text-right">Total</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{order.items.map((i) => (
											<TableRow key={`${i.slug}-${i.variant ?? "default"}`}>
												<TableCell>
													<div className="font-medium">
														<Link href={`/products/${i.slug}`} className="hover:underline">
															{i.name}
														</Link>
													</div>
													<div className="text-xs text-muted-foreground">{i.variant ?? "Default"}</div>
												</TableCell>
												<TableCell>{i.quantity}</TableCell>
												<TableCell>{formatCurrency(i.unitPrice)}</TableCell>
												<TableCell className="text-right">{formatCurrency(i.unitPrice * i.quantity)}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>

						<div className="grid gap-6 h-max">
							<Card>
								<CardHeader>
									<CardTitle className="text-base">Summary</CardTitle>
								</CardHeader>
								<CardContent className="text-sm grid gap-2">
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground">Subtotal</div>
										<div className="font-medium">{formatCurrency(order.subtotal)}</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground">Shipping</div>
										<div className="font-medium">{formatCurrency(order.shipping)}</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="text-muted-foreground">Tax</div>
										<div className="font-medium">{formatCurrency(order.tax)}</div>
									</div>
									<div className="flex items-center justify-between pt-2 text-base font-semibold">
										<div>Total</div>
										<div>{formatCurrency(order.total)}</div>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-base">Shipping address</CardTitle>
								</CardHeader>
								<CardContent className="text-sm">
									<div className="font-medium">{order.shippingAddress.name}</div>
									<div>{order.shippingAddress.line1}</div>
									{order.shippingAddress.line2 ? <div>{order.shippingAddress.line2}</div> : null}
									<div>
										{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
									</div>
									<div>{order.shippingAddress.country}</div>
								</CardContent>
							</Card>
							<div className="flex gap-2">
								<Button asChild variant="outline" className="bg-transparent">
									<Link href="/products">Shop more</Link>
								</Button>
								<Button asChild>
									<Link href="/orders">All orders</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<SiteFooter />
		</div>
	)
}
