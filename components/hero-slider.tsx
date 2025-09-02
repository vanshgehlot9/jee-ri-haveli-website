import React, { useState, useEffect } from "react";

const images = [
  "/images/slider2.jpg",
  "/images/slider1.jpg",
  "/images/slider3.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3500);
    return () => clearInterval(interval);
  }, [length]);

  const goToPrev = () => setCurrent((prev) => (prev - 1 + length) % length);
  const goToNext = () => setCurrent((prev) => (prev + 1) % length);

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) goToNext();
    if (touchEndX > touchStartX + 40) goToPrev();
  };

  return (
    <div
      className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`Slide ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          draggable={false}
        />
      ))}
      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 sm:p-2 shadow-md z-20 text-lg sm:text-2xl"
        aria-label="Previous Slide"
        tabIndex={0}
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 sm:p-2 shadow-md z-20 text-lg sm:text-2xl"
        aria-label="Next Slide"
        tabIndex={0}
      >
        &#8594;
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white bg-white/70 transition-all ${
              idx === current ? "bg-orange-500 border-orange-500" : ""
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
} 