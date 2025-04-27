/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.kinos-engine.ai', 'storage.googleapis.com'],
  },
  // For Vercel serverless deployment
  output: 'serverless',
}

module.exports = nextConfig
