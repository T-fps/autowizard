/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.imagin.studio',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.carlogos.org',
        pathname: '/**',
      },
    ],
    unoptimized: true, // For static export compatibility
  },
}

module.exports = nextConfig
