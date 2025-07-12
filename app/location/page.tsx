"use client";

import React from "react";

export default function LocationPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Location</h1>
      {/* Google Map */}
      <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow mb-8">
        <iframe
          src="https://www.google.com/maps?q=Jee+Ri+Haveli,+Gulab+Sagar,+Jodhpur,+Rajasthan,+India&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jee Ri Haveli Location"
        ></iframe>
      </div>
      {/* Address & Distances */}
      <div className="bg-white/90 rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-amber-700 mb-2">Jee Ri Haveli</h2>
        <p className="mb-2">Near Rajmahal Sr. Hr. Sec. School,<br />Gulab Sagar,<br />Jodhpur (Rajasthan) India</p>
        <p className="mb-2">Ph. <a href="tel:+912912540007" className="text-blue-700 hover:underline">+91-291-2540007</a></p>
        <p className="mb-2">Mobile: <a href="tel:+919351722007" className="text-blue-700 hover:underline">+91-93517-22007</a>, <a href="tel:+919351733007" className="text-blue-700 hover:underline">+91-93517-33007</a>, <a href="tel:+916375144341" className="text-blue-700 hover:underline">+91-6375144341</a></p>
        <p className="mb-2">Email: <a href="mailto:info@jeerihaveli.com" className="text-blue-700 hover:underline">info@jeerihaveli.com</a></p>
        <p className="mb-2">Website: <a href="http://www.jeerihaveli.com" className="text-blue-700 hover:underline">www.jeerihaveli.com</a></p>
      </div>
      {/* Distances */}
      <div className="bg-white/90 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-amber-700 mb-4">Distance from Jee Ri Haveli</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Railway Station: 1.5 Km</li>
          <li>Airport: 4 Km</li>
          <li>Bus Stand: 2 Km</li>
          <li>Umaid Bhawan Palace: 3 Km</li>
          <li>Jaswant Thada: 15 Minutes Walking Distance</li>
          <li>Mehrangarh Fort: 10 Minutes Walking Distance</li>
          <li>Sardar Bazaar & Clock Tower: 2 Minutes walking distance</li>
          <li>Lake Gulab Sagar: In Front of Haveli</li>
          <li>Bank of Baroda: 0.5 Km</li>
          <li>State Bank of India: 1 Km</li>
          <li>Tourist Reception Centre: 1 Km</li>
        </ul>
        <p className="mt-4 text-gray-600 text-sm">Jee Ri Haveli is centrally located in the quiet residential area with all major attractions including Mehran Garh Fort, Ummaid Palace, Jaswant Thada etc and just few steps away from Clock Tower, Sardar Market (Bazaar) centre of the Jodhpur City.</p>
      </div>
    </div>
  );
} 