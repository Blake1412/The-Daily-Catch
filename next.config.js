/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/The-Daily-Catch' : '',
  images: {
    unoptimized: true,
  },
  // Add assetPrefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? '/The-Daily-Catch' : '',
}

module.exports = nextConfig