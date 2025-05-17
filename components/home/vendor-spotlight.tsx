import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Mock data for demo purposes
const vendors = [
  {
    id: 1,
    name: "Artisan Leather Co.",
    description: "Handcrafted leather goods made with traditional techniques and premium materials.",
    imageUrl: "/placeholder.svg?height=400&width=600&query=artisan leather workshop",
  },
  {
    id: 2,
    name: "Modern Living",
    description: "Contemporary home decor and furnishings with a focus on minimalist design and functionality.",
    imageUrl: "/placeholder.svg?height=400&width=600&query=modern minimalist home decor",
  },
  {
    id: 3,
    name: "Eco Apparel",
    description: "Sustainable clothing made from organic and recycled materials with ethical manufacturing practices.",
    imageUrl: "/placeholder.svg?height=400&width=600&query=sustainable clothing production",
  },
]

export default async function VendorSpotlight() {
  // In a real implementation, this would fetch data from an API

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {vendors.map((vendor) => (
        <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="group block">
          <div className="overflow-hidden rounded-lg bg-muted aspect-[4/3] mb-4">
            <Image
              src={vendor.imageUrl || "/placeholder.svg"}
              alt={vendor.name}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{vendor.name}</h3>

          <p className="text-muted-foreground mt-2 line-clamp-2">{vendor.description}</p>

          <div className="mt-4 flex items-center text-sm font-medium text-primary">
            <span>View Products</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}
