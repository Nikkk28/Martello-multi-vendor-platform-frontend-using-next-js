"use client"

import { useEffect, useState } from "react"
import { getVendorDashboardData } from "@/lib/api/vendor"
import { DashboardCard } from "@/components/vendor/dashboard-card"
import { TopProductsTable } from "@/components/vendor/top-products-table"
import { SalesChart } from "@/components/vendor/sales-chart"
import { AddProductDrawer } from "@/components/vendor/add-product-drawer"
import { VendorStatusBanner } from "@/components/vendor/vendor-status-banner"
import { Toaster } from "@/components/ui/toaster"
import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { IndianRupee, Package } from "lucide-react"
import type { VendorDashboardData } from "@/types/vendor"

export default function VendorDashboardPage() {
  const [dashboardData, setDashboardData] = useState<VendorDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in or not a vendor
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    if (user?.role !== "VENDOR") {
      router.push("/")
      return
    }

    // Fetch vendor dashboard data
    async function fetchData() {
      try {
        const data = await getVendorDashboardData()
        setDashboardData(data)
      } catch (err) {
        console.error("Failed to load vendor dashboard:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, user, router])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold">Failed to load dashboard data</p>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <AddProductDrawer />
        </div>
      </div>

      {/* Vendor Status Banner */}
      {user?.vendorProfile?.status && (
        <VendorStatusBanner status={user.vendorProfile.status} rejectionReason={user.vendorProfile.rejectionReason} />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardCard
          title="Total Earnings"
          value={formatCurrency(dashboardData.totalEarnings)}
          icon={<IndianRupee className="h-4 w-4" />}
          className="transition-transform hover:scale-[1.02]"
        />
        <DashboardCard
          title="Pending Orders"
          value={dashboardData.pendingOrders}
          icon={<Package className="h-4 w-4" />}
          className="transition-transform hover:scale-[1.02]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TopProductsTable products={dashboardData.topProducts} />
        <SalesChart data={dashboardData.weeklySalesTrend} />
      </div>

      <Toaster />
    </div>
  )
}
