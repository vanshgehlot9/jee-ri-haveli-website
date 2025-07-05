import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { checkIn, checkOut, roomType, guests, name, email, phone, specialRequests, checkOnly } = data
    if (!checkIn || !checkOut || !roomType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for conflicting bookings
    const bookingsRef = collection(db, 'bookings')
    const q = query(
      bookingsRef,
      where('roomType', '==', roomType),
      where('status', '==', 'confirmed')
    )
    
    const querySnapshot = await getDocs(q)
    const conflictingBookings = querySnapshot.docs.filter(doc => {
      const booking = doc.data()
      const bookingCheckIn = booking.checkIn.toDate()
      const bookingCheckOut = booking.checkOut.toDate()
      const newCheckIn = new Date(checkIn)
      const newCheckOut = new Date(checkOut)
      
      return (
        (newCheckIn >= bookingCheckIn && newCheckIn < bookingCheckOut) ||
        (newCheckOut > bookingCheckIn && newCheckOut <= bookingCheckOut) ||
        (newCheckIn <= bookingCheckIn && newCheckOut >= bookingCheckOut)
      )
    })

    if (checkOnly) {
      if (conflictingBookings.length > 0) {
        return NextResponse.json({ available: false, error: 'Room is not available for the selected dates' })
      }
      return NextResponse.json({ available: true })
    }

    // Validate required fields for booking
    if (!name || !email || !phone || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (conflictingBookings.length > 0) {
      return NextResponse.json({ error: 'Room is not available for the selected dates' }, { status: 409 })
    }

    // Create new booking
    const bookingData = {
      name,
      email,
      phone,
      checkIn: Timestamp.fromDate(new Date(checkIn)),
      checkOut: Timestamp.fromDate(new Date(checkOut)),
      guests: parseInt(guests),
      roomType,
      specialRequests: specialRequests || '',
      status: 'confirmed',
      createdAt: Timestamp.now(),
      bookingId: `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    }

    const docRef = await addDoc(collection(db, 'bookings'), bookingData)

    return NextResponse.json({
      success: true,
      bookingId: bookingData.bookingId,
      message: 'Booking confirmed successfully!'
    })
  } catch (e) {
    console.error('Booking error:', e)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
} 