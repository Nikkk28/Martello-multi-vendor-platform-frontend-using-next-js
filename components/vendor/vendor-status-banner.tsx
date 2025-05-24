"use client"

import React from "react"

interface VendorStatusBannerProps {
  status: "PENDING" | "APPROVED" | "REJECTED"
}

export function VendorStatusBanner({ status }: VendorStatusBannerProps) {
  const { bgColor, textColor, message } = getStatusStyles(status)

  return (
    <div className={`rounded-md px-4 py-3 text-sm font-medium ${bgColor} ${textColor}`}>
      {message}
    </div>
  )
}

function getStatusStyles(status: VendorStatusBannerProps["status"]) {
  switch (status) {
    case "APPROVED":
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        message: "✅ Your vendor account is approved and fully active.",
      }
    case "PENDING":
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        message: "⏳ Your vendor account is pending admin approval.",
      }
    case "REJECTED":
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        message: "❌ Your vendor account was rejected. Please contact support.",
      }
    default:
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        message: "Unknown vendor status.",
      }
  }
}
