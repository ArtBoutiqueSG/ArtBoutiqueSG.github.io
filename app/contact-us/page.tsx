import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | GPMJ & Associates",
  description:
    "Get in touch with GPMJ & Associates for accounting, GST, and compliance services. Call, email, or visit our Mumbai office.",
  keywords: [
    "contact GPMJ",
    "CA firm Mumbai",
    "accounting support",
    "GST help",
    "tax filing contact",
    "bookkeeping services",
  ],
};

export default function ContactPage() {
  const contactInfo = {
    phone: "+91 9876543210",
    email: "support@ecomaccounting.com",
    address: "123 Business District, Mumbai, Maharashtra 400001",
    hours: "Mon - Sat: 9:00 AM - 7:00 PM",
  };

  return (
    <section
      id="contact"
      className="bg-gray-50 py-20"
      aria-label="Contact GPMJ & Associates"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* --- Heading --- */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-blue-700 mb-4"
            itemProp="headline"
          >
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or need professional guidance? Reach out to our team
            — we’re here to help.
          </p>
        </div>

        {/* --- Contact Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* --- Info Cards --- */}
          <div className="space-y-8" itemScope itemType="https://schema.org/Organization">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li>
                  <strong>📞 Phone:</strong>{" "}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="text-blue-600 hover:underline"
                    itemProp="telephone"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <strong>✉️ Email:</strong>{" "}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 hover:underline"
                    itemProp="email"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  <strong>📍 Address:</strong>{" "}
                  <span itemProp="address">{contactInfo.address}</span>
                </li>
                <li>
                  <strong>⏰ Business Hours:</strong> {contactInfo.hours}
                </li>
              </ul>
            </div>

            {/* --- Google Map Embed (optional placeholder) --- */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps?q=Business+District,+Mumbai,+Maharashtra&output=embed"
                width="100%"
                height="300"
                loading="lazy"
                className="border-0 w-full"
              ></iframe>
            </div>
          </div>

          {/* --- Contact Form --- */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Send Us a Message
            </h3>
            <form
              action="#"
              method="post"
              className="space-y-5"
              itemScope
              itemType="https://schema.org/ContactForm"
            >
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
