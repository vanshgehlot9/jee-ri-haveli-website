import React from "react";
import Link from "next/link";

export default function AmenitiesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Amenities</h1>
      <p className="text-gray-700 mb-6">We provide the following amenities to make your stay comfortable:</p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Free Wi-Fi</li>
        <li>Rooftop restaurant</li>
        <li>24/7 Room Service</li>
        <li>Airport transfers (on request)</li>
      </ul>
      <Link href="/contact" className="inline-block mt-6 text-amber-400 hover:underline">Contact Us</Link>
    </main>
  );
}
