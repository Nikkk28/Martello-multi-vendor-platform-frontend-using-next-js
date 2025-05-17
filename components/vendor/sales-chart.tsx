"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { WeeklySalesTrend } from "@/types/vendor"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

interface SalesChartProps {
  data: WeeklySalesTrend[]
}

export function SalesChart({ data }: SalesChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate placeholder data if no data is provided
  const chartData =
    data.length > 0
      ? data
      : [
          { date: "Mon", sales: 0 },
          { date: "Tue", sales: 0 },
          { date: "Wed", sales: 0 },
          { date: "Thu", sales: 0 },
          { date: "Fri", sales: 0 },
          { date: "Sat", sales: 0 },
          { date: "Sun", sales: 0 },
        ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Sales Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {mounted ? (
          data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `₹${value}`} />
                <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, "Sales"]} />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No sales data available yet
            </div>
          )
        ) : (
          <div className="flex h-full items-center justify-center">Loading chart...</div>
        )}
      </CardContent>
    </Card>
  )
}
