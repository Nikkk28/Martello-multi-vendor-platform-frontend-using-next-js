"use client"

import { useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { RegisterFormValues } from "@/lib/validations/register-schema"

export function AddressForm() {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<RegisterFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  })

  const [expandedAddresses, setExpandedAddresses] = useState<number[]>([0])

  const toggleAddress = (index: number) => {
    setExpandedAddresses((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const handleAddAddress = () => {
    const newIndex = fields.length
    append({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    })
    setExpandedAddresses((prev) => [...prev, newIndex])
  }

  const handleRemoveAddress = (index: number) => {
    // If removing the default address, make the first remaining address the default
    const isRemovingDefault = getValues(`address.${index}.isDefault`)
    remove(index)

    if (isRemovingDefault && fields.length > 1) {
      setValue(`address.0.isDefault`, true)
    }

    // Update expanded addresses
    setExpandedAddresses((prev) => prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)))
  }

  const handleSetDefault = (index: number) => {
    // Set all addresses to non-default
    fields.forEach((_, i) => {
      setValue(`address.${i}.isDefault`, false)
    })

    // Set the selected address as default
    setValue(`address.${index}.isDefault`, true)
  }

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const isExpanded = expandedAddresses.includes(index)

        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-muted/30"
              onClick={() => toggleAddress(index)}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`default-${index}`}
                  checked={getValues(`address.${index}.isDefault`)}
                  onCheckedChange={() => handleSetDefault(index)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={getValues(`address.${index}.isDefault`)}
                />
                <Label htmlFor={`default-${index}`} className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  {getValues(`address.${index}.isDefault`) ? "Default Address" : `Address ${index + 1}`}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveAddress(index)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 space-y-4 border-t"
                >
                  <div className="space-y-2">
                    <Label htmlFor={`address.${index}.street`}>Street Address</Label>
                    <Input
                      id={`address.${index}.street`}
                      {...register(`address.${index}.street`)}
                      placeholder="123 Main St"
                      className={errors.address?.[index]?.street ? "border-red-500" : ""}
                    />
                    {errors.address?.[index]?.street && (
                      <p className="text-sm text-red-500">{errors.address[index]?.street?.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`address.${index}.city`}>City</Label>
                      <Input
                        id={`address.${index}.city`}
                        {...register(`address.${index}.city`)}
                        placeholder="New York"
                        className={errors.address?.[index]?.city ? "border-red-500" : ""}
                      />
                      {errors.address?.[index]?.city && (
                        <p className="text-sm text-red-500">{errors.address[index]?.city?.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`address.${index}.state`}>State/Province</Label>
                      <Input
                        id={`address.${index}.state`}
                        {...register(`address.${index}.state`)}
                        placeholder="NY"
                        className={errors.address?.[index]?.state ? "border-red-500" : ""}
                      />
                      {errors.address?.[index]?.state && (
                        <p className="text-sm text-red-500">{errors.address[index]?.state?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`address.${index}.zipCode`}>Zip/Postal Code</Label>
                      <Input
                        id={`address.${index}.zipCode`}
                        {...register(`address.${index}.zipCode`)}
                        placeholder="10001"
                        className={errors.address?.[index]?.zipCode ? "border-red-500" : ""}
                      />
                      {errors.address?.[index]?.zipCode && (
                        <p className="text-sm text-red-500">{errors.address[index]?.zipCode?.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`address.${index}.country`}>Country</Label>
                      <Input
                        id={`address.${index}.country`}
                        {...register(`address.${index}.country`)}
                        placeholder="United States"
                        className={errors.address?.[index]?.country ? "border-red-500" : ""}
                      />
                      {errors.address?.[index]?.country && (
                        <p className="text-sm text-red-500">{errors.address[index]?.country?.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      <Button type="button" variant="outline" size="sm" onClick={handleAddAddress} className="mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Address
      </Button>
    </div>
  )
}
