"use client"

import { Heading1 } from "lucide-react"
import Image from "next/image"

const celebrities = [
  {
    type: "image",
    src: "/images/cl1.jpg",
    name: "Sreeleela",
    description: "After Pushpa 2 promotions, I stayed at Jee Ri Haveli, and it was amazing! I've visited many 5 star hotes, but the heritage charm, cozy home-style vibe, and stunning views of Mehrangarh Fort stood out. The rooftop restaurant's Rajasthani cuisine and warm hospitality made it unforgettable. A must-visit in Jodhpur!"
  },
  {
    type: "image",
    src: "/images/cl2.jpg",
    name: "Nikhil Advani",
    description: "We stayed here for 1 night due to shooting purpose of my movie.  It is perfect location for picture and movie shoot.  There is also a very big communal roof terrace with fantastic view towards all the sights of old city like The Fort, The Clock Tower, The Jaswant Thada, The Royal Palace and market.  All views are almost 365 degree angle. I got surprised to see that small family run Haveli.  Haveli is well equipped, quiet and clean. I think it is especially a good place for people who would like an impression of Indian lifestyle with old city.",
    movies: [
      "Hero (2015)",
      "Airlift",
      "Kal Ho Na Ho",
      "D-Day",
      "Salam-E-Ishq",
      "Chandni Chowk To China",
      "Patiyala House"
    ]
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/oNWqVwxCsNQ",
    name: "Aadhya Musical Power Yoga",
    description: "We had a yoga session at the rooftop of Jee Ri Haveli. It's magnificent view of for and lake, calm environment & fresh air of the morning give us the full of energy and peace in mind during this yoga session. We really enjoyed early sunrise photo shoot and our yoga session of the rooftop."
  },
  {
    type: "image",
    src: "/images/cl3.jpg",
    name: "Padma Bhushan Shri Vishwa Mohan Bhatt",
    description: "I don't forget my peppy song location in Jee Ri Haveli, Jodhpur. And also remember te amazing backgrounds it has been shoot at Spectaculare location in the small & beautifull Guest House (Jee Ri Haveli), And yes the Hollywood connect does't Hurt."
  },
]

export default function CelebritiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Celebrities at Jee Ri Haveli</h1>
        <div className="grid gap-10">
          {celebrities.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
              {item.type === "image" ? (
                <Image src={item.src} alt={item.alt ?? item.name} width={600} height={800} className="rounded-2xl w-full md:w-[500px] h-[600px] object-cover shadow-lg" />
              ) : (
                <div className="w-full md:w-96 h-64 rounded-xl overflow-hidden">
                  <iframe
                    src={item.src}
                    title={item.alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2 text-amber-700">{item.name}</h2>
                <p className="text-gray-700 text-lg">{item.description}</p>
                {item.movies && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                    
                      <span className="text-xl font-semibold text-amber-700">Movies by Nikhil Advani:</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-800 text-base">
                      {item.movies.map((movie, i) => (
                        <li key={i}>{movie}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 