/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
  
    // Enhanced font handling
    webpack(config) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      });
      return config;
    },
  
    // Specific headers for fonts
    async headers() {
      return [
        {
          source: '/fonts/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable'
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: '*'
            },
            {
              key: 'Content-Type',
              value: 'font/woff2'
            }
          ]
        }
      ];
    }
  };
  
  module.exports = nextConfig;