import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore'

export async function GET(req: NextRequest) {
  try {
    const unavailableRef = collection(db, 'unavailable')
    const querySnapshot = await getDocs(unavailableRef)
    const unavailable = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      start: doc.data().start?.toDate?.() || doc.data().start,
      end: doc.data().end?.toDate?.() || doc.data().end,
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }))
    // Sort by start date
    unavailable.sort((a, b) => new Date(a.start) - new Date(b.start))
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
    // Check for overlap
    const unavailableRef = collection(db, 'unavailable')
    const q = query(unavailableRef, where('roomType', '==', roomType))
    const querySnapshot = await getDocs(q)
    const overlap = querySnapshot.docs.find(doc => {
      const u = doc.data()
      const uStart = u.start?.toDate?.() || new Date(u.start)
      const uEnd = u.end?.toDate?.() || new Date(u.end)
      const newStart = new Date(start)
      const newEnd = new Date(end)
      return (
        (uStart <= newEnd && uEnd >= newStart) ||
        (uStart >= newStart && uStart <= newEnd) ||
        (uEnd >= newStart && uEnd <= newEnd)
      )
    })
    if (overlap) {
      return NextResponse.json({ error: "Room already unavailable for selected dates." }, { status: 409 })
    }
    await addDoc(unavailableRef, {
      roomType,
      start: Timestamp.fromDate(new Date(start)),
      end: Timestamp.fromDate(new Date(end)),
      reason: reason || '',
      createdAt: Timestamp.now()
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
} 