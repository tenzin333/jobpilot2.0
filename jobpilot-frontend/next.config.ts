import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath:'/jobPilot',
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
