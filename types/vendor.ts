export interface VendorDashboardData {
  totalEarnings: number
  pendingOrders: number
  topProducts: TopProduct[]
  weeklySalesTrend: WeeklySalesTrend[]
}

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
