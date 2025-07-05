"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onBookNowClick: () => void
}

export default function Header({ onBookNowClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-amber-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Jee Ri Haveli
              </h1>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Home", href: "/" },
              { label: "Restaurant", href: "/#restaurant" },
              { label: "Experience", href: "/experience" },
              { label: "Celebrities", href: "/celebrities" },
              { label: "Booking", href: "/#rooms" },
              { label: "Location", href: "/location" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 text-sm"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 text-sm"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-full shadow-lg" 
              onClick={onBookNowClick}
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
} 