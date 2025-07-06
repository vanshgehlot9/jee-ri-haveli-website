import { NextRequest, NextResponse } from "next/server"
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const floorAvailability = await req.json()
    
    // Save floor availability to Firestore
    const floorAvailabilityRef = doc(db, 'settings', 'floorAvailability')
    await setDoc(floorAvailabilityRef, floorAvailability, { merge: true })

    return NextResponse.json({ success: true, message: 'Floor availability updated successfully' })
  } catch (error) {
    console.error('Error updating floor availability:', error)
    return NextResponse.json({ error: 'Failed to update floor availability' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get current floor availability from Firestore
    const floorAvailabilityRef = doc(db, 'settings', 'floorAvailability')
    const floorAvailabilityDoc = await getDoc(floorAvailabilityRef)
    
    if (floorAvailabilityDoc.exists()) {
      return NextResponse.json(floorAvailabilityDoc.data())
    } else {
      // Return default floor availability if not set
      const defaultAvailability = {
        "Ground Floor": {
          "Deluxe Room": { available: 2, total: 3 },
          "Standard Room": { available: 1, total: 2 },
          "Standard Room without Balcony": { available: 2, total: 3 }
        },
        "First Floor": {
          "Deluxe Room": { available: 3, total: 4 },
          "Standard Room": { available: 2, total: 3 },
          "Standard Room without Balcony": { available: 1, total: 2 }
        },
        "Second Floor": {
          "Deluxe Room": { available: 1, total: 2 },
          "Standard Room": { available: 2, total: 2 },
          "Standard Room without Balcony": { available: 3, total: 4 }
        }
      }
      return NextResponse.json(defaultAvailability)
    }
  } catch (error) {
    console.error('Error fetching floor availability:', error)
    return NextResponse.json({ error: 'Failed to fetch floor availability' }, { status: 500 })
  }
} 