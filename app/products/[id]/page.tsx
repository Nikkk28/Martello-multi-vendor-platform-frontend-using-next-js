"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/providers/cart-provider"
import { toast } from "@/components/ui/use-toast"


const mockProducts = [
{ id: 1, name: "Wireless Headphones", description: "Experience immersive sound.", price: "1999", image: "https://via.placeholder.com/300x200?text=Headphones" },
  { id: 2, name: "Smartwatch Pro", description: "Track health & stay connected.", price: "19999", image: "https://via.placeholder.com/300x200?text=Smartwatch" },
  { id: 3, name: "Leather Jacket", description: "Classic, durable, stylish.", price: "24900", image: "https://via.placeholder.com/300x200?text=Leather+Jacket" },
  { id: 4, name: "4K Action Camera", description: "Capture moments in ultra-HD.", price: "12999", image: "https://via.placeholder.com/300x200?text=Action+Camera" },
  { id: 5, name: "Designer Sunglasses", description: "Style that protects.", price: "8999", image: "https://via.placeholder.com/300x200?text=Sunglasses" },
  { id: 6, name: "Bluetooth Speaker", description: "Deep bass in your palm.", price: "5999", image: "https://via.placeholder.com/300x200?text=Speaker" },
  { id: 7, name: "Smart Thermostat", description: "Control comfort intelligently.", price: "13900", image: "https://via.placeholder.com/300x200?text=Thermostat" },
  { id: 8, name: "Portable Charger", description: "Power on the go.", price: "3999", image: "https://via.placeholder.com/300x200?text=Power+Bank" },
  { id: 9, name: "Fitness Tracker", description: "Your 24/7 health assistant.", price: "7950", image: "https://via.placeholder.com/300x200?text=Fitness+Tracker" },
  { id: 10, name: "Noise-Canceling Earbuds", description: "Silence the world.", price: "12900", image: "https://via.placeholder.com/300x200?text=Earbuds" },
  { id: 11, name: "Laptop Stand", description: "Ergonomic & minimal.", price: "4999", image: "https://via.placeholder.com/300x200?text=Laptop+Stand" },
  { id: 12, name: "Stylus Pen", description: "Precision for artists & note-takers.", price: "999", image: "https://via.placeholder.com/300x200?text=Stylus" },
  { id: 13, name: "Backlit Mechanical Keyboard", description: "Tactile perfection.", price: "9900", image: "https://via.placeholder.com/300x200?text=Keyboard" },
  { id: 14, name: "Luxury Backpack", description: "Form meets function.", price: "19900", image: "https://via.placeholder.com/300x200?text=Backpack" },
  { id: 15, name: "Mini Projector", description: "Theater in your pocket.", price: "17999", image: "https://via.placeholder.com/300x200?text=Projector" },
  { id: 16, name: "Wireless Mouse", description: "Comfort for long hours.", price: "3999", image: "https://via.placeholder.com/300x200?text=Mouse" },
  { id: 17, name: "Smart LED Bulbs", description: "Control lighting from anywhere.", price: "5999", image: "https://via.placeholder.com/300x200?text=LED+Bulbs" },
  { id: 18, name: "Ceramic Mug Set", description: "Elegant daily essentials.", price: "2499", image: "https://via.placeholder.com/300x200?text=Mug+Set" },
  { id: 19, name: "Standing Desk Converter", description: "Upgrade your workflow.", price: "16900", image: "https://via.placeholder.com/300x200?text=Desk+Converter" },
  { id: 20, name: "Essential Oil Diffuser", description: "Relaxation in style.", price: "3499", image: "https://via.placeholder.com/300x200?text=Diffuser" },
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any | null>(null)

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === Number(id))
    setProduct(found ?? null)
  }, [id])

  if (!product) {
    return <p className="text-center mt-20 text-muted-foreground">Product not found</p>
  }

  return (
    <div className="container py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <CardTitle className="mt-4 text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-primary">₹{Number(product.price).toLocaleString("en-IN")}</p>
          <Button
  className="mt-4"
  onClick={() => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} was added to your cart.`,
    })
  }}
>
  Add to Cart
</Button>

        </CardContent>
      </Card>
    </div>
  )
}
