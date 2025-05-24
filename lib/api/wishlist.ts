import { apiClient } from "./api-client"
import type { ProductResponse } from "@/types/product"

export interface WishlistItem {
  id: number
  product: ProductResponse
  addedAt: string
}

export interface WishlistResponse {
  id: number
  name: string
  userId: number
  items: WishlistItem[]
  createdAt: string
  updatedAt: string
}

export interface WishlistRequest {
  name: string
}

// Get all wishlists for the current user
export const getUserWishlists = async (): Promise<WishlistResponse[]> => {
  try {
    const response = await apiClient("/wishlists")
    return response.data
  } catch (error) {
    console.error("Error fetching wishlists:", error)
    throw error
  }
}

// Create a new wishlist
export const createWishlist = async (request: WishlistRequest): Promise<WishlistResponse> => {
  try {
    const response = await apiClient("/wishlists", {
      method: "POST",
      body: JSON.stringify(request),
    })
    return response.data
  } catch (error) {
    console.error("Error creating wishlist:", error)
    throw error
  }
}

// Add a product to a wishlist
export const addProductToWishlist = async (wishlistId: number, productId: number): Promise<WishlistResponse> => {
  try {
    const response = await apiClient(`/wishlists/${wishlistId}/products/${productId}`, {
      method: "POST",
    })
    return response.data
  } catch (error) {
    console.error("Error adding product to wishlist:", error)
    throw error
  }
}

// Remove a product from a wishlist
export const removeProductFromWishlist = async (wishlistId: number, productId: number): Promise<WishlistResponse> => {
  try {
    const response = await apiClient(`/wishlists/${wishlistId}/products/${productId}`, {
      method: "DELETE",
    })
    return response.data
  } catch (error) {
    console.error("Error removing product from wishlist:", error)
    throw error
  }
}
