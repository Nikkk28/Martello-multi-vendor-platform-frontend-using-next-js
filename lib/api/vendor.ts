import { apiClient } from "./api-client"
import type { VendorDashboardData } from "@/types/vendor"
import type { ProductRequest } from "@/types/product"

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
  try {
    const response = await apiClient("/categories")
    return response.data || []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
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
