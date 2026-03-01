import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore - Turbopack root config for monorepo-like structures
    turbopack: {
      root: '.',
    },
  },
};

export default nextConfig;
