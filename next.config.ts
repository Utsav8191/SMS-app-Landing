import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/',
        permanent: false,
      },
      {
        source: '/pricing/success',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
