/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'

});

const nextConfig = withPWA({
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      destination: `/${CATEGORY_MAP[p.cat]}/${p.slug.current}`,
      permanent: true,
    }));

    return [
      { source: "/commissioned", destination: "/set-photography", permanent: true },
      { source: "/personal", destination: "/personal-work", permanent: true },
      { source: "/projects/:category/:slug", destination: "/:category/:slug", permanent: true },
      { source: "/projects/:category", destination: "/:category", permanent: true },
      ...projectRedirects,
    ];
  },
});

module.exports = nextConfig

