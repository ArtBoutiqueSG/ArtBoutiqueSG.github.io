"use client";
import { useEffect, useRef, useState } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const stats: Stat[] = [
  { label: "Happy Clients", value: 500, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Success Rate", value: 99, suffix: "%" },  
  { label: "Client Rating", value: 4.9, suffix: "" },
];

export default function FooterTrust() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  // Detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!visible) return;

    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 1500; // 1.5 seconds
      const stepTime = 30;
      const increment = (end - start) / (duration / stepTime);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = parseFloat(start.toFixed(1));
          return newCounts;
        });
      }, stepTime);
    });
  }, [visible]);

  return (
    <footer
      ref={footerRef}
      className="bg-dark text-light py-16 px-6 md:px-12 text-center md:text-left"
      aria-label="Firm achievements and client trust metrics"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-lg md:text-xl text-blue-100 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-blue-100 text-center">
          © {new Date().getFullYear()} Art Boutique SG | A unique collection of specially designed, hand curated art pieces. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
