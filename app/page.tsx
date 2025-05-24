"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import VendorSpotlight from "@/components/home/vendor-spotlight"
import CategoryNavigation from "@/components/home/category-navigation"
import Newsletter from "@/components/home/newsletter"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === "VENDOR") {
      router.push("/vendor/dashboard")
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || (isAuthenticated && user?.role === "VENDOR")) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-12 rounded-full" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-muted/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/abstract-geometric-pattern.png"
            alt="Martello Marketplace"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl animate-fade-in">
              Curated excellence for discerning tastes
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-fade-in-delay-1">
              Discover a thoughtfully curated collection of premium products from exceptional vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <Button asChild size="lg" className="rounded-full premium-button">
                <Link href="/products">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full premium-button">
                <Link href="/vendors">Meet Our Vendors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl mb-8 animate-fade-in">Browse Categories</h2>
          <CategoryNavigation />
        </div>
      </section>

      {/* Featured Products (Hardcoded) */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl animate-fade-in">Featured Collection</h2>
            <Button variant="ghost" asChild className="group">
              <Link href="/products" className="flex items-center gap-2">
                View All
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: "Wireless Headphones",
                price: 1999,
                image: "https://via.placeholder.com/400x300?text=Headphones",
              },
              {
                id: 2,
                name: "Smartwatch Pro",
                price: 19999,
                image: "https://via.placeholder.com/400x300?text=Smartwatch",
              },
              {
                id: 3,
                name: "Leather Backpack",
                price: 24999,
                image: "https://via.placeholder.com/400x300?text=Backpack",
              },
              {
                id: 4,
                name: "Fitness Tracker",
                price: 9900,
                image: "https://via.placeholder.com/400x300?text=Fitness+Tracker",
              },
            ].map((product) => (
              <div key={product.id} className="transition-transform hover:scale-[1.02]">
                <div className="rounded-lg overflow-hidden shadow bg-background">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-primary font-bold text-base">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Spotlight */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl mb-8 animate-fade-in">Vendor Spotlight</h2>
          <Suspense fallback={<VendorSpotlightSkeleton />}>
            <VendorSpotlight />
          </Suspense>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>
    </main>
  )
}

function VendorSpotlightSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
    </div>
  )
}
