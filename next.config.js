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
    REACT_APP_WEBHOOK_URL: process.env.REACT_APP_WEBHOOK_URL,
    FORWARDER_SMART_CONTRACT: process.env.FORWARDER_SMART_CONTRACT,
    MARKETPLACE_SMART_CONTRACT: process.env.MARKETPLACE_SMART_CONTRACT
  },
}

module.exports = nextConfig
