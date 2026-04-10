/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "encrypted-tbn0.gstatic.com", "images.unsplash.com", "images.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
