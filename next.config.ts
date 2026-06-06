import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.airtableusercontent.com",
      },
    ],
  },
  // Desactivamos temporalmente el indicador visual de Turbopack si estorba en desarrollo
  devIndicators: {
  },
};

export default nextConfig;
