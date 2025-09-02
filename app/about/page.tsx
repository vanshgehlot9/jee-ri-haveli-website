import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <Image src="/images/DELUXE ROOM/DSC_0933.jpg" alt="Jee Ri Haveli" width={400} height={300} className="rounded-lg object-cover" />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold text-amber-600 mb-2">Welcome to Jee Ri Haveli</h1>
              <p className="text-gray-700 mb-4">
                Jee Ri Haveli is a heritage mansion in Jodhpur, lovingly restored and converted into a boutique hotel. Originally built decades ago, our haveli was renovated to offer guests all modern comforts while preserving the elegance and charm of traditional Rajasthani design, art, and hospitality.
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-amber-700 mb-2">A Personalized Heritage Experience</h2>
          <p className="text-gray-700 mb-4">
            At Jee Ri Haveli, every guest is treated to a personalized experience centered around comfort and delight. Our 14 rooms—including Executive Deluxe, Standard, and Superior categories—are each uniquely designed, blending luxury and tradition. Every room is a class of its own, offering the best comfort heritage can provide, so be ready to be spoilt with regal treatment.
          </p>
          <h2 className="text-xl font-semibold text-amber-700 mb-2">Accommodations</h2>
          <p className="text-gray-700 mb-4">
            Jee Ri Haveli is now one of the best heritage hotels in Jodhpur, well managed and thoughtfully renovated. As you enter, soft cream-colored walls and traditional Rajasthani paintings welcome you, creating the perfect haven to restore your travel-weary spirit. Every detail has been carefully chosen to preserve the simple yet elegant style of Rajasthan.
          </p>
          <p className="text-gray-700 mb-4">
            Our rooms command beautiful views of the city, lake, and fort. Each is fitted with world-class air conditioning, 24-hour hot water, and western-style bathrooms—some with tubs and showers. Every room is unique, with hand-worked curtains, colorful pillows, and wall paintings chosen to make your stay memorable. Jee Ri Haveli maintains its old-world charm and feels more like a home than a hotel.
          </p>
          <h2 className="text-xl font-semibold text-amber-700 mb-2">Hospitality & Comfort</h2>
          <p className="text-gray-700 mb-4">
            Our team adds thoughtful touches every year, making each room more inviting. From the bedding and towels to the decor, every item is selected for comfort and style. With telephones and televisions in every room, you’ll feel right at home—and may never want to leave!
          </p>
          <div className="flex space-x-3 mt-6">
            <Link href="/book" className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded shadow">Book Now</Link>
            <Link href="/contact" className="inline-block border border-amber-600 text-amber-600 px-4 py-2 rounded">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
