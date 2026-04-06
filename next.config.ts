import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Enable ISR with revalidation
  experimental: {
    // Server Actions are enabled by default in Next.js 14+
  },
};

export default nextConfig;
