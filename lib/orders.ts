export type OrderItem = {
  slug: string
  name: string
  quantity: number
  unitPrice: number
  variant?: string
}
export type Address = {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
}
export type Order = {
  id: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingAddress: Address
}

const mock: Order[] = [
  {
    id: "100345",
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    items: [
      { slug: "classic-dad-hat", name: "Classic Dad Hat", quantity: 2, unitPrice: 24, variant: "Black" },
      { slug: "premium-polo", name: "Premium Polo", quantity: 1, unitPrice: 39, variant: "Navy / L" },
    ],
    subtotal: 24 * 2 + 39,
    shipping: 6.95,
    tax: 6.23,
    total: 24 * 2 + 39 + 6.95 + 6.23,
    shippingAddress: {
      name: "Taylor Smith",
      line1: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
    },
  },
  {
    id: "100344",
    status: "shipped",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    items: [{ slug: "heavyweight-hoodie", name: "Heavyweight Hoodie", quantity: 1, unitPrice: 59, variant: "M" }],
    subtotal: 59,
    shipping: 0,
    tax: 5.01,
    total: 64.01,
    shippingAddress: {
      name: "Taylor Smith",
      line1: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
    },
  },
  {
    id: "100341",
    status: "delivered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    items: [{ slug: "canvas-tote", name: "Canvas Tote", quantity: 3, unitPrice: 19 }],
    subtotal: 19 * 3,
    shipping: 6.95,
    tax: 4.22,
    total: 19 * 3 + 6.95 + 4.22,
    shippingAddress: {
      name: "Taylor Smith",
      line1: "123 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
    },
  },
]

export function getAllOrders() {
  return mock
}

export function getOrderById(id: string) {
  return mock.find((o) => o.id === id)
}
