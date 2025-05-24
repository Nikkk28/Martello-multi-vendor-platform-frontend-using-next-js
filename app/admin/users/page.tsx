"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/admin/users-table"
import { getPendingVendors, updateVendorApprovalStatus } from "@/lib/api/admin"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import type { VendorProfile } from "@/types/vendor"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const filterParam = searchParams.get("filter")

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState(filterParam === "pending" ? "pending" : "all")
  const [pendingVendors, setPendingVendors] = useState<VendorProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // For rejection dialog
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false)
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPendingVendors = async () => {
      setIsLoading(true)
      try {
        const vendors = await getPendingVendors()
        setPendingVendors(vendors)
      } catch (error) {
        console.error("Failed to fetch pending vendors:", error)
        toast({
          title: "Error",
          description: "Failed to load pending vendors. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (activeTab === "pending") {
      fetchPendingVendors()
    }
  }, [activeTab, toast])

  const handleApproveVendor = async (vendorId: string) => {
    try {
      setIsSubmitting(true)
      await updateVendorApprovalStatus(vendorId, { status: "APPROVED" })

      // Update local state
      setPendingVendors(pendingVendors.filter((vendor) => vendor.id !== vendorId))

      toast({
        title: "Vendor Approved",
        description: "The vendor has been successfully approved.",
      })
    } catch (error) {
      console.error("Failed to approve vendor:", error)
      toast({
        title: "Error",
        description: "Failed to approve vendor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openRejectionDialog = (vendorId: string) => {
    setSelectedVendorId(vendorId)
    setRejectionReason("")
    setIsRejectionDialogOpen(true)
  }

  const handleRejectVendor = async () => {
    if (!selectedVendorId) return

    try {
      setIsSubmitting(true)
      await updateVendorApprovalStatus(selectedVendorId, {
        status: "REJECTED",
        reason: rejectionReason,
      })

      // Update local state
      setPendingVendors(pendingVendors.filter((vendor) => vendor.id !== selectedVendorId))

      toast({
        title: "Vendor Rejected",
        description: "The vendor has been rejected with the provided reason.",
      })

      // Close dialog
      setIsRejectionDialogOpen(false)
    } catch (error) {
      console.error("Failed to reject vendor:", error)
      toast({
        title: "Error",
        description: "Failed to reject vendor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <UsersTable filter="all" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="customers" className="mt-4">
          <UsersTable filter="CUSTOMER" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="vendors" className="mt-4">
          <UsersTable filter="VENDOR" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : pendingVendors.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <p className="text-muted-foreground">No pending vendor approvals</p>
            </div>
          ) : (
            <div className="rounded-md border divide-y">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{vendor.businessName}</h3>
                    <p className="text-sm text-muted-foreground">{vendor.contactEmail}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied: {new Date(vendor.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleApproveVendor(vendor.id)}
                      disabled={isSubmitting}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openRejectionDialog(vendor.id)}
                      disabled={isSubmitting}
                    >
                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="admins" className="mt-4">
          <UsersTable filter="ADMIN" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Vendor Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this vendor application. This will be sent to the vendor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="e.g., Incomplete documentation, business description too vague..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectVendor}
              disabled={!rejectionReason.trim() || isSubmitting}
            >
              {isSubmitting ? "Rejecting..." : "Reject Vendor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
