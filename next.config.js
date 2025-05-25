/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
  reactStrictMode: true,
  devIndicators: {
    // buildActivity: false,
    // buildActivityPosition: 'bottom-right',
    position: 'bottom-right',
  }
}

module.exports = nextConfig