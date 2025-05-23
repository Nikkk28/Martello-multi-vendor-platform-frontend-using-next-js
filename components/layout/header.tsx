"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import CartDrawer from "@/components/cart/cart-drawer"
import { useAuth } from "@/hooks/use-auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { LogoutButton } from "@/components/auth/logout-button"

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Vendors", href: "/vendors" },
  { label: "About", href: "/about" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { user, isAuthenticated } = useAuth()

  // Check if user is a vendor or admin
  const isVendor = isAuthenticated && user?.role === "VENDOR"
  const isAdmin = isAuthenticated && user?.role === "ADMIN"

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Don't render the customer header for vendor or admin users in their respective sections
  if ((isVendor && pathname.startsWith("/vendor")) || (isAdmin && pathname.startsWith("/admin"))) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Only show customer navigation items if not a vendor or admin */}
                  {!isVendor &&
                    !isAdmin &&
                    mainNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          pathname === item.href ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}

                  {/* Show vendor dashboard link if user is a vendor */}
                  {isVendor && (
                    <Link href="/vendor/dashboard" className="text-lg font-medium transition-colors hover:text-primary">
                      Vendor Dashboard
                    </Link>
                  )}

                  {/* Show admin dashboard link if user is an admin */}
                  {isAdmin && (
                    <Link href="/admin/dashboard" className="text-lg font-medium transition-colors hover:text-primary">
                      Admin Dashboard
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link
            href={isAdmin ? "/admin/dashboard" : isVendor ? "/vendor/dashboard" : "/"}
            className="font-heading text-xl"
          >
            Martello
          </Link>

          {!isMobile && (
            <nav className="flex items-center gap-6">
              {/* Only show customer navigation items if not a vendor or admin */}
              {!isVendor &&
                !isAdmin &&
                mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                      pathname === item.href ? "text-primary after:scale-x-100" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

              {/* Show vendor dashboard link if user is a vendor */}
              {isVendor && (
                <Link
                  href="/vendor/dashboard"
                  className="text-sm font-medium transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Vendor Dashboard
                </Link>
              )}

              {/* Show admin dashboard link if user is an admin */}
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Only show search for non-vendors and non-admins */}
          {!isVendor && !isAdmin && (
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isMobile && !isVendor && !isAdmin && (
              <Button variant="outline" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            {/* Only show cart for non-vendors and non-admins */}
            {!isVendor && !isAdmin && <CartDrawer />}

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {user.firstName} {user.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Show different menu items based on role */}
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  ) : isVendor ? (
                    <DropdownMenuItem asChild>
                      <Link href="/vendor/dashboard">Vendor Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/account/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/wishlist">Wishlist</Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <LogoutButton variant="ghost" className="w-full justify-start" showIcon />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
