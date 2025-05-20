import { refreshAccessToken } from "./auth"

// Token management
const getAccessToken = () => localStorage.getItem("accessToken")
const getRefreshToken = () => localStorage.getItem("refreshToken")

const setTokens = (access: string, refresh: string) => {
  localStorage.setItem("accessToken", access)
  localStorage.setItem("refreshToken", refresh)
}

const clearTokens = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

// Robust API client
export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  const url = `${API_URL}${endpoint}`

  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  const headers = new Headers(options.headers)
  headers.set("Content-Type", "application/json")
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

  try {
    let response = await fetch(url, { ...options, headers })

    // Auto-refresh token if unauthorized
    if (response.status === 401 && refreshToken) {
      try {
        const tokens = await refreshAccessToken(refreshToken)
        setTokens(tokens.accessToken, tokens.refreshToken)

        headers.set("Authorization", `Bearer ${tokens.accessToken}`)
        response = await fetch(url, { ...options, headers })

        if (!response.ok) throw new Error("Retry after token refresh failed")
      } catch {
        clearTokens()
        window.location.href = "/auth/login"
        throw new Error("Session expired. Please login again.")
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  } catch (error) {
    console.error("API client error:", error)
    throw error
  }
}

// Export token utilities
export const authUtils = {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
}
