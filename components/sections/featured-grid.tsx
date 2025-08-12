"use client"

import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product/product-grid"
import { allProducts, featuredProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"

export function FeaturedGrid() {
  const products = featuredProducts.length ? featuredProducts : allProducts.slice(0, 8)
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between gap-4 mb-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Featured</h2>
            <p className="text-muted-foreground mt-1">Our bestsellers and new arrivals.</p>
          </div>
          <Button variant="ghost" asChild>
            <a href="/products">View all</a>
          </Button>
        </motion.div>
        <ProductGrid products={products} />
      </div>
    </section>
  )
}
