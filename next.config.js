// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel specific optimizations
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "font-src 'self' data: https://*.vercel.app;"
          },
          {
            // Enable font optimization
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        // Specific headers for font files
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  // Optional: Configure webpack if needed
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff2)$/,
      type: 'asset/resource'
    });
    return config;
  }
}

module.exports = nextConfig