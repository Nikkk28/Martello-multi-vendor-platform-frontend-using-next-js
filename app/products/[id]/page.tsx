import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddToCartButton from "@/components/products/add-to-cart-button"
import ProductGallery from "@/components/products/product-gallery"
import ProductVariations from "@/components/products/product-variations"
import RelatedProducts from "@/components/products/related-products"
import ProductReviews from "@/components/products/product-reviews"
import { getProduct } from "@/lib/api/products"
import { formatCurrency } from "@/lib/utils"

export default async function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, this would be a server component fetching data
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/products/category/${product.categoryId}`} className="hover:text-foreground">
          {product.categoryName}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div>
          <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-lg" />}>
            <ProductGallery images={product.imageUrls} productName={product.name} />
          </Suspense>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <Link
              href={`/vendors/${product.vendorId}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {product.vendorName}
            </Link>
            <h1 className="font-heading text-3xl mt-2 animate-fade-in">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2 animate-fade-in-delay-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            <p className="text-2xl font-medium mt-4 animate-fade-in-delay-2">{formatCurrency(product.price)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed animate-fade-in-delay-3">{product.description}</p>

          <ProductVariations productId={product.id} />

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} className="flex-1 premium-button" />
            <Button variant="outline" className="flex-1 premium-button">
              Add to Wishlist
            </Button>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-start gap-2 text-sm">
              <span className="font-medium">SKU:</span>
              <span className="text-muted-foreground">MART-{product.id}</span>
            </div>
            <div className="flex items-start gap-2 text-sm mt-2">
              <span className="font-medium">Category:</span>
              <Link
                href={`/products/category/${product.categoryId}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {product.categoryName}
              </Link>
            </div>
            <div className="flex items-start gap-2 text-sm mt-2">
              <span className="font-medium">Availability:</span>
              <span className={product.stockQuantity > 0 ? "text-green-600" : "text-red-600"}>
                {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="details"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4"
            >
              Reviews (24)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies
                lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <ul>
                <li>Premium quality materials</li>
                <li>Ethically sourced and produced</li>
                <li>Designed for durability and longevity</li>
                <li>Elegant, timeless aesthetic</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Dimensions</h3>
                <p className="text-sm text-muted-foreground">Width: 30cm</p>
                <p className="text-sm text-muted-foreground">Height: 20cm</p>
                <p className="text-sm text-muted-foreground">Depth: 10cm</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Materials</h3>
                <p className="text-sm text-muted-foreground">Main: 100% Cotton</p>
                <p className="text-sm text-muted-foreground">Lining: 100% Polyester</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <p className="text-sm text-muted-foreground">Hand wash only</p>
                <p className="text-sm text-muted-foreground">Do not bleach</p>
                <p className="text-sm text-muted-foreground">Do not tumble dry</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-sm text-muted-foreground">Weight: 0.5kg</p>
                <p className="text-sm text-muted-foreground">Origin: Italy</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <Suspense fallback={<div>Loading reviews...</div>}>
              <ProductReviews productId={product.id} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl mb-6">You May Also Like</h2>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts productId={product.id} categoryId={product.categoryId} />
        </Suspense>
      </section>
    </main>
  )
}

function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
    </div>
  )
}
