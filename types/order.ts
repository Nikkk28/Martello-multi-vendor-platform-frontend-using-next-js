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

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'

export interface OrderItemResponse {
  id: number
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
  imageUrl?: string
}

export interface OrderResponse {
  id: number
  customerId: number      // renamed from userId
  customerName?: string
  vendorId?: number       // added for vendor-specific views
  vendorName?: string     // added for vendor display
  createdAt: string
  updatedAt: string
  status: OrderStatus
  total: number
  shippingAddress?: string
  billingAddress?: string
  items: OrderItemResponse[]
}
