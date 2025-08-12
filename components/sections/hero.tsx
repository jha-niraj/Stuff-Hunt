"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUp, Sparkles } from "lucide-react"

export function Hero({
  title = "Find perfectly‑stitched gear with StuffHunt",
  subtitle, // We’ll hide subtitle on small screens if provided.
  placeholder = "Describe what you’re looking for (e.g. navy polo with left‑chest logo)…",
}: {
  title?: string
  subtitle?: string
  placeholder?: string
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [q, setQ] = useState("")

  function goToProducts(extra: Record<string, string> = {}) {
    const params = new URLSearchParams()
    if (q.trim()) params.set("query", q.trim())
    Object.entries(extra).forEach(([k, v]) => params.set(k, v))
    params.set("source", "hero")
    ;(router as any).push(`/products?${params.toString()}`)
  }

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Smart product discovery
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4">{title}</h1>
          {subtitle ? <p className="text-muted-foreground mt-4 md:text-lg hidden md:block">{subtitle}</p> : null}

          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            onSubmit={(e) => {
              e.preventDefault()
              goToProducts()
            }}
          >
            <div className="relative w-full sm:max-w-xl">
              <Label htmlFor="hero-q" className="sr-only">
                Search prompt
              </Label>
              <Input
                id="hero-q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholder}
                className="h-12 pr-28"
              />
              <div className="absolute right-1 top-1 bottom-1 flex items-center gap-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) {
                      goToProducts({ image: "1", filename: f.name })
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent h-10 gap-2"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Upload reference image"
                >
                  <ImageUp className="w-4 h-4" />
                  Upload
                </Button>
              </div>
            </div>
            <Button type="submit" className="h-12">
              Search
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
