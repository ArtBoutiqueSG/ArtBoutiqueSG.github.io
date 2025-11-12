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
  title: "Blogs | Handcrafted Art, Resin Stories & Design Inspiration",
  description:
    "Discover creative stories, artist insights, and design inspiration from our handcrafted resin art studio — where ideas turn into elegant keepsakes.",
  keywords: [
    "resin art blog",
    "handcrafted decor ideas",
    "artistic stories",
    "creative design inspiration",
    "resin artist Sheetal Jain",
  ],
};

export default function BlogsPage() {
  const blogs: Blog[] = blogsData.blogs;

  return (
    <section
      id="blogs"
      className="py-20 bg-light"
      aria-label="Blog articles and stories on handcrafted art and resin design"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* --- Page Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            From Our Studio
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explore stories, inspiration, and behind-the-scenes glimpses into the world
            of handcrafted resin art by our artist, Sheetal Jain.
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
                  className="text-xl font-semibold text-dark mb-2"
                  itemProp="headline"
                >
                  {blog.title}
                </h2>

                <p
                  className="text-muted text-sm mb-4"
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
                  className="text-secondary text-base leading-relaxed mb-6 flex-grow"
                  itemProp="description"
                >
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-block border border-accent text-accent hover:bg-accent hover:text-primary py-2 px-5 rounded-lg self-start transition-colors"
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
