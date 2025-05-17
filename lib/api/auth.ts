import { jwtDecode } from "jwt-decode"
import type { LoginRequest, RegisterRequest, AuthResponse, UserData } from "@/types/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function login(data: LoginRequest): Promise<{
  accessToken: string
  refreshToken: string
  userData: UserData
}> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Login failed")
  }

  const result: AuthResponse = await response.json()

  if (result.status !== "success" || !result.data) {
    throw new Error("Invalid response format")
  }

  const { accessToken, refreshToken } = result.data

  // Decode JWT to get user data
  const userData = jwtDecode<UserData>(accessToken)

  return {
    accessToken,
    refreshToken,
    userData,
  }
}

export async function register(data: RegisterRequest): Promise<{
  accessToken: string
  refreshToken: string
  userData: UserData
}> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  const result: AuthResponse = await response.json()

  if (result.status !== "success" || !result.data) {
    throw new Error("Invalid response format")
  }

  const { accessToken, refreshToken } = result.data

  // Decode JWT to get user data
  const userData = jwtDecode<UserData>(accessToken)

  return {
    accessToken,
    refreshToken,
    userData,
  }
}

export async function logout(refreshToken: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Logout failed")
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
}> {
  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh token")
  }

  const result: AuthResponse = await response.json()

  if (result.status !== "success" || !result.data) {
    throw new Error("Invalid response format")
  }

  return result.data
}
