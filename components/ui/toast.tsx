"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "error"
}

const typeColors = {
  info: "border-blue-500",
  success: "border-green-500",
  warning: "border-yellow-500",
  error: "border-red-500"
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, type = "info", children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className={cn(
        "flex items-center gap-3 rounded-xl shadow-lg bg-white p-4 border-l-4",
        typeColors[type],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
})
Toast.displayName = "Toast"

export { Toast }
