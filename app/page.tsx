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
import HeroSlider from "@/components/hero-slider";


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
      images: [
        "/images/deluxe.jpg",
        "/images/DELUXE ROOM/DSC_0933.jpg",
        "/images/DELUXE ROOM/DSC_0939.jpg",
        "/images/DELUXE ROOM/DSC_0952.jpg",
        "/images/DELUXE ROOM/DSC_0935.jpg",
      ],
      description: "Our Deluxe Room offers a blend of traditional Rajasthani decor and modern comfort, featuring a king-size bed, private balcony, and a stunning city view. Perfect for couples or solo travelers seeking luxury and relaxation.",
      features: ["King Bed", "City View", "Balcony", "Sitting Area", "Tea Service"],
    },
    {
      name: "Standard Room",
      images: [
        "/images/IMG_4643.JPG",
        "images/IMG_4646.JPG",
        "images/IMG_4639.JPG",
      ],
      description: "Our Standard Room is designed for comfort and convenience, offering a cozy sitting area, balcony, and beautiful city views. Ideal for business travelers or families on a budget.",
      features: ["City View", "Balcony", "Sitting Area"],
    },
    {
      name: "Standard Room without Balcony",
      images: [
        "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7787.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7789.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0986.jpg",
        "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0997.jpg",
      ],
      description: "Our Standard Room without Balcony offers comfortable accommodation with all essential amenities, perfect for budget-conscious travelers.",
      features: ["City View", "Sitting Area"],
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange">

      {/* Hero Section */}
      <motion.section className="mb-8" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeroSlider />
      </motion.section>

      {/* Welcome Section */}
      <motion.section className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 text-center" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg tracking-tight"
        >
          Welcome to Jee Ri Haveli
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow font-medium"
        >
          Experience the royal palace on Gulab Sagar Lake with breathtaking views of Mehrangarh Fort
        </motion.p>
      </motion.section>

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
      <motion.section className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
        {rooms.map((room, idx) => (
          <motion.div key={room.name} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
            <Card className="flex flex-col h-full">
              <div className="aspect-[4/3] w-full rounded-t-xl overflow-hidden">
                <img src={room.images[0]} alt={room.name} className="object-cover w-full h-full" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-bold mb-2 text-amber-700">{room.name}</h2>
                <p className="text-gray-700 text-base mb-2 flex-1">{room.description}</p>
                <Button
                  className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded shadow"
                  onClick={() => {
                    setRoomDetail(room);
                    setCarouselIdx(0);
                    setShowRoomModal(true);
                  }}
                >
                  View Room Photos
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Amenities Section */}
      <motion.section className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8 py-8" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-amber-700">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {amenities.map((a, idx) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.08 }}>
              <Card className="flex flex-col items-center justify-center p-4">
                <a.icon className="w-8 h-8 mb-2 text-orange-500" />
                <span className="font-semibold text-amber-700 mb-1">{a.name}</span>
                <span className="text-xs text-gray-500 text-center">{a.desc}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
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
        <DialogContent className="max-w-full sm:max-w-lg p-4">
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
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white mt-2" onClick={handleBookFromRoom}>
                Book Now
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Awards & Recognition Section */}
      <section className="py-16 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Awards & Recognition</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized for excellence in hospitality and heritage preservation
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center p-4">
              <Image
                src="/images/badges/tp-2013.jpg"
                alt="TripAdvisor Certificate of Excellence 2013"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">TripAdvisor Excellence 2013</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/tp-2012.jpg"
                alt="TripAdvisor Certificate of Excellence 2012"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">TripAdvisor Excellence 2012</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/tp-2011.jpg"
                alt="TripAdvisor Certificate of Excellence 2011"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">TripAdvisor Excellence 2011</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/2020-winner.jpg"
                alt="Winner 2020"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2020</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/2019-winner.jpg"
                alt="Winner 2019"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2019</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/2018-winner.jpg"
                alt="Winner 2018"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2018</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/2017.jpg"
                alt="Winner 2017"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2017</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/bravo.jpg"
                alt="Bravo Award"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Bravo Award</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/widget.jpg"
                alt="Widget Award"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Widget Award</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/winner-2020.jpg"
                alt="Winner 2020 Large"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2020</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/winner-2019.jpg"
                alt="Winner 2019 Large"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner 2019</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/winner-300x300.gif"
                alt="Winner Badge"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Winner Badge</p>
            </div>
            
            <div className="text-center p-4">
              <Image
                src="/images/badges/Booking.com-Award1.jpg"
                alt="Booking.com Award"
                width={120}
                height={120}
                className="mx-auto mb-3 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm font-medium text-gray-700">Booking.com Award</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Brands Section */}
      <section className="py-20 bg-gradient-to-br from-white via-amber-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{background: 'radial-gradient(circle at 80% 20%, #ffe0b2 0%, transparent 70%)'}} />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Our Brands</Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
                Our <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Other Businesses</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our group brands offering travel, tours, and heritage experiences
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Jee Tours */}
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="flex flex-col items-center p-8 shadow-2xl border-0 bg-white/60 backdrop-blur-lg rounded-3xl transition-all duration-300 hover:shadow-amber-200/60 group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center ring-4 ring-amber-300/40 group-hover:ring-orange-400/60 transition-all duration-300">
                      <MapPin className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-1 text-center tracking-tight">Jee Tours</h3>
                  <p className="text-gray-500 text-center mb-4 text-sm">Travel & Tour Packages</p>
                  <Link href="https://www.jeetours.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 justify-center mt-auto">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold flex-1">View More</Button>
                    <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-amber-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7' /></svg></span>
                  </Link>
                </Card>
              </motion.div>
              {/* Jee Tours & Travels */}
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="flex flex-col items-center p-8 shadow-2xl border-0 bg-white/60 backdrop-blur-lg rounded-3xl transition-all duration-300 hover:shadow-amber-200/60 group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center ring-4 ring-amber-300/40 group-hover:ring-orange-400/60 transition-all duration-300">
                      <Car className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-1 text-center tracking-tight">Jee Tours & Travels</h3>
                  <p className="text-gray-500 text-center mb-4 text-sm">Comprehensive Travel Solutions</p>
                  <Link href="https://www.jeetoursandtravels.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 justify-center mt-auto">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold flex-1">View More</Button>
                    <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-amber-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7' /></svg></span>
                  </Link>
                </Card>
              </motion.div>
              {/* Buddha Pilgrimage Tours */}
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="flex flex-col items-center p-8 shadow-2xl border-0 bg-white/60 backdrop-blur-lg rounded-3xl transition-all duration-300 hover:shadow-amber-200/60 group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center ring-4 ring-amber-300/40 group-hover:ring-orange-400/60 transition-all duration-300">
                      <Sparkles className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-1 text-center tracking-tight">Buddha Pilgrimage Tours</h3>
                  <p className="text-gray-500 text-center mb-4 text-sm">Buddhist Pilgrimage Specialists</p>
                  <Link href="https://www.buddhapilgriagetours.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 justify-center mt-auto">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold flex-1">View More</Button>
                    <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-amber-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7' /></svg></span>
                  </Link>
                </Card>
              </motion.div>
              {/* Ajanta & Ellora Caves */}
              <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="flex flex-col items-center p-8 shadow-2xl border-0 bg-white/60 backdrop-blur-lg rounded-3xl transition-all duration-300 hover:shadow-amber-200/60 group">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center ring-4 ring-amber-300/40 group-hover:ring-orange-400/60 transition-all duration-300">
                      <Mountain className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-1 text-center tracking-tight">Ajanta & Ellora Caves</h3>
                  <p className="text-gray-500 text-center mb-4 text-sm">Heritage & Culture Tours</p>
                  <Link href="https://www.ajantaandelloracaves.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2 justify-center mt-auto">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold flex-1">View More</Button>
                    <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-amber-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7' /></svg></span>
                  </Link>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
     
    </div>
  )
}
