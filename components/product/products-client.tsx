"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { allProducts, type Product } from "@/lib/products"

function filterProducts(products: Product[], params: URLSearchParams) {
  let result = [...products]
  const q = (params.get("query") || "").toLowerCase().trim()
  const category = params.get("category") || "All"
  const sort = params.get("sort") || "featured"

  if (q) {
    result = result.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase()
      return hay.includes(q)
    })
  }

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category)
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price)
  }
  // "featured" keeps natural order

  return result
}

export function ProductsClient() {
  const sp = useSearchParams()
  const filtered = useMemo(() => filterProducts(allProducts, new URLSearchParams(sp)), [sp])

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
      <aside className="lg:sticky top-24 h-max">
        <ProductFilters />
      </aside>
      <div>
        <ProductGrid products={filtered} />
        {filtered.length === 0 && (
          <div className="rounded-xl border p-6 mt-4 text-sm text-muted-foreground">
            No products matched your filters. Try adjusting your search or category.
          </div>
        )}
      </div>
    </div>
  )
}
