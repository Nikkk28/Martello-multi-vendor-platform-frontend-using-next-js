"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, DollarSign, ShoppingBag, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminDashboardCard } from "@/components/admin/admin-dashboard-card"
import { SalesChart } from "@/components/admin/admin-sales-chart"
import { RecentUsersTable } from "@/components/admin/recent-users-table"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminDashboardCard
          title="Total Revenue"
          value="₹1,245,600"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          isLoading={isLoading}
        />
        <AdminDashboardCard
          title="Total Users"
          value="2,350"
          description="+180 new users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          isLoading={isLoading}
        />
        <AdminDashboardCard
          title="Active Vendors"
          value="48"
          description="+12 pending approval"
          icon={<ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          isLoading={isLoading}
        />
        <AdminDashboardCard
          title="Total Orders"
          value="12,234"
          description="+573 this week"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>View your platform-wide sales data for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart isLoading={isLoading} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>New users who joined in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUsersTable isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
