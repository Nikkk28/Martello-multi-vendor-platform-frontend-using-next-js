"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"
import type { CartItemDto } from "@/types/cart"

export default function CartDrawer() {
  const [isMounted, setIsMounted] = useState(false)
  const { cart, isLoading, updateCartItem, removeCartItem } = useCart()

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    )
  }

  const itemCount = cart?.totalItems || 0
const cartTotal = cart?.vendorGroups?.reduce(
  (total, group) => total + group.subtotal,
  0
) ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p>Loading your cart...</p>
          </div>
        ) : itemCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg">Your cart is empty</h3>
            <p className="text-muted-foreground text-center">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              {cart?.vendorGroups.map((group) => (
                <div key={group.vendorId} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{group.vendorName}</h3>
                    <span className="text-sm text-muted-foreground">Subtotal: {formatCurrency(group.subtotal)}</span>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <CartItem key={item.id} item={item} updateQuantity={updateCartItem} removeItem={removeCartItem} />
                    ))}
                  </div>

                  <Separator className="my-4" />
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Shipping and taxes calculated at checkout</p>

              <Button asChild className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

interface CartItemProps {
  item: CartItemDto
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  removeItem: (itemId: number) => Promise<void>
}

function CartItem({ item, updateQuantity, removeItem }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || isUpdating) return

    setIsUpdating(true)
    try {
      await updateQuantity(item.id, newQuantity)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (isUpdating) return

    setIsUpdating(true)
    try {
      await removeItem(item.id)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex gap-4">
      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=80&width=80&query=product"}
          alt={item.productName}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{item.productName}</h4>

        {item.variationAttributes && Object.keys(item.variationAttributes).length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {Object.entries(item.variationAttributes)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{formatCurrency(item.price)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
              disabled={isUpdating}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
