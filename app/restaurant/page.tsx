"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

export default function RestaurantPage() {
  const [showReserve, setShowReserve] = useState(false);

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-28" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <motion.h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-purple-700 py-8 sm:py-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        Roof Top Restaurant
      </motion.h1>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-4">
        {restaurantImages.map((src, idx) => (
          <motion.div key={src} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.07 }}>
            <Card className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
              <Image
                src={src}
                alt={`Restaurant photo ${idx + 1}`}
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                className=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={idx === 0}
              />
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div className="w-full max-w-2xl mx-auto mt-8 sm:mt-12 mb-12 sm:mb-20 flex flex-col items-center px-2 sm:px-0" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">Reserve a Table</h2>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg shadow-lg" onClick={() => setShowReserve(true)}>
          Reserve Now
        </Button>
        {showReserve && (
          <motion.div className="w-full max-w-full sm:max-w-lg bg-white rounded-xl shadow-xl p-3 sm:p-8 border border-purple-200 mt-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Simple reservation form */}
            <form className="space-y-4" action="/api/reserve-table" method="POST" onSubmit={() => setShowReserve(false)}>
              <div>
                <label className="block mb-1 font-medium text-purple-700">Name</label>
                <input type="text" name="name" required className="w-full border rounded-full px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-purple-700">Email</label>
                <input type="email" name="email" required className="w-full border rounded-full px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-purple-700">Phone</label>
                <input type="tel" name="phone" required className="w-full border rounded-full px-3 py-2" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium text-purple-700">Date</label>
                  <input type="date" name="date" required className="w-full border rounded-full px-3 py-2" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium text-purple-700">Time</label>
                  <input type="time" name="time" required className="w-full border rounded-full px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-purple-700">Guests</label>
                <input type="number" name="guests" min={1} defaultValue={2} required className="w-full border rounded-full px-3 py-2" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-base sm:text-lg font-bold mt-4">
                Confirm Reservation
              </Button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
} 