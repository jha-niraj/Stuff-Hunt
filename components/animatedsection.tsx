"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import type { HTMLMotionProps } from "framer-motion"

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
	children: ReactNode
	delay?: number
	animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"
}

export function AnimatedSection({
	children,
	className,
	delay = 0,
	animation = "fadeUp",
	...props
}: AnimatedSectionProps) {
	const animations = {
		fadeUp: {
			initial: { opacity: 0, y: 60, scale: 0.95 },
			whileInView: { opacity: 1, y: 0, scale: 1 },
		},
		fadeIn: {
			initial: { opacity: 0 },
			whileInView: { opacity: 1 },
		},
		slideLeft: {
			initial: { opacity: 0, x: -60 },
			whileInView: { opacity: 1, x: 0 },
		},
		slideRight: {
			initial: { opacity: 0, x: 60 },
			whileInView: { opacity: 1, x: 0 },
		},
		scale: {
			initial: { opacity: 0, scale: 0.8 },
			whileInView: { opacity: 1, scale: 1 },
		},
	}

	return (
		<motion.div
			initial={animations[animation].initial}
			whileInView={animations[animation].whileInView}
			viewport={{ once: true, margin: "-100px" }}
			transition={{
				duration: 0.8,
				ease: [0.25, 0.46, 0.45, 0.94],
				delay,
				type: "spring",
				stiffness: 100,
				damping: 15,
			}}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	)
}