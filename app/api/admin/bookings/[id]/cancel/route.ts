import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, updateDoc, getDoc } from "firebase/firestore"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    // Check if booking exists
    const bookingRef = doc(db, "bookings", id)
    const bookingSnap = await getDoc(bookingRef)
    
    if (!bookingSnap.exists()) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }
    
    // Update the booking to mark as cancelled
    await updateDoc(bookingRef, {
      cancelled: true,
      cancelledAt: new Date()
    })
    
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error cancelling booking:", e)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 