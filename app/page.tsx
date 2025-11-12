import Banner from "@/components/Banner";
import CategoryCard from "@/components/CategoryCard";
import data from "@/app/Data/catalog.json";
import { Metadata } from "next";


export const metadata: Metadata = {
  
  title: "Art Boutique SG | Handcrafted Resin Gifts & Home Decor",
  description:
    "Discover handcrafted resin gifts, personalized hampers, and custom decor made with artistic precision at Art Boutique SG. Each piece is designed to bring beauty, emotion, and individuality to your space.",
  keywords: [
    "Art Boutique SG",
    "Resin Art Singapore",
    "Handcrafted Gifts",
    "Custom Resin Decor",
    "Personalized Gift Hampers",
    "Home Decor Ideas",
    "Artisan Resin Studio",
  ],
  openGraph: {
    title: "Art Boutique SG | Handcrafted Resin Gifts & Home Decor",
    description:
      "Explore artisanal resin creations, personalized hampers, and timeless keepsakes crafted by hand at Art Boutique SG.",
    type: "website",
    url: "https://artboutiquesg.com",
    images: [
      {
        url: "/img/about-hero.png",
        width: 1200,
        height: 630,
        alt: "Art Boutique SG handcrafted resin decor",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main
      id="home"
      className="pt-20 md:pt-24 bg-light min-h-screen"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* --- Hero Banner --- */}
      <Banner />

      {/* --- Intro Section --- */}
      <section
        className="container mx-auto text-center p-4"
        aria-label="About Art Boutique SG"
      >
        <h2 className="text-accent text-3xl md:text-4xl font-semibold text-primary mb-4">
          Where Art Meets Emotion
        </h2>
        <p className="text-dark/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Every handcrafted resin piece from Art Boutique SG carries a story —
          an emotion poured into art. From custom hampers to timeless home
          decor, our creations celebrate individuality, creativity, and the joy
          of gifting something truly unique.
        </p>
      </section>

      {/* --- Category Grid --- */}
      <section
        className="container mx-auto px-2 "
        aria-label="Product Categories"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-accent text-center mb-8">
          Explore Our Creations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {data.categories.map((cat) => {
            const productsForCategory = data.products.filter(
              (p) => p.category === cat.name
            );
            if (productsForCategory.length === 0) return null;

            return (
              <CategoryCard
                key={cat.name}
                category={cat.name}
                products={productsForCategory}
              />
            );
          })}
        </div>
      </section>

      {/* --- Closing CTA --- */}
      <section className="bg-accent/10 py-12 md:py-16 text-center rounded-t-3xl">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Turn Your Ideas Into Art
        </h3>
        <p className="text-dark/80 text-base md:text-lg max-w-2xl mx-auto mb-6">
          Whether it’s a personalized resin gift, a themed hamper, or a bespoke
          decor piece, we bring your vision to life with creativity and care.
        </p>
        <a
          href="https://wa.me/6587975001"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-accent/90 transition-all duration-200"
        >
          Chat with Us on WhatsApp →
        </a>
      </section>
    </main>
  );
}
