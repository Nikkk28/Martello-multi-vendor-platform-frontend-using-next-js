import type { OrderRequest, OrderResponse } from "@/types/order"
import { apiClient } from "./api-client"

export async function getOrders(): Promise<OrderResponse[]> {
  return await apiClient("/orders", {
    method: "GET",
  })
}

export async function getOrderById(orderId: number): Promise<OrderResponse> {
  return await apiClient(`/orders/${orderId}`, {
    method: "GET",
  })
}

export async function placeOrder(orderData: OrderRequest): Promise<OrderResponse> {
  return await apiClient("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  })
}
export async function getAllOrders(): Promise<OrderResponse[]> {
  return await apiClient("/admin/orders", {
    method: "GET",
  })
}

