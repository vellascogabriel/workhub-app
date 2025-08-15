import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  eslint: {
    // Ignorar erros de ESLint durante o build para permitir a compilação
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
