import type { Product, Category } from "@/app/Data/types";
import data from "@/app/Data/catalog.json";
import ProductCard from "@/components/ProductCard";

import { toSlug } from "@/utils/slug";
import { notFound } from "next/navigation";

//const data = dataRaw as CatalogData;
const baseURL = "https://artboutiquesg.github.io";

interface CategoryPageProps {
    params: {
        category: string;
    };
}

let ldjson = {};
// ---- STATIC PARAM GENERATION ----
export async function generateStaticParams() {
    return data.categories.map((cat: Category) => ({
        category: (toSlug(cat.name)),
    }));
}

// ---- METADATA ----
export async function generateMetadata({ params }: CategoryPageProps) {
    const { category: slug } = await params;
    
    const category = data.categories.find(
        (cat) => toSlug(cat.name) === slug
    );
    if (!category) return {};

    const filtered = data.products.filter(p => p.category == category.name);

    const title = `${category.name} by Art Boutique SG`;
    const description = `Explore ${filtered.length} ${category} at Art Boutique SG Nagda Junction. High-quality gold & silver jewelry with BIS 916 certified gold.`;

    const imageUrl =
        filtered.length > 0
            ? `/img/${filtered[0].image1}`
            : `/logo.png`;

    const keywords =
        filtered.length > 0
            ? [category, ...filtered.slice(0, 10).map((p: Product) => p.name)].join(", ")
            : category;

    ldjson = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category} by `,
        description,
        url: `${baseURL}/category/${slug}`,
        mainEntity: filtered.map((p: Product) => ({
            "@type": "Product",
            name: p.name,
            image: `/img/${p.image1}`,
            url: `${baseURL}/product/${p.category}/${p.id}`,
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

// ---- MAIN PAGE ----
export default async function CategoryPage({ params }: CategoryPageProps) { // ✅ make it async
    const { category: slug } = await params; // ✅ no await needed here either   
    
    const category = data.categories.find(
        (cat) => toSlug(cat.name) === slug
    );

    if (!category) notFound();

    const filtered = data.products.filter(p => p.category == category.name);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* ✅ JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
            />
            <h1 className="text-xl md:text-2xl">{category.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">
                Explore our exclusive collection of {category.name} at Art Boutique SG
                Nagda. High-quality gold & silver jewellery with BIS 916 certification.
            </p>

            {filtered.length === 0 ? (
                <p>No product found in this category</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((p: Product) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}