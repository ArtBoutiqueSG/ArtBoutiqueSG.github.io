"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bannerData from "@/app/Data/data.json";

interface BannerItem {
  heading: string;
  text: string;
  highlights: string[];
  image: string;
}

export default function Banner() {
  const banners: BannerItem[] = bannerData.banners;
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide every 3s with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setFade(true); // fade in new banner
      }, 400); // matches fade-out duration
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const active = banners[current];

  return (
    <section
      className="relative overflow-hidden bg-white text-gray-900"
      aria-label="Firm promotional banners"
    >
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-12 md:py-20 md:px-12">
          {/* Image */}
          <div className="flex-1 w-full flex justify-center md:justify-start relative min-h-[240px] sm:min-h-[300px] md:min-h-[420px]">
            <Image
              src={active.image}
              alt={active.heading}
              fill
              className="object-contain md:object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-6 text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-700 leading-tight">
              {active.heading}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              {active.text}
            </p>

            <ul className="text-base md:text-lg text-gray-600 space-y-2 pl-1">
              {active.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button className="ok mt-6 px-6 py-3 text-lg">Learn More</button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-blue-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
