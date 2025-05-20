import { apiClient } from "./api-client"

export interface AddressRequest {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface AddressResponse {
  id: number
  street: string
  city: string
  state: string
  isDefault: boolean
  country: string
  postalCode: string
  createdAt: string
  updatedAt: string
}

export async function getAddresses(): Promise<AddressResponse[]> {
  return await apiClient("/addresses", {
    method: "GET",
  })
}

export async function addAddress(address: AddressRequest): Promise<AddressResponse> {
  return await apiClient("/addresses", {
    method: "POST",
    body: JSON.stringify(address),
  })
}

export async function updateAddress(id: number, address: AddressRequest): Promise<AddressResponse> {
  return await apiClient(`/addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(address),
  })
}

export async function deleteAddress(id: number): Promise<void> {
  return await apiClient(`/addresses/${id}`, {
    method: "DELETE",
  })
}
export async function setDefaultAddress(id: number): Promise<void> {
  return await apiClient(`/addresses/${id}/default`, {
    method: "PATCH",
  })
}

