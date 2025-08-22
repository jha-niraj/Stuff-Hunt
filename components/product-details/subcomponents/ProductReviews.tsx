"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

interface ProductReviewsProps {
  productId: string
  averageRating?: number
  reviewCount?: number
}

// Mock review data - in real app, this would come from API
const mockReviews = [
  {
    id: '1',
    user: {
      name: 'John D.',
      avatar: '/placeholder.svg',
      verified: true
    },
    rating: 5,
    title: 'Excellent quality!',
    content: 'Really impressed with the build quality and performance. Exactly what I was looking for.',
    date: '2024-01-15',
    helpful: 12,
    images: []
  },
  {
    id: '2',
    user: {
      name: 'Sarah M.',
      avatar: '/placeholder.svg',
      verified: true
    },
    rating: 4,
    title: 'Good value for money',
    content: 'Works well for the price point. Minor issues with setup but overall satisfied.',
    date: '2024-01-10',
    helpful: 8,
    images: []
  },
  {
    id: '3',
    user: {
      name: 'Mike R.',
      avatar: '/placeholder.svg',
      verified: false
    },
    rating: 3,
    title: 'Average product',
    content: 'It\'s okay, nothing special. Does the job but could be better.',
    date: '2024-01-05',
    helpful: 3,
    images: []
  }
]

const ratingDistribution = {
  5: 45,
  4: 30,
  3: 15,
  2: 7,
  1: 3
}

export function ProductReviews({ productId, averageRating, reviewCount }: ProductReviewsProps) {
  const totalReviews = reviewCount || mockReviews.length

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>
            Based on {totalReviews} customer reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {averageRating?.toFixed(1) || '4.2'}
              </div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating || 4.2)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalReviews} total reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {Object.entries(ratingDistribution)
                .reverse()
                .map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <Progress value={percentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-10">
                      {percentage}%
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="w-full md:w-auto">
              Write a Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>
                    {review.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  {/* Review Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user.name}</span>
                      {review.user.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.title}</span>
                  </div>

                  {/* Review Content */}
                  <p className="text-sm text-muted-foreground">
                    {review.content}
                  </p>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <MessageSquare className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {totalReviews > mockReviews.length && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  )
}