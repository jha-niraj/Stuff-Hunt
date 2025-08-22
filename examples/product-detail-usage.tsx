// Example usage of the new Hybrid Product Detail System

import { ProductType } from "@prisma/client"
import ProductDetailPage from "@/components/product-details/ProductDetailPage"
import UnifiedProductDetail from "@/components/product-details/UnifiedProductDetail"

// Example 1: Electronics Laptop with structured aiMetadata
const laptopProduct = {
  id: "laptop-001",
  name: "MacBook Pro M2",
  slug: "macbook-pro-m2",
  price: 1299,
  originalPrice: 1499,
  images: [
    "/images/macbook-1.jpg",
    "/images/macbook-2.jpg",
    "/images/macbook-3.jpg"
  ],
  brand: "Apple",
  category: "Electronics",
  subcategory: "Laptops",
  productType: ProductType.ELECTRONICS_LAPTOP,
  shortDescription: "Powerful laptop with M2 chip for professionals",
  detailedDescription: "The MacBook Pro M2 delivers exceptional performance...",
  keyFeatures: "M2 Chip\nRetina Display\nAll-day battery life\nThunderbolt ports",
  inStock: true,
  stockQuantity: 15,
  colors: ["Space Gray", "Silver"],
  sizes: ["256GB", "512GB", "1TB"],
  weight: 1.4,
  // Structured aiMetadata following the schema
  aiMetadata: {
    processor: "Apple M2 Chip",
    ram: "16GB Unified Memory",
    storage: "512GB SSD",
    display: {
      size: "13.3 inch",
      resolution: "2560x1600",
      type: "Retina Display"
    },
    graphics: "10-core GPU",
    battery: "Up to 20 hours",
    ports: ["2x Thunderbolt 4", "MagSafe 3", "3.5mm headphone jack"],
    connectivity: ["Wi-Fi 6", "Bluetooth 5.0"],
    os: "macOS Ventura"
  },
  averageRating: 4.8,
  reviewCount: 124,
  seller: {
    id: "apple-store",
    name: "Apple Store",
    verificationBadge: true
  }
}

// Example 2: Clothing Apparel with care instructions
const tshirtProduct = {
  id: "tshirt-001",
  name: "Premium Cotton T-Shirt",
  slug: "premium-cotton-tshirt",
  price: 29,
  originalPrice: 39,
  images: [
    "/images/tshirt-1.jpg",
    "/images/tshirt-2.jpg"
  ],
  brand: "Nike",
  category: "Clothing",
  subcategory: "Apparel",
  productType: ProductType.CLOTHING_APPAREL,
  shortDescription: "Comfortable cotton t-shirt for everyday wear",
  detailedDescription: "Made from 100% premium cotton...",
  keyFeatures: "100% Cotton\nBreathable fabric\nClassic fit\nDurable construction",
  inStock: true,
  stockQuantity: 50,
  colors: ["White", "Black", "Navy", "Gray"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  material: "100% Cotton",
  // Structured aiMetadata for clothing
  aiMetadata: {
    material: "100% Premium Cotton",
    fit: "Regular",
    care: [
      "Machine wash cold with like colors",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed"
    ],
    season: "All Season",
    style: "Casual",
    neckline: "Crew Neck",
    sleeves: "Short Sleeve",
    pattern: "Solid",
    occasion: "Casual, Everyday"
  },
  averageRating: 4.5,
  reviewCount: 89,
  seller: {
    id: "nike-official",
    name: "Nike Official Store",
    verificationBadge: true
  }
}

// Example 3: Home Furniture
const chairProduct = {
  id: "chair-001",
  name: "Ergonomic Office Chair",
  slug: "ergonomic-office-chair",
  price: 299,
  images: ["/images/chair-1.jpg"],
  brand: "Herman Miller",
  category: "Home & Garden",
  subcategory: "Furniture",
  productType: ProductType.HOME_FURNITURE,
  shortDescription: "Comfortable ergonomic chair for office use",
  inStock: true,
  stockQuantity: 25,
  colors: ["Black", "Gray"],
  weight: 15,
  dimensions: "26\" W x 26\" D x 40-44\" H",
  aiMetadata: {
    material: "Mesh and Plastic",
    assembly: "Required (30 minutes)",
    capacity: "Up to 300 lbs",
    style: "Modern",
    room: "Office, Study",
    warranty: "5 years"
  },
  averageRating: 4.7,
  reviewCount: 156,
  seller: {
    id: "furniture-store",
    name: "Office Furniture Plus",
    verificationBadge: true
  }
}

// Usage Examples

// 1. Using the main ProductDetailPage component (recommended)
export function LaptopDetailPage() {
  return (
    <ProductDetailPage 
      product={laptopProduct}
      useUnified={true} // Use new hybrid system (default)
    />
  )
}

// 2. Using legacy components for backward compatibility
export function LaptopDetailPageLegacy() {
  return (
    <ProductDetailPage 
      product={laptopProduct}
      useUnified={false} // Use legacy components
    />
  )
}

// 3. Direct usage of UnifiedProductDetail
export function ClothingDetailPage() {
  return (
    <UnifiedProductDetail product={tshirtProduct} />
  )
}

// 4. Multiple products with different categories
export function ProductShowcase() {
  const products = [laptopProduct, tshirtProduct, chairProduct]
  
  return (
    <div className="space-y-8">
      {products.map((product) => (
        <div key={product.id} className="border-b pb-8">
          <UnifiedProductDetail product={product} />
        </div>
      ))}
    </div>
  )
}

// 5. Custom product with minimal schema
const genericProduct = {
  id: "generic-001",
  name: "Generic Product",
  slug: "generic-product",
  price: 99,
  images: ["/images/generic.jpg"],
  productType: ProductType.GENERIC_PRODUCT,
  shortDescription: "A generic product example",
  inStock: true,
  stockQuantity: 10,
  // Minimal aiMetadata - system will use fallbacks
  aiMetadata: {
    material: "Mixed materials",
    weight: "1 kg"
  },
  seller: {
    id: "generic-seller",
    name: "Generic Store",
    verificationBadge: false
  }
}

export function GenericProductPage() {
  return <UnifiedProductDetail product={genericProduct} />
}

// 6. Error handling example
export function ProductDetailWithErrorHandling({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct(productId)
      .then(setProduct)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>
  if (!product) return <div>Product not found</div>

  return <ProductDetailPage product={product} />
}

// Helper function to create product with default schema
export function createProductWithDefaults(
  baseProduct: any, 
  productType: ProductType
) {
  const defaultSchemas = {
    [ProductType.ELECTRONICS_LAPTOP]: {
      processor: '',
      ram: '',
      storage: '',
      display: { size: '', resolution: '', type: '' }
    },
    [ProductType.CLOTHING_APPAREL]: {
      material: '',
      fit: 'Regular',
      care: [],
      season: 'All Season'
    }
  }

  return {
    ...baseProduct,
    productType,
    aiMetadata: {
      ...defaultSchemas[productType],
      ...baseProduct.aiMetadata
    }
  }
}