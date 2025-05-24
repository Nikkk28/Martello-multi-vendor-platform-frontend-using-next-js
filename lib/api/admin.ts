import { apiClient } from "./api-client"
import type { VendorProfile } from "@/types/vendor"
import type { OrderResponse } from "@/types/order"

export interface AdminDashboardResponse {
  totalUsers: number
  pendingApprovals: number
  dailyTransactions: number
  revenueByCategory: Record<string, number>
}

export interface VendorApprovalRequest {
  status: "APPROVED" | "REJECTED"
  reason?: string
}

export interface ReportData {
  label: string
  totalSales: number
}

export interface AdminSettings {
  globalTaxRate: number
  commissionRate: number
  payoutSchedule: "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY"
  minimumOrderAmount: number
  platformFee: number
}

// Admin Dashboard
export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await apiClient("/admin/dashboard")
  return response.data
}

// Vendor Approval
export async function getPendingVendors(): Promise<VendorProfile[]> {
  const response = await apiClient("/admin/vendors/pending")
  return response.data
}

export async function updateVendorApprovalStatus(
  vendorId: number | string,
  request: VendorApprovalRequest
): Promise<VendorProfile> {
  const response = await apiClient(`/admin/vendors/${vendorId}/approval`, {
    method: "PUT",
    body: JSON.stringify(request),
  })
  return response.data.data
}

// Orders
export async function getAdminOrders(): Promise<OrderResponse[]> {
  const response = await apiClient("/admin/orders")
  return response.data
}

export async function getAdminOrderById(orderId: string): Promise<OrderResponse> {
  const response = await apiClient(`/admin/orders/${orderId}`)
  return response.data.data
}

export async function updateAdminOrderStatus(orderId: string, status: string): Promise<OrderResponse> {
  const response = await apiClient(`/admin/orders/${orderId}/status?status=${status}`, {
    method: "PUT",
  })
  return response.data
}

// Reports
export async function getRevenueByCategory(startDate?: string, endDate?: string): Promise<ReportData[]> {
  const response = await apiClient(`/admin/reports/category?start=${startDate}&end=${endDate}`)
  return response.data
}

export async function getRevenueByVendor(startDate?: string, endDate?: string): Promise<ReportData[]> {
  const response = await apiClient(`/admin/reports/vendor?start=${startDate}&end=${endDate}`)
  return response.data
}

// Admin Settings
export async function getAdminSettings(): Promise<AdminSettings> {
  const response = await apiClient("/admin/settings")
  return response.data
}

export async function updateAdminSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  const response = await apiClient("/admin/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  })
  return response.data
}
