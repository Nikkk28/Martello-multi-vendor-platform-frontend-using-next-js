// Request payload for each item in an order
export interface OrderItemRequest {
  productId: number
  quantity: number
}

// Payload for placing an order
export interface OrderRequest {
  items: OrderItemRequest[]
  shippingAddress?: string
  billingAddress?: string
}

// Response structure for an item inside an order
export interface OrderItemResponse {
  id: number
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
  imageUrl?: string
}

// Full order response from the backend
export interface OrderResponse {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
  status: string
  total: number
  shippingAddress?: string
  billingAddress?: string
  items: OrderItemResponse[]
}
