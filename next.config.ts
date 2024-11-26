import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Altere o limite conforme necessário
    },
  },
  // Outras configurações do Next.js
};

export default nextConfig;
