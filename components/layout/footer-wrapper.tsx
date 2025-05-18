"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export function FooterWrapper() {
  const pathname = usePathname()

  // Don't render footer on vendor routes
  if (pathname?.startsWith("/vendor")) {
    return null
  }

  return <Footer />
}
