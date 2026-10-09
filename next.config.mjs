/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/reclamaciones",
        destination: "/pqr",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
