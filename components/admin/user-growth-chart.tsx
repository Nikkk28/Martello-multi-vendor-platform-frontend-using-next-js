"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"
import type { DateRange } from "react-day-picker";

interface UserGrowthChartProps {
  dateRange: DateRange;
}


// Sample data generator
const generateData = (from: Date, to: Date) => {
  const data = []
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
  const step = Math.max(1, Math.floor(days / 10)) // Show at most 10 data points

  let totalUsers = 1000 // Starting point

  for (let i = 0; i <= days; i += step) {
    const date = new Date(from.getTime() + i * (1000 * 60 * 60 * 24))
    const newUsers = Math.floor(Math.random() * 50) + 10
    totalUsers += newUsers

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      newUsers,
      totalUsers,
    })
  }

  return data
}

export function UserGrowthChart({ dateRange }: UserGrowthChartProps) {
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
        <AreaChart
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
          <Area type="monotone" dataKey="totalUsers" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
