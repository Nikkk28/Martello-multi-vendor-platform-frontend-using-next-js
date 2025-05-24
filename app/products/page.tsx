"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
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

export default function ProductsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="transition-transform hover:scale-[1.02]">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg object-cover h-48 w-full"
              />
              <CardTitle className="mt-4 text-lg font-semibold">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="font-semibold text-primary text-base">
  ₹{Number(product.price).toLocaleString("en-IN")}
</p>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
