"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import type { ProductResponse } from "@/types/product"

interface WishlistButtonProps {
  product: ProductResponse
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WishlistButton({
  product,
  variant = "secondary",
  size = "icon",
  className = "",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`rounded-full ${className}`}
      onClick={handleToggleWishlist}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
    </Button>
  )
}
