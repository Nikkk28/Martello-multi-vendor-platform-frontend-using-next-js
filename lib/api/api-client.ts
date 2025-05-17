import { refreshAccessToken } from "./auth"

// Token storage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setTokens = (access: string, refresh: string) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Create authenticated API client
export const apiClient = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  const url = `${API_URL}${endpoint}`

  // Add authorization header if access token exists
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  } as Record<string, string>

  const token = getAccessToken();
if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}


  // Make the request
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // If unauthorized and we have a refresh token, try to refresh
    if (response.status === 401 && getRefreshToken()) {
      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) throw new Error("No refresh token available")

        // Get new tokens
        const tokens = await refreshAccessToken(refreshToken)
        setTokens(tokens.accessToken, tokens.refreshToken)

        // Retry the original request with new token
        headers["Authorization"] = `Bearer ${tokens.accessToken}`
        const retryResponse = await fetch(url, {
          ...options,
          headers,
        })

        if (!retryResponse.ok) {
          throw new Error("Request failed after token refresh")
        }

        return retryResponse.json()
      } catch (error) {
        // If refresh fails, clear tokens and throw error
        clearTokens()
        window.location.href = "/auth/login"
        throw new Error("Session expired. Please login again.")
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "API request failed")
    }

    return response.json()
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// Export token management functions
export const authUtils = {
  setTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
};
