import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterTrust from "@/components/FooterTrust";

/* -------------------------------
   🧩 Font Setup
--------------------------------*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* -------------------------------
   🧠 SEO Metadata
--------------------------------*/
export const metadata: Metadata = {
  title: "eCom Accounting | Professional Accounting & Tax Services",
  description:
    "Expert CA services for small and medium businesses: GST registration, ITR filing, bookkeeping, accounting, and business setup assistance.",
  keywords: [
    "CA services",
    "accounting",
    "bookkeeping",
    "ITR filing",
    "GST registration",
    "business registration",
    "tax filing",
  ],
  authors: [{ name: "eCom Accounting" }],  
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* -------------------------------
   🌐 Root Layout Component
--------------------------------*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Theme can be swapped: theme-blue | theme-gray | theme-warm */}
      <body
        className={`theme-blue ${geistSans.variable} ${geistMono.variable} antialiased 
                    flex flex-col min-h-screen transition-colors`}
      >
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 shadow-sm">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-1 ">
          {children}
        </main>

        {/* Footer */}
        <FooterTrust />
        <Footer />
      </body>
    </html>
  );
}
