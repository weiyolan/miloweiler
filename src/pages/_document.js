import Document, { Html, Head, Main, NextScript } from "next/document";
import client from "../../lib/sanity";

const TOKENS = ['background', 'foreground', 'accent', 'link', 'surface', 'muted'];

const FALLBACK = {
  background: { light: "252 249 238", dark: "48 48 48" },
  foreground: { light: "60 11 3", dark: "252 249 238" },
  accent:     { light: "0 22 67", dark: "0 22 67" },
  link:       { light: "217 72 28", dark: "217 72 28" },
  surface:    { light: "162 54 21", dark: "162 54 21" },
  muted:      { light: "160 102 2", dark: "160 102 2" },
};

const FONT_FAMILY_MAP = {
  'instrument-sans': '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
  'brandon-grotesque': '"Brandon Grotesque", ui-sans-serif, system-ui, sans-serif',
  'playfair-display': '"Playfair Display", ui-serif, Georgia, serif',
  'fiona': '"Fiona", ui-serif, Georgia, serif',
  'monotalic': '"Monotalic", ui-monospace, monospace',
  'monotalic-narrow': '"Monotalic Narrow", ui-monospace, monospace',
  'monotalic-wide': '"Monotalic Wide", ui-monospace, monospace',
  'space-mono': '"Space Mono", ui-monospace, monospace',
};

const FONT_DEFAULTS = {
  fontSans: 'instrument-sans',
  fontSerif: 'playfair-display',
  fontMono: 'space-mono',
};

function hexToRgbChannels(hex) {
  if (!hex || typeof hex !== 'string') return null;
  const match = hex.replace('#', '').match(/.{2}/g);
  if (!match || match.length < 3) return null;
  return match.slice(0, 3).map((c) => parseInt(c, 16)).join(' ');
}

const THEME_SCRIPT = `(function(){try{var p=localStorage.getItem('theme');if(p==='dark'||(!p&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function MyDocument({ themeColors, fontSettings }) {
  const colors = themeColors || FALLBACK;
  const fonts = fontSettings || FONT_DEFAULTS;

  const style = {};
  for (const token of TOKENS) {
    style[`--color-${token}-light`] = colors[token].light;
    style[`--color-${token}-dark`] = colors[token].dark;
  }
  style['--font-sans-family'] = FONT_FAMILY_MAP[fonts.fontSans] || FONT_FAMILY_MAP[FONT_DEFAULTS.fontSans];
  style['--font-serif-family'] = FONT_FAMILY_MAP[fonts.fontSerif] || FONT_FAMILY_MAP[FONT_DEFAULTS.fontSerif];
  style['--font-mono-family'] = FONT_FAMILY_MAP[fonts.fontMono] || FONT_FAMILY_MAP[FONT_DEFAULTS.fontMono];

  return (
    <Html className="snap-y snap-mandatory md:snap-none" style={style}>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <meta name="apple-mobile-web-app-title" content="Milo Weiler Photography" />
        <meta name="application-name" content="Milo Weiler Photography" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.1" />
        <link rel="manifest" href="/site.webmanifest?v=1.1" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.1" color="#3C0B03" />
        <link rel="shortcut icon" href="/favicon.ico?v=1.1" />
        <meta name="msapplication-TileColor" content="#FCF9EE" />
        <meta name="theme-color" content="#FCF9EE" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#303030" media="(prefers-color-scheme: dark)" />
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
    const [settings, fonts] = await Promise.all([
      client.fetch(`*[_type == "siteSettings"][0]{ background, foreground, accent, link, surface, muted }`),
      client.fetch(`*[_type == "fontSettings"][0]{ fontSans, fontSerif, fontMono }`),
    ]);
    const themeColors = {};
    if (settings) {
      for (const token of TOKENS) {
        const val = settings[token];
        themeColors[token] = {
          light: (val && hexToRgbChannels(val.light)) || FALLBACK[token].light,
          dark: (val && hexToRgbChannels(val.dark)) || FALLBACK[token].dark,
        };
      }
    }
    const fontSettings = {
      fontSans: (fonts && fonts.fontSans) || FONT_DEFAULTS.fontSans,
      fontSerif: (fonts && fonts.fontSerif) || FONT_DEFAULTS.fontSerif,
      fontMono: (fonts && fonts.fontMono) || FONT_DEFAULTS.fontMono,
    };
    return { ...initialProps, themeColors: Object.keys(themeColors).length ? themeColors : undefined, fontSettings };
  } catch (e) {
    console.error("Failed to fetch theme settings:", e);
  }
  return initialProps;
};
