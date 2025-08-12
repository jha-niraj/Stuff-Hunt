import Link from "next/link"
import { notFound } from "next/navigation"
import { getOrderById } from "@/actions/order.action"
import { OrderStatusBadge } from "@/components/orders/order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Address } from "@/types"

// Type guard to check if the address is a valid Address object
function isAddress(address: unknown): address is Address {
	return (
		typeof address === 'object' &&
		address !== null &&
		'firstName' in address &&
		'lastName' in address &&
		'address1' in address &&
		'city' in address &&
		'state' in address &&
		'postalCode' in address &&
		'country' in address
	)
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const result = await getOrderById(id)

	if (!result.success || !result.order) {
		return notFound()
	}

	const order = result.order

	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
						<div>
							<h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Order #{order.orderNumber}</h1>
							<div className="text-sm text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleString()}</div>
							{
								order.trackingNumber && (
									<div className="text-sm text-muted-foreground mt-1">
										Tracking: <span className="font-mono">{order.trackingNumber}</span>
									</div>
								)
							}
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
										{
											order.items.map((i) => (
												<TableRow key={i.id}>
													<TableCell>
														<div className="font-medium">
															<Link href={`/products/${i.product.slug}`} className="hover:underline">
																{i.product.name}
															</Link>
														</div>
														{
															i.variantKey && (
																<div className="text-xs text-muted-foreground">{i.variantKey}</div>
															)
														}
														<div className="text-xs text-muted-foreground">
															by {i.product.seller.name}
															{i.product.seller.verificationBadge && " ✓"}
														</div>
													</TableCell>
													<TableCell>{i.quantity}</TableCell>
													<TableCell>{formatCurrency(i.unitPrice)}</TableCell>
													<TableCell className="text-right">{formatCurrency(i.totalPrice)}</TableCell>
												</TableRow>
											))
										}
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
										<div className="font-medium">{formatCurrency(order.shippingCost)}</div>
									</div>
									{
										order.taxAmount > 0 && (
											<div className="flex items-center justify-between">
												<div className="text-muted-foreground">Tax</div>
												<div className="font-medium">{formatCurrency(order.taxAmount)}</div>
											</div>
										)
									}
									{
										order.discountAmount > 0 && (
											<div className="flex items-center justify-between text-green-600">
												<div>Discount</div>
												<div>-{formatCurrency(order.discountAmount)}</div>
											</div>
										)
									}
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
									{
										isAddress(order.shippingAddress) ? (
											<>
												<div className="font-medium">
													{order.shippingAddress.firstName} {order.shippingAddress.lastName}
												</div>
												{
													order.shippingAddress.company && (
														<div>{order.shippingAddress.company}</div>
													)
												}
												<div>{order.shippingAddress.address1}</div>
												{
													order.shippingAddress.address2 && (
														<div>{order.shippingAddress.address2}</div>
													)
												}
												<div>
													{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
												</div>
												<div>{order.shippingAddress.country}</div>
												{
													order.shippingAddress.phone && (
														<div className="mt-2">Phone: {order.shippingAddress.phone}</div>
													)
												}
											</>
										) : (
											<div className="text-muted-foreground">Address information not available</div>
										)
									}
								</CardContent>
							</Card>
							{
								order.notes && (
									<Card>
										<CardHeader>
											<CardTitle className="text-base">Order notes</CardTitle>
										</CardHeader>
										<CardContent className="text-sm">
											{order.notes}
										</CardContent>
									</Card>
								)
							}
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
		</div>
	)
}