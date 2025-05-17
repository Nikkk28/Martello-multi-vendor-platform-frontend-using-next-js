"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, CreditCard, MapPin, Package, ShoppingBag, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CheckoutAddressStep from "@/components/checkout/checkout-address-step"
import CheckoutShippingStep from "@/components/checkout/checkout-shipping-step"
import CheckoutPaymentStep from "@/components/checkout/checkout-payment-step"
import CheckoutReviewStep from "@/components/checkout/checkout-review-step"
import CheckoutOrderSummary from "@/components/checkout/checkout-order-summary"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

const CHECKOUT_STEPS = ["address", "shipping", "payment", "review"] as const
type CheckoutStep = (typeof CHECKOUT_STEPS)[number]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<CheckoutStep>>(new Set())
  const router = useRouter()
  const { cart, isLoading: isCartLoading, clearCart } = useCart()
  const { toast } = useToast()

  // Redirect if cart is empty
  useEffect(() => {
    if (!isCartLoading && (!cart || cart.totalItems === 0)) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      })
      router.push("/products")
    }
  }, [cart, isCartLoading, router, toast])

  const handleStepComplete = (step: CheckoutStep) => {
    const newCompletedSteps = new Set(completedSteps)
    newCompletedSteps.add(step)
    setCompletedSteps(newCompletedSteps)

    // Move to next step
    const currentIndex = CHECKOUT_STEPS.indexOf(step)
    if (currentIndex < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(CHECKOUT_STEPS[currentIndex + 1])
    }
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear cart and redirect to success page
      await clearCart()
      router.push("/checkout/success?orderId=123456")
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCartLoading) {
    return (
      <div className="container max-w-6xl py-12">
        <div className="flex justify-center">
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="font-heading text-3xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={currentStep} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-8">
              <TabsTrigger
                value="address"
                onClick={() => completedSteps.has("address") && setCurrentStep("address")}
                className="flex flex-col items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-auto py-4 transition-all duration-300"
                disabled={!completedSteps.has("address") && currentStep !== "address"}
              >
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completedSteps.has("address")
                        ? "bg-primary text-primary-foreground"
                        : currentStep === "address"
                          ? "border-2 border-primary"
                          : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completedSteps.has("address") ? <Check className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  </div>
                </div>
                <span className="text-xs sm:text-sm">Address</span>
              </TabsTrigger>

              <TabsTrigger
                value="shipping"
                onClick={() => completedSteps.has("shipping") && setCurrentStep("shipping")}
                className="flex flex-col items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-auto py-4 transition-all duration-300"
                disabled={!completedSteps.has("shipping") && currentStep !== "shipping"}
              >
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completedSteps.has("shipping")
                        ? "bg-primary text-primary-foreground"
                        : currentStep === "shipping"
                          ? "border-2 border-primary"
                          : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completedSteps.has("shipping") ? <Check className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  </div>
                </div>
                <span className="text-xs sm:text-sm">Shipping</span>
              </TabsTrigger>

              <TabsTrigger
                value="payment"
                onClick={() => completedSteps.has("payment") && setCurrentStep("payment")}
                className="flex flex-col items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-auto py-4 transition-all duration-300"
                disabled={!completedSteps.has("payment") && currentStep !== "payment"}
              >
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completedSteps.has("payment")
                        ? "bg-primary text-primary-foreground"
                        : currentStep === "payment"
                          ? "border-2 border-primary"
                          : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completedSteps.has("payment") ? <Check className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                  </div>
                </div>
                <span className="text-xs sm:text-sm">Payment</span>
              </TabsTrigger>

              <TabsTrigger
                value="review"
                onClick={() => completedSteps.has("review") && setCurrentStep("review")}
                className="flex flex-col items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-auto py-4 transition-all duration-300"
                disabled={!completedSteps.has("payment") && currentStep !== "review"}
              >
                <div className="relative">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      completedSteps.has("review")
                        ? "bg-primary text-primary-foreground"
                        : currentStep === "review"
                          ? "border-2 border-primary"
                          : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completedSteps.has("review") ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  </div>
                </div>
                <span className="text-xs sm:text-sm">Review</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="address">
              <CheckoutAddressStep onComplete={() => handleStepComplete("address")} />
            </TabsContent>

            <TabsContent value="shipping">
              <CheckoutShippingStep onComplete={() => handleStepComplete("shipping")} />
            </TabsContent>

            <TabsContent value="payment">
              <CheckoutPaymentStep onComplete={() => handleStepComplete("payment")} />
            </TabsContent>

            <TabsContent value="review">
              <CheckoutReviewStep
                onComplete={() => handleStepComplete("review")}
                onPlaceOrder={handlePlaceOrder}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
            <h2 className="font-medium text-lg mb-4">Order Summary</h2>
            <CheckoutOrderSummary />

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">{cart ? `$${cart.total.toFixed(2)}` : "$0.00"}</span>
              </div>

              <Button
                className="w-full premium-button"
                disabled={currentStep !== "review" || isSubmitting}
                onClick={handlePlaceOrder}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
