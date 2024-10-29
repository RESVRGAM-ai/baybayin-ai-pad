/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    
    // Optimize static asset handling
    images: {
      unoptimized: true, // For static exports if needed
      remotePatterns: [] // Add any remote image patterns if needed
    },
    
    // Webpack configuration for PDF generation
    webpack: (config, { isServer }) => {
      // Handle canvas in SSR
      if (isServer) {
        config.externals.push({
          canvas: 'canvas',
          'html2canvas': 'html2canvas'
        });
      }
      
      return config;
    },
  
    // Environment configuration
    env: {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    },
  
    // Static file handling
    async headers() {
      return [
        {
          source: '/fonts/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable'
            }
          ]
        }
      ];
    }
  };
  
  module.exports = nextConfig;