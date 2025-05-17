"use client"

import { useState } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { ProductResponse } from "@/types/product"

interface AddToCartButtonProps {
  product: ProductResponse
  quantity?: number
  variationId?: number
  className?: string
}

export default function AddToCartButton({ product, quantity = 1, variationId, className = "" }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (product.stockQuantity <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await addToCart({
        productId: product.id,
        quantity,
        variationId,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading || product.stockQuantity <= 0} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stockQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </Button>
  )
}
