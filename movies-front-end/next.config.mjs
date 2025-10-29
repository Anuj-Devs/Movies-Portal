/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*', // This Path used to be process.env.API_BASE_URL
      },
    ];
  },
};

export default nextConfig;
