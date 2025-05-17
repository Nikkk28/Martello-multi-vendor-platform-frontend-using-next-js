import type { CartResponse, CartItemRequest } from "@/types/cart"
import { apiClient } from "./api-client"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Mock data for demo purposes
const mockCart: CartResponse = {
  id: 1,
  userId: 1,
  vendorGroups: [
    {
      vendorId: 1,
      vendorName: "Artisan Leather Co.",
      subtotal: 89.99,
      items: [
        {
          id: 1,
          productId: 1,
          productName: "Premium Leather Wallet",
          variationId: null,
          variationAttributes: {},
          quantity: 1,
          price: 89.99,
          subtotal: 89.99,
          imageUrl: "/premium-leather-wallet.png",
        },
      ],
    },
    {
      vendorId: 2,
      vendorName: "Modern Living",
      subtotal: 49.99,
      items: [
        {
          id: 2,
          productId: 2,
          productName: "Minimalist Ceramic Vase",
          variationId: null,
          variationAttributes: {},
          quantity: 1,
          price: 49.99,
          subtotal: 49.99,
          imageUrl: "/minimalist-ceramic-vase.png",
        },
      ],
    },
  ],
  totalItems: 2,
  total: 139.98,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export async function getCart(): Promise<CartResponse> {
  return await apiClient("/cart", {
    method: "GET",
  })
}


export async function addCartItem(item: CartItemRequest): Promise<void> {
  await apiClient("/cart/items", {
    method: "POST",
    body: JSON.stringify(item),
  })
}


export async function updateCartItem(itemId: number, quantity: number): Promise<void> {
  await apiClient(`/cart/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ productId: 0, quantity }), // `productId` is required by DTO but unused in update
  })
}


export async function removeCartItem(itemId: number): Promise<void> {
  await apiClient(`/cart/items/${itemId}`, {
    method: "DELETE",
  })
}


export async function clearCart(): Promise<void> {
  await apiClient("/cart/clear", {
    method: "DELETE",
  })
}
