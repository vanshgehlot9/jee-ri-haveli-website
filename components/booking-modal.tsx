"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBookingModal } from "@/components/layout-wrapper"

interface BookingModalProps {
  rooms: Array<{ name: string; price: string }>
  initialForm?: {
    checkIn: string
    checkOut: string
    roomType: string
    guests: number
    name: string
    email: string
    phone: string
  }
}

export default function BookingModal({ rooms, initialForm }: BookingModalProps) {
  const { setOpenBookingModal } = useBookingModal()
  const [form, setForm] = useState({
    checkIn: initialForm?.checkIn || "",
    checkOut: initialForm?.checkOut || "",
    roomType: initialForm?.roomType || rooms[0]?.name || "",
    guests: initialForm?.guests || 2,
    name: initialForm?.name || "",
    email: initialForm?.email || "",
    phone: initialForm?.phone || ""
  })
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === "guests" ? parseInt(value) : value }))
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setBookingStatus(null)
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setBookingStatus("Booking successful! Check your email for confirmation.")
        setForm({
          checkIn: "",
          checkOut: "",
          roomType: rooms[0]?.name || "",
          guests: 2,
          name: "",
          email: "",
          phone: ""
        })
        // Close modal after successful booking
        setTimeout(() => {
          setOpenBookingModal(false)
        }, 2000)
      } else {
        setBookingStatus(data.error || "Booking failed.")
      }
    } catch {
      setBookingStatus("Booking failed. Please try again later.")
    }
    setLoading(false)
  }

  return (
    <Dialog open={true} onOpenChange={() => setOpenBookingModal(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Your Stay</DialogTitle>
        </DialogHeader>
        <form className="space-y-2" onSubmit={handleBooking}>
          <div>
            <label className="text-xs font-medium text-gray-600">Check In</label>
            <input type="date" name="checkIn" value={form.checkIn} onChange={handleFormChange} required className="w-full p-1 border rounded text-xs" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Check Out</label>
            <input type="date" name="checkOut" value={form.checkOut} onChange={handleFormChange} required className="w-full p-1 border rounded text-xs" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Room Type</label>
            <select name="roomType" value={form.roomType} onChange={handleFormChange} className="w-full p-1 border rounded text-xs">
              {rooms.map((room) => (
                <option key={room.name} value={room.name}>{room.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Guests</label>
            <input type="number" name="guests" min={1} value={form.guests} onChange={handleFormChange} className="w-full p-1 border rounded text-xs" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleFormChange} required className="w-full p-1 border rounded text-xs" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleFormChange} required className="w-full p-1 border rounded text-xs" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} required className="w-full p-1 border rounded text-xs" />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-2 rounded-lg text-xs font-bold" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
          {bookingStatus && (
            <div className="text-center text-xs mt-1 text-amber-700 font-semibold">{bookingStatus}</div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
} 