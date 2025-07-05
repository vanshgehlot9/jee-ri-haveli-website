import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const { id } = params
    
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 })
    }
    
    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { cancelled: true, cancelledAt: new Date() } }
    )
    
    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Booking not found or already cancelled" }, { status: 404 })
    }
  } catch (error) {
    console.error("Cancel booking error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 