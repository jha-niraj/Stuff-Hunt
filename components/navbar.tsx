"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ShoppingBag, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/stores/cart-store"
import { AuthDialog } from "@/components/auth/auth-dialog"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/orders", label: "Orders" },
    { href: "/profile", label: "Profile" },
]

export function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const sp = useSearchParams()
    const [q, setQ] = useState("")
    const [open, setOpen] = useState(false)
    const { items } = useCart()
    const count = useMemo(() => items.reduce((a, b) => a + b.quantity, 0), [items])

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" aria-label="Open menu">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="mt-6 grid gap-2">
                                {navItems.map((n) => (
                                    <Link
                                        key={n.href}
                                        href={n.href}
                                        className="rounded-md px-3 py-2 hover:bg-accent"
                                        aria-current={pathname === n.href ? "page" : undefined}
                                    >
                                        {n.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="font-semibold tracking-tight text-lg">
                        StuffHunt
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((n) => (
                        <Link
                            key={n.href}
                            href={n.href}
                            className={`rounded-md px-3 py-2 text-sm hover:bg-accent ${pathname === n.href ? "font-semibold" : "text-muted-foreground"
                                }`}
                            aria-current={pathname === n.href ? "page" : undefined}
                        >
                            {n.label}
                        </Link>
                    ))}
                </nav>
                <div className="ml-auto hidden md:flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const query = q.trim()
                                    const params = new URLSearchParams()
                                    if (query) params.set("query", query)
                                    params.set("source", "header")
                                    router.push(`/products?${params.toString()}`)
                                }
                            }}
                            placeholder="Search products..."
                            className="pl-8 w-[260px]"
                            aria-label="Search"
                        />
                    </div>
                    <Button asChild variant="outline" className="gap-2 bg-transparent">
                        <Link href="/cart" aria-label="Open cart">
                            <ShoppingBag className="w-4 h-4" />
                            <span className="sr-only">Cart</span>
                            <span className="text-xs rounded-full bg-primary text-primary-foreground px-2 py-0.5 ml-1">{count}</span>
                        </Link>
                    </Button>
                </div>
                <div className="ml-auto md:hidden flex items-center gap-2">
                    <Button asChild variant="outline" size="icon" aria-label="Cart">
                        <Link href="/cart">
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Global auth dialog, opens via ?auth=1 or programmatically */}
            <AuthDialog />
        </header>
    )
}
