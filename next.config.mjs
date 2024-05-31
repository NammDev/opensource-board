/** @type {import('next').NextConfig} */
const nextConfig = {
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
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
