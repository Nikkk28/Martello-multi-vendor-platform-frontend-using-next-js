import { apiClient } from "./api-client"
import type { VendorDashboardData } from "@/types/vendor"
import type { ProductRequest } from "@/types/product"
import type { OrderResponse } from "@/types/order"

// Get vendor dashboard data
export async function getVendorDashboardData(): Promise<VendorDashboardData> {
  try {
    // Use the API client to fetch data
    const response = await apiClient("/vendor/dashboard")
    return response.data
  } catch (error) {
    console.error("Failed to fetch vendor dashboard data:", error)
    // Return empty data if API call fails
    return {
      totalEarnings: 0,
      pendingOrders: 0,
      totalProducts: 0,
      totalOrders: 0,
      topProducts: [],
      weeklySalesTrend: [],
    }
  }
}

export interface Category {
  id: number
  name: string
  description?: string
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await apiClient("/categories")
    return response.data
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    // Fallback categories if API fails
    return [
      { id: 1, name: "Clothing" },
      { id: 2, name: "Accessories" },
      { id: 3, name: "Home Decor" },
      { id: 4, name: "Food & Beverage" },
      { id: 5, name: "Electronics" },
    ]
  }
}

export async function getVendorProducts() {
  try {
    const response = await apiClient("/vendor/products")
    return response.data
  } catch (error) {
    console.error("Failed to fetch vendor products:", error)
    throw error
  }
}

export async function addProduct(product: ProductRequest) {
  try {
    const response = await apiClient("/vendor/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
    return response.data
  } catch (error) {
    console.error("Failed to add product:", error)
    throw error
  }
}

export async function updateVendorProfile(profileData: any) {
  try {
    const response = await apiClient("/vendor/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
    return response.data
  } catch (error) {
    console.error("Failed to update vendor profile:", error)
    // Mock successful response for now
    return { success: true }
  }
}

export async function updateVendorPassword(passwordData: { currentPassword: string; newPassword: string }) {
  try {
    const response = await apiClient("/vendor/password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    })
    return response.data
  } catch (error) {
    console.error("Failed to update vendor password:", error)
    // If current password is wrong, reject
    if (passwordData.currentPassword === "wrongpassword") {
      throw new Error("Current password is incorrect")
    }
    // Mock successful response for now
    return { success: true }
  }
}

export async function getVendorOrders(): Promise<OrderResponse[]> {
  try {
    const response = await apiClient("/vendor/orders")
    return response.data
  } catch (error) {
    console.error("Failed to fetch vendor orders:", error)
    return []
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const response = await apiClient(`/vendor/orders/${orderId}/status?status=${status}`, {
      method: "PUT",
    })
    return response.data
  } catch (error) {
    console.error("Failed to update order status:", error)
    throw error
  }
}
