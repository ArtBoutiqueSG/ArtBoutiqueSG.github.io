"use client";

import Link from "next/link";
import {
  FileText,
  BookOpen,
  FileBarChart,
  Layers,
  CreditCard,
  Building2,
  Briefcase,
} from "lucide-react";
import data from "@/app/Data/data.json";

interface Service {
  name: string;
  text: string;
  highlights: string[];
}

// Utility: slugify service name to generate clean URL
const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// Map service names to icons
const iconMap: Record<string, any> = {
  "GST Registration & Filing": FileText,
  "Bookkeeping & Accounting": BookOpen,
  "Income Tax Returns": FileBarChart,
  "Marketplace Reconciliation": Layers,
  "Payment Gateway Integration": CreditCard,
  "Business Registration": Building2,
  "Small Business Advisory": Briefcase,
};

export default function Services() {
  const services: Service[] = data.services;

  return (
    <section
      id="services"
      className="py-20 bg-gray-50 text-gray-900"
      aria-label="Accounting and tax services offered by the firm"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* --- Section Header --- */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive accounting and tax solutions designed for eCommerce and small businesses.
          </p>
        </div>

        {/* --- Service Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => {
            const Icon = iconMap[service.name] || FileText;
            const slug = slugify(service.name);

            return (
              <div
                key={service.name}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                {/* --- Icon and title --- */}
                <div className="mb-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.name}
                  </h3>
                  {service.text && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.text}
                    </p>
                  )}
                </div>

                {/* --- Highlights --- */}
                <div className="space-y-2">
                  {service.highlights.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* --- CTA (Link) --- */}
                <div className="mt-6">
                  <Link
                    href={`/services/${slug}`}
                    className="block  py-2 px-4 rounded-lg  transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
