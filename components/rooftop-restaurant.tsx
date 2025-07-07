"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Utensils, Mountain, Camera } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const restaurantImages = [
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.46 (2).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.45 (1).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.44 (1).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.43 (3).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.43 (2).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.43 (1).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.43.jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.42.jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.41.jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.40 (2).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.40 (1).jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.40.jpeg",
  "/images/restaurant/WhatsApp Image 2025-07-05 at 21.38.39.jpeg",
];

export default function RooftopRestaurant() {
  const [showReserve, setShowReserve] = useState(false)
  const [reserveForm, setReserveForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2
  })
  const [reserveStatus, setReserveStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showGallery, setShowGallery] = useState(false)

  const handleReserveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setReserveForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setReserveStatus(null)
    try {
      const res = await fetch("/api/reserve-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserveForm)
      })
      const data = await res.json()
      if (data.success) {
        setReserveStatus("Reservation successful! We look forward to welcoming you.")
        setReserveForm({ name: "", email: "", phone: "", date: "", time: "", guests: 2 })
      } else {
        setReserveStatus(data.error || "Reservation failed.")
      }
    } catch {
      setReserveStatus("Reservation failed. Please try again later.")
    }
    setLoading(false)
  }

  return (
    <section id="restaurant" className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2">Dining Experience</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Rooftop{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Restaurant
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dine under the stars with a spectacular view of the illuminated Mehrangarh Fort
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/slider2.jpg"
                  alt="Rooftop Restaurant with Mehrangarh Fort view"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Rooftop Restaurant</h3>
                  <p className="text-sm opacity-90">Mehrangarh Fort View</p>
                </div>
                <Button
                  className="absolute top-4 right-4 bg-white/80 text-purple-700 hover:bg-white"
                  variant="secondary"
                  onClick={() => setShowGallery(true)}
                >
                  See Restaurant Photos
                </Button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Spectacular Views</h3>
                  <p className="text-gray-600">
                    Enjoy panoramic views of the majestic Mehrangarh Fort illuminated against the night sky, creating an
                    unforgettable dining atmosphere.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Authentic Cuisine</h3>
                  <p className="text-gray-600">
                    Savor traditional Rajasthani delicacies and international cuisine prepared by our expert chefs,
                    served in an elegant rooftop setting.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Romantic Ambiance</h3>
                  <p className="text-gray-600">
                    Perfect for romantic dinners, special celebrations, or simply enjoying the serene beauty of
                    Jodhpur's skyline with traditional lantern lighting.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full" onClick={() => setShowReserve(true)}>
                  Reserve a Table
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Restaurant Features */}
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Multi-Cuisine Menu</h3>
                  <p className="text-gray-600 text-sm">Traditional Rajasthani and Continental dishes</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mountain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Fort Views</h3>
                  <p className="text-gray-600 text-sm">Unobstructed views of Mehrangarh Fort</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Perfect for Photos</h3>
                  <p className="text-gray-600 text-sm">Instagram-worthy dining experience</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Reserve a Table Modal */}
      <Dialog open={showReserve} onOpenChange={setShowReserve}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reserve a Table</DialogTitle>
          </DialogHeader>
          <form className="space-y-2" onSubmit={handleReserve}>
            <div>
              <label className="text-xs font-medium text-gray-600">Name</label>
              <input type="text" name="name" value={reserveForm.name} onChange={handleReserveChange} required className="w-full p-1 border rounded text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Email</label>
              <input type="email" name="email" value={reserveForm.email} onChange={handleReserveChange} required className="w-full p-1 border rounded text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Phone</label>
              <input type="tel" name="phone" value={reserveForm.phone} onChange={handleReserveChange} required className="w-full p-1 border rounded text-xs" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600">Date</label>
                <input type="date" name="date" value={reserveForm.date} onChange={handleReserveChange} required className="w-full p-1 border rounded text-xs" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600">Time</label>
                <input type="time" name="time" value={reserveForm.time} onChange={handleReserveChange} required className="w-full p-1 border rounded text-xs" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Guests</label>
              <input type="number" name="guests" min={1} value={reserveForm.guests} onChange={handleReserveChange} className="w-full p-1 border rounded text-xs" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-xs font-bold" disabled={loading}>
              {loading ? "Reserving..." : "Reserve"}
            </Button>
            {reserveStatus && (
              <div className="text-center text-xs mt-1 text-purple-700 font-semibold">{reserveStatus}</div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      {/* Restaurant Photo Gallery Dialog */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Restaurant Photo Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {restaurantImages.map((src, idx) => (
              <div key={src} className="overflow-hidden rounded-lg shadow">
                <Image
                  src={src}
                  alt={`Restaurant photo ${idx + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
