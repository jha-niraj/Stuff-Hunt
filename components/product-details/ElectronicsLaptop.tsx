"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Monitor, Cpu, HardDrive, MemoryStick, Battery, Zap, ShoppingCart, Heart,
    Star, Shield, Truck, RotateCcw
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { useCart } from "@/stores/cart-store"
import { toast } from "sonner"

interface LaptopSpecs {
    processor?: string
    ram?: string
    storage?: string
    display?: {
        size?: string
        resolution?: string
        type?: string
    }
    graphics?: string
    battery?: string
    weight?: number
    ports?: string[]
    connectivity?: string[]
    os?: string
}

interface ElectronicsLaptopProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        originalPrice?: number
        images: string[]
        brand?: string
        shortDescription?: string
        detailedDescription?: string
        keyFeatures?: string
        inStock: boolean
        stockQuantity: number
        colors?: string[]
        aiMetadata?: LaptopSpecs
        averageRating?: number
        reviewCount?: number
    }
}

export default function ElectronicsLaptop({ product }: ElectronicsLaptopProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
    const { add } = useCart()

    const specs = product.aiMetadata as LaptopSpecs || {}

    const handleAddToCart = () => {
        add(product as Parameters<typeof add>[0], 1, selectedColor ? `color:${selectedColor}` : undefined)
        toast.success('Added to cart')
    }

    const keySpecs = [
        { icon: Cpu, label: 'Processor', value: specs.processor || 'Not specified' },
        { icon: MemoryStick, label: 'RAM', value: specs.ram || 'Not specified' },
        { icon: HardDrive, label: 'Storage', value: specs.storage || 'Not specified' },
        { icon: Monitor, label: 'Display', value: specs.display?.size || 'Not specified' },
        { icon: Battery, label: 'Battery', value: specs.battery || 'Not specified' },
        { icon: Zap, label: 'Weight', value: specs.weight ? `${specs.weight} kg` : 'Not specified' }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <motion.div
                        className="aspect-square bg-muted rounded-lg overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Image
                            src={product.images[selectedImage] || "/placeholder.svg"}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    {
                        product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {
                                    product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {
                                product.brand && (
                                    <Badge variant="secondary">{product.brand}</Badge>
                                )
                            }
                            <Badge variant="outline">Laptop</Badge>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        {
                            product.averageRating && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {
                                            [...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.averageRating!)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))
                                        }
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {product.averageRating.toFixed(1)} ({product.reviewCount || 0} reviews)
                                    </span>
                                </div>
                            )
                        }
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-primary">
                                {formatCurrency(product.price)}
                            </span>
                            {
                                product.originalPrice && product.originalPrice > product.price && (
                                    <>
                                        <span className="text-xl text-muted-foreground line-through">
                                            {formatCurrency(product.originalPrice)}
                                        </span>
                                        <Badge variant="destructive">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                        </Badge>
                                    </>
                                )
                            }
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {
                                product.inStock
                                    ? `${product.stockQuantity} units available`
                                    : 'Out of stock'
                            }
                        </p>
                    </div>
                    {
                        product.colors && product.colors.length > 0 && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Color</label>
                                <div className="flex gap-2">
                                    {
                                        product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-3 py-1 rounded-md border text-sm transition-colors ${selectedColor === color
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : 'border-border hover:border-primary'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Key Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    keySpecs.map((spec, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <spec.icon className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{spec.label}</p>
                                                <p className="text-sm text-muted-foreground">{spec.value}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="flex-1"
                            size="lg"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button variant="outline" size="lg">
                            <Heart className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            <span>1 Year Warranty</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <RotateCcw className="w-4 h-4" />
                            <span>30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {
                                product.shortDescription && (
                                    <p className="text-muted-foreground">{product.shortDescription}</p>
                                )
                            }
                            {
                                product.detailedDescription && (
                                    <div className="prose prose-sm max-w-none">
                                        <p>{product.detailedDescription}</p>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="specifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Performance</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Processor</span>
                                            <span>{specs.processor || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">RAM</span>
                                            <span>{specs.ram || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Storage</span>
                                            <span>{specs.storage || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Graphics</span>
                                            <span>{specs.graphics || 'Integrated'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Display & Design</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Screen Size</span>
                                            <span>{specs.display?.size || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Resolution</span>
                                            <span>{specs.display?.resolution || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Display Type</span>
                                            <span>{specs.display?.type || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Weight</span>
                                            <span>{specs.weight ? `${specs.weight} kg` : 'Not specified'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                (specs.ports || specs.connectivity) && (
                                    <div className="mt-6 space-y-4">
                                        <h4 className="font-semibold">Connectivity</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {
                                                specs.ports && (
                                                    <div>
                                                        <p className="text-sm font-medium mb-2">Ports</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {
                                                                specs.ports.map((port, index) => (
                                                                    <Badge key={index} variant="outline" className="text-xs">
                                                                        {port}
                                                                    </Badge>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                specs.connectivity && (
                                                    <div>
                                                        <p className="text-sm font-medium mb-2">Wireless</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {
                                                                specs.connectivity.map((conn, index) => (
                                                                    <Badge key={index} variant="outline" className="text-xs">
                                                                        {conn}
                                                                    </Badge>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="features" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                product.keyFeatures ? (
                                    <div className="prose prose-sm max-w-none">
                                        {
                                            product.keyFeatures.split('\n').map((feature, index) => (
                                                <div key={index} className="flex items-start gap-2 mb-2">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    <span>{feature.trim()}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">No detailed features available.</p>
                                )
                            }
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                            <CardDescription>
                                See what other customers are saying about this laptop
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Reviews will be loaded here...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}