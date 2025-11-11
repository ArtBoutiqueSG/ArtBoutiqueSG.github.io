import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enables static HTML export
  images: { unoptimized: true },
  assetPrefix: "",
  basePath: "",
};

export default nextConfig;
