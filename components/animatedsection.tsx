"use client"

import { motion } from "framer-motion"

interface AnimatedSectionProps {
	children: React.ReactNode
	className?: string
	delay?: number
	id?: string
}

export function AnimatedSection({ children, className = "", delay = 0, id }: AnimatedSectionProps) {
	return (
		<motion.div
			id={id}
			className={className}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8, delay }}
		>
			{children}
		</motion.div>
	)
}