"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Skeleton } from "@/components/ui/skeleton"

interface SalesChartProps {
  isLoading?: boolean
}

// Sample data
const generateData = () => {
  return [
    { name: "Jan 1", sales: 4000 },
    { name: "Jan 5", sales: 3000 },
    { name: "Jan 10", sales: 2000 },
    { name: "Jan 15", sales: 2780 },
    { name: "Jan 20", sales: 1890 },
    { name: "Jan 25", sales: 2390 },
    { name: "Jan 30", sales: 3490 },
  ]
}

export function SalesChart({ isLoading = false }: SalesChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (!isLoading) {
      setData(generateData())
    }
  }, [isLoading])

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
