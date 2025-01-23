/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  experimental: {
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
