import { apiClient } from "./api-client"
import type { VendorDashboardData } from "@/types/vendor"
import type { ProductRequest } from "@/types/product"
import type { OrderResponse } from "@/types/order"

// Mock data for development
const mockDashboardData: VendorDashboardData = {
  totalEarnings: 0,
  pendingOrders: 0,
  topProducts: [],
  weeklySalesTrend: [],
}

export async function getVendorDashboardData(): Promise<VendorDashboardData> {
  try {
    // Use the API client to fetch data
    const response = await apiClient("/vendor/dashboard")
    return response.data
  } catch (error) {
    console.error("Failed to fetch vendor dashboard data:", error)
    // Return mock data if API call fails
    return mockDashboardData
  }
}

export interface Category {
  id: number
  name: string
  description?: string
}

export async function getCategories(): Promise<Category[]> {
  // In a real app, this would fetch categories from the API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Clothing" },
        { id: 2, name: "Accessories" },
        { id: 3, name: "Home Decor" },
        { id: 4, name: "Food & Beverage" },
        { id: 5, name: "Electronics" },
      ])
    }, 500)
  })
}

export async function addProduct(product: ProductRequest): Promise<any> {
  try {
    const response = await apiClient("/vendor/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
    return response
  } catch (error) {
    console.error("Failed to add product:", error)
    throw error
  }
}

export async function updateVendorProfile(profileData: any) {
  // In a real app, this would make an API call to update the vendor profile
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Updating vendor profile:", profileData)
      resolve({ success: true })
    }, 1000)
  })
}

export async function updateVendorPassword(passwordData: { currentPassword: string; newPassword: string }) {
  // In a real app, this would make an API call to update the vendor password
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (passwordData.currentPassword === "wrongpassword") {
        reject(new Error("Current password is incorrect"))
      } else {
        console.log("Updating vendor password")
        resolve({ success: true })
      }
    }, 1000)
  })
}
export async function getVendorOrders(): Promise<OrderResponse[]> {
  try {
    const response = await apiClient("/vendor/orders", {
      method: "GET",
    })
    return response
  } catch (error) {
    console.error("Failed to fetch vendor orders:", error)
    return []
  }
}
export async function markOrderAsShipped(orderId: number): Promise<void> {
  try {
    await apiClient(`/vendor/orders/${orderId}/ship`, {
      method: "PATCH",
    })
  } catch (error) {
    console.error("Failed to mark order as shipped:", error)
    throw error
  }
}

