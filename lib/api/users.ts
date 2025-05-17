import type { UserDto } from "@/types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.martello.com"

// Mock data for demo purposes
const mockUser: UserDto = {
  id: 1,
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  role: "CUSTOMER",
  vendorProfile: null,
  createdAt: new Date().toISOString(),
}

export async function getUserProfile(): Promise<UserDto> {
  // In a real implementation, this would call the actual API
  // For demo purposes, we'll return mock data

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser)
    }, 500)
  })
}
