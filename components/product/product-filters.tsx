"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getCategories } from "@/actions/product.action"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function ProductFilters() {
	const router = useRouter()
	const sp = useSearchParams()
	const [query, setQuery] = useState(sp.get("q") || sp.get("query") || "")
	const [category, setCategory] = useState(sp.get("category") || "All")
	const [sort, setSort] = useState(sp.get("sort") || "newest")
	const [minPrice, setMinPrice] = useState(sp.get("minPrice") || "")
	const [maxPrice, setMaxPrice] = useState(sp.get("maxPrice") || "")
	const [categories, setCategories] = useState<Array<{ id: string, name: string, _count: { products: number } }>>([])

	// Load categories from database
	useEffect(() => {
		const loadCategories = async () => {
			const result = await getCategories()
			if (result.success) {
				setCategories(result.categories)
			}
		}
		loadCategories()
	}, [])

	function apply() {
		const params = new URLSearchParams()
		if (query) params.set("q", query)
		if (category && category !== "All") params.set("category", category)
		if (sort && sort !== "newest") params.set("sort", sort)
		if (minPrice) params.set("minPrice", minPrice)
		if (maxPrice) params.set("maxPrice", maxPrice)
		router.push(`/products?${params.toString()}`)
	}

	return (
		<div className="rounded-xl border p-4 md:p-5 grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="q">Search</Label>
				<Input
					id="q"
					placeholder="Search products..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && apply()}
				/>
			</div>
			<div className="grid gap-2">
				<Label>Category</Label>
				<Select value={category} onValueChange={setCategory}>
					<SelectTrigger>
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Categories</SelectItem>
						{
							categories.map((c) => (
								<SelectItem key={c.id} value={c.name}>
									{c.name} ({c._count.products})
								</SelectItem>
							))
						}
					</SelectContent>
				</Select>
			</div>
			<div className="grid gap-2">
				<Label>Price Range</Label>
				<div className="grid grid-cols-2 gap-2">
					<Input
						placeholder="Min"
						type="number"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
					/>
					<Input
						placeholder="Max"
						type="number"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
				</div>
			</div>
			<div className="grid gap-2">
				<Label>Sort By</Label>
				<Select value={sort} onValueChange={setSort}>
					<SelectTrigger>
						<SelectValue placeholder="Newest" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Newest</SelectItem>
						<SelectItem value="oldest">Oldest</SelectItem>
						<SelectItem value="price_low">Price: Low to High</SelectItem>
						<SelectItem value="price_high">Price: High to Low</SelectItem>
						<SelectItem value="popular">Most Popular</SelectItem>
						<SelectItem value="rating">Highest Rated</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button onClick={apply}>Apply filters</Button>
		</div>
	)
}