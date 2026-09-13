/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/FranzKopp",
        destination: "/franzkopp",
        permanent: true,
      },
      {
        source: "/FranzKopp-7f4k9m2x",
        destination: "/franzkopp",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
