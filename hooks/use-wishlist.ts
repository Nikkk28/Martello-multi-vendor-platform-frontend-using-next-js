"use client"

import { useState, useEffect, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  getUserWishlists,
  createWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  type WishlistResponse,
} from "@/lib/api/wishlist"
import type { ProductResponse } from "@/types/product"

export function useWishlist() {
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [defaultWishlistId, setDefaultWishlistId] = useState<number | null>(null)

  // Fetch user's wishlists
  const {
    data: wishlists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: getUserWishlists,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Set default wishlist ID when wishlists are loaded
  useEffect(() => {
    if (wishlists.length > 0) {
      setDefaultWishlistId(wishlists[0].id)
    }
  }, [wishlists])

  // Create a new wishlist
  const createWishlistMutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] })
      setDefaultWishlistId(data.id)
      toast({
        title: "Wishlist created",
        description: "Your wishlist has been created successfully",
      })
    },
  })

  // Add product to wishlist
  const addToWishlistMutation = useMutation({
    mutationFn: ({ wishlistId, productId }: { wishlistId: number; productId: number }) =>
      addProductToWishlist(wishlistId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] })
    },
  })

  // Remove product from wishlist
  const removeFromWishlistMutation = useMutation({
    mutationFn: ({ wishlistId, productId }: { wishlistId: number; productId: number }) =>
      removeProductFromWishlist(wishlistId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlists"] })
    },
  })

  // Check if a product is in any wishlist
  const isInWishlist = useCallback(
    (productId: number): boolean => {
      return wishlists.some((wishlist) => wishlist.items.some((item) => item.product.id === productId))
    },
    [wishlists],
  )

  // Get wishlist ID and item ID for a product
  const getWishlistItemDetails = useCallback(
    (productId: number): { wishlistId: number; itemId: number } | null => {
      for (const wishlist of wishlists) {
        const item = wishlist.items.find((item) => item.product.id === productId)
        if (item) {
          return { wishlistId: wishlist.id, itemId: item.id }
        }
      }
      return null
    },
    [wishlists],
  )

  // Toggle product in wishlist
  const toggleWishlist = useCallback(
    async (product: ProductResponse) => {
      if (!isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please log in to add items to your wishlist",
          variant: "destructive",
        })
        return
      }

      try {
        // Check if product is already in a wishlist
        if (isInWishlist(product.id)) {
          const details = getWishlistItemDetails(product.id)
          if (details) {
            // Optimistically update UI
            queryClient.setQueryData(["wishlists"], (old: WishlistResponse[] | undefined) => {
              if (!old) return []
              return old.map((wishlist) => {
                if (wishlist.id === details.wishlistId) {
                  return {
                    ...wishlist,
                    items: wishlist.items.filter((item) => item.product.id !== product.id),
                  }
                }
                return wishlist
              })
            })

            // Remove from wishlist
            await removeFromWishlistMutation.mutateAsync({
              wishlistId: details.wishlistId,
              productId: product.id,
            })

            toast({
              title: "Removed from wishlist",
              description: `${product.name} has been removed from your wishlist`,
            })
          }
        } else {
          // Create default wishlist if none exists
          if (!defaultWishlistId) {
            const newWishlist = await createWishlistMutation.mutateAsync({
              name: "My Wishlist",
            })

            // Add to the newly created wishlist
            await addToWishlistMutation.mutateAsync({
              wishlistId: newWishlist.id,
              productId: product.id,
            })
          } else {
            // Optimistically update UI
            queryClient.setQueryData(["wishlists"], (old: WishlistResponse[] | undefined) => {
              if (!old) return []
              return old.map((wishlist) => {
                if (wishlist.id === defaultWishlistId) {
                  return {
                    ...wishlist,
                    items: [
                      ...wishlist.items,
                      {
                        id: Date.now(), // Temporary ID
                        product,
                        addedAt: new Date().toISOString(),
                      },
                    ],
                  }
                }
                return wishlist
              })
            })

            // Add to existing wishlist
            await addToWishlistMutation.mutateAsync({
              wishlistId: defaultWishlistId,
              productId: product.id,
            })
          }

          toast({
            title: "Added to wishlist",
            description: `${product.name} has been added to your wishlist`,
          })
        }
      } catch (error) {
        console.error("Error toggling wishlist:", error)
        toast({
          title: "Error",
          description: "There was an error updating your wishlist",
          variant: "destructive",
        })
        // Invalidate to refresh with correct data
        queryClient.invalidateQueries({ queryKey: ["wishlists"] })
      }
    },
    [
      isAuthenticated,
      isInWishlist,
      getWishlistItemDetails,
      defaultWishlistId,
      addToWishlistMutation,
      removeFromWishlistMutation,
      createWishlistMutation,
      queryClient,
      toast,
    ],
  )

  return {
    wishlists,
    isLoading,
    error,
    isInWishlist,
    toggleWishlist,
    defaultWishlistId,
  }
}
