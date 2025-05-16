/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Custom-Header, Content-Type",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
