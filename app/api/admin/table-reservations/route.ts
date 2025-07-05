import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    const reservationsRef = collection(db, 'tableReservations');
    const q = query(reservationsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const reservations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || doc.data().date,
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }));

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching table reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch table reservations' }, { status: 500 });
  }
} 