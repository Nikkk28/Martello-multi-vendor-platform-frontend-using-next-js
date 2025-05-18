import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { CartProvider } from "@/providers/cart-provider"
import { QueryProvider } from "@/providers/query-provider"
import Header from "@/components/layout/header"
import { PageTransition } from "@/components/ui/page-transition"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "./globals.css"
import { FooterWrapper } from "@/components/layout/footer-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Martello - Premium E-commerce",
  description: "Discover premium products from around the world",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">
                    <PageTransition>{children}</PageTransition>
                  </main>
                  {/* Footer is now conditionally rendered in the client component FooterWrapper */}
                  <FooterWrapper />
                </div>
                <ScrollToTop />
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
