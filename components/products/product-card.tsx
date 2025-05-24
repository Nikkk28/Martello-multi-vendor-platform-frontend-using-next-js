"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import type { ProductResponse } from "@/types/product"
import WishlistButton from "@/components/products/wishlist-button"

interface ProductCardProps {
  product: ProductResponse
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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
    <Link
      href={`/products/${product.id}`}
      className="group block premium-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-background aspect-[3/4]">
        <Image
          src={product.imageUrls[0] || "/placeholder.svg?height=600&width=400&query=minimal product photography"}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ease-in-out ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Quick action buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ease-in-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 rounded-full premium-button" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <WishlistButton product={product} />
          </div>
        </div>

        {/* Vendor badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs bg-background/80 backdrop-blur-sm rounded-full">{product.vendorName}</span>
        </div>
      </div>

      <div className={`mt-3 space-y-1 ${featured ? "text-center" : ""}`}>
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-1">{product.categoryName}</p>
        <p className="font-medium">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  )
}
