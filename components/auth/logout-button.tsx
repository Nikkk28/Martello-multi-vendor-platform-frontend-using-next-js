"use client"

import { useState } from "react"
import { LogOut, Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useAuth } from "@/providers/auth-provider"

interface LogoutButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  showIcon?: boolean
}

export function LogoutButton({ variant = "ghost", showIcon = true, children, ...props }: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { logout } = useAuth()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button variant={variant} onClick={handleLogout} disabled={isLoggingOut} {...props}>
      {isLoggingOut ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        showIcon && <LogOut className="mr-2 h-4 w-4" />
      )}
      {children || "Logout"}
    </Button>
  )
}
