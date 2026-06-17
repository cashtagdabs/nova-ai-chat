import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lint is run as a separate CI/dev step (`npm run lint`) to keep the
  // production build lean and fast. Type errors still fail the build.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep the build to a single worker to bound peak memory usage.
  experimental: {
    webpackBuildWorker: false,
    cpus: 1,
  },
};

export default nextConfig;
