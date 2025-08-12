"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { allProducts } from "@/lib/products"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ProductFilters() {
  const router = useRouter()
  const sp = useSearchParams()
  const [query, setQuery] = useState(sp.get("query") ?? "")
  const [category, setCategory] = useState(sp.get("category") ?? "All")
  const [sort, setSort] = useState(sp.get("sort") ?? "featured")

  const categories = useMemo(() => ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))], [])

  function apply() {
    const params = new URLSearchParams()
    if (query) params.set("query", query)
    if (category && category !== "All") params.set("category", category)
    if (sort && sort !== "featured") params.set("sort", sort)
    ;(router as any).push(`/products?${params.toString()}`)
  }

  return (
    <div className="rounded-xl border p-4 md:p-5 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="q">Search</Label>
        <Input
          id="q"
          placeholder="Hats, polos…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Sort</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={apply}>Apply filters</Button>
    </div>
  )
}
