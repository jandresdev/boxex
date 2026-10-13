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
      {
        source: "/servicios/recogida-en-casa",
        destination: "/recogida-en-casa",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/ayuda#contacto",
        permanent: true,
      },
      {
        source: "/como-funciona",
        destination: "/servicios",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
