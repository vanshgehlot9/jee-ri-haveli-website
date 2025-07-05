import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { doc, deleteDoc } from 'firebase/firestore'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const unavailableRef = doc(db, 'unavailable', id)
    await deleteDoc(unavailableRef)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 