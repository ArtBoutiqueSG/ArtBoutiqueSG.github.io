import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | GPMJ & Associates",
  description:
    "Your trusted partner for eCommerce success. We specialize in accounting, taxation, and compliance services tailored for online businesses.",
  keywords: [
    "About GPMJ",
    "CA firm for eCommerce",
    "eCommerce accounting",
    "GST compliance",
    "tax filing",
    "online seller bookkeeping",
  ],
};

// Static Data
const aboutData = {
  heading: "Your Trusted Partner for eCommerce Success",
  text: [
    "We specialize in providing comprehensive accounting and compliance services specifically designed for eCommerce sellers. Our team understands the unique challenges faced by online businesses and marketplace sellers.",
    "From GST compliance to marketplace reconciliation, we handle all your financial needs so you can focus on what you do best — growing your business.",
  ],
  highlights: [
    {
      text: "Certified Professionals",
      description: "Our team consists of qualified CAs and tax experts",
    },
    {
      text: "eCommerce Specialized",
      description: "Deep expertise in online marketplace operations",
    },
    {
      text: "24/7 Support",
      description: "Round-the-clock assistance for urgent queries",
    },
  ],
  testimonials: [
    {
      name: "Naman Naredi",
      title: "Paper Industry",
      feedback:
        "A good man and a great professionalist person in his work.",
    },
    {
      name: "Praneet Sisodiya",
      title:
        "HR / Sales / Growth - Coaching | Mentoring (Client since 2017)",
      feedback:
        "We are associated with CA Arpit Paliwal since 2017. His invaluable contribution, knowledge, and implementation make it all easy for us. Highly approachable and easy to work with. Strongly recommended!",
    },
  ],
};

export default function AboutPage() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-20"
      aria-label="About GPMJ & Associates firm"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* --- Heading --- */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 transition-all duration-500"
            itemProp="headline"
          >
            {aboutData.heading}
          </h1>
          {aboutData.text.map((p, i) => (
            <p
              key={i}
              className="text-gray-700 text-lg max-w-3xl mx-auto mb-4 leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-500"
              itemProp="description"
            >
              {p}
            </p>
          ))}
        </div>

        {/* --- Highlights --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {aboutData.highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                {h.text}
              </h3>
              <p className="text-gray-600">{h.description}</p>
            </div>
          ))}
        </div>

        {/* --- Testimonials --- */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            Testimonials
          </h2>
          <div className="space-y-10">
            {aboutData.testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all duration-500"
                itemScope
                itemType="https://schema.org/Review"
              >
                <p
                  className="text-gray-700 text-lg italic mb-4"
                  itemProp="reviewBody"
                >
                  “{t.feedback}”
                </p>
                <footer className="text-blue-700 font-semibold" itemProp="author">
                  — {t.name}{" "}
                  <span className="text-gray-500 text-sm">· {t.title}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
