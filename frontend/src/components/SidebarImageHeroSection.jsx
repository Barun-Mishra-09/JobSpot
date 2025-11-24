import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProductBased from "../components/Images/ProductBased1.png";
import ServiceBasedCompany from "../components/Images/ServiceBasedCompany.png";
import RemoteJob from "../components/Images/RemoteJobComplete.png";
import Internship from "../components/Images/Internship.png";

const images = [ProductBased, ServiceBasedCompany, RemoteJob, Internship];

const SliderImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full 
      h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[76vh] 
      overflow-hidden rounded-2xl shadow-lg"
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          transition={{
            x: { type: "tween", ease: "easeInOut", duration: 2 }, // slow slide
          }}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      </AnimatePresence>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl pointer-events-none"></div>

      {/* 🔘 Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#8A2BE2] scale-125 shadow-md"
                : "bg-white/60 hover:bg-white/90"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SliderImage;
