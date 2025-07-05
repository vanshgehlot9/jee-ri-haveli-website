/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove static export for Vercel deployment
  // output: 'export',
  trailingSlash: true,
  // Reduce bundle size
  swcMinify: true,
  // Skip API routes for static export
  skipTrailingSlashRedirect: true,
}

export default nextConfig
