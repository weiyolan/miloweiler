/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'

});

const nextConfig = withPWA({
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["cdn.sanity.io"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.sanity.io",
    //     port: "",
    //   },
    // ],

    // NEXTJS13
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 's3.amazonaws.com',
    //     port: '',
    //     pathname: '/my-bucket/**',
    //   },
    // ],
    // DEFAULT:
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  reactStrictMode: true,
});

module.exports = nextConfig

