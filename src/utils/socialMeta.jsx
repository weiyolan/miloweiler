import { DEFAULT_OG_IMAGE, OG_LOCALES, SITE_NAME } from "@/utils/seo";

// Open Graph + Twitter card tags for link previews (WhatsApp, Facebook,
// Messenger, LinkedIn, X, Slack, Telegram, iMessage, Discord...).
// Returns an array of <meta> elements: call it *inside* next/head's <Head>
// (next/head only reads direct children, so it can't be a component).
export default function socialMeta({ title, description, url, image, imageAlt, locale = 'en', type = 'website' }) {
  const img = image || DEFAULT_OG_IMAGE;
  // Previews show ~2 lines; keep it short so it doesn't get cut mid-word.
  if (description && description.length > 200) description = description.slice(0, 197).replace(/\s+\S*$/, '') + '…';
  const ogLocale = OG_LOCALES[locale] || OG_LOCALES.en;
  const alternates = Object.entries(OG_LOCALES).filter(([l]) => l !== locale).map(([, v]) => v);

  return [
    <meta key="og:type" property="og:type" content={type} />,
    <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />,
    <meta key="og:title" property="og:title" content={title} />,
    description ? <meta key="og:description" property="og:description" content={description} /> : null,
    <meta key="og:url" property="og:url" content={url} />,
    <meta key="og:locale" property="og:locale" content={ogLocale} />,
    ...alternates.map((l) => <meta key={`og:locale:alternate:${l}`} property="og:locale:alternate" content={l} />),
    <meta key="og:image" property="og:image" content={img} />,
    <meta key="og:image:secure_url" property="og:image:secure_url" content={img} />,
    <meta key="og:image:type" property="og:image:type" content="image/jpeg" />,
    <meta key="og:image:width" property="og:image:width" content="1200" />,
    <meta key="og:image:height" property="og:image:height" content="630" />,
    <meta key="og:image:alt" property="og:image:alt" content={imageAlt || title} />,
    <meta key="fb:app_id" property="fb:app_id" content="659504862954849" />,
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
    <meta key="twitter:domain" property="twitter:domain" content="miloweiler.com" />,
    <meta key="twitter:url" property="twitter:url" content={url} />,
    <meta key="twitter:title" name="twitter:title" content={title} />,
    description ? <meta key="twitter:description" name="twitter:description" content={description} /> : null,
    <meta key="twitter:image" name="twitter:image" content={img} />,
    <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt || title} />,
  ].filter(Boolean);
}
