export const dynamic = "force-static";

// app/sitemap.ts
import { toSlug } from "@/utils/slug";
import type { Product, Category, Blog } from "@/app/Data/types";
import data from "@/app/Data/catalog.json";
import blogsData from "@/app/Data/blogs.json";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // --- Category URLs ---
  const categoryUrls = data.categories.map((cat: Category) => ({
    url: `${baseUrl}/category/${toSlug(cat.name)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // --- Product URLs ---
  const productUrls = data.products.map((p: Product) => ({
    url: `${baseUrl}/product/${toSlug(p.category)}/${p.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  
  // --- Blogs URLs ---
  const blogsUrls = blogsData.blogs.map((b: Blog) => ({
    url: `${baseUrl}/blogs/${toSlug(b.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // --- Static pages ---
  const staticUrls = [
    "",
    "/about",
    "/blogs",
    "/contact-us",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // --- Combine all ---
  return [...staticUrls, ...categoryUrls, ...productUrls, ...blogsUrls];
}