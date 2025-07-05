"use client"

import Image from "next/image"

const posts = [
  {
    type: "image",
    src: "/images/exp1.jpg",
    alt: "Sunset at Jee Ri Haveli",
    title: "Bishnoi Village Safari Jeep Tour",
    description: "Explore the vibrant village life of Rajasthan with the Bishnoi Village Safari. Discover traditional lifestyles, witness local wildlife, and see deer and black bucks in their natural habitat."
  },
  {
    type: "image",
    src: "/images/exp2.png",
    title: "Osian Excursion",
    description: "Discover Osian, the “Khajuraho of Rajasthan,” just 70 km from Jodhpur. Marvel at ancient temples amid sand dunes, and enjoy a Camel Safari, Desert Jeep Safari, and authentic Rajasthani dinner."
  },
  {
    type: "image",
    src: "/images/exp3.jpg",
    title: "Blue City Tour with Guide Service",
    description: "Wander through the narrow alleys of Jodhpur’s ancient town after visiting the fort. Enjoy local street food, shop for souvenirs, and capture stunning photos of the blue city."
  },
  {
    type: "image",
    src: "/images/exp4.png",
    title: "Yoga Session",
    description: "Yoga Revitalize with classical yoga and meditation in the fresh morning air. Customized medical yoga sessions are also available, led by a senior instructor."
  },
  {}


]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Experience Blog</h1>
        <div className="space-y-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6">
              {post.type === "image" && (
                <Image src={post.src} alt={post.alt} width={600} height={400} className="rounded-lg mb-4 w-full h-auto object-cover" />
              )}
              {post.type === "video" && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={post.src}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64 rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 