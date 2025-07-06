"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Mountain,
  Phone,
  Mail,
  Award,
  Camera,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import RooftopRestaurant from "@/components/rooftop-restaurant"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [loading, setLoading] = useState(false)

  // Widget state for availability check
  const [widget, setWidget] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "Deluxe Room ",
  })
  const [availability, setAvailability] = useState<string | null>(null)
  const [canBook, setCanBook] = useState(false)

  // Room details modal state
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [roomDetail, setRoomDetail] = useState<any | null>(null)
  const [carouselIdx, setCarouselIdx] = useState(0)

  const rooms = [
    {
      name: "Deluxe Room",
      price: "₹2,500",
      images: [
        "/images/deluxe.jpg",
        "/images/DELUXE ROOM/DSC_0933.jpg",
        "/images/DELUXE ROOM/DSC_0939.jpg",
        "/images/DELUXE ROOM/DSC_0952.jpg",
        "/images/DELUXE ROOM/DSC_0935.jpg",
      ],
      description: "Our Deluxe Room offers a blend of traditional Rajasthani decor and modern comfort, featuring a king-size bed, private balcony, and a stunning city view. Perfect for couples or solo travelers seeking luxury and relaxation.",
      features: ["King Bed", "City View", "Balcony" , "Sitting Area" , "Tea Service"],
    },
    {
      name: "Standard Room",
      price: "₹1,800",
      images: [
        "/images/standard.jpg",
        "/images/standard1.jpg",
        "/images/standard2.jpg",
        "/images/standard3.jpg",
      ],
      description: "Our Standard Room is designed for comfort and convenience, offering a cozy sitting area, balcony, and beautiful city views. Ideal for business travelers or families on a budget.",
      features: ["City View" , "Balcony" , "Sitting Area"],
    },
    {
      name: "Standard Room without Balcony",
      price: "₹1,500",
      images: [
        "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7787.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7789.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0986.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0997.jpg",
      ],
      description: "Our Standard Room without Balcony offers comfortable accommodation with all essential amenities, perfect for budget-conscious travelers.",
      features: ["City View" , "Sitting Area"],
    },
  ]

  const amenities = [
    { icon: Wifi, name: "Free WiFi", desc: "High-speed internet throughout the haveli" },
    { icon: Car, name: "Valet Parking", desc: "Complimentary parking service" },
    { icon: Coffee, name: "24/7 Room Service", desc: "Round the clock dining service" },
    { icon: Utensils, name: "Rooftop Restaurant", desc: "Fort view dining experience" },
    { icon: Waves, name: "Lake Views", desc: "Gulab Sagar Lake front location" },
    { icon: Mountain, name: "Fort Views", desc: "Mehrangarh Fort panoramic views" },
  ]

  const handleWidgetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setWidget((prev) => ({ ...prev, [name]: value }))
    setAvailability(null)
    setCanBook(false)
    
    // If check-in date changes and check-out is before it, clear check-out
    if (name === 'checkIn' && widget.checkOut && value > widget.checkOut) {
      setWidget(prev => ({ ...prev, checkOut: '' }))
    }
  }

  const checkAvailability = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Checking availability with:", widget)
    
    // Validate dates
    if (!widget.checkIn || !widget.checkOut) {
      setAvailability("Please select check-in and check-out dates.")
      return
    }
    
    const checkInDate = new Date(widget.checkIn)
    const checkOutDate = new Date(widget.checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (checkInDate < today) {
      setAvailability("Check-in date cannot be in the past.")
      return
    }
    
    if (checkOutDate <= checkInDate) {
      setAvailability("Check-out date must be after check-in date.")
      return
    }
    
    setAvailability(null)
    setCanBook(false)
    setLoading(true)
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...widget, checkOnly: true })
      })
      const data = await res.json()
      console.log("Availability response:", data)
      if (data.available) {
        setAvailability("Available!")
        setCanBook(true)
      } else {
        setAvailability(data.error || "Not available.")
        setCanBook(false)
      }
    } catch (error) {
      console.error("Availability check error:", error)
      setAvailability("Error checking availability.")
      setCanBook(false)
    }
    setLoading(false)
  }



  const openRoomModal = (room: any) => {
    setRoomDetail(room)
    setCarouselIdx(0)
    setShowRoomModal(true)
  }
  const handleBookFromRoom = () => {
    setShowRoomModal(false)
    // Redirect to booking page
    window.location.href = '/book'
  }

  const handleCarouselPrev = () => {
    if (!roomDetail) return
    setCarouselIdx((prev) => (prev === 0 ? roomDetail.images.length - 1 : prev - 1))
  }
  const handleCarouselNext = () => {
    if (!roomDetail) return
    setCarouselIdx((prev) => (prev === roomDetail.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/images/slider1.jpg"
          alt="Rooftop Restaurant at Jee Ri Haveli with Mehrangarh Fort view"
          fill
          className="object-cover"
          priority
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent"
          >
            Welcome to Jee Ri Haveli
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the royal palace on Gulab Sagar Lake with breathtaking views of Mehrangarh Fort
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
          </motion.div>
        </motion.div>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 block"
        >
          <Card className="w-72 h-auto bg-white/70 backdrop-blur-md shadow-2xl border-0">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Check Availability</h3>
              <form className="space-y-2" onSubmit={checkAvailability}>
                <div>
                  <label className="text-xs font-medium text-gray-600">Check In</label>
                  <input 
                    type="date" 
                    name="checkIn" 
                    value={widget.checkIn} 
                    onChange={handleWidgetChange} 
                    min={new Date().toISOString().split('T')[0]}
                    required 
                    className="w-full p-1 border rounded text-xs" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Check Out</label>
                  <input 
                    type="date" 
                    name="checkOut" 
                    value={widget.checkOut} 
                    onChange={handleWidgetChange} 
                    min={widget.checkIn || new Date().toISOString().split('T')[0]}
                    required 
                    className="w-full p-1 border rounded text-xs" 
                  />
                </div>
                                  <div>
                    <label className="text-xs font-medium text-gray-600">Room Type</label>
                    <select name="roomType" value={widget.roomType} onChange={handleWidgetChange} className="w-full p-1 border rounded text-xs">
                      {rooms.map((room) => (
                        <option key={room.name} value={room.name}>{room.name}</option>
                      ))}
                    </select>
                  </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-2 rounded-lg text-xs font-bold" disabled={loading}>
                  {loading ? "Checking..." : "Check Availability"}
                </Button>
                {loading && (
                  <div className="text-center text-xs mt-1 text-blue-600">Checking availability...</div>
                )}
                {availability && !loading && (
                  <div className={`text-center text-xs mt-1 font-semibold ${
                    availability.includes("Available") ? "text-green-600" : 
                    availability.includes("Error") ? "text-red-600" : "text-amber-700"
                  }`}>
                    {availability}
                  </div>
                )}
                {canBook && (
                  <Link href="/book">
                    <Button type="button" className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-bold">
                      Book Now
                    </Button>
                  </Link>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <Link href="/book">
                    <Button type="button" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-2 rounded-lg text-xs font-bold">
                      Full Booking Experience
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Our Heritage</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                A 19th Century{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Sandstone Palace
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Many times people have dreamt of staying in a huge royal palace on the seashore, on the banks of a river
                or at least a place facing the water reservoir. There is such a place at GULAB SAGAR LAKE in JODHPUR.
                The 19th Century sandstone place built on a hillock facing GULAB SAGAR LAKE is one of such places that
                is definitely going to win your heart.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <div className="relative">
                  <Image
                    src="/images/gulabsagar.jpg?height=500&width=600"
                    alt="Heritage Architecture"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-xl">
                    <Award className="w-8 h-8 mb-2" />
                    <p className="font-bold">Heritage</p>
                    <p className="text-sm">Certified</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="bg-amber-50 p-6 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    It is very finely carved with latticed windows that allow the soft, cool breeze to blow into the
                    interiors of the place. The embankments of the lake in front of the place have a domed structure
                    that offers a fabulous view of the lake encircled by hills and an artificial cascading waterfall.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    It is a part of Jodhpur but enjoys the calmness away from the city crowd. The rooms and suites
                    create an ambience that make you feel as if you are staying in a royal palace. You can even a walk
                    through the bridge and also get to see black diamond fish and ducks on the lake.
                  </p>
                  <p className="text-amber-700 font-medium italic">
                    Jee Ri Haveli has been in the Hospitality industry Since 2007. With the love of our valuable
                    clients, we had many excellent reviews and has received many rewards from all the leading service
                    providers across the globe.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rooftop Restaurant Section */}
      <RooftopRestaurant />

      {/* Rooms Section */}
      <section id="rooms" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Accommodation</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Luxurious{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Rooms & Suites
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each room is thoughtfully designed to blend traditional aesthetics with modern amenities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {rooms.map((room, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveRoom(index)}
                >
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={room.images[0] || "/placeholder.svg"}
                        alt={room.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-amber-600 font-bold">{room.price}/night</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{room.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-amber-100 text-amber-800">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white" onClick={() => openRoomModal(room)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Booking CTA */}
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Experience Royal Luxury?</h3>
                <p className="text-lg mb-6 opacity-90">Book your stay at Jee Ri Haveli and create unforgettable memories</p>
                <div className="flex justify-center">
                  <Link href="/book">
                    <Button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                      Book Your Stay
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Facilities</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                World-Class{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Amenities
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience luxury and comfort with our comprehensive range of facilities and services
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{amenity.name}</h3>
                  <p className="text-gray-600">{amenity.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Gallery</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Capture the{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Moments
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A visual journey through our heritage property and luxurious accommodations
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "/images/capture the moment/DSC_0975.jpg",
                "/images/capture the moment/ASM_7876.jpg",
                "/images/capture the moment/ASM_7870.jpg",
                "/images/capture the moment/ASM_7852.jpg",
                "/images/capture the moment/ASM_7767.jpg",
                "/images/capture the moment/ASM_7775.jpg",
                "/images/capture the moment/ASM_7765.jpg",
                "/images/capture the moment/ASM_7766.jpg"
              ].map((image, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Contact</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Get in{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to make your stay memorable. Reach out to us for reservations and inquiries
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">+91-291-2540007</p>
                <p className="text-gray-600">+91-9351722007</p>
                <p className="text-gray-600">+91-9351733007</p>
                <p className="text-gray-600">+91-6375144341</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">info@jeerihaveli.com</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600">Near Rajmahal Sr. Hr. Sec. School,</p>
                <p className="text-gray-600">Gulab Sagar, Jodhpur</p>
                <p className="text-gray-600">(Rajasthan) India</p>
                <p className="text-gray-600 mt-2">
                  Website:{" "}
                  <a href="http://www.jeerihaveli.com" className="text-amber-600 hover:underline">
                    www.jeerihaveli.com
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Room Details Modal */}
      <Dialog open={showRoomModal} onOpenChange={setShowRoomModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{roomDetail?.name}</DialogTitle>
          </DialogHeader>
          {roomDetail && (
            <div>
              {/* Image carousel */}
              <div className="relative mb-2 flex items-center justify-center">
                <button
                  onClick={handleCarouselPrev}
                  className="absolute left-0 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <Image
                  src={roomDetail.images[carouselIdx] || "/placeholder.svg"}
                  alt={roomDetail.name + ' image ' + (carouselIdx + 1)}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={handleCarouselNext}
                  className="absolute right-0 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 mb-2 justify-center">
                {roomDetail.images.map((img: string, idx: number) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={roomDetail.name + ' thumb ' + (idx + 1)}
                    width={60}
                    height={40}
                    className={`rounded object-cover border ${carouselIdx === idx ? 'border-amber-600' : 'border-gray-200'} cursor-pointer`}
                    onClick={() => setCarouselIdx(idx)}
                  />
                ))}
              </div>
              {/* Description */}
              <div className="mb-2 text-sm text-gray-700">{roomDetail.description}</div>
              <div className="mb-2">
                <span className="font-bold">Features:</span>
                <ul className="list-disc pl-5 text-sm">
                  {roomDetail.features.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white mt-2" onClick={handleBookFromRoom}>
                Book Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Jee Ri Haveli</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Experience the grandeur of Rajasthani heritage with modern luxury and comfort.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Rooms", "Amenities", "Gallery", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Policy</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/hotel-policy" className="text-gray-400 hover:text-amber-400 transition-colors">Hotel Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Payment Methods</h4>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div className="w-12 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  DC
                </div>
                <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  AE
                </div>
              </div>
              <p className="text-gray-400 text-sm">We accept all major credit cards</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Jee Ri Haveli. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
