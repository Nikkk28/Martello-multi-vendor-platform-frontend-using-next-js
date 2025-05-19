import type { ProductResponse } from "@/types/product"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return await response.json()
}

export async function getProduct(id: string): Promise<ProductResponse | null> {
  const response = await fetch(`${API_URL}/products/id?id=${id}`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error("Failed to fetch product")
  }
  return await response.json()
}

export async function getFeaturedProducts(): Promise<ProductResponse[]> {
  const response = await fetch(`${API_URL}/products/featured`)
  if (!response.ok) {
    throw new Error("Failed to fetch featured products")
  }
  return await response.json()
}

export async function getRelatedProducts(productId: number, categoryId: number): Promise<ProductResponse[]> {
  const response = await fetch(
    `${API_URL}/products/related?productId=${productId}&categoryId=${categoryId}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch related products")
  }
  return await response.json()
}
