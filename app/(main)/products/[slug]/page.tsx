import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, ShieldCheck, Truck } from "lucide-react"
import { getProductBySlug, relatedProducts } from "@/lib/products"
import { formatCurrency } from "@/lib/format"
import { ProductGrid } from "@/components/product/product-grid"
import { AddToCart } from "@/components/product/add-to-cart"
import { ProductGallery } from "@/components/product/product-gallery"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  async function load() {
    const { slug } = await params
    const product = getProductBySlug(slug)
    return { product }
  }

  // This async wrapper allows server component to await params
  // and still render synchronously.
  // eslint-disable-next-line react/display-name
  const Content = async () => {
    const { product } = await load()
    if (!product) return notFound()

    const rel = relatedProducts(product.category, product.slug)

    return (
      <>
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <ProductGallery images={product.images} alt={product.name} />
            <div className="lg:pl-4">
              <div className="flex items-center gap-3">
                {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
                {product.inStock ? (
                  <Badge className="bg-green-600 text-white hover:bg-green-600/90">In stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of stock</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">{product.name}</h1>
              <p className="text-muted-foreground mt-2">{product.shortDescription}</p>

              <div className="flex items-center justify-between mt-6">
                <div className="text-3xl font-semibold">{formatCurrency(product.price)}</div>
                <button
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  aria-label="Save to wishlist"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Save</span>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          className="h-9 px-3 rounded-md border text-sm hover:bg-accent"
                          aria-label={`Choose ${c}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <Label>Size</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          className="h-9 px-3 rounded-md border text-sm hover:bg-accent"
                          aria-label={`Choose size ${s}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="qty">Quantity</Label>
                    <Input id="qty" type="number" min={1} defaultValue={1} className="w-24" />
                  </div>
                  <AddToCart product={product} />
                </div>
              </div>

              <div className="mt-8 grid gap-4 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  Free shipping over {formatCurrency(75)}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  Secure checkout
                </div>
              </div>

              <Tabs defaultValue="details" className="mt-10">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="care">Care</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="text-sm text-muted-foreground">
                  {product.description}
                </TabsContent>
                <TabsContent value="care" className="text-sm text-muted-foreground">
                  Machine wash cold. Do not bleach. Tumble dry low. Cool iron if needed.
                </TabsContent>
                <TabsContent value="shipping" className="text-sm text-muted-foreground">
                  Standard shipping 3-5 business days. Expedited options available at checkout.
                </TabsContent>
              </Tabs>

              <div className="mt-10">
                <Accordion type="single" collapsible>
                  <AccordionItem value="customization">
                    <AccordionTrigger>Customization & Embroidery</AccordionTrigger>
                    <AccordionContent>
                      Upload your artwork during checkout notes. Our team will prepare a proof for approval within 24-48
                      hours.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">You might also like</h2>
            <Button variant="ghost" asChild>
              <a href="/products">View all</a>
            </Button>
          </div>
          <ProductGrid products={rel} />
        </section>
      </>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* @ts-expect-error Async Server Component */}
        <Content />
      </main>
      <SiteFooter />
    </div>
  )
}
