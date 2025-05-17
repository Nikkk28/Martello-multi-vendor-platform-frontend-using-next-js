import type { ProductResponse } from "@/types/product"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.martello.com"

// Mock data for demo purposes
const mockProducts: ProductResponse[] = [
  {
    id: 1,
    name: "Premium Leather Wallet",
    description: "Handcrafted premium leather wallet with multiple card slots and a coin pocket.",
    price: 89.99,
    stockQuantity: 25,
    categoryId: 1,
    categoryName: "Accessories",
    vendorId: 1,
    vendorName: "Artisan Leather Co.",
    isListed: true,
    imageUrls: ["/premium-leather-wallet.png", "/placeholder.svg?key=8a8wo"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Minimalist Ceramic Vase",
    description: "Elegant minimalist ceramic vase, perfect for modern home decor.",
    price: 49.99,
    stockQuantity: 15,
    categoryId: 2,
    categoryName: "Home Decor",
    vendorId: 2,
    vendorName: "Modern Living",
    isListed: true,
    imageUrls: ["/minimalist-ceramic-vase.png", "/placeholder.svg?key=wd6r9"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Soft and comfortable organic cotton t-shirt with a relaxed fit.",
    price: 34.99,
    stockQuantity: 50,
    categoryId: 3,
    categoryName: "Clothing",
    vendorId: 3,
    vendorName: "Eco Apparel",
    isListed: true,
    imageUrls: ["/organic-cotton-tshirt.png", "/placeholder.svg?key=g4u1e"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Artisanal Coffee Beans",
    description: "Premium single-origin coffee beans, ethically sourced and freshly roasted.",
    price: 19.99,
    stockQuantity: 100,
    categoryId: 4,
    categoryName: "Food & Beverage",
    vendorId: 4,
    vendorName: "Craft Coffee Roasters",
    isListed: true,
    imageUrls: [
      "/placeholder.svg?height=600&width=400&query=artisanal coffee beans",
      "/placeholder.svg?height=600&width=400&query=coffee beans in bag",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function getProducts(): Promise<ProductResponse[]> {
  // In a real implementation, this would call the actual API
  // For demo purposes, we'll return mock data

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts)
    }, 500)
  })
}

export async function getProduct(id: string): Promise<ProductResponse | null> {
  // In a real implementation, this would call the actual API
  // For demo purposes, we'll return mock data

  const productId = Number.parseInt(id)
  const product = mockProducts.find((p) => p.id === productId)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product || null)
    }, 500)
  })
}

export async function getFeaturedProducts(): Promise<ProductResponse[]> {
  // In a real implementation, this would call the actual API
  // For demo purposes, we'll return mock data

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts)
    }, 500)
  })
}

export async function getRelatedProducts(productId: number, categoryId: number): Promise<ProductResponse[]> {
  // In a real implementation, this would call the actual API
  // For demo purposes, we'll return mock data

  const relatedProducts = mockProducts.filter((p) => p.id !== productId && p.categoryId === categoryId)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(relatedProducts)
    }, 500)
  })
}
