import type { NextConfig } from "next";
import { cacheLife, cacheTag } from 'next/cache';

const nextConfig: NextConfig = {
    cacheComponents: true
};

export default nextConfig;
