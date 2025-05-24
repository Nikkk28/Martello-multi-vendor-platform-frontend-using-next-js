"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import type { WishlistItem } from "@/lib/api/wishlist"

interface WishlistItemProps {
  item: WishlistItem
  wishlistId: number
}

export default function WishlistItemCard({ item, wishlistId }: WishlistItemProps) {
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { product } = item

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    addToCart({
      productId: product.id,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <div className="group relative flex flex-col md:flex-row gap-4 p-4 border rounded-2xl bg-background hover:shadow-md transition-shadow">
      <div className="relative w-full md:w-40 h-40 overflow-hidden rounded-xl">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageUrls[0] || "/placeholder.svg?height=160&width=160"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-medium text-lg">{product.name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm mt-1">{product.categoryName}</p>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          <p className="font-medium text-lg">{formatCurrency(product.price)}</p>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1" onClick={handleRemove}>
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Remove</span>
            </Button>

            <Button size="sm" className="rounded-full flex items-center gap-1 premium-button" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
