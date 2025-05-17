import Link from "next/link"
import { CheckCircle, Package, Clock, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const orderId = searchParams.orderId || "123456"

  return (
    <div className="container max-w-3xl py-12">
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="font-heading text-3xl mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-background rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Package className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Order Number</h3>
              <p className="text-muted-foreground">{orderId}</p>
            </div>

            <div className="flex flex-col items-center">
              <Calendar className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Order Date</h3>
              <p className="text-muted-foreground">{new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="font-medium">Estimated Delivery</h3>
              <p className="text-muted-foreground">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <p className="mb-2">
          We&apos;ve sent a confirmation email to your registered email address with all the order details.
        </p>
        <p className="text-muted-foreground mb-8">
          You can also view your order details and track shipping status in your account.
        </p>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/account/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
