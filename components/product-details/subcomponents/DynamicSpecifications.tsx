"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductType } from "@prisma/client"
import {
	Monitor, Cpu, HardDrive, MemoryStick, Battery,
	Zap, Smartphone, Camera,
	Shirt, Ruler, Thermometer, Palette, Tag,
	Package, Info, Home, Dumbbell
} from "lucide-react"

interface DynamicSpecificationsProps {
	product: {
		aiMetadata?: Record<string, unknown>
		weight?: number
		dimensions?: string
		material?: string
		brand?: string
		category?: string
	}
	productType: ProductType
	detailed?: boolean
}

// Define types for better TypeScript support
interface SpecMapping {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
	keySpecs: Array<{
		key: string
		label: string
		icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
		unit?: string
	}>
	detailedSections: Array<{
		title: string
		specs: string[]
		isList?: boolean
	}>
}

// Dynamic specification mappings based on product type
const SPEC_MAPPINGS: Record<string, SpecMapping> = {
	// Electronics specifications
	[ProductType.ELECTRONICS_LAPTOP]: {
		icon: Monitor,
		keySpecs: [
			{ key: 'processor', label: 'Processor', icon: Cpu },
			{ key: 'ram', label: 'RAM', icon: MemoryStick },
			{ key: 'storage', label: 'Storage', icon: HardDrive },
			{ key: 'display.size', label: 'Display', icon: Monitor },
			{ key: 'battery', label: 'Battery', icon: Battery },
			{ key: 'weight', label: 'Weight', icon: Zap, unit: 'kg' }
		],
		detailedSections: [
			{
				title: 'Performance',
				specs: ['processor', 'ram', 'storage', 'graphics']
			},
			{
				title: 'Display & Design',
				specs: ['display.size', 'display.resolution', 'display.type', 'weight']
			},
			{
				title: 'Connectivity',
				specs: ['ports', 'connectivity'],
				isList: true
			}
		]
	},

	[ProductType.ELECTRONICS_SMARTPHONE]: {
		icon: Smartphone,
		keySpecs: [
			{ key: 'screenSize', label: 'Display', icon: Monitor, unit: '"' },
			{ key: 'camera.main', label: 'Main Camera', icon: Camera },
			{ key: 'battery', label: 'Battery', icon: Battery },
			{ key: 'processor', label: 'Processor', icon: Cpu },
			{ key: 'os', label: 'OS', icon: Smartphone }
		],
		detailedSections: [
			{
				title: 'Performance',
				specs: ['os', 'processor', 'ram', 'battery']
			},
			{
				title: 'Display',
				specs: ['screenSize', 'display.type', 'display.resolution']
			},
			{
				title: 'Camera',
				specs: ['camera.main', 'camera.front', 'camera.features'],
				isList: true
			},
			{
				title: 'Storage & Connectivity',
				specs: ['storage', 'connectivity'],
				isList: true
			}
		]
	},

	// Electronics - Additional types
	[ProductType.ELECTRONICS_HEADPHONES]: {
		icon: Smartphone,
		keySpecs: [
			{ key: 'type', label: 'Type', icon: Smartphone },
			{ key: 'connectivity', label: 'Connectivity', icon: Package },
			{ key: 'battery', label: 'Battery', icon: Battery },
			{ key: 'weight', label: 'Weight', icon: Zap, unit: 'g' }
		],
		detailedSections: [
			{
				title: 'Audio Specifications',
				specs: ['type', 'connectivity', 'battery', 'weight']
			}
		]
	},

	// Clothing specifications
	[ProductType.CLOTHING_APPAREL]: {
		icon: Shirt,
		keySpecs: [
			{ key: 'material', label: 'Material', icon: Shirt },
			{ key: 'fit', label: 'Fit', icon: Tag },
			{ key: 'season', label: 'Season', icon: Thermometer },
			{ key: 'style', label: 'Style', icon: Palette }
		],
		detailedSections: [
			{
				title: 'Material & Fabric',
				specs: ['material', 'pattern', 'occasion']
			},
			{
				title: 'Style & Fit',
				specs: ['fit', 'style', 'neckline', 'sleeves']
			},
			{
				title: 'Care Instructions',
				specs: ['care'],
				isList: true
			}
		]
	},

	[ProductType.CLOTHING_FOOTWEAR]: {
		icon: Ruler,
		keySpecs: [
			{ key: 'material', label: 'Material', icon: Shirt },
			{ key: 'sole', label: 'Sole Type', icon: Ruler },
			{ key: 'closure', label: 'Closure', icon: Tag },
			{ key: 'occasion', label: 'Occasion', icon: Palette }
		],
		detailedSections: [
			{
				title: 'Construction',
				specs: ['material', 'sole', 'closure', 'heel']
			},
			{
				title: 'Style & Fit',
				specs: ['style', 'occasion', 'width', 'arch']
			}
		]
	},

	// Home & Garden specifications
	[ProductType.HOME_FURNITURE]: {
		icon: Home,
		keySpecs: [
			{ key: 'material', label: 'Material', icon: Package },
			{ key: 'dimensions', label: 'Dimensions', icon: Ruler },
			{ key: 'weight', label: 'Weight', icon: Zap, unit: 'kg' },
			{ key: 'assembly', label: 'Assembly', icon: Info }
		],
		detailedSections: [
			{
				title: 'Construction',
				specs: ['material', 'finish', 'assembly']
			},
			{
				title: 'Dimensions & Weight',
				specs: ['dimensions', 'weight', 'capacity']
			}
		]
	},

	// Sports specifications
	[ProductType.SPORTS_FITNESS]: {
		icon: Dumbbell,
		keySpecs: [
			{ key: 'weight', label: 'Weight', icon: Zap, unit: 'kg' },
			{ key: 'material', label: 'Material', icon: Package },
			{ key: 'resistance', label: 'Resistance', icon: Dumbbell },
			{ key: 'adjustable', label: 'Adjustable', icon: Info }
		],
		detailedSections: [
			{
				title: 'Specifications',
				specs: ['weight', 'material', 'resistance', 'adjustable']
			},
			{
				title: 'Features',
				specs: ['features', 'accessories'],
				isList: true
			}
		]
	}
}

// Generic fallback
const GENERIC_SPECS = {
	icon: Package,
	keySpecs: [
		{ key: 'material', label: 'Material', icon: Package },
		{ key: 'weight', label: 'Weight', icon: Zap, unit: 'kg' },
		{ key: 'dimensions', label: 'Dimensions', icon: Ruler }
	],
	detailedSections: [
		{
			title: 'Product Information',
			specs: ['material', 'weight', 'dimensions', 'brand']
		}
	]
}

export function DynamicSpecifications({ product, productType, detailed = false }: DynamicSpecificationsProps) {
	const specs = product.aiMetadata || {}
	const mapping = SPEC_MAPPINGS[productType] || GENERIC_SPECS

	// Helper function to get nested value
	const getValue = (obj: Record<string, unknown>, path: string): unknown => {
		return path.split('.').reduce((current: Record<string, unknown> | undefined, key) => current?.[key] as Record<string, unknown>, obj)
	}

	// Helper function to format value
	const formatValue = (value: unknown, unit?: string): string => {
		if (!value) return 'Not specified'
		if (Array.isArray(value)) return value.join(', ')
		if (typeof value === 'object') return JSON.stringify(value)
		return unit ? `${value} ${unit}` : value.toString()
	}

	if (detailed) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<mapping.icon className="w-5 h-5" />
						Technical Specifications
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{mapping.detailedSections.map((section, index: number) => (
							<div key={index}>
								<h4 className="font-semibold mb-3">{section.title}</h4>
								{section.isList ? (
									<div className="space-y-3">
										{section.specs.map((specKey: string) => {
											const value = getValue(specs, specKey) || getValue(product, specKey)
											if (!value) return null

											return (
												<div key={specKey}>
													<p className="text-sm font-medium mb-1 capitalize">
														{specKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}
													</p>
													{Array.isArray(value) ? (
														<div className="flex flex-wrap gap-1">
															{value.map((item: string, idx: number) => (
																<Badge key={idx} variant="outline" className="text-xs">
																	{item}
																</Badge>
															))}
														</div>
													) : (
														<p className="text-sm text-muted-foreground">{value}</p>
													)}
												</div>
											)
										})}
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{section.specs.map((specKey: string) => {
											const value = getValue(specs, specKey) || getValue(product, specKey)
											if (!value) return null

											return (
												<div key={specKey} className="flex justify-between">
													<span className="text-muted-foreground capitalize">
														{specKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase())}
													</span>
													<span className="font-medium">{formatValue(value)}</span>
												</div>
											)
										})}
									</div>
								)}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		)
	}

	// Key specifications for the main product info section
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg flex items-center gap-2">
					<mapping.icon className="w-4 h-4" />
					Key Specifications
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{mapping.keySpecs.map((spec, index: number) => {
						const value = getValue(specs, spec.key) || getValue(product, spec.key)
						if (!value) return null

						return (
							<div key={index} className="flex items-center gap-3">
								<spec.icon className="w-4 h-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">{spec.label}</p>
									<p className="text-sm text-muted-foreground">
										{formatValue(value, spec.unit)}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}