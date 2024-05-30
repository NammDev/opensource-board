/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'assets.dub.co',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'o41lbhvmufhkidta.public.blob.vercel-storage.com',
      },
      { hostname: 'img.clerk.com' },
    ],
  },
}

export default nextConfig
