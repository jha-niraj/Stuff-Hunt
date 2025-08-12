"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactPage() {
	const [status, setStatus] = useState<"idle" | "sent">("idle")
	return (
		<div className="min-h-dvh flex flex-col">
			<main className="flex-1">
				<section className="container mx-auto px-4 py-10 md:py-16">
					<div className="max-w-2xl">
						<h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Contact</h1>
						<p className="text-muted-foreground mt-3 md:text-lg">
							Tell us about your project. We&apos;ll get back within one business day.
						</p>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							setStatus("sent")
						}}
						className="mt-8 max-w-2xl grid gap-6"
					>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Your name" required />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="you@example.com" required />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="company">Company (optional)</Label>
							<Input id="company" placeholder="Your company" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="message">Project details</Label>
							<Textarea id="message" placeholder="What would you like to make?" required />
						</div>
						<div className="flex items-center gap-3">
							<Button type="submit">Send message</Button>
							{status === "sent" && <span className="text-sm text-green-700">Thanks! We&apos;ll be in touch.</span>}
						</div>
					</form>
				</section>
			</main>
		</div>
	)
}
