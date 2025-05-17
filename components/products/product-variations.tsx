"use client"

import { useState } from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Mock data for demo purposes
const mockVariations = {
  colors: [
    { id: "black", name: "Black", inStock: true },
    { id: "brown", name: "Brown", inStock: true },
    { id: "navy", name: "Navy", inStock: false },
  ],
  sizes: [
    { id: "s", name: "Small", inStock: true },
    { id: "m", name: "Medium", inStock: true },
    { id: "l", name: "Large", inStock: true },
    { id: "xl", name: "X-Large", inStock: false },
  ],
}

interface ProductVariationsProps {
  productId: number
}

export default function ProductVariations({ productId }: ProductVariationsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  // In a real implementation, this would fetch variations from an API

  return (
    <div className="space-y-6">
      {/* Color selection */}
      <div>
        <h3 className="font-medium mb-3">Color</h3>
        <RadioGroup value={selectedColor || ""} onValueChange={setSelectedColor} className="flex flex-wrap gap-3">
          {mockVariations.colors.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <RadioGroupItem value={color.id} id={`color-${color.id}`} disabled={!color.inStock} className="sr-only" />
              <Label
                htmlFor={`color-${color.id}`}
                className={`flex items-center justify-center h-10 px-4 rounded-md border cursor-pointer transition-colors ${
                  selectedColor === color.id ? "border-primary bg-primary/10" : "border-input hover:bg-muted"
                } ${!color.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {color.name}
                {!color.inStock && <span className="ml-2 text-xs">(Out of stock)</span>}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Size selection */}
      <div>
        <h3 className="font-medium mb-3">Size</h3>
        <RadioGroup value={selectedSize || ""} onValueChange={setSelectedSize} className="flex flex-wrap gap-3">
          {mockVariations.sizes.map((size) => (
            <div key={size.id} className="flex items-center space-x-2">
              <RadioGroupItem value={size.id} id={`size-${size.id}`} disabled={!size.inStock} className="sr-only" />
              <Label
                htmlFor={`size-${size.id}`}
                className={`flex items-center justify-center h-10 w-10 rounded-md border cursor-pointer transition-colors ${
                  selectedSize === size.id ? "border-primary bg-primary/10" : "border-input hover:bg-muted"
                } ${!size.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {size.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
