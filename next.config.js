const { PROVIDER_ICON_CLASSNAME } = require('web3modal');

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
    REACT_APP_WEBHOOK_URL: process.env.REACT_APP_WEBHOOK_URL
  },
}

module.exports = nextConfig
