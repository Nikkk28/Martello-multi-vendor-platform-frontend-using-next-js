"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export function FooterWrapper() {
  const pathname = usePathname()

  // Don't render footer on vendor or admin routes
  if (pathname?.startsWith("/vendor") || pathname?.startsWith("/admin")) {
    return null
  }

  return <Footer />
}
