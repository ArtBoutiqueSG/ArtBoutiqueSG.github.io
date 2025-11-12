"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import navData from "@/app/Data/catalog.json";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = navData.navLinks;

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-accent/10"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        {/* --- Logo / Brand --- */}
        <div className="text-2xl font-semibold text-primary tracking-wide">
          <Link href="/">Art Boutique SG</Link>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="text-dark hover:text-accent transition-colors duration-200 font-medium"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* --- Mobile Toggle --- */}
        <button
          className="md:hidden text-dark hover:text-accent focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-accent/10 shadow-sm">
          <div className="flex flex-col space-y-3 p-4">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-dark hover:text-accent font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
