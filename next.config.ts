import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⭐ PENTING: Export static files untuk hosting biasa
  output: 'export',

  // ⭐ PENTING: Aktifkan trailing slash untuk konsistensi path
  trailingSlash: true,

  // Konfigurasi images untuk hosting tanpa optimization
  images: {
    unoptimized: true, // Matikan image optimization karena hosting biasa ga support
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Experimental features (opsional)
  experimental: {
    // @ts-ignore - Turbopack root config for monorepo-like structures
    turbopack: {
      root: '.',
    },
  },
};

export default nextConfig;