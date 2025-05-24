"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import WishlistItemCard from "@/components/wishlist/wishlist-item"
import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "@/hooks/use-auth"

export default function WishlistPage() {
  const { wishlists, isLoading } = useWishlist()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("/auth/login?redirect=/wishlist")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <WishlistSkeleton />
  }

  const defaultWishlist = wishlists[0]
  const hasItems = defaultWishlist && defaultWishlist.items.length > 0

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading">My Wishlist</h1>
        {hasItems && (
          <Button variant="outline" className="rounded-full premium-button" onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        )}
      </div>

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          <Button className="rounded-full premium-button" onClick={() => router.push("/products")}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {defaultWishlist.items.map((item) => (
            <WishlistItemCard key={item.id} item={item} wishlistId={defaultWishlist.id} />
          ))}
        </div>
      )}
    </main>
  )
}

function WishlistSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border rounded-2xl">
              <Skeleton className="w-full md:w-40 h-40 rounded-xl" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-6 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-full" />
                    <Skeleton className="h-9 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
