"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GitCompare, X } from "lucide-react"
import { useCompare } from "@/contexts/compare-context"
import Link from "next/link"
import Image from "next/image"

export function CompareFloatingButton() {
	const { compareItems, compareCount, removeFromCompare } = useCompare()

	if (compareCount === 0) return null

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 100 }}
				className="fixed bottom-6 right-6 z-50"
			>
				<div className="bg-background border border-border rounded-2xl shadow-2xl p-4 max-w-sm">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2">
							<GitCompare className="w-5 h-5 text-primary" />
							<span className="font-semibold text-sm">Compare ({compareCount})</span>
						</div>
					</div>

					<div className="space-y-2 mb-4">
						{compareItems.map((item) => (
							<div key={item.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
								<Image
									src={item.image}
									alt={item.name}
									width={32}
									height={32}
									className="rounded object-cover"
								/>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium truncate">{item.name}</p>
									<p className="text-xs text-muted-foreground">${item.price}</p>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeFromCompare(item.id)}
									className="h-6 w-6 p-0"
								>
									<X className="h-3 w-3" />
								</Button>
							</div>
						))}
					</div>

					<Link href={`/compare?products=${compareItems.map(item => item.id).join(',')}`}>
						<Button className="w-full bg-primary hover:bg-primary/90" size="sm">
							<GitCompare className="w-4 h-4 mr-2" />
							Compare Now
						</Button>
					</Link>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}