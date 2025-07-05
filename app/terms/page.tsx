"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Terms & Conditions</h1>
        <ol className="list-decimal pl-6 text-gray-700 text-lg space-y-4">
          <li>
            <strong>Reservation and Payment</strong>
            <ul className="list-disc pl-6">
              <li>All bookings are subject to availability and confirmation.</li>
              <li>A confirmed reservation will be considered binding and is non-transferable.</li>
              <li>Full payment is required at the time of booking unless otherwise agreed upon in writing.</li>
              <li>Prices are subject to applicable taxes and service charges as per government regulations.</li>
            </ul>
          </li>
          <li>
            <strong>Cancellation and No-Show</strong>
            <ul className="list-disc pl-6">
              <li>In the event of a cancellation at any time after booking confirmation, the full amount will be charged.</li>
              <li>No refunds will be issued for cancellations, late arrivals, or early departures.</li>
              <li>Failure to check-in (no-show) will result in the full booking amount being charged.</li>
            </ul>
          </li>
          <li>
            <strong>Check-In and Check-Out</strong>
            <ul className="list-disc pl-6">
              <li>Check-In Time: 2:00 PM</li>
              <li>Check-Out Time: 11:00 AM</li>
              <li>Late check-outs may be subject to additional charges and are subject to availability.</li>
            </ul>
          </li>
          <li>
            <strong>Guest Identification</strong>
            <ul className="list-disc pl-6">
              <li>All guests must present a valid government-issued photo ID at the time of check-in.</li>
              <li>Foreign nationals must present a valid passport and visa.</li>
            </ul>
          </li>
          <li>
            <strong>Damage and Loss</strong>
            <ul className="list-disc pl-6">
              <li>Guests will be held responsible for any loss or damage to hotel property caused by them or by anyone in their party.</li>
              <li>The hotel reserves the right to charge the cost of any repairs or replacements directly to the guest.</li>
            </ul>
          </li>
          <li>
            <strong>Smoking and Alcohol</strong>
            <ul className="list-disc pl-6">
              <li>Smoking is permitted only in designated areas. A cleaning fee will be charged for smoking in non-smoking rooms.</li>
              <li>Consumption of alcohol is allowed only in accordance with local laws and within permitted hotel areas.</li>
            </ul>
          </li>
          <li>
            <strong>Outside Food and Deliveries</strong>
            <ul className="list-disc pl-6">
              <li>The hotel strictly prohibits outside food and beverages on the premises.</li>
              <li>Online food delivery services (e.g., Swiggy, Zomato) are not permitted.</li>
            </ul>
          </li>
          <li>
            <strong>Child Policy</strong>
            <ul className="list-disc pl-6">
              <li>Children below 7 years may stay free without an extra bed.</li>
              <li>Children 7 years and older will be charged as an additional guest.</li>
            </ul>
          </li>
          <li>
            <strong>Liability</strong>
            <ul className="list-disc pl-6">
              <li>The hotel is not responsible for loss or damage of guest belongings.</li>
              <li>Guests are advised to use the safety deposit facilities provided.</li>
              <li>The hotel will not be liable for any injury, loss, or damage suffered by any person during their stay.</li>
            </ul>
          </li>
          <li>
            <strong>Right to Refuse Service</strong>
            <ul className="list-disc pl-6">
              <li>The hotel reserves the right to refuse accommodation or service to any guest who behaves inappropriately or fails to comply with hotel policies.</li>
            </ul>
          </li>
          <li>
            <strong>Force Majeure</strong>
            <ul className="list-disc pl-6">
              <li>The hotel shall not be held liable for failure to perform obligations due to circumstances beyond its control, including but not limited to natural disasters, government restrictions, strikes, or pandemics.</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  )
} 