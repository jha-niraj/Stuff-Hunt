"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

interface CompareItem {
	id: string
	name: string
	price: number
	image: string
	slug: string
}

interface CompareContextType {
	compareItems: CompareItem[]
	addToCompare: (item: CompareItem) => void
	removeFromCompare: (id: string) => void
	clearCompare: () => void
	isInCompare: (id: string) => boolean
	compareCount: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: React.ReactNode }) {
	const [compareItems, setCompareItems] = useState<CompareItem[]>([])

	// Load from localStorage on mount
	useEffect(() => {
		const saved = localStorage.getItem('compare-items')
		if (saved) {
			try {
				setCompareItems(JSON.parse(saved))
			} catch (error) {
				console.error('Error loading compare items:', error)
			}
		}
	}, [])

	// Save to localStorage whenever compareItems changes
	useEffect(() => {
		localStorage.setItem('compare-items', JSON.stringify(compareItems))
	}, [compareItems])

	const addToCompare = (item: CompareItem) => {
		if (compareItems.length >= 3) {
			toast.error('You can compare maximum 3 products at a time')
			return
		}

		if (compareItems.find(i => i.id === item.id)) {
			toast.error('Product already added to compare')
			return
		}

		setCompareItems(prev => [...prev, item])
		toast.success('Product added to compare')
	}

	const removeFromCompare = (id: string) => {
		setCompareItems(prev => prev.filter(item => item.id !== id))
		toast.success('Product removed from compare')
	}

	const clearCompare = () => {
		setCompareItems([])
		toast.success('Compare list cleared')
	}

	const isInCompare = (id: string) => {
		return compareItems.some(item => item.id === id)
	}

	return (
		<CompareContext.Provider
			value={{
				compareItems,
				addToCompare,
				removeFromCompare,
				clearCompare,
				isInCompare,
				compareCount: compareItems.length,
			}}
		>
			{children}
		</CompareContext.Provider>
	)
}

export function useCompare() {
	const context = useContext(CompareContext)
	if (context === undefined) {
		throw new Error('useCompare must be used within a CompareProvider')
	}
	return context
}