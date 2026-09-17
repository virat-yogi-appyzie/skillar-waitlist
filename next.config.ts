import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma', 'puppeteer-core', '@sparticuz/chromium'],
  experimental: {
    // Dev tunnels forward a different Host than Origin, which otherwise
    // aborts every server action. Wildcards do not cross dots, hence both.
    serverActions: {
      allowedOrigins: ['*.devtunnels.ms', '*.*.devtunnels.ms', 'localhost:3000'],
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  }
};

export default nextConfig;
