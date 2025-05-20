"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { placeOrder } from "@/lib/api/orders"
import { getAddresses, AddressResponse } from "@/lib/api/addresses"

const discountSchema = z.object({ code: z.string().min(1, "Discount code is required") })

type DiscountFormValues = z.infer<typeof discountSchema>

export default function CheckoutOrderSummary() {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [addresses, setAddresses] = useState<AddressResponse[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)

  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: { code: "" },
  })

  useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const data = await getAddresses()
      setAddresses(data)

      const defaultAddress = data.find((a) => a.isDefault)
      setSelectedAddressId(defaultAddress?.id ?? data[0]?.id ?? null)
    } catch {
      toast({ title: "Failed to load addresses", variant: "destructive" })
    }
  }

  fetchAddresses()
}, [toast])


  const handlePlaceOrder = async () => {
    if (!cart || cart.totalItems === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      })
      return
    }

    const selected = addresses.find((a) => a.id === selectedAddressId)
    if (!selected) {
      toast({ title: "No address selected", variant: "destructive" })
      return
    }

    setIsPlacingOrder(true)
    try {
      const orderData = {
        items: cart.vendorGroups.flatMap((group) =>
          group.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
        ),
        shippingAddress: `${selected.street}, ${selected.city}, ${selected.state}, ${selected.postalCode}, ${selected.country}`,
        billingAddress: `${selected.street}, ${selected.city}, ${selected.state}, ${selected.postalCode}, ${selected.country}`,
      }

      const order = await placeOrder(orderData)
      clearCart()
      toast({ title: "Order placed successfully", description: `Order #${order.id}` })
      router.push("/orders")
    } catch (error: any) {
      toast({ title: "Failed to place order", description: error.message, variant: "destructive" })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const subtotal = cart?.vendorGroups.reduce((total, group) => total + group.subtotal, 0) || 0
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {cart?.vendorGroups.map((group) =>
          group.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="flex-1">
                {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
              </span>
              <span>{formatCurrency(item.subtotal)}</span>
            </div>
          ))
        )}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <Separator />

      <div>
        <label className="block text-sm font-medium mb-1">Select Address</label>
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground">You have no saved addresses.</p>
        ) : (
          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={selectedAddressId ?? ""}
            onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
          >
            {addresses.map((a) => (
              <option key={a.id} value={a.id}>
                {a.street}, {a.city}, {a.state}, {a.postalCode}
              </option>
            ))}
          </select>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || !cart || cart.totalItems === 0 || !selectedAddressId}
      >
        {isPlacingOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : "Place Order"}
      </Button>
    </div>
  )
}
