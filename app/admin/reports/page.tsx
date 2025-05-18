"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesReportChart } from "@/components/admin/sales-report-chart"
import { UserGrowthChart } from "@/components/admin/user-growth-chart"
import { VendorPerformanceTable } from "@/components/admin/vendor-performance-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import type { DateRange } from "react-day-picker" 

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({ 
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Platform-wide sales data for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesReportChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <UserGrowthChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vendors" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance</CardTitle>
              <CardDescription>Top performing vendors for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <VendorPerformanceTable dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
