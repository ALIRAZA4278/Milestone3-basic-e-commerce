// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Add the external domain here
  },
};

export default nextConfig;
