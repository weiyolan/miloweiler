import Document, { Html, Head, Main, NextScript } from "next/document";
import client from "../../lib/sanity";

const FALLBACK = {
  primary: "255 255 255",
  darkPrimary: "0 0 0",
  darkGrey: "48 48 48",
  accent: "65 0 164",
};

function hexToRgbChannels(hex) {
  if (!hex || typeof hex !== 'string') return null;
  const match = hex.replace('#', '').match(/.{2}/g);
  if (!match || match.length < 3) return null;
  return match.slice(0, 3).map((c) => parseInt(c, 16)).join(' ');
}

export default function MyDocument({ themeColors }) {
  const colors = themeColors || FALLBACK;
  const style = {
    "--color-primary": colors.primary,
    "--color-darkPrimary": colors.darkPrimary,
    "--color-darkGrey": colors.darkGrey,
    "--color-accent": colors.accent,
  };

  return (
    <Html className="snap-y snap-mandatory md:snap-none " style={style}>
      <Head>
        <meta name="apple-mobile-web-app-title" content="Milo Weiler Photograpy" />
        <meta name="application-name" content="Milo Weiler Photograpy" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.1" />
        <link rel="manifest" href="/site.webmanifest?v=1.1" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.1" color="#212121" />
        <link rel="shortcut icon" href="/favicon.ico?v=1.1" />
        <meta name="msapplication-TileColor" content="#212121" />
        <meta name="theme-color" content="#212121" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
    if (settings) {
      return {
        ...initialProps,
        themeColors: {
          primary: hexToRgbChannels(settings.primary) || FALLBACK.primary,
          darkPrimary: hexToRgbChannels(settings.darkPrimary) || FALLBACK.darkPrimary,
          darkGrey: hexToRgbChannels(settings.darkGrey) || FALLBACK.darkGrey,
          accent: hexToRgbChannels(settings.accent) || FALLBACK.accent,
        },
      };
    }
  } catch (e) {
    console.error("Failed to fetch theme settings:", e);
  }
  return initialProps;
};
