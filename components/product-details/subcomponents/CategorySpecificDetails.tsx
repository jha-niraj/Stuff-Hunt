"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductType } from "@prisma/client"
import {
    Droplets, Ruler, Zap,
    Shield, Wrench, Dumbbell, Book
} from "lucide-react"

interface CategorySpecificDetailsProps {
    product: {
        aiMetadata?: Record<string, unknown>
        weight?: number
        dimensions?: string
        material?: string
        sizes?: string[]
    }
    productType: ProductType
    selectedSize?: string
}

// Size guide data for clothing
const SIZE_GUIDE = {
    'XS': { chest: '32-34', waist: '26-28', length: '26' },
    'S': { chest: '34-36', waist: '28-30', length: '27' },
    'M': { chest: '36-38', waist: '30-32', length: '28' },
    'L': { chest: '38-40', waist: '32-34', length: '29' },
    'XL': { chest: '40-42', waist: '34-36', length: '30' },
    'XXL': { chest: '42-44', waist: '36-38', length: '31' }
}

export function CategorySpecificDetails({ product, productType, selectedSize }: CategorySpecificDetailsProps) {
    const specs = (product.aiMetadata || {}) as any
    const categoryType = productType.toString().split('_')[0].toLowerCase()

    // Clothing-specific details
    if (categoryType === 'clothing') {
        return (
            <div className="space-y-6">
                {/* Size Guide */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ruler className="w-5 h-5" />
                            Size Guide & Fit Information
                        </CardTitle>
                        <CardDescription>
                            Find your perfect fit with our detailed size guide
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-3">Fit: {getSpecString('fit', 'Regular')}</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This item has a {getSpecString('fit', 'regular').toLowerCase()} fit.
                                    {getSpecString('fit') === 'Slim' && ' It\'s designed to be close-fitting for a tailored look.'}
                                    {getSpecString('fit') === 'Relaxed' && ' It offers a comfortable, loose fit with room to move.'}
                                    {getSpecString('fit') === 'Regular' && ' It provides a comfortable fit that\'s not too tight or too loose.'}
                                </p>
                            </div>

                            {/* Size Chart */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-border">
                                        <thead>
                                            <tr className="bg-muted">
                                                <th className="border border-border p-2 text-left">Size</th>
                                                <th className="border border-border p-2 text-left">Chest (inches)</th>
                                                <th className="border border-border p-2 text-left">Waist (inches)</th>
                                                <th className="border border-border p-2 text-left">Length (inches)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(SIZE_GUIDE).map(([size, measurements]) => (
                                                <tr key={size} className={selectedSize === size ? 'bg-primary/10' : ''}>
                                                    <td className="border border-border p-2 font-medium">{size}</td>
                                                    <td className="border border-border p-2">{measurements.chest}</td>
                                                    <td className="border border-border p-2">{measurements.waist}</td>
                                                    <td className="border border-border p-2">{measurements.length}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="bg-muted/50 p-4 rounded-lg">
                                <h5 className="font-medium mb-2">How to Measure</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                                    <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                                    <li>• <strong>Length:</strong> Measure from shoulder to hem</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Care Instructions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Droplets className="w-5 h-5" />
                            Care Instructions
                        </CardTitle>
                        <CardDescription>
                            Keep your garment looking its best with proper care
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {getSpecArray('care').length > 0 ? (
                                <div className="space-y-2">
                                    <h4 className="font-semibold">Care Instructions</h4>
                                    <ul className="space-y-1">
                                        {getSpecArray('care').map((instruction: string, index: number) => (
                                            <li key={index} className="flex items-start gap-2 text-sm">
                                                <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <span>{instruction}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <h4 className="font-semibold">General Care Instructions</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li>• Machine wash cold with like colors</li>
                                        <li>• Do not bleach</li>
                                        <li>• Tumble dry low heat</li>
                                        <li>• Iron on low heat if needed</li>
                                        <li>• Do not dry clean</li>
                                    </ul>
                                </div>
                            )}

                            <div className="bg-muted/50 p-4 rounded-lg">
                                <h5 className="font-medium mb-2">Material: {getSpecString('material') || product.material || 'Cotton Blend'}</h5>
                                <p className="text-sm text-muted-foreground">
                                    {getSpecString('material') === 'Cotton' && 'Natural, breathable, and comfortable. May shrink slightly after first wash.'}
                                    {getSpecString('material') === 'Polyester' && 'Durable, wrinkle-resistant, and quick-drying. Easy to care for.'}
                                    {getSpecString('material') === 'Cotton Blend' && 'Combines the comfort of cotton with added durability and easy care.'}
                                    {!getSpecString('material') && 'Please check the garment label for specific material composition and care instructions.'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Electronics-specific details
    if (categoryType === 'electronics') {
        return (
            <div className="space-y-6">
                {/* Technical Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Technical Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Performance Section */}
                            {(hasSpec('processor') || hasSpec('ram') || hasSpec('storage') || hasSpec('graphics')) && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold">Performance</h4>
                                    <div className="space-y-2">
                                        {specs.processor && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Processor</span>
                                                <span className="text-sm">{specs.processor}</span>
                                            </div>
                                        )}
                                        {specs.ram && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">RAM</span>
                                                <span className="text-sm">{specs.ram}</span>
                                            </div>
                                        )}
                                        {specs.storage && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Storage</span>
                                                <span className="text-sm">{specs.storage}</span>
                                            </div>
                                        )}
                                        {specs.graphics && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Graphics</span>
                                                <span className="text-sm">{specs.graphics}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Display/Camera Section */}
                            {(specs.display || specs.camera || specs.screenSize) && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold">
                                        {productType.toString().includes('SMARTPHONE') ? 'Display & Camera' : 'Display'}
                                    </h4>
                                    <div className="space-y-2">
                                        {specs.screenSize && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Screen Size</span>
                                                <span className="text-sm">{specs.screenSize}&quot;</span>
                                            </div>
                                        )}
                                        {specs.display?.size && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Display Size</span>
                                                <span className="text-sm">{specs.display.size}</span>
                                            </div>
                                        )}
                                        {specs.display?.resolution && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Resolution</span>
                                                <span className="text-sm">{specs.display.resolution}</span>
                                            </div>
                                        )}
                                        {specs.camera?.main && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Main Camera</span>
                                                <span className="text-sm">{specs.camera.main}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Connectivity */}
                        {(specs.ports || specs.connectivity) && (
                            <div className="mt-6 space-y-3">
                                <h4 className="font-semibold">Connectivity</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {specs.ports && (
                                        <div>
                                            <p className="text-sm font-medium mb-2">Ports</p>
                                            <div className="flex flex-wrap gap-1">
                                                {specs.ports.map((port: string, index: number) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {port}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {specs.connectivity && (
                                        <div>
                                            <p className="text-sm font-medium mb-2">Wireless</p>
                                            <div className="flex flex-wrap gap-1">
                                                {specs.connectivity.map((conn: string, index: number) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {conn}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Warranty & Support */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Warranty & Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Manufacturer Warranty</span>
                                <span className="text-sm">1 Year</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Extended Warranty</span>
                                <span className="text-sm">Available</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Technical Support</span>
                                <span className="text-sm">24/7 Online</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Home & Garden specific details
    if (categoryType === 'home') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Product Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.material && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Material</span>
                                <span>{product.material}</span>
                            </div>
                        )}
                        {product.dimensions && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Dimensions</span>
                                <span>{product.dimensions}</span>
                            </div>
                        )}
                        {product.weight && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Weight</span>
                                <span>{product.weight} kg</span>
                            </div>
                        )}
                        {specs.assembly && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Assembly Required</span>
                                <span>{specs.assembly}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Sports & Fitness specific details
    if (categoryType === 'sports') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="w-5 h-5" />
                        Equipment Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {specs.weight && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Weight</span>
                                    <span>{specs.weight} kg</span>
                                </div>
                            )}
                            {specs.resistance && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Resistance</span>
                                    <span>{specs.resistance}</span>
                                </div>
                            )}
                            {specs.adjustable && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Adjustable</span>
                                    <span>{specs.adjustable}</span>
                                </div>
                            )}
                        </div>

                        {specs.features && (
                            <div>
                                <h4 className="font-semibold mb-2">Features</h4>
                                <div className="flex flex-wrap gap-1">
                                    {specs.features.map((feature: string, index: number) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Books specific details
    if (categoryType === 'books') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Book className="w-5 h-5" />
                        Book Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specs.author && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Author</span>
                                <span>{specs.author}</span>
                            </div>
                        )}
                        {specs.publisher && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Publisher</span>
                                <span>{specs.publisher}</span>
                            </div>
                        )}
                        {specs.pages && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Pages</span>
                                <span>{specs.pages}</span>
                            </div>
                        )}
                        {specs.language && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Language</span>
                                <span>{specs.language}</span>
                            </div>
                        )}
                        {specs.isbn && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ISBN</span>
                                <span>{specs.isbn}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Generic fallback
    return (
        <Card>
            <CardHeader>
                <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.weight && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Weight</span>
                            <span>{product.weight} kg</span>
                        </div>
                    )}
                    {product.dimensions && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Dimensions</span>
                            <span>{product.dimensions}</span>
                        </div>
                    )}
                    {product.material && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Material</span>
                            <span>{product.material}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}