"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Package, ShoppingBag, Settings, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function VendorNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const routes = [
    {
      href: "/vendor/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      active: pathname === "/vendor/dashboard",
    },
    {
      href: "/vendor/products",
      label: "Products",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
      active: pathname.startsWith("/vendor/products"),
    },
    {
      href: "/vendor/orders",
      label: "Orders",
      icon: <Package className="mr-2 h-4 w-4" />,
      active: pathname.startsWith("/vendor/orders"),
    },
    {
      href: "/vendor/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      active: pathname === "/vendor/settings",
    },
  ]

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col space-y-4 py-4">
                <Link href="/" className="flex items-center px-2" onClick={() => setOpen(false)}>
                  <span className="font-bold">Martello</span>
                  <span className="ml-2 text-xs text-muted-foreground">Vendor Portal</span>
                </Link>
                <div className="px-2">
                  <p className="text-sm font-medium">{user?.vendorProfile?.businessName || user?.firstName || "Vendor"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                </div>
                <div className="px-2 mt-auto">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/vendor/dashboard" className="hidden md:flex items-center">
            <span className="font-bold">Martello</span>
            <span className="ml-2 text-xs text-muted-foreground">Vendor Portal</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 ml-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.vendorProfile?.businessName || user?.firstName || "Vendor"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
