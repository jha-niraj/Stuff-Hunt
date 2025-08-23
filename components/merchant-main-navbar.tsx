"use client"

import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { 
    Moon, Sun, User, LogOut, LogIn, Store, Package, 
    BarChart3, Settings, Bell 
} from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { motion } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import { toast } from "sonner"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const MerchantMainNavbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    const getPageTitle = () => {
        const pathSegments = pathname.split("/").filter(Boolean)
        const currentPath = pathSegments[pathSegments.length - 1] || "dashboard"

        switch (currentPath) {
            case "merchantdirectory":
            case "dashboard":
                return "Seller Dashboard"
            case "products":
                return "My Products"
            case "orders":
                return "Orders"
            case "analytics":
                return "Analytics"
            case "customers":
                return "Customers"
            case "inventory":
                return "Inventory"
            case "settings":
                return "Settings"
            case "profile":
                return "Profile"
            default:
                return currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Logged out successfully")
        } catch (error) {
            console.error("Sign out error:", error)
        }
    }

    return (
        <nav
            className={`fixed top-0 right-0 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 z-10 ${scrolled ? "shadow-sm" : ""} ${isCollapsed ? "left-0 sm:left-[60px]" : "left-0 sm:left-[180px]"} left-0`}
        >
            <div className="px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <motion.h1
                                className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={pathname}
                            >
                                {getPageTitle()}
                            </motion.h1>
                            {
                                session?.user && (
                                    <Badge variant="secondary" className="hidden sm:flex bg-primary/10 text-primary border-primary/20">
                                        <Store className="h-3 w-3 mr-1" />
                                        Seller
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Notifications */}
                        {session?.user && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative h-8 w-8 p-0"
                            >
                                <Bell className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                                    3
                                </span>
                            </Button>
                        )}

                        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-md transition-all cursor-pointer ${theme === "light" ? "bg-white dark:bg-gray-900 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-md transition-all cursor-pointer ${theme === "dark" ? "bg-white dark:bg-gray-900 shadow-sm" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                            </Button>
                        </div>

                        {
                            session?.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                                            <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700">
                                                <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt={session?.user?.name || "User"} />
                                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                                    {
                                                        session.user.name
                                                            ?.split(" ")
                                                            .map((n: string) => n[0])
                                                            .join("") || "M"
                                                    }
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Store className="w-3 h-3 text-primary" />
                                                    <span className="text-xs text-primary font-medium">Seller Account</span>
                                                </div>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer md:hidden" onClick={() => router.push("/merchantdirectory")}>
                                            <BarChart3 className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer md:hidden" onClick={() => router.push("/merchantdirectory/products")}>
                                            <Package className="mr-2 h-4 w-4" />
                                            <span>My Products</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer md:hidden"
                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        >
                                            {
                                                theme === "dark" ? (
                                                    <>
                                                        <Sun className="mr-2 h-4 w-4" />
                                                        <span>Light Mode</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Moon className="mr-2 h-4 w-4" />
                                                        <span>Dark Mode</span>
                                                    </>
                                                )
                                            }
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="md:hidden" />
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/merchantdirectory/settings")}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400" onClick={handleSignOut}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign Out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/signin">
                                    <Button
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm transition-all duration-200"
                                        size="sm"
                                    >
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Sign In
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MerchantMainNavbar;