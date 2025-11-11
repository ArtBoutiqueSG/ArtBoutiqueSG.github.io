import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import blogsData from "@/app/Data/blogs.json";

interface Blog {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export const metadata: Metadata = {
  title: "Blogs | Insights on eCommerce Accounting, GST & Compliance",
  description:
    "Explore expert blogs from GPMJ & Associates on accounting, GST, reconciliation, and financial best practices for eCommerce sellers in India.",
  keywords: [
    "eCommerce accounting",
    "GST compliance",
    "CA blog",
    "online seller finance",
    "tax filing",
    "bookkeeping",
  ],
};

export default function BlogsPage() {
  const blogs: Blog[] = blogsData.blogs;

  return (
    <section
      id="blogs"
      className="bg-gray-50 py-20"
      aria-label="Blog articles on eCommerce accounting and taxation"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* --- Page Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Our Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed with insights and expert articles on accounting, GST,
            and compliance for eCommerce sellers.
          </p>
        </div>

        {/* --- Blog List --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* --- Blog Image --- */}
              <div className="relative w-full h-56">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* --- Blog Content --- */}
              <div className="p-6 flex flex-col flex-grow">
                <h2
                  className="text-2xl font-semibold text-blue-700 mb-2"
                  itemProp="headline"
                >
                  {blog.title}
                </h2>
                <p
                  className="text-gray-500 text-sm mb-4"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  By <span itemProp="name">{blog.author}</span> •{" "}
                  <time dateTime={blog.date}>
                    {new Date(blog.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </p>

                <p
                  className="text-gray-700 text-base leading-relaxed mb-6 flex-grow"
                  itemProp="description"
                >
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-block  py-2 px-5 rounded-lg self-start transition-colors"
                >
                  View More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
