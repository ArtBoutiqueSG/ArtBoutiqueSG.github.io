import type { Product, Category } from "@/app/Data/types";
import data from "@/app/Data/catalog.json";
import ProductCard from "@/components/ProductCard";
import { toSlug } from "@/utils/slug";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/BreadcrumbItem";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// ---------- STATIC PARAM GENERATION ----------
export async function generateStaticParams() {
  return data.categories.map((cat: Category) => ({
    category: toSlug(cat.name),
  }));
}

// ---------- METADATA ----------
export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> } | { params: { category: string } }
) {
  // ✅ Do NOT await params — it’s always a plain object here
  const { category: slug } = await params;

  const category = data.categories.find((cat) => toSlug(cat.name) === slug);
  if (!category) return null; // ✅ null, not {}

  const filtered = data.products.filter((p) => p.category === category.name);

  const title = `${category.name} | Art Boutique SG`;
  const description = `Discover our curated collection of handcrafted ${category.name} — made with resin artistry, custom designs, and aesthetic detailing.`;
  const imageUrl =
    filtered.length > 0 ? `/img/${filtered[0].image1}` : `/img/logo.png`;

  const keywords = [
    "Art Boutique SG",
    "Resin Art",
    "Handcrafted Gifts",
    category.name,
    ...filtered.slice(0, 8).map((p: Product) => p.name),
  ];

  // ✅ JSON-LD must be injected manually for static export
  const ldjson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${baseURL}/category/${slug}`,
    mainEntity: filtered.map((p: Product) => ({
      "@type": "Product",
      name: p.name,
      image: `${baseURL}/img/${p.image1}`,
      url: `${baseURL}/product/${toSlug(p.category)}/${p.id}`,
    })),
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseURL}/category/${slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseURL}/category/${slug}`,
    },
  };
}
// ---------- MAIN PAGE ----------
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;

  const category = data.categories.find((cat) => toSlug(cat.name) === slug);
  if (!category) notFound();

  const filtered = data.products.filter((p) => p.category === category.name);

  const ldjson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} | Art Boutique SG`,
    description: `Explore handcrafted ${category.name} by Art Boutique SG.`,
    url: `${baseURL}/category/${slug}`,
    mainEntity: filtered.map((p: Product) => ({
      "@type": "Product",
      name: p.name,
      image: `${baseURL}/img/${p.image1}`,
      url: `${baseURL}/product/${toSlug(p.category)}/${p.id}`,
    })),
  };

  return (
    <main className="theme-rose bg-light min-h-screen pt-18 px-4 sm:px-6 md:px-20 pb-12 overflow-x-hidden">

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: category.name }]} />
      {/* CATEGORY HEADER */}
      <header className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-xl font-bold text-accent mb-3">
          {category.name}
        </h1>
        <p className="text-dark text-base max-w-2xl mx-auto">
          Discover our unique {category.name} — handcrafted with care, designed
          to make every moment feel personal and special.
        </p>
      </header>

      {/* PRODUCT GRID */}
      <section className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-light mt-8">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
