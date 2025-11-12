"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bannerData from "@/app/Data/catalog.json";

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

  // Auto-slide with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const active = banners[current];

  return (
    <section
      className="relative overflow-hidden " // top padding to clear fixed navbar
      aria-label="Featured Resin Art Showcase"
    >
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 p-2 bg-light/60 backdrop-blur-md rounded-3xl shadow-md">
          {/* --- Text Section --- */}
          <div className="flex-1 text-left space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-accent leading-snug tracking-tight">
              {active.heading}
            </h1>

            <p className="text-base md:text-lg text-dark/80 max-w-xl">
              {active.text}
            </p>

            <ul className="space-y-2 text-base md:text-lg text-dark/90">
              {active.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Image Section --- */}
          <div className="flex-1 relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[460px]">
            <Image
              src={active.image}
              alt={active.heading}
              fill
              priority
              className="object-contain md:object-cover rounded-2xl shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* --- Dots Navigation --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-accent scale-125"
                : "bg-dark/30 hover:bg-accent/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
