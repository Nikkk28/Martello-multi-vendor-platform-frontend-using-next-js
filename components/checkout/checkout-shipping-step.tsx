"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock data for shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 5-7 business days",
    price: 5.99,
    estimatedDelivery: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 12.99,
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Delivery by tomorrow",
    price: 24.99,
    estimatedDelivery: "Next business day",
  },
]

interface CheckoutShippingStepProps {
  onComplete: () => void
}

export default function CheckoutShippingStep({ onComplete }: CheckoutShippingStepProps) {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>(shippingMethods[0].id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleContinue = async () => {
    if (!selectedShippingMethod) {
      toast({
        title: "No shipping method selected",
        description: "Please select a shipping method to continue",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSubmitting(false)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-lg mb-4">Shipping Method</h2>

        <RadioGroup value={selectedShippingMethod} onValueChange={setSelectedShippingMethod} className="space-y-4">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 transition-colors ${
                selectedShippingMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start">
                <RadioGroupItem value={method.id} id={`shipping-${method.id}`} className="mt-1" />
                <div className="ml-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <label htmlFor={`shipping-${method.id}`} className="font-medium cursor-pointer">
                      {method.name}
                    </label>
                    <span className="font-medium">${method.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                  <p className="text-sm text-muted-foreground">Estimated delivery: {method.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <Separator className="my-6" />

        <div className="flex justify-end">
          <Button onClick={handleContinue} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
