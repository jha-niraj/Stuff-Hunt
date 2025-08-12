"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCart } from "@/stores/cart-store"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const { setAuthenticated, syncWithDatabase, loadFromDatabase, isAuthenticated } = useCart()

  useEffect(() => {
    if (status === "authenticated" && !isAuthenticated) {
      // User just logged in, sync localStorage cart to database
      syncWithDatabase()
    } else if (status === "authenticated" && isAuthenticated) {
      // User is already logged in, load cart from database
      loadFromDatabase()
    } else if (status === "unauthenticated") {
      // User logged out, reset authentication state
      setAuthenticated(false)
    }
  }, [status, isAuthenticated, syncWithDatabase, loadFromDatabase, setAuthenticated])

  return <>{children}</>
}