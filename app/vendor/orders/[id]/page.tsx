"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Loader2, TruckIcon, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { updateOrderStatus } from "@/lib/api/vendor"
import { formatCurrency } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock order data - replace with actual API call
const mockOrderDetail = {
  id: 1,
  createdAt: new Date().toISOString(),
  status: "PENDING",
  total: 249.97,
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  shippingAddress: {
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
  },
  items: [
    {
      id: 1,
      productId: 101,
      productName: "Premium Leather Wallet",
      quantity: 1,
      price: 79.99,
      total: 79.99,
    },
    {
      id: 2,
      productId: 102,
      productName: "Handcrafted Ceramic Vase",
      quantity: 1,
      price: 129.99,
      total: 129.99,
    },
    {
      id: 3,
      productId: 103,
      productName: "Artisan Coffee Mug",
      quantity: 1,
      price: 39.99,
      total: 39.99,
    },
  ],
}

export default function VendorOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")

  const orderId = params.id as string

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true)
        // In a real implementation, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setOrder(mockOrderDetail)
        setSelectedStatus(mockOrderDetail.status)
      } catch (error) {
        console.error("Failed to fetch order details:", error)
        toast({
          title: "Error",
          description: "Failed to load order details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetail()
  }, [orderId, toast])

  const handleUpdateStatus = async () => {
    if (!selectedStatus || selectedStatus === order.status) return

    try {
      setUpdatingStatus(true)
      await updateOrderStatus(Number.parseInt(orderId), selectedStatus)

      // Update local state
      setOrder({ ...order, status: selectedStatus })

      toast({
        title: "Order updated",
        description: `Order #${orderId} has been marked as ${selectedStatus.toLowerCase()}.`,
      })
    } catch (error) {
      console.error("Failed to update order status:", error)
      toast({
        title: "Update failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
      // Reset selected status on failure
      setSelectedStatus(order.status)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "outline"
      case "PROCESSING":
        return "secondary"
      case "SHIPPED":
        return "default"
      case "DELIVERED":
        return "default" // Changed from "success" to "default" to match allowed variants
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>

        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>

        <Skeleton className="h-[400px] w-full mt-8" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>

        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold">Order not found</p>
            <p className="mt-2 text-muted-foreground">
              The order you're looking for doesn't exist or you don't have permission to view it.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">Placed on {format(new Date(order.createdAt), "PPP")}</p>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm px-3 py-1">
            {order.status}
          </Badge>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogDescription>Change the status of Order #{order.id}</DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button onClick={handleUpdateStatus} disabled={updatingStatus || selectedStatus === order.status}>
                  {updatingStatus ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {order.status === "PENDING" && (
            <Button
              onClick={() => {
                setSelectedStatus("SHIPPED")
                handleUpdateStatus()
              }}
              disabled={updatingStatus}
            >
              {updatingStatus ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TruckIcon className="mr-2 h-4 w-4" />
              )}
              Mark as Shipped
            </Button>
          )}

          {order.status === "SHIPPED" && (
            <Button
              onClick={() => {
                setSelectedStatus("DELIVERED")
                handleUpdateStatus()
              }}
              disabled={updatingStatus}
            >
              {updatingStatus ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Mark as Delivered
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-muted-foreground">{order.customerEmail}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {order.items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-muted-foreground">SKU: {item.productId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
