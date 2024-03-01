const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // except for webpack, other parts are left as generated
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    if (context.isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
  poweredByHeader: false
}

module.exports = nextConfig
