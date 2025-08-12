"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { type ProductWithDetails } from "@/actions/product.action"
import { formatCurrency } from "@/lib/format"
import { Plus } from "lucide-react"
import { useCart } from "@/stores/cart-store"

type Props = {
  product: ProductWithDetails
}

export function ProductCard({ product }: Props) {
  const { add } = useCart()
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group rounded-xl border overflow-hidden bg-card"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative bg-muted">
          <Image
            src={product.images?.[0] ?? "/placeholder.svg?height=900&width=900&query=product"}
            alt={product.name}
            width={900}
            height={900}
            className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="font-medium line-clamp-1 hover:underline">
              {product.name}
            </Link>
            <div className="text-xs text-muted-foreground mt-1">
              {product.categories[0]?.name || 'Uncategorized'}
            </div>
          </div>
          <div className="font-semibold shrink-0">{formatCurrency(product.price)}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-1">
            {(product.colors ?? []).slice(0, 3).map((color: string) => (
              <span key={color} className="inline-block w-5 h-5 rounded-full border bg-muted" title={color} />
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => add(product, 1, undefined)}
            aria-label="Quick add to cart"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
