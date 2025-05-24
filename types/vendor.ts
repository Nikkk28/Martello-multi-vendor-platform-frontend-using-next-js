export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface VendorDashboardData {
  totalEarnings: number
  pendingOrders: number
  topProducts: any[]
  weeklySalesTrend: number[]
  status: ApprovalStatus
}


export type VendorStatus = "ACTIVE" | "PENDING" | "REJECTED"

export interface TopProduct {
  id: number
  name: string
  price: number
  quantity: number
  totalSales: number
}

export interface WeeklySalesTrend {
  date: string
  sales: number
}

export interface VendorProfile {
  id: number
  businessName: string
  businessDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  logo?: string
  status: VendorStatus
  rejectionReason?: string
}

export interface VendorProfileUpdateRequest {
  businessName: string
  businessDescription: string
  contactEmail: string
  contactPhone: string
  address: string
}
