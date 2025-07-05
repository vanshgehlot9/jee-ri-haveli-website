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
  // Static export for cPanel
  output: 'export',
  trailingSlash: true,
  // Reduce bundle size
  swcMinify: true,
  // Skip API routes for static export
  skipTrailingSlashRedirect: true,
}

export default nextConfig
