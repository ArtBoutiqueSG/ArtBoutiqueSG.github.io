import Banner from "@/components/Banner";
import CategoryCard from "@/components/CategoryCard";
import data from "@/app/Data/catalog.json";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Art Boutique SG",
  description:
    "Art Boutique SG | A unique collection of specially designed, hand curated art pieces. All Rights Reserved.",
  keywords: [
    "Art Boutique SG",
    "Handcrafted Gifts",
    "Crafted with premium resin and artistic precision",
    "Budget-friendly yet aesthetic and premium gifts",
    "Perfect for birthdays, anniversaries, and festive gifting"    
  ],
};

export default function HomePage() {
  return (
    <>
      <Banner />

      <div className="mt-4 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {data.categories.map(cat => {
          const productsForCategory = data.products.filter(p => p.category == cat.name);
          if (productsForCategory.length === 0) {
            return null;
          }

          return (
            <CategoryCard
              key={cat.name}
              category={cat.name}
              products={productsForCategory}
            />
          );
        })}
      </div>
    </>
  );
}