"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Save, Bell, Lock, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { updateVendorProfile, updateVendorPassword } from "@/lib/api/vendor"

// Business profile schema
const businessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

// Password change schema
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function VendorSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    productUpdates: true,
    accountAlerts: true,
    marketingEmails: false,
  })

  // Business profile form
  const businessProfileForm = useForm<z.infer<typeof businessProfileSchema>>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: user?.vendorProfile?.businessName || "",
      description: user?.vendorProfile?.businessDescription || "",
      contactEmail: user?.email || "",
      contactPhone: user?.vendorProfile?.contactPhone || "",
      address: "",
    },
  })

  // Password change form
  const passwordChangeForm = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Handle business profile update
  const onUpdateProfile = async (values: z.infer<typeof businessProfileSchema>) => {
    setIsUpdatingProfile(true)
    try {
      await updateVendorProfile(values)
      toast({
        title: "Profile Updated",
        description: "Your business profile has been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Handle password change
  const onUpdatePassword = async (values: z.infer<typeof passwordChangeSchema>) => {
    setIsUpdatingPassword(true)
    try {
      await updateVendorPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "default",
      })
      passwordChangeForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Handle notification settings update
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] }

      // In a real app, you would save these settings to the backend here
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
        variant: "default",
      })

      return newSettings
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Vendor Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Business Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Update your business information visible to customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...businessProfileForm}>
                <form
                  id="profile-form"
                  onSubmit={businessProfileForm.handleSubmit(onUpdateProfile)}
                  className="space-y-6"
                >
                  <FormField
                    control={businessProfileForm.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Business Name" {...field} />
                        </FormControl>
                        <FormDescription>This is the name that will be displayed to customers.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={businessProfileForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your business and what makes your products special..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This description will appear on your vendor profile page.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={businessProfileForm.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@yourbusiness.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={businessProfileForm.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={businessProfileForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your business address..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                form="profile-form"
                disabled={isUpdatingProfile}
                className="gap-2 transition-all hover:scale-105"
              >
                {isUpdatingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                {isUpdatingProfile ? "Saving Changes..." : "Save Changes"}
                {!isUpdatingProfile && <Save className="h-4 w-4 ml-1" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password to maintain security.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordChangeForm}>
                <form
                  id="password-form"
                  onSubmit={passwordChangeForm.handleSubmit(onUpdatePassword)}
                  className="space-y-6"
                >
                  <FormField
                    control={passwordChangeForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordChangeForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>Password must be at least 8 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordChangeForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                form="password-form"
                disabled={isUpdatingPassword}
                className="gap-2 transition-all hover:scale-105"
              >
                {isUpdatingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
                {isUpdatingPassword ? "Updating Password..." : "Update Password"}
                {!isUpdatingPassword && <Lock className="h-4 w-4 ml-1" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Order Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications when you get new orders</p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={() => handleNotificationChange("orderNotifications")}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Product Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified about product inventory changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.productUpdates}
                    onCheckedChange={() => handleNotificationChange("productUpdates")}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Account Alerts</h4>
                    <p className="text-sm text-muted-foreground">Security and account-related notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.accountAlerts}
                    onCheckedChange={() => handleNotificationChange("accountAlerts")}
                  />
                </div>
                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">Receive tips, promotions, and platform updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationChange("marketingEmails")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
