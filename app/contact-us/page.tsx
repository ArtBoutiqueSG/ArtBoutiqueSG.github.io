import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Handcrafted Resin Studio by Sheetal Jain",
  description:
    "Get in touch with our handcrafted resin studio for custom gifts, festive decor, or personalized art. Connect directly via WhatsApp for quick inquiries and orders.",
  keywords: [
    "resin art",
    "customized gifts",
    "handcrafted resin decor",
    "resin trays and coasters",
    "gift hampers",
    "resin art India",
  ],
};

export default function ContactPage() {
  const contactInfo = {
    whatsapp: "+65 8797 5001",
    email: "artboutiquesg@gmail.com",
    address:"9 punggol field walk, flo residences, Singapore, 828743",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM",
  };

  return (
    <section
      id="contact"
      className="theme-rose bg-light py-20"
      aria-label="Contact Handcrafted Resin Studio"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="container mx-auto px-6 md:px-16">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-accent mb-4"
            itemProp="headline"
          >
            Get in Touch
          </h1>
          <p className="text-dark text-lg max-w-2xl mx-auto">
            Have an idea for a customized resin creation or a special occasion
            gift? We’d love to bring it to life. Reach out directly via WhatsApp
            or email — our handcrafted world is just a message away.
          </p>
        </div>

        {/* --- Contact Info --- */}
        <div
          className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <h3 className="text-2xl font-semibold text-accent mb-6">
            Contact Information
          </h3>
          <ul className="space-y-4 text-dark text-base leading-relaxed">
            <li>
              <strong>💬 WhatsApp:</strong>{" "}
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
                itemProp="telephone"
              >
                {contactInfo.whatsapp}
              </a>
            </li>
            <li>
              <strong>✉️ Email:</strong>{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-accent hover:underline"
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

        {/* --- Google Map --- */}
        <div className="max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="Studio Location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              contactInfo.address
            )}&output=embed`}
            width="100%"
            height="300"
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </div>

        {/* --- Closing Note --- */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <p className="text-dark text-lg">
            Whether it’s a festive hamper, elegant decor piece, or custom resin
            tray — every creation starts with a simple idea. Let’s make yours
            shine ✨
          </p>
        </div>
      </div>
    </section>
  );
}
