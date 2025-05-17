import Link from "next/link"
import Image from "next/image"

// Mock data for demo purposes
const categories = [
  {
    id: 1,
    name: "Accessories",
    imageUrl: "/placeholder.svg?height=200&width=200&query=luxury accessories collection",
  },
  {
    id: 2,
    name: "Home Decor",
    imageUrl: "/placeholder.svg?height=200&width=200&query=minimalist home decor",
  },
  {
    id: 3,
    name: "Clothing",
    imageUrl: "/placeholder.svg?height=200&width=200&query=premium clothing collection",
  },
  {
    id: 4,
    name: "Food & Beverage",
    imageUrl: "/placeholder.svg?height=200&width=200&query=gourmet food collection",
  },
  {
    id: 5,
    name: "Jewelry",
    imageUrl: "/placeholder.svg?height=200&width=200&query=handcrafted jewelry",
  },
  {
    id: 6,
    name: "Beauty",
    imageUrl: "/placeholder.svg?height=200&width=200&query=luxury beauty products",
  },
]

export default function CategoryNavigation() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/category/${category.id}`}
          className="group flex flex-col items-center text-center"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 bg-muted">
            <Image
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-sm font-medium group-hover:text-primary transition-colors">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
