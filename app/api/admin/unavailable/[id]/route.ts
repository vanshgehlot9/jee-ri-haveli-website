import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("jeerihaveli")
    const { id } = params
    const result = await db.collection("unavailable").deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Unavailable period not found" }, { status: 404 })
    }
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 