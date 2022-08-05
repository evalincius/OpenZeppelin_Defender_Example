/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };

    return config;
  },
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    CHAIN_ID: process.env.CHAIN_ID,
  },
}

module.exports = nextConfig
