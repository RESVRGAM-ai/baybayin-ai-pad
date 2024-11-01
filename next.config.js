/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // CSS Configuration
  css: {
    modules: false,
  },

  // Headers Configuration
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
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
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

  // Combined Webpack Configuration
  webpack: (config) => {
    // PostCSS loader configuration
    config.module.rules.push({
      test: /postcss\.config\.js$/,
      loader: 'node-loader',
    });

    // Font file handling
    config.module.rules.push({
      test: /\.(woff2)$/,
      type: 'asset/resource'
    });

    return config;
  }
}

module.exports = nextConfig