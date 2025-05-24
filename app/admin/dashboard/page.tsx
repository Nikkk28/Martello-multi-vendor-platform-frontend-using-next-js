"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, DollarSign, ShoppingBag, Users } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminDashboardCard } from "@/components/admin/admin-dashboard-card"
import { getAdminDashboard, type AdminDashboardResponse } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<AdminDashboardResponse | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getAdminDashboard()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  // Transform revenue data for the chart
  const revenueChartData = Object.entries(dashboardData?.revenueByCategory ?? {}).map(
  ([category, amount]) => ({
    category,
    amount,
  })
)


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <AdminDashboardCard
    title="Total Users"
    value={(dashboardData?.totalUsers ?? 0).toLocaleString()}
    description="Platform users"
    icon={<Users className="h-4 w-4 text-muted-foreground" />}
    trend="neutral"
    isLoading={isLoading}
  />
  <AdminDashboardCard
    title="Pending Approvals"
    value={(dashboardData?.pendingApprovals ?? 0).toLocaleString()}
    description="Vendors awaiting approval"
    icon={<ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
    trend={(dashboardData?.pendingApprovals ?? 0) > 0 ? "up" : "neutral"}
    isLoading={isLoading}
  />
  <AdminDashboardCard
    title="Daily Transactions"
    value={(dashboardData?.dailyTransactions ?? 0).toLocaleString()}
    description="Orders processed today"
    icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
    trend="neutral"
    isLoading={isLoading}
  />
  <AdminDashboardCard
    title="Total Revenue"
    value={
      dashboardData
        ? `₹${Object.values(dashboardData.revenueByCategory ?? {})
            .reduce((sum, val) => sum + val, 0)
            .toLocaleString()}`
        : "₹0"
    }
    description="Platform-wide revenue"
    icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
    trend="up"
    isLoading={isLoading}
  />
</div>



      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Distribution of revenue across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] w-full animate-pulse bg-muted rounded-md" />
            ) : revenueChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueChartData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                    labelFormatter={(label) => `Category: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-muted-foreground">No revenue data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Vendor Approvals</CardTitle>
            <CardDescription>Vendors waiting for account approval</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-1 flex-1">
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : dashboardData && dashboardData.pendingApprovals > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You have {dashboardData.pendingApprovals} vendor{dashboardData.pendingApprovals !== 1 ? "s" : ""}{" "}
                  waiting for approval.
                </p>
                <div className="flex justify-end">
                  <a href="/admin/vendors/pending" className="text-sm font-medium text-primary hover:underline">
                    View all pending vendors
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No pending vendor approvals</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
