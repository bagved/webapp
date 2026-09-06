import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF først, WebP som fallback — begge er langt mindre end de rå JPG'er.
    // Next konverterer og cacher automatisk; originalerne i /public røres ikke.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
