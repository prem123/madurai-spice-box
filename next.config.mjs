/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Product photos are submitted through the saveProduct server action.
      // The 1 MB default rejects any ordinary camera photo with a 413 before
      // the action even runs. The admin form downscales images client-side
      // (see lib/image-compress.ts), so this is only headroom — keep it under
      // Vercel's hard ~4.5 MB request body cap.
      bodySizeLimit: "4mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
