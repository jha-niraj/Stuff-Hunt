"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTASection({
  title = "Ready to elevate your brand?",
  subtitle = "Get a fast quote or start browsing ready-to-stitch styles.",
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/products">Shop now</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Get a quote</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
