"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { getOrderById } from "@/lib/api/orders"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { markOrderAsShipped } from "@/lib/api/vendor"

export default function OrderDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!id || typeof id !== "string") return

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(parseInt(id))
        if (!user) return

        // Allow if user is owner or admin/vendor
        const isOwner = user.id === data.userId
        const isPrivileged = ["ADMIN", "VENDOR"].includes(user.role)

        if (!isOwner && !isPrivileged) {
          setError("You are not authorized to view this order.")
          return
        }

        setOrder(data)
      } catch {
        setError("Order not found.")
      }
    }

    fetchOrder()
  }, [id, user])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  if (loading || !user || (!order && !error)) {
    return <p className="text-center mt-10 text-muted-foreground">Loading...</p>
  }

  if (error) {
    return <p className="text-center mt-10 text-destructive">{error}</p>
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
        <p className="text-muted-foreground">
          Placed on {format(new Date(order.createdAt), "PPP")}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Status</span>
          <Badge variant="outline">{order.status}</Badge>
          {order.status === "PENDING" && (
            
  <Button
    size="sm"
    
    onClick={async () => {
        
      try {
        
        await markOrderAsShipped(order.id)
        toast({
          title: "Order marked as shipped",
          description: `Order #${order.id} is now marked as shipped.`,
        })
        router.refresh() // Refresh page content
      } catch (error: any) {
        toast({
          title: "Failed to update order",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        })
      }
    }}
  >
    Mark as Shipped
  </Button>
)}

        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Address</span>
          <span className="text-right">{order.shippingAddress || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Billing Address</span>
          <span className="text-right">{order.billingAddress || "N/A"}</span>
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-medium">Items</h2>
        {order.items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div>
              <p>{item.productName}</p>
              <p className="text-muted-foreground">Qty: {item.quantity}</p>
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
