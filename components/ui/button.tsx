"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md rounded-full hover:from-amber-600 hover:to-orange-600 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md rounded-full hover:from-red-600 hover:to-orange-600 active:scale-95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full",
        secondary:
          "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 shadow rounded-full hover:from-gray-300 hover:to-gray-500 active:scale-95",
        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-full",
        link:
          "underline-offset-4 hover:underline text-primary rounded-full",
      },
      size: {
        default: "h-10 px-6 py-2 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<typeof motion.button>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
