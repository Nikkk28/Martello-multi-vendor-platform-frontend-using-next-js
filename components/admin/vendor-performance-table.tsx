"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import type { DateRange } from "react-day-picker";

interface VendorPerformanceTableProps {
  dateRange: DateRange;
}


// Sample data
const vendors = [
  {
    id: "1",
    name: "Artisan Crafts",
    sales: 124500,
    orders: 245,
    products: 67,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Eco Essentials",
    sales: 98700,
    orders: 187,
    products: 42,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Handmade Haven",
    sales: 87300,
    orders: 156,
    products: 38,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Organic Outfitters",
    sales: 76200,
    orders: 134,
    products: 29,
    rating: 4.7,
  },
  {
    id: "5",
    name: "Sustainable Style",
    sales: 65800,
    orders: 112,
    products: 24,
    rating: 4.5,
  },
]

export function VendorPerformanceTable({ dateRange }: VendorPerformanceTableProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [dateRange])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendor</TableHead>
          <TableHead className="text-right">Sales</TableHead>
          <TableHead className="text-right">Orders</TableHead>
          <TableHead className="text-right">Products</TableHead>
          <TableHead className="text-right">Rating</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell className="font-medium">{vendor.name}</TableCell>
            <TableCell className="text-right">{formatCurrency(vendor.sales)}</TableCell>
            <TableCell className="text-right">{vendor.orders}</TableCell>
            <TableCell className="text-right">{vendor.products}</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline">{vendor.rating}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
