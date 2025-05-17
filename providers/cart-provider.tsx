"use client"

import React, { createContext, useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import {
  getCart,
  addCartItem,
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi,
  clearCart as clearCartApi,
} from "@/lib/api/cart"
import type { CartResponse } from "@/types/cart"

interface AddToCartParams {
  productId: number
  quantity: number
  variationId?: number
}

interface CartContextType {
  cart: CartResponse | null
  isLoading: boolean
  addToCart: (params: AddToCartParams) => Promise<void>
  updateCartItem: (itemId: number, quantity: number) => Promise<void>
  removeCartItem: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
}

export const CartContext = createContext<CartContextType>({
  cart: null,
  isLoading: false,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeCartItem: async () => {},
  clearCart: async () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated, isLoading: authLoading } = useAuth()

  // Fetch cart only after auth is ready and user is authenticated
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart()
        setCart(cartData)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading && isAuthenticated) {
      fetchCart()
    }
  }, [authLoading, isAuthenticated])

  const addToCart = async ({ productId, quantity, variationId }: AddToCartParams) => {
    setIsLoading(true)
    try {
      await addCartItem({ productId, quantity, variationId })
      const updatedCart = await getCart()
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const updateCartItem = async (itemId: number, quantity: number) => {
    setIsLoading(true)
    try {
      await updateCartItemApi(itemId, quantity)
      const updatedCart = await getCart()
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const removeCartItem = async (itemId: number) => {
    setIsLoading(true)
    try {
      await removeCartItemApi(itemId)
      const updatedCart = await getCart()
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      await clearCartApi()
      const updatedCart = await getCart()
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
