export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  id?: number
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt?: string
  updatedAt?: string
}
