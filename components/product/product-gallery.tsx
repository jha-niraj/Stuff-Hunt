"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  images?: string[]
  alt?: string
}

export function ProductGallery({ images = ["/placeholder.svg?height=900&width=900"], alt = "Product image" }: Props) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const imgs = images.length ? images : ["/placeholder.svg?height=900&width=900"]

  function next() {
    setIdx((i) => (i + 1) % imgs.length)
  }
  function prev() {
    setIdx((i) => (i - 1 + imgs.length) % imgs.length)
  }

  return (
    <div className="grid gap-4">
      <button
        className="relative overflow-hidden rounded-xl border bg-muted"
        onClick={() => setOpen(true)}
        aria-label="Open image viewer"
      >
        <Image
          src={imgs[idx] || "/placeholder.svg"}
          alt={alt}
          width={900}
          height={900}
          className="w-full h-auto object-cover"
          priority
        />
      </button>
      <div className="grid grid-cols-4 gap-3">
        {imgs.slice(0, 4).map((img, i) => (
          <button
            key={i}
            className={cn("relative overflow-hidden rounded-lg border", i === idx && "ring-2 ring-primary")}
            onClick={() => setIdx(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img || "/placeholder.svg"}
              alt={`${alt} ${i + 1}`}
              width={300}
              height={300}
              className="aspect-square object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(1800px,98vw)] w-full h-[95vh] p-0 overflow-hidden">
          <div className="relative w-full h-full bg-black">
            <button
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 p-2 text-white"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 flex items-center justify-between p-3">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={imgs[idx] || "/placeholder.svg"}
                alt={alt}
                width={2000}
                height={2000}
                className="max-h-[82vh] w-auto object-contain"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3">
              <div className="mx-auto grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 max-w-6xl">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    className={cn(
                      "relative overflow-hidden rounded-md border border-white/10 focus:outline-none",
                      i === idx ? "ring-2 ring-white" : "",
                    )}
                    onClick={() => setIdx(i)}
                    aria-label={`Select image ${i + 1}`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${alt} ${i + 1}`}
                      width={220}
                      height={220}
                      className="aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
