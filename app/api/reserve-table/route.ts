import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, date, time, guests, specialRequests } = data
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create table reservation
    const reservationData = {
      name,
      email,
      phone,
      date: Timestamp.fromDate(new Date(date)),
      time,
      guests: parseInt(guests),
      specialRequests: specialRequests || '',
      status: 'confirmed',
      createdAt: Timestamp.now(),
      reservationId: `TR${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    }

    const docRef = await addDoc(collection(db, 'tableReservations'), reservationData)

    return NextResponse.json({
      success: true,
      reservationId: reservationData.reservationId,
      message: 'Table reservation confirmed successfully!'
    })
  } catch (error) {
    console.error('Table reservation error:', error)
    return NextResponse.json(
      { error: 'Failed to create table reservation' },
      { status: 500 }
    )
  }
} 