export interface AdminDashboardResponse {
  totalUsers: number
  pendingApprovals: number
  dailyTransactions: number
  revenueByCategory: Record<string, number>
}

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface VendorProfile {
  id: number
  businessName: string
  businessDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  logo?: string
  status: ApprovalStatus
  rejectionReason?: string
}

export interface VendorApprovalRequest {
  status: ApprovalStatus
  reason?: string
}

export interface AdminSettings {
  globalTaxRate: number
  commissionRate: number
  payoutSchedule: "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY"
  minimumOrderAmount: number
  platformFee: number
}

export interface ReportData {
  label: string
  totalSales: number
}
