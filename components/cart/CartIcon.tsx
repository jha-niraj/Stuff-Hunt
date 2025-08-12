'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/stores/cart-store'
import Link from 'next/link'

interface CartIconProps {
  className?: string
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { itemCount, isLoading } = useCart()

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className={`relative ${className}`} disabled={isLoading}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
