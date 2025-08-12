"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ShoppingBag, Sun, Moon, User, LogOut, Equal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SmartSearch } from "@/components/search/smart-search"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/stores/cart-store"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { useAuthDialog } from "@/components/auth/use-auth-dialog"
import { Suspense } from "react"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const navItems = [
    // { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
]

const protectedNavItems = [
    { href: "/orders", label: "Orders" },
    { href: "/profile", label: "Profile" },
]

export function Navbar() {
    const pathname = usePathname()
    // const router = useRouter()

    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { itemCount } = useCart()
    const { theme, setTheme } = useTheme()
    const { data: session, status } = useSession()
    const { openAuth } = useAuthDialog()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])



    const handleSignOut = () => {
        signOut({ callbackUrl: '/' })
    }

    const renderAuthButtons = () => {
        if (status === 'loading') {
            return (
                <div className="hidden lg:flex items-center gap-4">
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
            )
        }

        if (session?.user) {
            return (
                <div className="hidden lg:flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                                        {session.user.name?.split(" ").map((n: string) => n[0]).join("") ||
                                            session.user.email?.[0].toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {session.user.name && <p className="font-medium">{session.user.name}</p>}
                                    {
                                        session.user.email && (
                                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/orders">Orders</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }

        return (
            <div className="hidden lg:flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAuth({ callbackUrl: pathname })}
                    className={cn(isScrolled && 'lg:hidden')}
                >
                    Login
                </Button>
                <Button
                    size="sm"
                    onClick={() => openAuth({ callbackUrl: pathname })}
                    className={cn(isScrolled && 'lg:hidden')}
                >
                    Sign Up
                </Button>
                <Button
                    size="sm"
                    onClick={() => openAuth({ callbackUrl: pathname })}
                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                >
                    Get Started
                </Button>
            </div>
        )
    }

    const renderMobileAuthButtons = () => {
        if (session?.user) {
            return (
                <div className="flex flex-col gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                {session.user.name?.split(" ").map((n: string) => n[0]).join("") ||
                                    session.user.email?.[0].toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="font-medium text-sm">{session.user.name}</p>
                            <p className="text-xs text-muted-foreground">{session.user.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                            <Button asChild variant="outline" size="sm" className="w-full justify-start">
                                <Link href="/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button asChild variant="outline" size="sm" className="w-full justify-start">
                                <Link href="/orders">Orders</Link>
                            </Button>
                        </SheetClose>
                        <Button
                            onClick={handleSignOut}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-red-600 hover:text-red-700"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </Button>
                    </div>
                </div>
            )
        }

        return (
            <div className="flex gap-4 pt-4 border-t">
                <SheetClose asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => openAuth({ callbackUrl: pathname })}
                    >
                        Login
                    </Button>
                </SheetClose>
                <SheetClose asChild>
                    <Button
                        size="sm"
                        className="w-full"
                        onClick={() => openAuth({ callbackUrl: pathname })}
                    >
                        Get Started
                    </Button>
                </SheetClose>
            </div>
        )
    }

    return (
        <header className="fixed left-0 w-full z-20 px-2">
            <nav className={cn(
                'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
            )}>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-8">
                        <Link href="/" aria-label="home" className="flex gap-2 items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <p className="font-semibold text-xl tracking-tighter text-black dark:text-white">
                                StuffHunt
                            </p>
                        </Link>
                        <div className="hidden lg:flex items-center gap-6">
                            {
                                navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            "text-sm duration-150",
                                            pathname === item.href
                                                ? "text-foreground font-medium"
                                                : "text-muted-foreground hover:text-accent-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            }
                            {
                                session?.user && protectedNavItems.map((item, index) => (
                                    <Link
                                        key={`protected-${index}`}
                                        href={item.href}
                                        className={cn(
                                            "text-sm duration-150",
                                            pathname === item.href
                                                ? "text-foreground font-medium"
                                                : "text-muted-foreground hover:text-accent-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <SmartSearch
                                placeholder="Search products..."
                                className="w-[240px]"
                                showAIIndicator={true}
                            />
                        </div>
                        <div className="hidden lg:flex items-center bg-stone-100/50 dark:bg-stone-800/50 rounded-xl p-1 border border-stone-200/50 dark:border-stone-700/50">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'light' ? 'bg-white shadow-sm' : 'hover:bg-stone-700'
                                    }`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun className="h-3 w-3 text-amber-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'dark' ? 'bg-stone-700 shadow-sm' : 'hover:bg-stone-100'
                                    }`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon className="h-3 w-3 text-blue-500" />
                            </Button>
                        </div>
                        <Button asChild variant="outline" className="hidden lg:flex gap-2 bg-transparent">
                            <Link href="/cart" aria-label="Open cart">
                                <ShoppingBag className="w-4 h-4" />
                                <span className="sr-only">Cart</span>
                                {
                                    itemCount > 0 && (
                                        <span className="text-xs rounded-full bg-primary text-primary-foreground px-2 py-0.5 ml-1">
                                            {itemCount}
                                        </span>
                                    )
                                }
                            </Link>
                        </Button>

                        {renderAuthButtons()}

                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="lg:hidden p-2">
                                    <Equal className="size-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full h-[50vh]">
                                <SheetHeader>
                                    <SheetTitle className="text-left">Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-6 mt-8">
                                    {
                                        navItems.map((item, index) => (
                                            <SheetClose asChild key={index}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "text-lg font-medium transition-colors",
                                                        pathname === item.href
                                                            ? "text-foreground"
                                                            : "text-muted-foreground hover:text-accent-foreground"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </SheetClose>
                                        ))
                                    }
                                    {
                                        session?.user && protectedNavItems.map((item, index) => (
                                            <SheetClose asChild key={`protected-${index}`}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "text-lg font-medium transition-colors",
                                                        pathname === item.href
                                                            ? "text-foreground"
                                                            : "text-muted-foreground hover:text-accent-foreground"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </SheetClose>
                                        ))
                                    }
                                    <SmartSearch
                                        placeholder="Search products..."
                                        onSearch={() => setOpen(false)}
                                        showAIIndicator={true}
                                    />
                                    <SheetClose asChild>
                                        <Button asChild variant="outline" className="gap-2 bg-transparent">
                                            <Link href="/cart" aria-label="Open cart">
                                                <ShoppingBag className="w-4 h-4" />
                                                Cart
                                                {itemCount > 0 && (
                                                    <span className="text-xs rounded-full bg-primary text-primary-foreground px-2 py-0.5 ml-1">
                                                        {itemCount}
                                                    </span>
                                                )}
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                    <div className="flex items-center gap-2 pt-4 border-t">
                                        <span className="text-sm text-muted-foreground">Theme:</span>
                                        <div className="flex items-center bg-stone-100/50 dark:bg-stone-800/50 rounded-xl p-1 border border-stone-200/50 dark:border-stone-700/50">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'light' ? 'bg-white shadow-sm' : 'hover:bg-stone-700'
                                                    }`}
                                                onClick={() => setTheme('light')}
                                            >
                                                <Sun className="h-3 w-3 text-amber-500" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'dark' ? 'bg-stone-700 shadow-sm' : 'hover:bg-stone-100'
                                                    }`}
                                                onClick={() => setTheme('dark')}
                                            >
                                                <Moon className="h-3 w-3 text-blue-500" />
                                            </Button>
                                        </div>
                                    </div>

                                    {renderMobileAuthButtons()}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            <Suspense fallback={null}>
                <AuthDialog />
            </Suspense>
        </header>
    )
}