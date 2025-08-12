export type Product = {
  id: string
  slug: string
  name: string
  shortDescription?: string
  description?: string
  detailedDescription?: string
  category?: string
  price: number
  originalPrice?: number
  images: string[]
  colors?: string[]
  sizes?: string[]
  inStock: boolean
  badge?: string
  stockQuantity?: number
  discountPercentage?: number
  brand?: string
  seller?: {
    id: string
    name: string
    verificationBadge: boolean
  }
}

const img = (q: string) => `/placeholder.svg?height=900&width=900&query=${encodeURIComponent(q)}`

export const allProducts: Product[] = [
  {
    id: "1",
    slug: "classic-dad-hat",
    name: "Classic Dad Hat",
    shortDescription: "Low‑profile cotton cap with custom embroidery.",
    description:
      "A timeless dad hat silhouette crafted from soft cotton. Perfect for everyday wear and custom embroidery. Adjustable strap with metal buckle.",
    category: "Hats",
    price: 24,
    images: [img("dad hat 1"), img("dad hat 2"), img("dad hat 3")],
    colors: ["Black", "Navy", "Khaki"],
    inStock: true,
    badge: "Bestseller",
    stockQuantity: 50,
    seller: {
      id: "seller1",
      name: "Premium Apparel Co.",
      verificationBadge: true
    }
  },
  {
    id: "2",
    slug: "premium-polo",
    name: "Premium Polo",
    shortDescription: "Moisture‑wicking polo with a clean drape.",
    description:
      "Ideal for teams and events. Smooth knit fabric with moisture management. Pairs perfectly with left‑chest embroidery.",
    category: "Polos",
    price: 39,
    images: [img("polo 1"), img("polo 2")],
    colors: ["Black", "Heather Grey", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
    stockQuantity: 30,
    seller: {
      id: "seller1",
      name: "Premium Apparel Co.",
      verificationBadge: true
    }
  },
  {
    id: "3",
    slug: "heavyweight-hoodie",
    name: "Heavyweight Hoodie",
    shortDescription: "Cozy fleece hoodie built to last.",
    description: "Midweight fleece with a structured fit. Perfect canvas for bold front embroidery or applique.",
    category: "Hoodies",
    price: 59,
    images: [img("hoodie 1"), img("hoodie 2")],
    colors: ["Black", "Forest", "Heather Grey"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
    badge: "New",
    stockQuantity: 25,
    seller: {
      id: "seller2",
      name: "Cozy Wear",
      verificationBadge: false
    }
  },
  {
    slug: "canvas-tote",
    name: "Canvas Tote",
    shortDescription: "Sturdy tote with reinforced handles.",
    description: "Eco‑friendly cotton canvas tote bag. Great for merch tables and events with crisp embroidery.",
    category: "Bags",
    price: 19,
    images: [img("canvas tote 1"), img("canvas tote 2")],
    colors: ["Natural", "Black"],
    inStock: true,
  },
  {
    slug: "beanie",
    name: "Ribbed Beanie",
    shortDescription: "Warm rib knit with cuff.",
    description: "Classic beanie with a cuff for your logo. Tight knit for crisp stitching in cooler months.",
    category: "Hats",
    price: 22,
    images: [img("beanie 1"), img("beanie 2")],
    colors: ["Black", "Charcoal", "Olive"],
    inStock: true,
  },
  {
    slug: "camp-cap",
    name: "5‑Panel Camp Cap",
    shortDescription: "Street‑ready cap with flat brim.",
    description: "Lightweight 5‑panel cap with breathable eyelets.",
    category: "Hats",
    price: 28,
    images: [img("camp cap")],
    colors: ["Black", "Sand"],
    inStock: true,
  },
  {
    slug: "quarter-zip-fleece",
    name: "Quarter‑Zip Fleece",
    shortDescription: "Polished midlayer with stand collar.",
    description: "Smooth face, brushed interior, and a stand collar ideal for subtle branding.",
    category: "Outerwear",
    price: 64,
    images: [img("quarter zip")],
    colors: ["Navy", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "performance-tee",
    name: "Performance Tee",
    shortDescription: "Lightweight, breathable tee.",
    description: "Moisture‑wicking tee for events and teams.",
    category: "Tees",
    price: 18,
    images: [img("performance tee")],
    colors: ["Black", "White", "Heather Grey"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    inStock: true,
  },
  {
    slug: "coach-jacket",
    name: "Coach Jacket",
    shortDescription: "Water‑resistant shell with snap closure.",
    description: "Classic coach jacket with a matte finish.",
    category: "Outerwear",
    price: 72,
    images: [img("coach jacket")],
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "snapback",
    name: "Structured Snapback",
    shortDescription: "High‑profile cap with flat brim.",
    description: "Crisp, structured crown and flat brim.",
    category: "Hats",
    price: 26,
    images: [img("snapback")],
    colors: ["Black", "Red", "Royal"],
    inStock: true,
  },
  {
    slug: "crewneck-sweatshirt",
    name: "Crewneck Sweatshirt",
    shortDescription: "Classic fleece crewneck.",
    description: "Clean silhouette that layers well.",
    category: "Sweatshirts",
    price: 49,
    images: [img("crewneck")],
    colors: ["Black", "Navy", "Heather Grey"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "workwear-apron",
    name: "Workwear Apron",
    shortDescription: "Durable canvas with pockets.",
    description: "Sturdy apron for studios and cafes.",
    category: "Accessories",
    price: 34,
    images: [img("apron")],
    colors: ["Black", "Khaki"],
    inStock: true,
  },
  // Additional items to reach 24+
  {
    slug: "athletic-shorts",
    name: "Athletic Shorts",
    shortDescription: "Lightweight performance shorts.",
    description: "Breathable mesh lining with adjustable waistband.",
    category: "Bottoms",
    price: 29,
    images: [img("athletic shorts")],
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    slug: "training-joggers",
    name: "Training Joggers",
    shortDescription: "Tapered fit with zip pockets.",
    description: "Smooth knit fabric ideal for subtle branding.",
    category: "Bottoms",
    price: 54,
    images: [img("joggers")],
    colors: ["Black", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "lightweight-windbreaker",
    name: "Lightweight Windbreaker",
    shortDescription: "Packable with hood.",
    description: "Water‑resistant shell perfect for outdoor teams.",
    category: "Outerwear",
    price: 69,
    images: [img("windbreaker")],
    colors: ["Olive", "Black"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "pique-polo",
    name: "Piqué Polo",
    shortDescription: "Classic texture, crisp collar.",
    description: "Left‑chest embroidery ready.",
    category: "Polos",
    price: 35,
    images: [img("pique polo")],
    colors: ["Navy", "White", "Black"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "tech-cap",
    name: "Tech Cap",
    shortDescription: "Performance fabric cap.",
    description: "Moisture wicking with laser‑cut vents.",
    category: "Hats",
    price: 32,
    images: [img("tech cap")],
    colors: ["Graphite", "Black"],
    inStock: true,
  },
  {
    slug: "foam-trucker",
    name: "Foam Trucker",
    shortDescription: "Retro foam front, mesh back.",
    description: "Bold logo placement front and center.",
    category: "Hats",
    price: 24,
    images: [img("trucker")],
    colors: ["Black/White", "Navy/White"],
    inStock: true,
  },
  {
    slug: "long-sleeve-tee",
    name: "Long Sleeve Tee",
    shortDescription: "Soft ringspun cotton.",
    description: "Perfect for sleeve embroidery.",
    category: "Tees",
    price: 22,
    images: [img("long sleeve tee")],
    colors: ["White", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "performance-pullover",
    name: "Performance Pullover",
    shortDescription: "Smooth quarter‑zip.",
    description: "Office‑ready midlayer that performs.",
    category: "Outerwear",
    price: 68,
    images: [img("performance pullover")],
    colors: ["Navy", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "twill-cap",
    name: "Twill Cap",
    shortDescription: "Everyday structured cap.",
    description: "Classic look for team branding.",
    category: "Hats",
    price: 21,
    images: [img("twill cap")],
    colors: ["Khaki", "Black"],
    inStock: true,
  },
  {
    slug: "bucket-hat",
    name: "Bucket Hat",
    shortDescription: "Casual sun protection.",
    description: "Soft brim, perfect for small marks.",
    category: "Hats",
    price: 27,
    images: [img("bucket hat")],
    colors: ["Stone", "Black"],
    inStock: true,
  },
  {
    slug: "zip-hoodie",
    name: "Zip Hoodie",
    shortDescription: "Full‑zip fleece.",
    description: "Layerable staple for any wardrobe.",
    category: "Hoodies",
    price: 62,
    images: [img("zip hoodie")],
    colors: ["Black", "Heather Grey"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "puffer-vest",
    name: "Puffer Vest",
    shortDescription: "Light insulation, easy layering.",
    description: "Sleek profile pairs with chest embroidery.",
    category: "Outerwear",
    price: 89,
    images: [img("puffer vest")],
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    inStock: true,
  },
  {
    slug: "gym-duffel",
    name: "Gym Duffel",
    shortDescription: "Durable and roomy.",
    description: "Great for team travel kits.",
    category: "Bags",
    price: 44,
    images: [img("duffel bag")],
    colors: ["Black"],
    inStock: true,
  },
  {
    slug: "mesh-trucker",
    name: "Mesh Trucker",
    shortDescription: "Classic snapback trucker.",
    description: "Contrast mesh for breathable comfort.",
    category: "Hats",
    price: 23,
    images: [img("mesh trucker")],
    colors: ["Black/White", "Grey/White"],
    inStock: true,
  },
]

export const featuredProducts: Product[] = allProducts.slice(0, 8)

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug)
}

export function relatedProducts(category: string, excludeSlug: string) {
  const same = allProducts.filter((p) => p.category === category && p.slug !== excludeSlug)
  if (same.length >= 4) return same.slice(0, 4)
  const others = allProducts.filter((p) => p.slug !== excludeSlug)
  return [...same, ...others].slice(0, 4)
}
