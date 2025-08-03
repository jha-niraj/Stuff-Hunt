"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Store, Plus } from "lucide-react"

export function MerchantSearchInterface() {
    const [storeName, setStoreName] = useState("")

    const handleGetStarted = () => {
        if (!storeName.trim()) return
        window.location.href = `/seller/onboarding?store=${encodeURIComponent(storeName)}`
    }

    return (
        <div className="relative z-10 w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
            <div className="space-y-4">
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start Selling?</h3>
                    <p className="text-sm text-muted-foreground">Enter your store name to begin your journey</p>
                </div>

                {/* Store Name Input */}
                <div className="relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Enter your store name..."
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="pl-10 h-12 text-base bg-background/50 border-border"
                    />
                </div>

                {/* Get Started Button */}
                <Button
                    onClick={handleGetStarted}
                    disabled={!storeName.trim()}
                    className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Your Store
                </Button>

                <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                        Already have an account?{" "}
                        <a href="/seller/signin" className="text-primary hover:underline">
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}