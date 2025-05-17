export type Role = "CUSTOMER" | "VENDOR" | "ADMIN"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: Role
  address?: Address[]
  vendorProfile?: VendorProfileRequest
}

export interface Address {
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
  isDefault: boolean
  isShippingAddress: boolean
  isBillingAddress: boolean
}

export interface VendorProfileRequest {
  businessName: string
  businessDescription: string
  contactPhone: string
}

export interface AuthResponse {
  status: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
}
