// The app router only serves the Sanity Studio (/studio) and the 404 page (not-found.js);
// the site itself lives in src/pages. Neither should be indexed by Google.
export const metadata = {
  title: 'Page not found | Milo Weiler Photography',
  // noindex instead of a robots.txt Disallow, otherwise Google can't see the noindex and may still list the bare URL.
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
