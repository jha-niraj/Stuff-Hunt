"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User, ArrowRight } from "lucide-react"

interface AuthDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onChoice: (choice: "signin" | "continue") => void
}

export function AuthDialog({ open, onOpenChange, onChoice }: AuthDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<User className="h-5 w-5" />
						Choose how to continue
					</DialogTitle>
					<DialogDescription>
						Sign in to save your searches and get personalized recommendations, or continue as a guest.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-3 mt-6">
					<Button
						onClick={() => onChoice("signin")}
						className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
					>
						<User className="mr-2 h-4 w-4" />
						Sign In & Search
					</Button>

					<Button onClick={() => onChoice("continue")} variant="outline" className="w-full h-12">
						<ArrowRight className="mr-2 h-4 w-4" />
						Continue as Guest
					</Button>
				</div>

				<p className="text-xs text-muted-foreground text-center mt-4">
					By continuing, you agree to our Terms of Service and Privacy Policy.
				</p>
			</DialogContent>
		</Dialog>
	)
}