"use client";
import { Product } from "@/app/Data/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ product }: { product: Product }) {
  const images = [product.image1, product.image2, product.image3].filter(Boolean);
  const [current, setCurrent] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Slider */}
      <div className="relative h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[current]}
            src={`/img/products/${images[current]}`}
            alt={`${product.name} ${current + 1}`}
            loading="lazy"
            onClick={() => setActiveImage(images[current])}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain rounded-xl cursor-pointer"
          />
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-3 space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-accent scale-110" : "bg-gray-400"
            } transition-all`}
          />
        ))}
      </div>

      {/* New Arrival Tag */}
      {product.newArrival && (
        <span className="absolute top-3 left-3 bg-accent text-sm px-3 py-1 rounded-full shadow-md rotate-[-5deg]">
          ✨ NEW ARRIVAL
        </span>
      )}

      {/* Fullscreen Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={`/img/products/${activeImage}`}
            alt="Zoomed view"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
