import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbo: {
    experimental: {
      turbopack: false
    }
  }
};

export default nextConfig;
