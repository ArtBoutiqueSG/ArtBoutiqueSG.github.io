import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterTrust from "@/components/FooterTrust";
import Script from "next/script";

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
  metadataBase: new URL("https://artboutiquesg.github.io"),
  title: "Art Boutique SG | A unique collection of specially designed, hand curated art pieces",
  description:
    "ArtboutiqueSG is a unique collection of specially designed, hand curated art pieces, photo frame, resin crafts, rakhis, hand picked jewellery pieces",
  keywords: [
    "Diwali Gifts",
    "Rakhis",
    "Coasters",
    "Trays",
    "Photo Frames",
    "Keyrings",
    "Resin Clocks",
    "Gift Hampers",
    "Decor",
    "Candles"
  ],
  authors: [{ name: "Art Boutique SG" }],
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
        className={`theme-rose ${geistSans.variable} ${geistMono.variable} antialiased 
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
        <a id="powered-by-mehtalogy"
          href="https://mehtalogy.in"
          target="_blank" title="Powered by Mehtalogy LABS">
          Mehtalogy LABS
        </a>

        <Script src="https://mehtalogy.in/pb/v1.js"
          strategy="afterInteractive" />

      </body>
    </html >
  );
}
