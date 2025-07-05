import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const bookings = await db.collection("bookings").find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json({ success: true, bookings })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 