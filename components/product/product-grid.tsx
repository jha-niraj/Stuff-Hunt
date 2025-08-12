"use client"

import type { Product } from "@/lib/products"
import { ProductCard } from "./product-card"

export function ProductGrid({ products = [] as Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
