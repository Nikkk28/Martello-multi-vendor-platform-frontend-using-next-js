export interface CartResponse {
  id: number
  userId: number
  vendorGroups: VendorGroup[]
  totalItems: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface VendorGroup {
  vendorId: number
  vendorName: string
  subtotal: number
  items: CartItemDto[]
}

export interface CartItemDto {
  id: number
  productId: number
  productName: string
  variationId: number | null
  variationAttributes: Record<string, string>
  quantity: number
  price: number
  subtotal: number
  imageUrl: string
}

export interface CartItemRequest {
  productId: number
  variationId?: number
  quantity: number
}
