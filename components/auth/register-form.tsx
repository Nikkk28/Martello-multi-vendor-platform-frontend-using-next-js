"use client"

import { useState } from "react"
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

import {
  registerSchema,
  baseInfoSchema,
  contactDetailsSchema,
  accountTypeSchema,
  vendorProfileSchema,
  type RegisterFormValues,
  type UserRoleType,
} from "@/lib/validations/register-schema"
import { AddressForm } from "./address-form"
import { PasswordStrength } from "./password-strength"
import { SuccessAnimation } from "./success-animation"

// Step titles and descriptions
const steps = [
  {
    title: "Personal Information",
    description: "Let's start with your basic details",
  },
  {
    title: "Contact Details",
    description: "How can we reach you?",
  },
  {
    title: "Account Type",
    description: "Select your account type",
  },
  {
    title: "Vendor Details",
    description: "Tell us about your business",
  },
  {
    title: "Review & Submit",
    description: "Verify your information",
  },
]

// Step 1: Personal Information Form
const PersonalInfoForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>()
  const [passwordValue, setPasswordValue] = useState("")

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                id="firstName"
                placeholder="John"
                {...field}
                className={errors.firstName ? "border-red-500" : ""}
              />
            )}
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input id="lastName" placeholder="Doe" {...field} className={errors.lastName ? "border-red-500" : ""} />
            )}
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...field}
              className={errors.email ? "border-red-500" : ""}
            />
          )}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...field}
              onChange={(e) => {
                field.onChange(e)
                setPasswordValue(e.target.value)
              }}
              className={errors.password ? "border-red-500" : ""}
            />
          )}
        />
        <PasswordStrength password={passwordValue} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...field}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
          )}
        />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
      </div>
    </div>
  )
}

// Step 2: Contact Details Form
const ContactDetailsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Input
              id="phoneNumber"
              placeholder="1234567890"
              {...field}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
          )}
        />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Shipping Address</Label>
        <AddressForm />
        {errors.address && <p className="text-sm text-red-500">At least one address is required</p>}
      </div>
    </div>
  )
}

// Step 3: Account Type Form
const AccountTypeForm = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<RegisterFormValues>()
  const role = watch("role")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Account Type</Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={(value) => field.onChange(value as UserRoleType)}
              className="grid grid-cols-1 gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CUSTOMER" id="customer" className="peer sr-only" />
                <Label
                  htmlFor="customer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-2 p-2 rounded-full bg-primary/10">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Customer</p>
                    <p className="text-sm text-muted-foreground">Shop and purchase products</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="VENDOR" id="vendor" className="peer sr-only" />
                <Label
                  htmlFor="vendor"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-2 p-2 rounded-full bg-primary/10">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Vendor</p>
                    <p className="text-sm text-muted-foreground">Sell products on our platform</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
      </div>
    </div>
  )
}

// Step 4: Vendor Details Form (conditional)
const VendorDetailsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Controller
          name="vendorProfile.businessName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id="businessName"
              placeholder="Your Business Name"
              {...field}
              className={errors.vendorProfile?.businessName ? "border-red-500" : ""}
            />
          )}
        />
        {errors.vendorProfile?.businessName && (
          <p className="text-sm text-red-500">{errors.vendorProfile.businessName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <Controller
          name="vendorProfile.businessDescription"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              id="businessDescription"
              placeholder="Tell us about your business"
              {...field}
              className={errors.vendorProfile?.businessDescription ? "border-red-500" : ""}
            />
          )}
        />
        {errors.vendorProfile?.businessDescription && (
          <p className="text-sm text-red-500">{errors.vendorProfile.businessDescription.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Business Contact Phone</Label>
        <Controller
          name="vendorProfile.contactPhone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id="contactPhone"
              placeholder="Business Contact Number"
              {...field}
              className={errors.vendorProfile?.contactPhone ? "border-red-500" : ""}
            />
          )}
        />
        {errors.vendorProfile?.contactPhone && (
          <p className="text-sm text-red-500">{errors.vendorProfile.contactPhone.message}</p>
        )}
      </div>
    </div>
  )
}

// Step 5: Review Form
const ReviewForm = () => {
  const { watch } = useFormContext<RegisterFormValues>()
  const formData = watch()
  const isVendor = formData.role === "VENDOR"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="rounded-lg border p-4 bg-muted/30">
          <dl className="divide-y">
            <div className="grid grid-cols-3 py-2">
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd className="col-span-2">
                {formData.firstName} {formData.lastName}
              </dd>
            </div>
            <div className="grid grid-cols-3 py-2">
              <dt className="font-medium text-muted-foreground">Email</dt>
              <dd className="col-span-2">{formData.email}</dd>
            </div>
            <div className="grid grid-cols-3 py-2">
              <dt className="font-medium text-muted-foreground">Phone</dt>
              <dd className="col-span-2">{formData.phoneNumber}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Address Information</h3>
        <div className="rounded-lg border p-4 bg-muted/30">
          {formData.address?.map((address, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <p className="font-medium">{address.isDefault ? "Default Address" : `Address ${index + 1}`}</p>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Account Type</h3>
        <div className="rounded-lg border p-4 bg-muted/30">
          <p>{formData.role}</p>
        </div>
      </div>

      {isVendor && formData.vendorProfile && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Vendor Information</h3>
          <div className="rounded-lg border p-4 bg-muted/30">
            <dl className="divide-y">
              <div className="grid grid-cols-3 py-2">
                <dt className="font-medium text-muted-foreground">Business Name</dt>
                <dd className="col-span-2">{formData.vendorProfile.businessName}</dd>
              </div>
              <div className="grid grid-cols-3 py-2">
                <dt className="font-medium text-muted-foreground">Business Phone</dt>
                <dd className="col-span-2">{formData.vendorProfile.contactPhone}</dd>
              </div>
              <div className="grid grid-cols-1 py-2">
                <dt className="font-medium text-muted-foreground">Business Description</dt>
                <dd className="mt-2">{formData.vendorProfile.businessDescription}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Register Form Component
export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: [{ street: "", city: "", state: "", zipCode: "", country: "", isDefault: true }],
      role: "CUSTOMER",
      vendorProfile: {
        businessName: "",
        businessDescription: "",
        contactPhone: "",
      },
    },
    mode: "onChange",
  })

  const { handleSubmit, trigger, watch } = methods
  const role = watch("role")

  // Determine if we should show the vendor details step
  const shouldShowVendorStep = role === "VENDOR"

  // Adjust total steps based on role
  const totalSteps = shouldShowVendorStep ? 5 : 4

  // Get the actual step component based on current step and role
  const getStepComponent = (step: number) => {
    if (step === 0) return <PersonalInfoForm />
    if (step === 1) return <ContactDetailsForm />
    if (step === 2) return <AccountTypeForm />

    // For vendor role, step 3 is vendor details and step 4 is review
    // For customer role, step 3 is review (skip vendor details)
    if (shouldShowVendorStep) {
      if (step === 3) return <VendorDetailsForm />
      if (step === 4) return <ReviewForm />
    } else {
      if (step === 3) return <ReviewForm />
    }

    return null
  }

  // Get validation schema for current step
  const getValidationSchema = (step: number) => {
    if (step === 0) return baseInfoSchema
    if (step === 1) return contactDetailsSchema
    if (step === 2) return accountTypeSchema
    if (step === 3 && shouldShowVendorStep) return vendorProfileSchema
    return null
  }

  // Handle next step
  const handleNext = async () => {
    const schema = getValidationSchema(currentStep)

    if (schema) {
      const isValid = await trigger(Object.keys(schema.shape) as any)
      if (!isValid) return
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", data)

      // Show success state
      setIsSuccess(true)

      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
        variant: "default",
      })

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If registration is successful, show success animation
  if (isSuccess) {
    return <SuccessAnimation />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="relative">
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>

            {/* Progress indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted overflow-hidden rounded-t-lg">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>

            {/* Step indicator */}
            <div className="absolute top-4 right-6 text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </CardHeader>

          <CardContent className="pt-2 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {getStepComponent(currentStep)}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < totalSteps - 1 ? (
              <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="relative">
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Create Account</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </span>
                  </>
                ) : (
                  <>
                    Create Account
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
