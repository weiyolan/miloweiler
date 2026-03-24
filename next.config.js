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
    // domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],

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

  reactStrictMode: true,

  async redirects() {
    const { createClient } = require("next-sanity");
    const { config } = require("./lib/config");
    const sanityClient = createClient(config);
    const { CATEGORY_MAP } = require("./src/utils/categories");

    const projects = await sanityClient.fetch(
      `*[_type == "project"]{slug, cat, commissionedBool}`
    );

    const projectRedirects = projects.map((p) => ({
      source: `/${p.commissionedBool ? "commissioned" : "personal"}/${p.slug.current}`,
      destination: `/projects/${CATEGORY_MAP[p.cat]}/${p.slug.current}`,
      permanent: true,
    }));

    return [
      { source: "/commissioned", destination: "/projects/set-photography", permanent: true },
      { source: "/personal", destination: "/projects/personal-work", permanent: true },
      { source: "/projects/fine-art", destination: "/projects/personal-work", permanent: true },
      ...projectRedirects,
    ];
  },
});

module.exports = nextConfig

