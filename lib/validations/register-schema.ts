import { z } from "zod"

// Address schema
export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
  isDefault: z.boolean().default(true),
})

// Define role enum
export const UserRole = z.enum(["CUSTOMER", "VENDOR", "ADMIN"])
export type UserRoleType = z.infer<typeof UserRole>

// Vendor profile schema (conditional)
export const vendorProfileSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(1, "Business description is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
})

// Step schemas for multi-step form validation
export const baseInfoSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const contactDetailsSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address: z.array(addressSchema).min(1, "At least one address is required"),
})

export const accountTypeSchema = z.object({
  role: UserRole,
})

// Combined schema for the entire form
export const registerSchema = z
  .object({
    // Basic info
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),

    // Contact details
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z.array(addressSchema).min(1, "At least one address is required"),

    // Account type
    role: UserRole,

    // Vendor profile (optional based on role)
    vendorProfile: z
      .object({
        businessName: z.string(),
        businessDescription: z.string(),
        contactPhone: z.string(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "VENDOR") {
        return (
          !!data.vendorProfile?.businessName &&
          !!data.vendorProfile?.businessDescription &&
          !!data.vendorProfile?.contactPhone
        )
      }
      return true
    },
    {
      message: "Vendor profile is required for vendor accounts",
      path: ["vendorProfile"],
    },
  )

export type RegisterFormValues = z.infer<typeof registerSchema>
