"use client"

import { useEffect, useState } from "react"
import {
  getPendingVendors,
  updateVendorApprovalStatus
} from "@/lib/api/admin"
import { VendorProfile } from "@/types/vendor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

export default function PendingVendorsPage() {
  const [vendors, setVendors] = useState<VendorProfile[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)

  useEffect(() => {
    async function fetchVendors() {
      try {
        const result = await getPendingVendors()
        setVendors(result)
      } catch (error) {
        console.error("Failed to load pending vendors", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const handleAction = async (vendorId: number, action: "APPROVED" | "REJECTED") => {
    setUpdating(vendorId)
    try {
      await updateVendorApprovalStatus(vendorId, { status: action })
      setVendors((prev) => prev?.filter((v) => v.id !== vendorId) ?? null)
      toast({
        title: `Vendor ${action === "APPROVED" ? "approved" : "rejected"}`,
        description: `Vendor ID ${vendorId} has been ${action.toLowerCase()}.`,
      })
    } catch (error) {
      console.error(`Failed to ${action.toLowerCase()} vendor`, error)
      toast({
        title: "Error",
        description: `Could not ${action.toLowerCase()} vendor.`,
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Pending Vendor Approvals</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : vendors && vendors.length > 0 ? (
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardHeader>
                <CardTitle>{vendor.businessName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {vendor.businessDescription}
                </p>
                <p className="text-sm">Phone: {vendor.contactPhone}</p>
                <p className="text-sm mb-2">Email: {vendor.contactEmail}</p>

                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() => handleAction(vendor.id, "APPROVED")}
                    disabled={updating === vendor.id}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleAction(vendor.id, "REJECTED")}
                    disabled={updating === vendor.id}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No pending vendors.</p>
      )}
    </div>
  )
}
