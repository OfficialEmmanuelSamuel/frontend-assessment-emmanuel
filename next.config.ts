import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow optimized loading of remote TMDB images via next/image.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
