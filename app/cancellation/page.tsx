"use client"

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Cancellation Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Cancellations & No-Show</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>Cancellations made at any time after confirmation will incur a charge for the full amount of the reservation.</li>
            <li>No-show Policy: In the event of a no-show, guests will also be charged the total reservation amount.</li>
            <li>Modifications to reservation dates are not permitted.</li>
          </ul>
        </section>
        <section>
          <p className="text-gray-700 text-lg">We appreciate your understanding and cooperation. These policies are in place to ensure a fair and consistent experience for all our valued guests.</p>
        </section>
      </div>
    </div>
  )
} 