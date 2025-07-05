import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, date, time, guests } = data
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    await db.collection("table_reservations").insertOne({
      name,
      email,
      phone,
      date,
      time,
      guests,
      createdAt: new Date()
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 