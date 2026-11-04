import React from "react";
import { useAppContext } from "@/utils/appContext";

import { FAQ_DEFAULTS } from "../../sanity/schemas/contactPageFaqDefaults";

// Contact page FAQ, editable in the Studio (Contact Page → FAQ). Until that document is published, the
// defaults are shown. The same data feeds the FAQPage JSON-LD, so visible text and schema always match.
// Returns { title, items: [{ q, a }] } or null when the section is switched off / empty.
export function resolveFaq(doc) {
  if (!doc) return FAQ_DEFAULTS;
  if (doc.enabled === false) return null;
  const items = (doc.items || [])
    .filter((it) => it?.question && it?.answer)
    .map((it) => ({ q: it.question, a: it.answer }));
  if (!items.length) return null;
  return { title: doc.title || FAQ_DEFAULTS.title, items };
}

const t = (o, locale) => o?.[locale] || o?.en || "";

export function faqSchema(locale, url, faq) {
  if (!faq) return null;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: locale,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: t(item.q, locale),
      acceptedAnswer: { "@type": "Answer", text: t(item.a, locale) },
    })),
  };
}

export default function ContactFaq({ faq, className = "" }) {
  const { locale } = useAppContext();
  if (!faq) return null;
  return (
    <section aria-labelledby="faq-title" className={`w-full max-w-3xl mx-auto px-6 sm:px-10 ${className}`}>
      <h2 id="faq-title" className="font-sans font-semibold text-lg sm:text-xl mb-6">
        {t(faq.title, locale)}
      </h2>
      <div className="flex flex-col border-t border-foreground/20">
        {faq.items.map((item, i) => (
          <details key={i} className="group border-b border-foreground/20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans font-normal [&::-webkit-details-marker]:hidden">
              <span>{t(item.q, locale)}</span>
              <span aria-hidden="true" className="font-mono text-lg transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-5 pr-8 font-sans font-extralight leading-relaxed">{t(item.a, locale)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
