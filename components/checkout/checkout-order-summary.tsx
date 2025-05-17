"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

const discountSchema = z.object({
  code: z.string().min(1, "Discount code is required"),
})

type DiscountFormValues = z.infer<typeof discountSchema>

export default function CheckoutOrderSummary() {
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
  const { cart } = useCart()
  const { toast } = useToast()

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmitDiscount = async (data: DiscountFormValues) => {
    setIsApplyingDiscount(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate discount not found
      toast({
        title: "Invalid discount code",
        description: "The discount code you entered is invalid or has expired.",
        variant: "destructive",
      })
    } finally {
      setIsApplyingDiscount(false)
    }
  }

  // Calculate order summary
  const subtotal = cart?.vendorGroups.reduce((total, group) => total + group.subtotal, 0) || 0
  const shipping = 5.99 // Standard shipping
  const tax = subtotal * 0.08 // 8% tax rate
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
          )),
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitDiscount)} className="space-y-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input placeholder="Discount code" {...field} />
                  </FormControl>
                  <Button type="submit" variant="outline" disabled={isApplyingDiscount}>
                    {isApplyingDiscount ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
