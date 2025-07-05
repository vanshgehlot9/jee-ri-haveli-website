import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const reservations = await db.collection("table_reservations").find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json({ success: true, reservations })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 