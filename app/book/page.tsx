"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, MapPin, Wifi, Car, Coffee, Utensils, Waves, Mountain, Phone, Mail, Award, Camera, Sparkles, CheckCircle, Clock, CreditCard, Shield, Building, CheckSquare } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"



const roomImages = {
  "Deluxe Room": [
    "/images/DELUXE ROOM/DSC_0933.jpg",
    "/images/DELUXE ROOM/DSC_0939.jpg",
    "/images/DELUXE ROOM/DSC_0952.jpg",
    "/images/DELUXE ROOM/DSC_0935.jpg",
    "/images/DELUXE ROOM/DSC_0937.jpg",
    "/images/DELUXE ROOM/DSC_0940.jpg",
    "/images/DELUXE ROOM/DSC_0950.jpg",
    "/images/DELUXE ROOM/DSC_0954.jpg",
    "/images/DELUXE ROOM/DSC_0944.jpg",
    "/images/DELUXE ROOM/DSC_0945.jpg",
    "/images/DELUXE ROOM/DSC_2405.JPG",
    "/images/DELUXE ROOM/DSC_2406.JPG"
  ],
  "Standard Room": [
    "/images/standard.jpg",
    "/images/standard1.jpg",
    "/images/standard2.jpg",
    "/images/standard3.jpg",
  ],
  "Standard Room without Balcony": [
    "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7787.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/ASM_7789.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0986.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0997.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0985.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0987.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0990.jpg",
    "/images/STANDARD ROOM WITHOUT BALCONY/DSC_0994.jpg"
  ]
}

const roomDetails = {
  "Deluxe Room": {
    description: "Our Deluxe Room offers a blend of traditional Rajasthani decor and modern comfort, featuring a king-size bed, private balcony, and a stunning city view.",
    features: ["King Bed", "City View", "Balcony", "Sitting Area", "Tea Service", "Free WiFi", "AC", "Private Bathroom"],
    maxGuests: 2,
    size: "350 sq ft",
    amenities: ["King-size bed", "Private balcony", "City view", "Sitting area", "Tea/coffee maker", "Free WiFi", "Air conditioning", "Private bathroom", "Hot water", "Daily housekeeping"]
  },
  "Standard Room": {
    description: "Our Standard Room is designed for comfort and convenience, offering a cozy sitting area, balcony, and beautiful city views.",
    features: ["City View", "Balcony", "Sitting Area", "Free WiFi", "AC", "Private Bathroom"],
    maxGuests: 2,
    size: "280 sq ft",
    amenities: ["Queen-size bed", "City view", "Balcony", "Sitting area", "Free WiFi", "Air conditioning", "Private bathroom", "Hot water", "Daily housekeeping"]
  },
  "Standard Room without Balcony": {
    description: "Our Standard Room without Balcony offers comfortable accommodation with all essential amenities, perfect for budget-conscious travelers.",
    features: ["City View", "Sitting Area", "Free WiFi", "AC", "Private Bathroom"],
    maxGuests: 2,
    size: "250 sq ft",
    amenities: ["Queen-size bed", "City view", "Sitting area", "Free WiFi", "Air conditioning", "Private bathroom", "Hot water", "Daily housekeeping"]
  }
}

export default function BookingPage() {
  const router = useRouter()
  const [selectedFloor, setSelectedFloor] = useState<string>("")
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [floorRooms, setFloorRooms] = useState({
    "Ground Floor": {
      "Deluxe Room": { available: 2, total: 3, price: 2500, originalPrice: 3000 },
      "Standard Room": { available: 1, total: 2, price: 1800, originalPrice: 2200 },
      "Standard Room without Balcony": { available: 2, total: 3, price: 1500, originalPrice: 1800 }
    },
    "First Floor": {
      "Deluxe Room": { available: 3, total: 4, price: 2500, originalPrice: 3000 },
      "Standard Room": { available: 2, total: 3, price: 1800, originalPrice: 2200 },
      "Standard Room without Balcony": { available: 1, total: 2, price: 1500, originalPrice: 1800 }
    },
    "Second Floor": {
      "Deluxe Room": { available: 1, total: 2, price: 2500, originalPrice: 3000 },
      "Standard Room": { available: 2, total: 2, price: 1800, originalPrice: 2200 },
      "Standard Room without Balcony": { available: 3, total: 4, price: 1500, originalPrice: 1800 }
    }
  })
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    adults: 2,
    children: 0,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  })
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState<string | null>(null)
  const [canBook, setCanBook] = useState(false)
  const [step, setStep] = useState(1) // 1: Floor Selection, 2: Room Selection, 3: Guest Info, 4: Payment
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [bookingId, setBookingId] = useState("")

  // Calculate dates
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  // Calculate nights and total price
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  
  const selectedRoomData = selectedFloor && selectedRoom ? floorRooms[selectedFloor as keyof typeof floorRooms][selectedRoom as keyof typeof floorRooms[typeof selectedFloor]] : null
  const totalPrice = nights * (selectedRoomData?.price || 0)
  const discount = nights * ((selectedRoomData?.originalPrice || 0) - (selectedRoomData?.price || 0))
  const finalTotal = totalPrice

  const handleDateChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    setAvailability(null)
    setCanBook(false)
  }

  const checkAvailability = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !selectedFloor || !selectedRoom) {
      setAvailability("Please select dates, floor, and room type.")
      return
    }
    
    const checkInDate = new Date(bookingData.checkIn)
    const checkOutDate = new Date(bookingData.checkOut)
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
    
    setLoading(true)
    setAvailability(null)
    
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          roomType: `${selectedRoom} - ${selectedFloor}`,
          checkOnly: true 
        })
      })
      const data = await res.json()
      
      if (data.available) {
        setAvailability("Available!")
        setCanBook(true)
      } else {
        setAvailability(data.error || "Not available for selected dates.")
        setCanBook(false)
      }
    } catch (error) {
      setAvailability("Error checking availability.")
      setCanBook(false)
    }
    setLoading(false)
  }

  const handleBooking = async () => {
    if (!canBook) return
    
    setLoading(true)
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          roomType: `${selectedRoom} - ${selectedFloor}`,
          guests: bookingData.guests,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          specialRequests: bookingData.specialRequests
        })
      })
      const data = await res.json()
      
      if (data.success) {
        setBookingId(data.bookingId)
        setShowSuccessModal(true)
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          router.push('/?booking=success')
        }, 3000)
      } else {
        setAvailability(data.error || "Booking failed.")
      }
    } catch {
      setAvailability("Booking failed. Please try again.")
    }
    setLoading(false)
  }

  const nextImage = () => {
    if (selectedRoom) {
      const images = roomImages[selectedRoom as keyof typeof roomImages]
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedRoom) {
      const images = roomImages[selectedRoom as keyof typeof roomImages]
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      )
    }
  }

  // Fetch floor availability on component mount
  useEffect(() => {
    const fetchFloorAvailability = async () => {
      try {
        const res = await fetch("/api/admin/floor-availability")
        const data = await res.json()
        if (data) {
          // Merge with pricing data
          const updatedFloorRooms = Object.keys(data).reduce((acc, floor) => {
            acc[floor] = {}
            Object.keys(data[floor]).forEach(roomType => {
              acc[floor][roomType] = {
                ...data[floor][roomType],
                price: floorRooms[floor as keyof typeof floorRooms]?.[roomType as keyof typeof floorRooms[typeof floor]]?.price || 2500,
                originalPrice: floorRooms[floor as keyof typeof floorRooms]?.[roomType as keyof typeof floorRooms[typeof floor]]?.originalPrice || 3000
              }
            })
            return acc
          }, {} as typeof floorRooms)
          setFloorRooms(updatedFloorRooms)
        }
      } catch (error) {
        console.error("Error fetching floor availability:", error)
      }
    }
    
    fetchFloorAvailability()
  }, [])

  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut && selectedFloor && selectedRoom) {
      checkAvailability()
    }
  }, [bookingData.checkIn, bookingData.checkOut, selectedFloor, selectedRoom])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-orange-100 text-orange-800 px-4 py-2">Secure Booking</Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Book Your Stay at Jee Ri Haveli
          </h1>
          <p className="text-lg text-gray-600">
            Experience the magic of Jodhpur with our comfortable accommodations
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Floor Selection</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Room Selection</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Guest Info</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 4 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                4
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Floor Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 mr-2 text-amber-600" />
                      Select Your Preferred Floor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.keys(floorRooms).map((floor) => (
                        <div
                          key={floor}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            selectedFloor === floor
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                          onClick={() => setSelectedFloor(floor)}
                        >
                          <h3 className="font-semibold text-lg mb-2">{floor}</h3>
                          <div className="space-y-2 text-sm">
                            {Object.entries(floorRooms[floor as keyof typeof floorRooms]).map(([roomType, data]) => (
                              <div key={roomType} className="flex justify-between">
                                <span className="text-gray-600">{roomType}</span>
                                <span className={`font-medium ${data.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {data.available}/{data.total} available
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!selectedFloor}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 text-lg font-semibold"
                >
                  Continue to Room Selection
                </Button>
              </motion.div>
            )}

            {/* Step 2: Room Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
                      Select Your Room on {selectedFloor}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(floorRooms[selectedFloor as keyof typeof floorRooms]).map(([roomType, data]) => (
                      <div
                        key={roomType}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedRoom === roomType
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        } ${data.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => data.available > 0 && setSelectedRoom(roomType)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={roomImages[roomType as keyof typeof roomImages][0]}
                              alt={roomType}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{roomType}</h3>
                            <p className="text-gray-600 text-sm mb-2">{roomDetails[roomType as keyof typeof roomDetails].description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                Up to {roomDetails[roomType as keyof typeof roomDetails].maxGuests} guests
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {roomDetails[roomType as keyof typeof roomDetails].size}
                              </span>
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-2xl font-bold text-amber-600">₹{data.price}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">₹{data.originalPrice}</span>
                              <Badge className="ml-2 bg-green-100 text-green-800">Save ₹{data.originalPrice - data.price}</Badge>
                              <Badge className={`ml-2 ${data.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {data.available > 0 ? `${data.available} Available` : 'Fully Booked'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                      Select Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkIn">Check-in Date</Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => handleDateChange('checkIn', e.target.value)}
                          min={today}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Check-out Date</Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => handleDateChange('checkOut', e.target.value)}
                          min={bookingData.checkIn || tomorrow}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    {availability && (
                      <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                        availability.includes("Available") 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {availability}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    disabled={!selectedRoom || !canBook}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    Continue to Guest Information
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Guest Information */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-amber-600" />
                      Guest Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={bookingData.name}
                          onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="adults">Adults</Label>
                        <Select
                          value={bookingData.adults.toString()}
                          onValueChange={(value) => {
                            const adults = parseInt(value)
                            setBookingData(prev => ({ 
                              ...prev, 
                              adults,
                              guests: adults + prev.children
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Adult' : 'Adults'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="children">Children</Label>
                        <Select
                          value={bookingData.children.toString()}
                          onValueChange={(value) => {
                            const children = parseInt(value)
                            setBookingData(prev => ({ 
                              ...prev, 
                              children,
                              guests: prev.adults + children
                            }))
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Child' : 'Children'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                        placeholder="Any special requests or preferences..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setStep(2)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(4)} 
                    disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                      Payment & Confirmation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800">Room Available!</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Your selected room is available for the chosen dates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Booking Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Room:</span>
                            <span className="font-medium">{selectedRoom} - {selectedFloor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in:</span>
                            <span className="font-medium">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out:</span>
                            <span className="font-medium">{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nights:</span>
                            <span className="font-medium">{nights}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests:</span>
                            <span className="font-medium">{bookingData.guests} ({bookingData.adults} adults, {bookingData.children} children)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Guest Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{bookingData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{bookingData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{bookingData.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {bookingData.specialRequests && (
                      <div>
                        <h4 className="font-semibold mb-2">Special Requests</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {bookingData.specialRequests}
                        </p>
                      </div>
                    )}

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Payment via Razorpay</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        You will be redirected to Razorpay's secure payment gateway to complete your booking.
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>Secure payment processing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setStep(3)} 
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleBooking}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    {loading ? "Processing..." : "Confirm Booking & Pay"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Room Image Carousel */}
            {selectedRoom && (
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-64 rounded-t-lg overflow-hidden">
                    <Image
                      src={roomImages[selectedRoom as keyof typeof roomImages][currentImageIndex]}
                      alt={selectedRoom}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {currentImageIndex + 1} / {roomImages[selectedRoom as keyof typeof roomImages].length}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{selectedRoom}</h3>
                    <p className="text-gray-600 text-sm mb-3">{roomDetails[selectedRoom as keyof typeof roomDetails].description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {roomDetails[selectedRoom as keyof typeof roomDetails].features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing Summary */}
            {selectedRoomData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                    Pricing Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Rate (per night)</span>
                    <span>₹{selectedRoomData.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Nights</span>
                    <span>{nights}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">* All taxes included</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security & Trust */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-semibold">Secure Booking</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    No Hidden Fees
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Instant Confirmation
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Free Cancellation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Booking Successful!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Thank you for your booking!</h3>
              <p className="text-gray-600 mb-4">
                Your booking has been confirmed successfully. You will receive a confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Booking ID:</p>
                <p className="font-mono font-semibold text-amber-600">{bookingId}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to homepage...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 