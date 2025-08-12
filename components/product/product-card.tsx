"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { allProducts, type Product } from "@/lib/products"
import { formatCurrency } from "@/lib/format"
import { Plus } from "lucide-react"
import { useCart } from "@/stores/cart-store"

type Props = {
  product?: Product
}

export function ProductCard({ product = allProducts[0] }: Props) {
  const p = product
  const { add } = useCart()
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group rounded-xl border overflow-hidden bg-card"
    >
      <Link href={`/products/${p.slug}`} className="block">
        <div className="relative bg-muted">
          <Image
            src={p.images?.[0] ?? "/placeholder.svg?height=900&width=900&query=product"}
            alt={p.name}
            width={900}
            height={900}
            className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${p.slug}`} className="font-medium line-clamp-1 hover:underline">
              {p.name}
            </Link>
            <div className="text-xs text-muted-foreground mt-1">{p.category}</div>
          </div>
          <div className="font-semibold shrink-0">{formatCurrency(p.price)}</div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-1">
            {(p.colors ?? []).slice(0, 3).map((c) => (
              <span key={c} className="inline-block w-5 h-5 rounded-full border bg-muted" title={c} />
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => add(p, 1, undefined)}
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
