"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function ProductsPage() {
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

  // Your existing products page content
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {/* Rest of your products page content */}
    </div>
  )
}
