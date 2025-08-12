import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@prisma/client"

interface OrderStatusBadgeProps {
	status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
	let cls = ""
	let label = ""

	switch (status) {
		case "PENDING":
			cls = "bg-gray-500 text-white hover:bg-gray-500/90"
			label = "Pending"
			break
		case "CONFIRMED":
			cls = "bg-blue-500 text-white hover:bg-blue-500/90"
			label = "Confirmed"
			break
		case "PROCESSING":
			cls = "bg-amber-500 text-white hover:bg-amber-500/90"
			label = "Processing"
			break
		case "SHIPPED":
			cls = "bg-blue-600 text-white hover:bg-blue-600/90"
			label = "Shipped"
			break
		case "DELIVERED":
			cls = "bg-green-600 text-white hover:bg-green-600/90"
			label = "Delivered"
			break
		case "CANCELLED":
			cls = "bg-destructive text-destructive-foreground"
			label = "Cancelled"
			break
		case "REFUNDED":
			cls = "bg-orange-500 text-white hover:bg-orange-500/90"
			label = "Refunded"
			break
		default:
			cls = "bg-gray-500 text-white hover:bg-gray-500/90"
			label = "Unknown"
			break
	}

	return <Badge className={cls}>{label}</Badge>
}
