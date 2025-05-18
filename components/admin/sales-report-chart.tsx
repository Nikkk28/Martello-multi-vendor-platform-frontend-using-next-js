"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"

import type { DateRange } from "react-day-picker";

interface SalesReportChartProps {
  dateRange: DateRange;
}


// Sample data generator
const generateData = (from: Date, to: Date) => {
  const data = []
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
  const step = Math.max(1, Math.floor(days / 10)) // Show at most 10 data points

  for (let i = 0; i <= days; i += step) {
    const date = new Date(from.getTime() + i * (1000 * 60 * 60 * 24))
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sales: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 100) + 20,
    })
  }

  return data
}

export function SalesReportChart({ dateRange }: SalesReportChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setData(generateData(dateRange.from!, dateRange.to!))
        setIsLoading(false)
      }, 1000)
    }
  }, [dateRange])

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
