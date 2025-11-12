import Head from "next/head";

const aboutData = {
  seo: {
    title: "About Us | Handcrafted Resin Creations & Customized Gifts",
    description:
      "Discover our passion for handcrafted resin art and personalized gift hampers. From decor to festive platters, every product is designed with love and detail to bring your ideas to life.",
    keywords:
      "handcrafted resin art, customized gifts, gift hampers, decor, coasters, trays, candles, resin art India",
  },
  hero: {
    heading: "About Our Handcrafted Resin Studio",
    subheading:
      "Turning ideas into timeless handcrafted art — one resin piece at a time.",
    image: "/img/about-hero1.png",
  },
  story: {
    title: "Our Story",
    content: `We started with a simple goal — to blend creativity, craftsmanship, and personalization into every handcrafted product we make. 
    From vibrant coasters and elegant trays to meaningful gift hampers and festive decor, every item is made with attention to detail and a love for art. 
    
    Collaboration is at the heart of our work — we’ve proudly co-created beautiful gifts with @the.beadery.co, turning customer ideas into budget-friendly, aesthetic realities. 
    Whether it’s for Diwali, Rakhi, or a personal milestone, we aim to make every gift feel special and every space feel personal.`,
  },
  expertise: {
    title: "Our Expertise",
    highlights: [
      {
        title: "✨ Resin Art Mastery",
        description:
          "Each creation reflects expert craftsmanship and a deep understanding of resin chemistry — from glossy finishes to durable designs.",
      },
      {
        title: "🎁 Personalized Gifting",
        description:
          "We specialize in customized hampers, festive decor, and sentimental keepsakes — all tailored to your color themes, occasions, and stories.",
      },
      {
        title: "🌿 Sustainable Crafting",
        description:
          "We use eco-friendly materials where possible, ensuring our art not only looks beautiful but is kind to the planet.",
      },
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Do you take custom orders?",
        answer:
          "Absolutely! You can DM us your idea, color theme, or occasion, and we’ll create something truly unique for you.",
      },
      {
        question: "How long does it take to make a custom resin product?",
        answer:
          "Most custom orders take 5–7 days depending on complexity and curing time. For bulk or festive orders, we’ll confirm timelines in advance.",
      },
      {
        question: "Can you ship across India?",
        answer:
          "Yes, we ship pan-India with proper packaging to ensure safe delivery of every handcrafted item.",
      },
    ],
  },
  testimonials: {
    title: "Customer Reviews",
    items: [
      {
        name: "Riya Sharma",
        review:
          "Absolutely loved the blue theme gift hamper! The detailing and packaging were perfect. It felt so personalized and thoughtful.",
        rating: 5,
      },
      {
        name: "Amit Verma",
        review:
          "The Diwali decor pieces were stunning! The resin shine and finish were way better than expected. Definitely coming back for more.",
        rating: 5,
      },
      {
        name: "Nisha Patel",
        review:
          "Beautiful craftsmanship! Ordered a coaster set and it perfectly matched my living room aesthetic.",
        rating: 4.5,
      },
    ],
  },
  artist: {
    name: "Sheetal Jain",
    title: "Founder & Resin Artist",
    bio: `Meet Sheetal Jain — the creative force and visionary behind our handcrafted resin studio. 
  With a deep love for art and design, Sheetal started this journey to transform everyday moments into timeless keepsakes. 
  Her artistry combines modern aesthetics with traditional craftsmanship, ensuring that every resin piece tells a personal story. 
  
  From humble beginnings crafting custom decor for friends, to now leading a boutique brand loved for its originality, 
  Sheetal’s work is a reflection of passion, patience, and the joy of creating beauty by hand.`,
    image: "/img/sheetal-jain.png",
  },
};

export default function AboutPage() {
  const { seo, hero, story, expertise, faqs, testimonials, artist } = aboutData;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Head>

      <main className="theme-rose bg-light min-h-screen py-18 px-4 sm:px-6 md:px-24 overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-accent mb-4">{hero.heading}</h1>
          <p className="text-lg text-dark mb-6">{hero.subheading}</p>
          {hero.image && (
            <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-md">
              <img
                src={hero.image}
                alt="About our handcrafted resin products"
                className="w-full h-auto object-contain block"
              />
            </div>
          )}
        </section>

        {/* STORY SECTION */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-accent">
            {story.title}
          </h2>
          <p className="text-dark leading-relaxed whitespace-pre-line">
            {story.content}
          </p>
        </section>

        {/* ARTIST SECTION */}
        <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none overflow-hidden rounded-2xl shadow-lg">
              <img
                src={artist.image}
                alt={`Portrait of ${artist.name}`}
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              Meet the Artist — {artist.name}
            </h2>
            <h3 className="text-lg text-light mb-4">{artist.title}</h3>
            <p className="text-dark leading-relaxed whitespace-pre-line">
              {artist.bio}
            </p>
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section className="bg-accent p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-semibold text-highlight-text mb-6">
            {expertise.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {expertise.highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-accent font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-dark text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-accent">
            {faqs.title}
          </h2>
          <div className="space-y-4">
            {faqs.items.map((faq, idx) => (
              <details
                key={idx}
                className="bg-bg-light border border-border-color rounded-lg p-4"
              >
                <summary className="cursor-pointer font-medium text-dark">
                  {faq.question}
                </summary>
                <p className="mt-2 text-light">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-bg-accent p-8 rounded-2xl max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-accent text-center">
            {testimonials.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.items.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <p className="italic text-dark mb-3">“{t.review}”</p>
                <p className="text-accent font-semibold">— {t.name}</p>
                <p className="text-yellow-500 mt-1">
                  {"★".repeat(Math.floor(t.rating))}
                  {t.rating % 1 !== 0 ? "½" : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
