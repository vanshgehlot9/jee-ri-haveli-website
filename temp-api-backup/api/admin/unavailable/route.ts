import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const unavailable = await db.collection("unavailable").find({}).sort({ start: 1 }).toArray()
    return NextResponse.json({ success: true, unavailable })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { roomType, start, end, reason } = data
    if (!roomType || !start || !end) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    // Check for overlap
    const overlap = await db.collection("unavailable").findOne({
      roomType,
      $or: [
        { start: { $lte: end }, end: { $gte: start } },
        { start: { $gte: start, $lte: end } },
        { end: { $gte: start, $lte: end } }
      ]
    })
    if (overlap) {
      return NextResponse.json({ error: "Room already unavailable for selected dates." }, { status: 409 })
    }
    await db.collection("unavailable").insertOne({ roomType, start, end, reason, createdAt: new Date() })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 