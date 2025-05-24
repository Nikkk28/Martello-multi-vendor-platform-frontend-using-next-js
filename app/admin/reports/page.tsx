"use client"

import { useState, useEffect } from "react"
import { FileDown } from "lucide-react"
import { format, subDays } from "date-fns"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { getRevenueByCategory, getRevenueByVendor, type ReportData } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"
import type { DateRange } from "react-day-picker"

// Function to export data as CSV
const exportToCSV = (data: ReportData[], filename: string) => {
  // Convert data to CSV format
  const headers = "Label,TotalSales\n"
  const csvData = data.map((item) => `${item.label},${item.totalSales}`).join("\n")
  const csvContent = headers + csvData

  // Create a blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export default function AdminReportsPage() {
  const { toast } = useToast()
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [categoryData, setCategoryData] = useState<ReportData[]>([])
  const [vendorData, setVendorData] = useState<ReportData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true)
      try {
        // Format dates for API
        const startDate = dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined
        const endDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined

        // Fetch data
        const [categoryResults, vendorResults] = await Promise.all([
          getRevenueByCategory(startDate, endDate),
          getRevenueByVendor(startDate, endDate),
        ])

        setCategoryData(categoryResults)
        setVendorData(vendorResults)
      } catch (error) {
        console.error("Failed to fetch report data:", error)
        toast({
          title: "Error",
          description: "Failed to load report data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [dateRange, toast])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>

      <Tabs defaultValue="category">
        <TabsList>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="vendor">By Vendor</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>
                  Sales distribution across product categories
                  {dateRange.from && dateRange.to && (
                    <span>
                      {" "}
                      from {format(dateRange.from, "MMM d, yyyy")} to {format(dateRange.to, "MMM d, yyyy")}
                    </span>
                  )}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(categoryData, "revenue_by_category")}
                disabled={isLoading || categoryData.length === 0}
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] w-full animate-pulse bg-muted rounded-md" />
              ) : categoryData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                          labelFormatter={(label) => `Category: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="totalSales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="totalSales"
                          nameKey="label"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                          labelFormatter={(label) => `Category: ${label}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center">
                  <p className="text-muted-foreground">No data available for the selected date range</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue by Vendor</CardTitle>
                <CardDescription>
                  Sales distribution across vendors
                  {dateRange.from && dateRange.to && (
                    <span>
                      {" "}
                      from {format(dateRange.from, "MMM d, yyyy")} to {format(dateRange.to, "MMM d, yyyy")}
                    </span>
                  )}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(vendorData, "revenue_by_vendor")}
                disabled={isLoading || vendorData.length === 0}
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] w-full animate-pulse bg-muted rounded-md" />
              ) : vendorData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={vendorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                          labelFormatter={(label) => `Vendor: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="totalSales" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={vendorData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="totalSales"
                          nameKey="label"
                        >
                          {vendorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                          labelFormatter={(label) => `Vendor: ${label}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="flex h-[400px] items-center justify-center">
                  <p className="text-muted-foreground">No data available for the selected date range</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
