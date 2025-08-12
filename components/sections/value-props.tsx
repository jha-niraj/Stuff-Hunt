"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, Sparkles, Clock } from "lucide-react"

export function ValueProps() {
  const items = [
    { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Tight stitch density and verified thread colors." },
    { icon: Truck, title: "Fast Shipping", desc: "Reliable turnaround and tracking on every order." },
    { icon: Sparkles, title: "Premium Materials", desc: "Curated garments that look and feel great." },
    { icon: Clock, title: "On‑time Delivery", desc: "We commit to timelines and communicate clearly." },
  ]
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              viewport={{ once: true }}
              className="rounded-xl border p-6"
            >
              <i.icon className="w-6 h-6" />
              <div className="font-semibold mt-3">{i.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{i.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
