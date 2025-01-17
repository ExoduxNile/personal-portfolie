/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}


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
