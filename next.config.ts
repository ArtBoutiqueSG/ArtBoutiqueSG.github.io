import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enables static HTML export
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://artboutiquesg.github.io',
  },
  assetPrefix: "",
  basePath: "",
};

export default nextConfig;
