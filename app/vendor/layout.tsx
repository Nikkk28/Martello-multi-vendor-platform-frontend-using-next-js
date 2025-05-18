"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { VendorNavbar } from "@/components/vendor/vendor-navbar"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // If auth is loaded and user is not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access the vendor dashboard",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    // If auth is loaded, user is authenticated, but not a vendor, redirect to home
    if (!isLoading && isAuthenticated && user?.role !== "VENDOR") {
      toast({
        title: "Access denied",
        description: "You don't have permission to access the vendor dashboard",
        variant: "destructive",
      })
      router.push("/")
      return
    }
  }, [isLoading, isAuthenticated, user, router, toast])

  // Show loading state while checking auth
  if (isLoading || !isAuthenticated || user?.role !== "VENDOR") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading vendor dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <VendorNavbar />
      <main className="flex-1 bg-muted/10">{children}</main>
    </div>
  )
}
