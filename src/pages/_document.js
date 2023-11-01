import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
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
