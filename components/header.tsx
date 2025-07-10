"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { MessageCircle } from 'lucide-react';
import { useState } from "react";

interface HeaderProps {
  onBookNowClick?: () => void
}

export default function Header({ onBookNowClick }: HeaderProps) {
  const [showGallery, setShowGallery] = useState(false);
  return (
    <>
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
                { label: "Restaurant", href: "/restaurant" },
                { label: "Places to Visit", href: "/places-to-visit" },
                { label: "Experience", href: "/experience" },
                { label: "Celebrities", href: "/celebrities" },
                { label: "Book Now", href: "/book" },
                { label: "Location", href: "/location" },
                { label: "Contact", href: "/contact" },
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
              <Link href="/book">
                <Button 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-full shadow-lg" 
                >
                  Book Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919351733007"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[100] bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center w-16 h-16 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.824-2.05C13.41 27.633 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.337-.207-3.433-.615l-.245-.09-4.646 1.217 1.24-4.527-.16-.234C7.21 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-7.75c-.277-.139-1.637-.809-1.89-.902-.253-.093-.437-.139-.62.14-.184.277-.71.902-.87 1.086-.16.185-.32.208-.597.07-.277-.139-1.17-.431-2.23-1.375-.824-.735-1.38-1.64-1.542-1.917-.16-.277-.017-.427.122-.566.126-.125.277-.32.416-.48.139-.16.185-.277.277-.462.093-.185.047-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.539-.453-.466-.62-.475l-.53-.009c-.17 0-.446.063-.68.277-.232.215-.88.86-.88 2.096 0 1.236.902 2.43 1.028 2.597.126.162 1.775 2.71 4.3 3.693.602.207 1.07.33 1.436.422.603.153 1.153.132 1.588.08.484-.057 1.637-.668 1.87-1.312.232-.645.232-1.197.162-1.312-.07-.115-.253-.185-.53-.324z" />
        </svg>
      </a>
    </>
  )
} 