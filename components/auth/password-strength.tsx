"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const calculateStrength = () => {
      if (!password) {
        setStrength(0)
        setMessage("")
        return
      }

      let score = 0

      // Length check
      if (password.length >= 8) score += 1
      if (password.length >= 12) score += 1

      // Character variety checks
      if (/[A-Z]/.test(password)) score += 1
      if (/[a-z]/.test(password)) score += 1
      if (/[0-9]/.test(password)) score += 1
      if (/[^A-Za-z0-9]/.test(password)) score += 1

      // Set strength based on score
      const normalizedStrength = Math.min(Math.floor((score / 6) * 4), 4)
      setStrength(normalizedStrength)

      // Set message based on strength
      switch (normalizedStrength) {
        case 0:
          setMessage("Very weak")
          break
        case 1:
          setMessage("Weak")
          break
        case 2:
          setMessage("Fair")
          break
        case 3:
          setMessage("Good")
          break
        case 4:
          setMessage("Strong")
          break
        default:
          setMessage("")
      }
    }

    calculateStrength()
  }, [password])

  // Get color based on strength
  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-400"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      <div className="flex h-2 w-full space-x-1 rounded-full bg-gray-100">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-full flex-1 rounded-full ${i < strength ? getColor() : "bg-gray-200"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i < strength ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span
          className={`font-medium ${strength > 2 ? "text-green-500" : strength > 0 ? "text-yellow-500" : "text-red-500"}`}
        >
          {message}
        </span>
      </div>
    </div>
  )
}
