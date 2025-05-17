import ProductCard from "@/components/products/product-card"
import { getFeaturedProducts } from "@/lib/api/products"

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} featured />
      ))}
    </div>
  )
}
