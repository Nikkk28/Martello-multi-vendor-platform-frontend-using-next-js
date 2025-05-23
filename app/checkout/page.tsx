"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function CheckoutPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect vendors to vendor dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "VENDOR") {
      router.push("/vendor/dashboard")
    }
  }, [isLoading, isAuthenticated, user, router])

  // If loading or is a vendor, show minimal content
  if (isLoading || (isAuthenticated && user?.role === "VENDOR")) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Your existing checkout page content
  return <div className="container max-w-6xl py-8">{/* Rest of your checkout page content */}</div>
}
