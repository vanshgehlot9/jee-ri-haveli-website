import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore'

export async function GET() {
  try {
    const bookingsRef = collection(db, 'bookings')
    const q = query(bookingsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      checkIn: doc.data().checkIn?.toDate?.() || doc.data().checkIn,
      checkOut: doc.data().checkOut?.toDate?.() || doc.data().checkOut,
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }))

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json()
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const bookingRef = doc(db, 'bookings', id)
    await updateDoc(bookingRef, { status })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
} 