/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
      // Keep enough headroom for multipart uploads plus server-action overhead.
      bodySizeLimit: '25mb',
        },
    },
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Your backend port
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-production-domain.com', // Your production backend domain
        pathname: '/uploads/**',
      },
    ],
    // Alternative: Use domains (older syntax, still works)
    // domains: ['localhost', 'your-production-domain.com'],
  },
};

export default nextConfig;
