export interface ProductResponse {
  id: number
  name: string
  description: string
  price: number
  stockQuantity: number
  categoryId: number
  categoryName: string
  vendorId: number
  vendorName: string
  isListed: boolean
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductRequest {
  name: string
  description: string
  price: number
  stockQuantity: number
  categoryId: number
  imageUrls: string[]
}

export interface ProductVariationResponse {
  id: number
  productId: number
  sku: string
  attributes: Record<string, string>
  stockQuantity: number
  priceAdjustment: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductVariationRequest {
  sku: string
  attributes: Record<string, string>
  stockQuantity: number
  priceAdjustment: number
  isActive: boolean
}
