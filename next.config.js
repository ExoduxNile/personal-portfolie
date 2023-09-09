/** @type {import('next').NextConfig} */

module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};


const nextConfig = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: false, // <- Turn this option to false
    serverComponents: true,
  },
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.sanity.io",
      "avatars.githubusercontent.com",
      "github.com",
      "uploads-ssl.webflow.com",
      "firebasestorage.googleapis.com",
    ],
  },

  env: {
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_PROJECTID: "1t6krb1s",
  },
};

module.exports = nextConfig;
