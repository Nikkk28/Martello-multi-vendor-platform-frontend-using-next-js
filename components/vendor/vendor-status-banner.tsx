import type { VendorStatus } from "@/types/vendor"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface VendorStatusBannerProps {
  status: VendorStatus
  rejectionReason?: string
}

export function VendorStatusBanner({ status, rejectionReason }: VendorStatusBannerProps) {
  const statusConfig = {
    ACTIVE: {
      icon: CheckCircle,
      title: "Account Approved",
      description: "Your vendor account is approved and active. You can now add products and manage orders.",
      variant: "default" as const,
      className: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
      iconClassName: "text-green-500",
    },
    PENDING: {
      icon: Clock,
      title: "Account Pending Approval",
      description: "Your vendor account is currently under review. You'll be notified once it's approved.",
      variant: "default" as const,
      className: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900",
      iconClassName: "text-yellow-500",
    },
    REJECTED: {
      icon: AlertCircle,
      title: "Account Rejected",
      description:
        rejectionReason ||
        "Your vendor account application has been rejected. Please contact support for more information.",
      variant: "destructive" as const,
      className: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
      iconClassName: "text-red-500",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Alert variant={config.variant} className={cn("mb-6 transition-all animate-fadeIn", config.className)}>
      <Icon className={cn("h-5 w-5", config.iconClassName)} />
      <AlertTitle className="ml-2">{config.title}</AlertTitle>
      <AlertDescription className="ml-2">{config.description}</AlertDescription>
    </Alert>
  )
}
