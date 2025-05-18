import type React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminDashboardCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  isLoading?: boolean
}

export function AdminDashboardCard({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  isLoading = false,
}: AdminDashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-7 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {trend === "up" && <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />}
              {trend === "down" && <ArrowDown className="mr-1 h-3 w-3 text-red-500" />}
              {description}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
