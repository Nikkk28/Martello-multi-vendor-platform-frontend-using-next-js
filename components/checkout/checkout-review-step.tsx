"use client"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"

// Mock data for checkout review
const shippingAddress = {
  fullName: "John Doe",
  addressLine1: "123 Main St",
  addressLine2: "Apt 4B",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "United States",
  phoneNumber: "212-555-1234",
}

const shippingMethod = {
  name: "Standard Shipping",
  price: 5.99,
  estimatedDelivery: "5-7 business days",
}

const paymentMethod = {
  type: "Credit Card",
  cardNumber: "**** **** **** 1234",
  cardholderName: "John Doe",
}

interface CheckoutReviewStepProps {
  onComplete: () => void
  onPlaceOrder: () => Promise<void>
  isSubmitting: boolean
}

export default function CheckoutReviewStep({ onComplete, onPlaceOrder, isSubmitting }: CheckoutReviewStepProps) {
  const { cart } = useCart()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-lg mb-4">Review Your Order</h2>

        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Shipping Address</h3>
              <Button variant="ghost" size="sm" className="h-8">
                Edit
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.addressLine1}</p>
              {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
              </p>
              <p>{shippingAddress.country}</p>
              <p>{shippingAddress.phoneNumber}</p>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Shipping Method</h3>
              <Button variant="ghost" size="sm" className="h-8">
                Edit
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{shippingMethod.name}</p>
              <p>Estimated delivery: {shippingMethod.estimatedDelivery}</p>
              <p>Cost: ${shippingMethod.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Payment Method</h3>
              <Button variant="ghost" size="sm" className="h-8">
                Edit
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{paymentMethod.type}</p>
              <p>{paymentMethod.cardNumber}</p>
              <p>{paymentMethod.cardholderName}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Order Items</h3>

            <div className="space-y-4">
              {cart?.vendorGroups.map((group) =>
                group.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={item.imageUrl || "/placeholder.svg?height=64&width=64&query=product"}
                        alt={item.productName}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.productName}</h4>

                      {item.variationAttributes && Object.keys(item.variationAttributes).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {Object.entries(item.variationAttributes)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-medium text-sm">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end">
          <Button onClick={onPlaceOrder} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
