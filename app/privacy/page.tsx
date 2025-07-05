"use client"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>Personal Details: Name, address, phone number, email address, date of birth, nationality.</li>
            <li>Identification Documents: Passport, government-issued ID, visa (for foreign nationals).</li>
            <li>Booking Information: Room type, check-in/check-out dates, special requests, payment information.</li>
            <li>Online Activity: IP address, browser type, device information, and usage patterns when using our website.</li>
            <li>Feedback or Reviews: Comments, ratings, and responses to surveys or promotions.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>To process and confirm your booking.</li>
            <li>To communicate important information regarding your stay.</li>
            <li>To provide personalized services and improve guest experience.</li>
            <li>To comply with legal obligations (e.g., guest registration requirements).</li>
            <li>To manage billing and payments.</li>
            <li>To respond to inquiries, complaints, or customer service requests.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. Data Sharing and Disclosure</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>We do not sell or rent your information.</li>
            <li>We may share your data with service providers (payment processors, IT support, customer service platforms, etc.).</li>
            <li>We may share your data with government authorities where required by law.</li>
            <li>We may share your data with affiliated entities in cases where services are provided through hotel partnerships.</li>
            <li>All third parties are required to handle your data securely and in accordance with privacy regulations.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>Secure servers and firewalls</li>
            <li>Data encryption (where applicable)</li>
            <li>Limited access to personal information by authorized personnel only</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
          <p className="text-gray-700 text-lg">We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg">
            <li>Access your personal information</li>
            <li>Request corrections or updates</li>
            <li>Withdraw consent (where applicable)</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict data processing</li>
          </ul>
          <p className="text-gray-700 text-lg mt-2">To exercise any of these rights, please contact us using the details provided below.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">7. Cookies and Website Tracking</h2>
          <p className="text-gray-700 text-lg">Our website may use cookies to enhance your browsing experience and collect anonymized data for analytics. You can adjust your browser settings to manage or disable cookies at any time.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 text-lg">We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on our website with the updated effective date.</p>
        </section>
      </div>
    </div>
  )
} 