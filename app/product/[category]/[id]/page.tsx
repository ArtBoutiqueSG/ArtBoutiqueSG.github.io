import type { Product } from "@/app/Data/types";
import data from "@/app/Data/catalog.json";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import NativeShare from "@/components/NativeShare";
import { toSlug } from "../../../../utils/slug";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaSnapchatGhost,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";


const baseURL = "https://artboutiquesg.github.io";
const phone = "918234042231";

// ✅ Generate all static paths
export async function generateStaticParams() {
  return data.products.map((p: Product) => ({
    category: (toSlug(p.category)),
    id: p.id.toString()
  }));
}


export async function generateMetadata(
  props: { params: Promise<{ category: string; id: string }> }
): Promise<Metadata> {  
  const { category: categorySlug, id } = await props.params;  

  const product = data.products.find(
    (p: Product) => p.id.toString() === id
  );

  if (!product) return {};

  const baseProductUrl =
    `${baseURL}/product/${toSlug(product.category)}/${id}`;

  const driveURL = `${baseURL}/img/products/`;
  const title = `${product.name} ${product.id} | Art Boutique SG`;
  const description = `Explore ${product.name} ${product.description}`;
  const imageUrl = `${driveURL}${product.image1}`;
  const keywords = [
    product.name,    
    product.category,
    product.description,
  ].join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: baseProductUrl,
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: baseProductUrl,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category: categorySlug, id } = await params;  
  // Find product within that category
  const product = data.products.find(
    (p: Product) => p.id.toString() === id.toString()
  );

  if (!product) {
    console.warn("❌ Product not found !!");
    return notFound();
  }

  const baseProductUrl = `${baseURL}/product/${(product.category)}/${id}`;

  const whatsappUrl = `https://wa.me/${phone}?text=${(
    `Hi, I want more details and discount on ${baseProductUrl}`
  )}`;
  const encodedUrl = (baseProductUrl);
  const encodedText = (`Check out this product: ${product.name}`);
  const whatsappShare = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const telegramShare = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
  const snapchatShare = `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`;
  const instagramShare = `https://www.instagram.com/?url=${encodedUrl}`;
  const ldjson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image1,
    description: `${product.name} ${product.category} ${product.description}`,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Art Boutique SG",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: 10,
      availability: "https://schema.org/InStock",
      url: baseProductUrl,
    },
  };

  return (

    <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-6 py-6 px-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldjson) }}
      />
      {/* ✅ Client-side gallery */}
      <ProductGallery product={product} driveURL="" />

      {/* ✅ Product Details */}
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl mb-2">{product.name}</h1>

        

        {/* Contact */}
        <div className="flex items-center gap-4 mb-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-5xl !text-green-500 hover:text-green-600 transition-transform hover:scale-110"
          >
            <FaWhatsapp />
          </a>
          <span>
            अधिक जानकारी के लिए{" "}
            <a href="tel:8234042231" className="underline font-medium">
              8234042231
            </a>{" "}
            पर संपर्क करें...
          </span>
        </div>

        {/* Highlights */}
        
          <p className="list-disc list-inside space-y-1 mb-4">
            {product.description}        
           
          </p>
        

        {/* Share */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg  mb-3">Share this product</h2>
          <div className="flex gap-5 items-center flex-wrap">
            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl !text-green-500 hover:scale-110 transition-transform"
            >
              <FaWhatsapp />
            </a>
            <a
              href={telegramShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl !text-sky-500 hover:scale-110 transition-transform"
            >
              <FaTelegramPlane />
            </a>
            <a
              href={snapchatShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl !text-yellow-400 hover:scale-110 transition-transform"
            >
              <FaSnapchatGhost />
            </a>
            <a
              href={instagramShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl !text-pink-500 hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>
            <NativeShare
              productName={product.name}
              productUrl={baseProductUrl}
              phone="8234042231" />
          </div>
        </div>
      </div>
    </div>
  );
}
