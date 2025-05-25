/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  devIndicators: {
    // buildActivity: false,
    // buildActivityPosition: 'bottom-right',
    position: 'bottom-right',
  }
}

module.exports = nextConfig