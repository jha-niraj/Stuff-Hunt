'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/useCartStore'
import Link from 'next/link'

interface CartIconProps {
  className?: string
}

export default function CartIcon({ className = '' }: CartIconProps) {
  const { totalItems } = useCartStore()

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className={`relative ${className}`}>
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
