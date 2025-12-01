import { Metadata } from "next";
import Image from "next/image";
import blogsData from "@/app/Data/blogs.json";
import { notFound } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
}

// --- Generate static paths for SSG ---
export async function generateStaticParams() {
  return blogsData.blogs.map((blog: Blog) => ({
    slug: blog.slug,
  }));
}

// --- Generate metadata for SEO ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogsData.blogs.find((b: Blog) => b.slug === slug);
  if (!blog) return { title: "Blog Not Found | GPMJ & Associates" };

  return {
    title: `${blog.title} | GPMJ & Associates`,
    description: blog.excerpt,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image }],
      type: "article",
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

// --- Main Page Component ---
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 
  const blog = blogsData.blogs.find((b: Blog) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <article
      className="bg-gray-50 py-20"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* --- Header Section --- */}
        <header className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-blue-700 mb-4"
            itemProp="headline"
          >
            {blog.title}
          </h1>
          <p className="text-gray-500 text-sm">
            By{" "}
            <span
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <span itemProp="name" className="font-semibold">
                {blog.author}
              </span>
            </span>{" "}
            •{" "}
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </p>
        </header>

        {/* --- Blog Image --- */}
        <div className="relative w-full h-80 md:h-[450px] rounded-xl overflow-hidden mb-10 shadow-md">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* --- Blog Content --- */}
        <div
          className="prose lg:prose-lg mx-auto text-gray-800 leading-relaxed"
          itemProp="articleBody"
        >
          {blog.content.split("\n").map((para, i) => (
            <p key={i} className="mb-6">
              {para}
            </p>
          ))}
        </div>

        <meta itemProp="datePublished" content={blog.date} />
        <meta itemProp="image" content={blog.image} />
      </div>
    </article>
  );
}
