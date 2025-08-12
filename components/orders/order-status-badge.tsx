import { Badge } from "@/components/ui/badge"

export function OrderStatusBadge({ status = "processing" as "processing" | "shipped" | "delivered" | "cancelled" }) {
  let cls = ""
  let label = status
  switch (status) {
    case "processing":
      cls = "bg-amber-500 text-white hover:bg-amber-500/90"
      label = "Processing"
      break
    case "shipped":
      cls = "bg-blue-600 text-white hover:bg-blue-600/90"
      label = "Shipped"
      break
    case "delivered":
      cls = "bg-green-600 text-white hover:bg-green-600/90"
      label = "Delivered"
      break
    case "cancelled":
      cls = "bg-destructive text-destructive-foreground"
      label = "Cancelled"
      break
  }
  return <Badge className={cls}>{label}</Badge>
}
