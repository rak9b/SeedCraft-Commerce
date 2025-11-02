/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com'],
  },
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
  },
  // Removed experimental.appDir as it's default in Next.js 14
}

module.exports = nextConfig