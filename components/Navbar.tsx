"use client";
import { useState } from "react";
import Link from "next/link";
import navData from "@/app/Data/catalog.json";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = navData.navLinks;

  return (
    <nav className="border-b  shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Firm Name */}
        <div className="text-xl font-bold tracking-wide">
          <Link href="/">Art Boutique SG</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="transition-colors"
            >
              {item.text}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-dark hover:text-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
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

      {/* Mobile Menu (Collapsible) */}
      {menuOpen && (
        <div className="md:hidden  border-t  shadow-sm">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-primary hover:text-dark transition-colors"
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
