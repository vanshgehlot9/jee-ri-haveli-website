import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { checkIn, checkOut, roomType, adults, children, name, email, phone } = data
    if (!checkIn || !checkOut || !roomType || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const bookings = db.collection("bookings")
    const unavailable = db.collection("unavailable")

    // Check for overlapping unavailable periods
    const unavail = await unavailable.findOne({
      roomType,
      $or: [
        { start: { $lte: checkOut }, end: { $gte: checkIn } },
        { start: { $gte: checkIn, $lte: checkOut } },
        { end: { $gte: checkIn, $lte: checkOut } }
      ]
    })
    if (unavail) {
      return NextResponse.json({ error: "Room is unavailable for selected dates." }, { status: 409 })
    }

    // Check for overlapping bookings for the same room type
    const overlap = await bookings.findOne({
      roomType,
      cancelled: { $ne: true },
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } },
        { checkIn: { $gte: checkIn, $lte: checkOut } },
        { checkOut: { $gte: checkIn, $lte: checkOut } }
      ]
    })
    if (overlap) {
      return NextResponse.json({ error: "Room not available for selected dates." }, { status: 409 })
    }

    // Save booking
    await bookings.insertOne({
      checkIn,
      checkOut,
      roomType,
      adults,
      children,
      name,
      email,
      phone,
      createdAt: new Date()
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 