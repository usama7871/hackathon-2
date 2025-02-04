/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'img.clerk.com',
      'images.clerk.dev'  // Add this as well for Clerk's image hosting
    ],
  },
};

export default nextConfig;