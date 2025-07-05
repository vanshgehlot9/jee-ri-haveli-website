"use client"

const hotelAddress = "Jee Ri Haveli, Near Rajmahal Sr. Hr. Sec. School, Gulab Sagar, Jodhpur, Rajasthan, India"
const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotelAddress)}`

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Our Location</h1>
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.073073964479!2d73.0185!3d26.2996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c6e2e2e2e2e%3A0x1234567890abcdef!2sJee%20Ri%20Haveli!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-amber-700 hover:to-orange-700 transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  )
} 