/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  rewrites: async () => {
    return [
      {
        source: '/apis/:path*',
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
