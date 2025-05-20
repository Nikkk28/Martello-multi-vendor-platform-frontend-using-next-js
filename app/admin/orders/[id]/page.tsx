"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getOrderById } from "@/lib/api/orders"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || typeof id !== "string") return

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(Number(id))
        setOrder(data)
      } catch {
        setError("Order not found.")
      }
    }

    fetchOrder()
  }, [id])

  if (!order && !error) {
    return <p className="text-center mt-10 text-muted-foreground">Loading...</p>
  }

  if (error) {
    return <p className="text-center mt-10 text-destructive">{error}</p>
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
        <p className="text-muted-foreground">
          Placed on {format(new Date(order.createdAt), "PPP")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>User ID</span>
            <span>{order.userId}</span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <Badge variant="outline">{order.status}</Badge>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Shipping Address</span>
            <span className="text-right">{order.shippingAddress || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>Billing Address</span>
            <span className="text-right">{order.billingAddress || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-medium">Items</h2>
        {order.items.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <p>{item.productName}</p>
              <p className="text-muted-foreground">
                Qty: {item.quantity} · Vendor: {item.vendorName || "N/A"}
              </p>
            </div>
            <div className="text-right">
              <p>{formatCurrency(item.subtotal)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
