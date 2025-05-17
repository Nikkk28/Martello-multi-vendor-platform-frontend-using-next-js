import ProductCard from "@/components/products/product-card"
import { getRelatedProducts } from "@/lib/api/products"

interface RelatedProductsProps {
  productId: number
  categoryId: number
}

export default async function RelatedProducts({ productId, categoryId }: RelatedProductsProps) {
  const products = await getRelatedProducts(productId, categoryId)

  if (products.length === 0) {
    return <p>No related products found.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
