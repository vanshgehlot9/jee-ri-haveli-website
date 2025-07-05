"use client"

export default function HotelPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Hotel Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Check-In and Check-Out</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li><strong>Check-In:</strong> 2:00 PM</li>
            <li><strong>Check-Out:</strong> 11:00 AM. Kindly return your room key to the reception desk at check-out.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Food and Beverages</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>The hotel offers a variety of on-site dining options for your convenience and enjoyment.</li>
            <li><strong>Outside food and beverages are strictly prohibited</strong> within the hotel premises.</li>
            <li>In-room dining services are not available. Please use our restaurant and café for dining needs.</li>
            <li>Delivery from third-party food services (e.g., Swiggy, Zomato) is not permitted on hotel grounds.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Room Service and Housekeeping</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>If you require housekeeping or room service, please leave your room key at the reception. Our staff will attend to your request promptly.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Child Policy</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>Children below 7 years of age may stay free of charge when sharing a room without the need for an extra bed.</li>
            <li>Children aged 7 years and above will be considered as an additional guest and charged accordingly.</li>
          </ul>
        </section>
        <section>
          <p className="text-gray-700 text-lg">We appreciate your understanding and cooperation in adhering to the above regulations. These policies are in place to ensure a safe, comfortable, and enjoyable stay for all our valued guests.</p>
        </section>
      </div>
    </div>
  )
} 