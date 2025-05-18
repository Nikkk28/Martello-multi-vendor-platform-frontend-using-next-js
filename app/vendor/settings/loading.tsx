import { Loader2 } from "lucide-react"

export default function VendorSettingsLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    </div>
  )
}
