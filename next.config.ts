import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/uploads/photos/**", // Permite qualquer arquivo dentro da pasta 'uploads/photos'
      },
    ],
  },
};

export default nextConfig;
