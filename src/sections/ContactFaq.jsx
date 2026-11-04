import React from "react";
import { useAppContext } from "@/utils/appContext";

// Short FAQ on the contact page. Only facts that are true today (no prices or delivery times).
// The same entries feed the FAQPage JSON-LD (see faqSchema), so the visible text and the schema always match.
export const FAQ = {
  title: { en: "Frequently asked questions", fr: "Questions fréquentes", nl: "Veelgestelde vragen" },
  items: [
    {
      q: {
        en: "What kind of photography do you do?",
        fr: "Quel type de photographie faites-vous ?",
        nl: "Welke soort fotografie doe je?",
      },
      a: {
        en: "Set photography for film and series, portraits, corporate and event photography, product photography and fine art.",
        fr: "De la photographie de plateau pour le cinéma et les séries, des portraits, de la photographie d'entreprise et d'événements, de la photographie de produits et de la photographie d'art.",
        nl: "Setfotografie voor film en series, portretten, bedrijfs- en eventfotografie, productfotografie en fine art.",
      },
    },
    {
      q: {
        en: "Which regions do you cover?",
        fr: "Dans quelles régions travaillez-vous ?",
        nl: "In welke regio's werk je?",
      },
      a: {
        en: "I'm based in Mortsel near Antwerp and work all over Belgium, most often in Antwerp and Brussels.",
        fr: "Je suis basé à Mortsel, près d'Anvers, et je travaille dans toute la Belgique, le plus souvent à Anvers et à Bruxelles.",
        nl: "Ik ben gevestigd in Mortsel bij Antwerpen en werk in heel België, het vaakst in Antwerpen en Brussel.",
      },
    },
    {
      q: {
        en: "Which languages do you speak?",
        fr: "Quelles langues parlez-vous ?",
        nl: "Welke talen spreek je?",
      },
      a: {
        en: "English, French and Dutch, on set and in all communication.",
        fr: "Français, néerlandais et anglais, sur le plateau comme dans toute la communication.",
        nl: "Nederlands, Frans en Engels, op de set en in alle communicatie.",
      },
    },
    {
      q: {
        en: "How do I book a shoot or ask for a quote?",
        fr: "Comment réserver une séance ou demander un devis ?",
        nl: "Hoe boek ik een shoot of vraag ik een offerte aan?",
      },
      a: {
        en: "Use the form on this page, or send an email or call. Mention the date, the place and what you need, and I'll get back to you.",
        fr: "Utilisez le formulaire de cette page, ou envoyez un e-mail ou appelez. Indiquez la date, le lieu et ce dont vous avez besoin, et je reviens vers vous.",
        nl: "Gebruik het formulier op deze pagina, of stuur een e-mail of bel. Vermeld de datum, de plaats en wat je nodig hebt, en ik neem contact met je op.",
      },
    },
    {
      q: {
        en: "Can I use a photo from this website?",
        fr: "Puis-je utiliser une photo de ce site ?",
        nl: "Mag ik een foto van deze website gebruiken?",
      },
      a: {
        en: "All photos are © Milo Weiler. To use one, get in touch through this page to arrange a licence.",
        fr: "Toutes les photos sont © Milo Weiler. Pour en utiliser une, contactez-moi via cette page pour convenir d'une licence.",
        nl: "Alle foto's zijn © Milo Weiler. Wil je er een gebruiken, neem dan via deze pagina contact op voor een licentie.",
      },
    },
  ],
};

const t = (o, locale) => o?.[locale] || o?.en || "";

export function faqSchema(locale, url) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: locale,
    mainEntity: FAQ.items.map((item) => ({
      "@type": "Question",
      name: t(item.q, locale),
      acceptedAnswer: { "@type": "Answer", text: t(item.a, locale) },
    })),
  };
}

export default function ContactFaq({ className = "" }) {
  const { locale } = useAppContext();
  return (
    <section aria-labelledby="faq-title" className={`w-full max-w-3xl mx-auto px-6 sm:px-10 ${className}`}>
      <h2 id="faq-title" className="font-sans font-semibold text-lg sm:text-xl mb-6">
        {t(FAQ.title, locale)}
      </h2>
      <div className="flex flex-col border-t border-foreground/20">
        {FAQ.items.map((item, i) => (
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
