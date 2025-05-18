"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

import { login as loginApi, logout as logoutApi, register as registerApi } from "@/lib/api/auth"
import { authUtils } from "@/lib/api/api-client"
import type { LoginRequest, RegisterRequest, Role, UserData } from "@/types/auth"

interface AuthContextType {
  user: UserData | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check for existing tokens on mount
 useEffect(() => {
  const initAuth = async () => {
    try {
      const accessToken = authUtils.getAccessToken()
      const refreshToken = authUtils.getRefreshToken()

      if (accessToken) {
        const userData = jwtDecode<UserData>(accessToken)
userData.role = userData.role.replace("ROLE_", "") as Role
setUser(userData)
        setIsAuthenticated(true)
      } else if (refreshToken) {

        // 🔧 ACTUALLY CALL the refresh API
        const res = await fetch("http://localhost:8080/api/auth/refresh-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })

        if (!res.ok) throw new Error("Refresh token invalid")

        const data = await res.json()
        const newAccessToken = data.data.accessToken
        const newRefreshToken = data.data.refreshToken

        authUtils.setTokens(newAccessToken, newRefreshToken)
        const userData = jwtDecode<UserData>(newAccessToken)

        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      authUtils.clearTokens()
    } finally {
      setIsLoading(false)
    }
  }

  initAuth()
}, [])


  const login = async (data: LoginRequest) => {
    setIsLoading(true)
    try {
      const { accessToken, refreshToken, userData } = await loginApi(data)

// ✅ Normalize FIRST
userData.role = userData.role.replace("ROLE_", "") as Role

authUtils.setTokens(accessToken, refreshToken)
setUser(userData)
setIsAuthenticated(true)

      // Redirect based on role
      if (userData.role === "VENDOR") {
        router.push("/vendor/dashboard")
      } else {
        router.push("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterRequest) => {
    setIsLoading(true)
    try {
      const { accessToken, refreshToken, userData } = await registerApi(data)

// ✅ Normalize FIRST
userData.role = userData.role.replace("ROLE_", "") as Role

authUtils.setTokens(accessToken, refreshToken)
setUser(userData)
setIsAuthenticated(true)

      // Redirect based on role
      if (userData.role === "VENDOR") {
        router.push("/vendor/dashboard")
      } else {
        router.push("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      const refreshToken = authUtils.getRefreshToken()
      if (refreshToken) {
        await logoutApi(refreshToken)
      }
      authUtils.clearTokens()
      setUser(null)
      setIsAuthenticated(false)
      router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthContext }
