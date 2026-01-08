import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed - we have API routes and database, need server-side rendering
  images: {
    unoptimized: false, // Enable image optimization for server-side rendering
  },
  // Optimize build performance
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react', '@headlessui/react'],
  },
  // Compress output
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
};

export default nextConfig;

