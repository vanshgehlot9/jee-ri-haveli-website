"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const places = [
  {
    name: "Mehrangarh Fort",
    image: "/images/places/mehrangarh.webp",
    images: [
      "/images/places/mehrangarh.webp",
      "/images/places/Entrance Part in Jodhpur Fort.jpg",
      "/images/places/Inside Part of Jodhpur Fort (2).jpg",
      "/images/places/Out side of Jodhpur Fort.jpg",
      "/images/places/A Part of Mehrangarh Fort.jpg",
      "/images/places/A inside part of Jodhpur Fort.jpg",
      "/images/places/Inside of Jodhpur Fort.jpg",
      "/images/places/Inside part of Jodhpur Fort.jpg",
      "/images/places/Jodhpur Fort inside Part.jpg",
      "/images/places/A Top Part of Jodhpur Fort.jpg"
    ],
    description:
      "The most magnificent fort in Jodhpur, built in 1459 by Rao Jodha. Explore palaces, galleries, a museum, and temples atop a 150m high hill, just 2KM from Jee Ri Haveli.",
    detailedDescription: `Mehrangarh Fort stands as a testament to Jodhpur's royal heritage. Built in 1459 by Rao Jodha, the founder of Jodhpur, this imposing fort rises 400 feet above the city on a rocky hill. The fort complex houses several palaces, including the Moti Mahal (Pearl Palace), Phool Mahal (Flower Palace), and Sheesh Mahal (Mirror Palace), each showcasing exquisite craftsmanship and royal opulence. The fort museum displays an impressive collection of royal artifacts, weapons, and paintings. The panoramic views of the Blue City from the fort's ramparts are simply breathtaking, especially during sunrise and sunset.`,
    distance: "2KM from Jee Ri Haveli",
    bestTime: "Sunrise to Sunset",
    entryFee: "₹100 for Indians, ₹600 for Foreigners"
  },
  {
    name: "Jaswant Thada",
    image: "/images/places/jaswant-thada2.jpg",
    images: [
      "/images/places/jaswant-thada2.jpg",
      "/images/places/Jaswant Thada.jpg",
      "/images/places/Side View of Jaswant Thada.jpg"
    ],
    description:
      "A royal cenotaph made of white marble, known as the Taj Mahal of Mewar. Built to commemorate Maharaja Jaswant Singh, it is a must-see near Mehrangarh Fort.",
    detailedDescription: `Jaswant Thada is a stunning white marble memorial built in 1899 by Maharaja Sardar Singh in memory of his father, Maharaja Jaswant Singh II. Often referred to as the 'Taj Mahal of Marwar', this architectural marvel features intricate carvings, delicate marble screens, and beautiful gardens. The memorial complex includes several cenotaphs and a small museum. The white marble structure glows ethereally in the sunlight, creating a serene and peaceful atmosphere. The surrounding gardens offer a perfect spot for quiet contemplation while enjoying views of Mehrangarh Fort.`,
    distance: "1KM from Mehrangarh Fort",
    bestTime: "Early Morning or Evening",
    entryFee: "₹30 for Indians, ₹100 for Foreigners"
  },
  {
    name: "Umaid Bhawan Palace",
    image: "/images/places/Umaid Bhawan Palace.jpg",
    images: [
      "/images/places/Inside Part of Umaid Bhawan Palace.jpg",
    ],
    description:
      "A fascinating 20th-century palace, part hotel and part museum. Umaid Bhawan Palace is the largest private residence in the world, showcasing royal grandeur.",
    detailedDescription: `Umaid Bhawan Palace, completed in 1943, is one of the world's largest private residences. Built by Maharaja Umaid Singh, this magnificent palace combines Indian and European architectural styles. The palace is divided into three parts: a luxury hotel, the royal residence, and a museum. The museum houses an impressive collection of vintage cars, clocks, and royal artifacts. The palace's golden-yellow sandstone structure and beautiful gardens create a regal atmosphere. The palace also features a unique underground swimming pool and stunning Art Deco interiors.`,
    distance: "5KM from City Center",
    bestTime: "9:00 AM - 5:00 PM",
    entryFee: "₹100 for Museum"
  },
  {
    name: "Rao Jodha Desert Rock Park",
    image: "/images/places/raojodha.jpg",
    images: [
      "/images/places/raojodha.jpg",
      "/images/places/raojodha1.jpg",
      "/images/places/rao1.webp",
    ],
    description:
      "Located at the foothills of Mehrangarh Fort, this park preserves unique desert flora and offers scenic walks with fort views.",
    detailedDescription: `Rao Jodha Desert Rock Park is a unique ecological restoration project that showcases the natural desert landscape of the Thar Desert. The park features over 200 species of native plants, including rare desert flora. Walking trails wind through the rocky terrain, offering spectacular views of Mehrangarh Fort and the city. The park is a haven for birdwatchers and nature enthusiasts, with various species of birds and small wildlife. The interpretive center provides information about the desert ecosystem and conservation efforts.`,
    distance: "At foothills of Mehrangarh Fort",
    bestTime: "Early Morning or Evening",
    entryFee: "₹100 for Adults, ₹50 for Children"
  },
  {
    name: "Blue City",
    image: "/images/places/bluecity.jpg",
    images: [
      "/images/places/bluecity.jpg",
      "/images/places/bluecity1.jpg",
      "/images/places/bluecity2.jpg",
      "/images/places/bluecity3.webp",
    ],
    description:
      "Jodhpur is called the Blue City for its vividly painted blue houses. Wander the old city lanes for a unique, colorful experience.",
    detailedDescription: `The Blue City of Jodhpur gets its name from the indigo-blue painted houses in the old city area. This tradition dates back to the 19th century when the Brahmin community painted their houses blue to distinguish themselves. The blue color also helps keep the houses cool during the scorching summer months. Walking through the narrow, winding lanes of the Blue City is like stepping into a different world. The vibrant blue houses, traditional architecture, and bustling local life create an authentic Rajasthani experience. Don't miss the panoramic view of the Blue City from Mehrangarh Fort.`,
    distance: "Old City Area",
    bestTime: "Early Morning or Evening",
    entryFee: "Free"
  },
  {
    name: "Mandore Garden",
    image: "/images/places/mandore.jpg",
    images: [
      "/images/places/Mandore Garden.jpg",
      "/images/places/Mandore Garden (2).jpg",
      "/images/places/mandore .jpg",
      "/images/places/Mandore.png",
      "/images/places/Mandore (2).png",
      "/images/places/A top Part of Mandore.jpg",
      "/images/places/Cenotaph in Mandore.jpg",
      "/images/places/Inside part of Mandore.jpg"
    ],
    description:
      "Admire royal cenotaphs and lush gardens in Mandore, a historic site reflecting Jodhpur's architectural and cultural heritage.",
    detailedDescription: `Mandore Garden, located 9 kilometers north of Jodhpur, was once the capital of Marwar before Jodhpur. The garden houses the royal cenotaphs (chhatris) of the Marwar rulers, built in different architectural styles. The most impressive is the cenotaph of Maharaja Ajit Singh, built in white marble with intricate carvings. The garden also features a Hall of Heroes with 16 figures carved out of a single rock, and a temple dedicated to the 33 crore gods. The lush gardens and peaceful atmosphere make it a perfect spot for relaxation and photography.`,
    distance: "9KM from Jodhpur",
    bestTime: "Morning or Evening",
    entryFee: "₹50 for Adults, ₹25 for Children"
  },
  {
    name: "Kaylana Lake",
    image: "/images/places/kaylana.jpg",
    images: [
      "/images/places/kaylana.jpg",
      "/images/places/kayalana1.jpeg",
      "/images/places/kayalana2.jpg",
     
    ],
    description:
      "An artificial lake west of Jodhpur, perfect for relaxing or picnics. Enjoy tranquil waters and beautiful sunsets.",
    detailedDescription: `Kaylana Lake, built in 1872 by Pratap Singh, is a serene artificial lake surrounded by hills and gardens. The lake is a popular spot for boating, bird watching, and enjoying beautiful sunsets. The surrounding area features several gardens and viewpoints perfect for picnics and photography. The lake is home to various species of migratory birds during winter months. The peaceful atmosphere and scenic beauty make it an ideal escape from the city's hustle and bustle.`,
    distance: "8KM west of Jodhpur",
    bestTime: "Sunset",
    entryFee: "₹50 for Adults"
  },
  {
    name: "Machiya Safari Park",
    image: "/images/places/machiya.jpg",
    images: [
      "/images/places/machiya1.jpeg",
      "/images/places/machiya2.jpeg"
    ],
    description:
      "A family-friendly safari park near Kaylana Lake, home to many animals and birds. Great for nature lovers and kids.",
    detailedDescription: `Machiya Safari Park is a wildlife sanctuary located near Kaylana Lake, home to various species of animals and birds. The park features a natural habitat for animals like deer, antelopes, and various bird species. Visitors can enjoy safari rides through the park to observe wildlife in their natural environment. The park also has walking trails and viewpoints for bird watching. It's an excellent place for families with children to learn about wildlife and nature conservation.`,
    distance: "1KM from Kaylana Lake",
    bestTime: "Morning",
    entryFee: "₹100 for Adults, ₹50 for Children"
  },
  {
    name: "Clock Tower (Ghanta Ghar)",
    image: "/images/clock.jpg",
    images: [
      "/images/clock.jpg",
      "/images/clock1.jpg",
      "/images/clock2.jpg"
    ],
    description:
      "A popular landmark in the old city, surrounded by the vibrant Sardar Market. Explore narrow alleys filled with spices, textiles, and handicrafts.",
    detailedDescription: `The Clock Tower, built in the late 19th century, is a prominent landmark in the heart of Jodhpur's old city. Surrounded by the bustling Sardar Market, it's a perfect place to experience local culture and shopping. The market area is famous for its spices, textiles, silver jewelry, and traditional handicrafts. The narrow alleys around the clock tower are filled with small shops selling everything from traditional Rajasthani clothes to local sweets and snacks. The area comes alive in the evening with street food vendors and local entertainment.`,
    distance: "Old City Center",
    bestTime: "Morning or Evening",
    entryFee: "Free"
  },
  {
    name: "Toorji Ka Jhalra (Step Well)",
    image: "/images/places/step.jpeg",
    images: [
      "/images/places/step.jpeg",
      "/images/places/step1.jpg",
      "/images/places/step2.jpg"
    ],
    description:
      "A historic step well built in the 1740s, open 24/7. Admire its unique architecture and enjoy the lively atmosphere around it.",
    detailedDescription: `Toorji Ka Jhalra, built in the 1740s by Queen Toorji, is one of the most beautiful step wells in Rajasthan. The step well features intricate carvings and architectural details that showcase the craftsmanship of the era. The surrounding area has been revitalized with cafes, restaurants, and shops, making it a popular spot for both locals and tourists. The step well is open 24/7 and is particularly beautiful when illuminated at night. The area around the step well has become a cultural hub with regular events and performances.`,
    distance: "Old City Area",
    bestTime: "Any Time",
    entryFee: "Free"
  },
]

export default function PlacesToVisitPage() {
  const [selectedPlace, setSelectedPlace] = useState<typeof places[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePlaceClick = (place: typeof places[0]) => {
    setSelectedPlace(place)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedPlace) {
      setCurrentImageIndex((prev) => 
        prev === selectedPlace.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedPlace) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPlace.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[350px] flex items-center justify-center overflow-hidden mb-10">
        <Image
          src="/images/WhatsApp Image 2025-07-11 at 14.29.59.jpeg"
          alt="Mehrangarh Fort, Jodhpur"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <div className="relative z-20 text-center text-white px-4 w-full flex flex-col items-center justify-center">
          <span className="text-lg md:text-xl font-semibold text-amber-200 mb-2 drop-shadow">Explore Jodhpur</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Places to Visit in Jodhpur</h1>
          <p className="max-w-2xl text-base md:text-lg text-white/90 drop-shadow mb-2">
            Discover the rich history, vibrant culture, and breathtaking sights of Jodhpur. From majestic forts to tranquil lakes, each destination offers a unique glimpse into the heart of Rajasthan.
          </p>
        </div>
      </section>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Explore Jodhpur</Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Places to Visit in Jodhpur
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {places.map((place, idx) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-orange-100"
              onClick={() => handlePlaceClick(place)}
            >
              <div className="w-full h-72 relative bg-gray-100 flex items-center justify-center">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-contain w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx < 4}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-amber-700">{place.name}</h2>
                <p className="text-gray-700 text-lg mb-4">{place.description}</p>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <span className="bg-amber-100 px-2 py-1 rounded-full">{place.distance}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Jodhpur')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-semibold shadow hover:bg-amber-700 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      <Dialog open={!!selectedPlace} onOpenChange={() => setSelectedPlace(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-amber-700">
              {selectedPlace?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPlace && (
            <div className="space-y-6">
              {/* Image Carousel */}
              <div className="relative h-[28rem] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={selectedPlace.images[currentImageIndex]}
                  alt={selectedPlace.name}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedPlace.images.length}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {selectedPlace.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center ${
                      currentImageIndex === index ? 'ring-2 ring-amber-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${selectedPlace.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </button>
                ))}
              </div>

              {/* Detailed Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedPlace.detailedDescription}
                </p>
                
                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center p-4 bg-amber-50 rounded-lg flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-amber-700 mb-1">Distance</h4>
                    <div className="flex items-center gap-2 justify-center">
                      <p className="text-gray-600">{selectedPlace.distance}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPlace.name + ' Jodhpur')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-semibold shadow hover:bg-amber-700 transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-amber-700 mb-1">Best Time</h4>
                    <p className="text-gray-600">{selectedPlace.bestTime}</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-amber-700 mb-1">Entry Fee</h4>
                    <p className="text-gray-600">{selectedPlace.entryFee}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 