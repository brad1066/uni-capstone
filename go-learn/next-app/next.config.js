/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // except for webpack, other parts are left as generated
    webpack: (config, context) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
      }
      return config
    },
    env: {
      PASSWORD_SALT: '$2b$10$$2b$10$20UUpDj.ycrRX.X3s4tM0O'
    }
  }

module.exports = nextConfig
