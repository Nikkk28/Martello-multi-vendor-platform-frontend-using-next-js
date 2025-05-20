"use client"

import { useEffect, useState } from "react"
import {
  getAddresses,
  addAddress,
  deleteAddress,
  AddressRequest,
  AddressResponse,
} from "@/lib/api/addresses"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { setDefaultAddress } from "@/lib/api/addresses"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function AddressPage() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<AddressResponse[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<AddressRequest>({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAddresses()
        setAddresses(data)
      } catch {
        toast({ title: "Failed to load addresses", variant: "destructive" })
      }
    }
    fetch()
  }, [toast])

  const handleAdd = async () => {
    try {
      const newAddress = await addAddress(form)
      setAddresses((prev) => [...prev, newAddress])
      setOpen(false)
      toast({ title: "Address added successfully" })
    } catch {
      toast({ title: "Failed to add address", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id)
      setAddresses((prev) => prev.filter((addr) => addr.id !== id))
      toast({ title: "Address deleted" })
    } catch {
      toast({ title: "Failed to delete address", variant: "destructive" })
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Addresses</h1>
        <Button onClick={() => setOpen(true)}>Add Address</Button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-muted-foreground">No saved addresses.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border p-4 rounded-lg space-y-1 flex justify-between items-start"
            >
              <div>
                <p className="font-medium">
                  {addr.street}, {addr.city}, {addr.state}
                </p>
                <p className="text-sm text-muted-foreground">
                  {addr.country} — {addr.postalCode}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(addr.id)}
              >
                Delete
              </Button>
              {!addr.isDefault && (
  <Button
    size="sm"
    variant="outline"
    onClick={async () => {
      try {
        await setDefaultAddress(addr.id)
        toast({ title: "Default address updated" })
        const updated = await getAddresses()
        setAddresses(updated)
      } catch {
        toast({ title: "Failed to update default", variant: "destructive" })
      }
    }}
  >
    Make Default
  </Button>
)}

            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {Object.entries(form).map(([key, value]) => (
              <Input
                key={key}
                placeholder={key[0].toUpperCase() + key.slice(1)}
                value={value}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            ))}
            <Button onClick={handleAdd}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
