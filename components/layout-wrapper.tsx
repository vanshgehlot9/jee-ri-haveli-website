"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import BookingModal from "@/components/booking-modal"
import { createContext, useContext, useState } from "react"

// Create context for booking modal
interface BookingContextType {
  openBookingModal: () => void
  setOpenBookingModal: (open: boolean) => void
  isBookingModalOpen: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBookingModal = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingProvider")
  }
  return context
}

function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true)
  }

  const handleSetOpenBookingModal = (open: boolean) => {
    setIsBookingModalOpen(open)
  }

  return (
    <BookingContext.Provider value={{ 
      openBookingModal: handleOpenBookingModal, 
      setOpenBookingModal: handleSetOpenBookingModal,
      isBookingModalOpen
    }}>
      {children}
    </BookingContext.Provider>
  )
}

function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { openBookingModal, isBookingModalOpen } = useBookingModal()
  
  // Don't show header on admin pages
  const showHeader = !pathname?.startsWith('/admin')

  // Sample rooms data for the booking modal
  const rooms = [
    { name: "Deluxe Room ", price: "₹2,500" },
    { name: "Standard Room", price: "₹1,800" }
  ]

  return (
    <>
      {showHeader && <Header onBookNowClick={openBookingModal} />}
      {isBookingModalOpen && <BookingModal rooms={rooms} />}
      {children}
    </>
  )
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      <HeaderWrapper>{children}</HeaderWrapper>
    </BookingProvider>
  )
} 