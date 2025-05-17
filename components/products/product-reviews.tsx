import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Mock data for demo purposes
const mockReviews = [
  {
    id: 1,
    userId: 1,
    userName: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love this product! The quality is exceptional and it looks even better in person. Highly recommend to anyone considering it.",
    isVerifiedPurchase: true,
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: 2,
    userId: 2,
    userName: "Michael Chen",
    rating: 4,
    comment:
      "Great product overall. The materials are high quality and the design is elegant. Took off one star because shipping took longer than expected.",
    isVerifiedPurchase: true,
    createdAt: "2023-03-22T14:15:00Z",
  },
  {
    id: 3,
    userId: 3,
    userName: "Emma Wilson",
    rating: 5,
    comment:
      "This exceeded my expectations! The attention to detail is impressive and it's exactly as described. Will definitely purchase from this vendor again.",
    isVerifiedPurchase: false,
    createdAt: "2023-02-10T09:45:00Z",
  },
]

interface ProductReviewsProps {
  productId: number
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  // In a real implementation, this would fetch reviews from an API

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">Customer Reviews</h3>
        <Button>Write a Review</Button>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&query=person ${review.userName.charAt(0)}`} />
                <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      {review.isVerifiedPurchase && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-100">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
