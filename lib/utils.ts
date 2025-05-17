import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Sync role between localStorage and cookies
export function syncUserRole(role: string | null) {
  if (role) {
    localStorage.setItem("userRole", role)
    Cookies.set("userRole", role, { path: "/" })
  } else {
    localStorage.removeItem("userRole")
    Cookies.remove("userRole", { path: "/" })
  }
}

// Get user role from localStorage or cookie
export function getUserRole(): string | null {
  return localStorage.getItem("userRole") || Cookies.get("userRole") || null
}
