"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessAnimation() {
  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-lg">
      <CardContent className="flex flex-col items-center justify-center p-12">
        <motion.div
          className="relative flex items-center justify-center w-24 h-24 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-green-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-green-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Check className="w-12 h-12 text-green-500" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl font-bold text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Registration Successful!
        </motion.h2>

        <motion.p
          className="text-center text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Your account has been created successfully.
          <br />
          Redirecting you to login...
        </motion.p>
      </CardContent>
    </Card>
  )
}
