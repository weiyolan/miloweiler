import { defineMigration, createOrReplace, patch, at, set } from "sanity/migrate";

// Helper: create a portable text block
let keyCounter = 0;
function block(text: string, style = "normal"): any {
  keyCounter++;
  return {
    _type: "block",
    _key: `b${keyCounter}`,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `s${keyCounter}`, text, marks: [] }],
  };
}
function h2(text: string) { return block(text, "h2"); }
function p(text: string) { return block(text, "normal"); }
function bullet(text: string): any {
  keyCounter++;
  return {
    _type: "block",
    _key: `b${keyCounter}`,
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: `s${keyCounter}`, text, marks: [] }],
  };
}

// ── Legal Notice content ──────────────────────────────────────
keyCounter = 0;
const legalEn = [
  h2("Company Information"),
  p("Milo Weiler Photography"),
  p("VAT: BE 0791 549 197"),
  p("Hof Savelkoul 40, 2640 Mortsel, Belgium"),
  p("Email: milo.weiler@gmail.com"),
  p("Phone: +32 476 50 62 09"),
  h2("Responsible for Content"),
  p("Milo Weiler is responsible for the content of this website in accordance with Belgian law."),
  h2("Intellectual Property"),
  p("All photographs, images, text, and other content on this website are the exclusive property of Milo Weiler Photography, unless otherwise stated. Any reproduction, distribution, or use of the content without prior written consent is strictly prohibited."),
  h2("Liability"),
  p("Milo Weiler Photography makes every effort to ensure the accuracy and completeness of the information on this website. However, no guarantee is given regarding the correctness, completeness, or timeliness of the information provided. Milo Weiler Photography is not liable for any damages arising from the use of this website."),
  h2("Applicable Law"),
  p("This legal notice is governed by Belgian law. Any disputes arising from or in connection with this website shall be subject to the exclusive jurisdiction of the courts of Antwerp, Belgium."),
];

keyCounter = 100;
const legalFr = [
  h2("Informations sur l'entreprise"),
  p("Milo Weiler Photography"),
  p("TVA : BE 0791 549 197"),
  p("Hof Savelkoul 40, 2640 Mortsel, Belgique"),
  p("Email : milo.weiler@gmail.com"),
  p("Téléphone : +32 476 50 62 09"),
  h2("Responsable du contenu"),
  p("Milo Weiler est responsable du contenu de ce site web conformément à la législation belge."),
  h2("Propriété intellectuelle"),
  p("Toutes les photographies, images, textes et autres contenus de ce site web sont la propriété exclusive de Milo Weiler Photography, sauf indication contraire. Toute reproduction, distribution ou utilisation du contenu sans consentement écrit préalable est strictement interdite."),
  h2("Responsabilité"),
  p("Milo Weiler Photography met tout en œuvre pour assurer l'exactitude et l'exhaustivité des informations sur ce site web. Cependant, aucune garantie n'est donnée quant à l'exactitude, l'exhaustivité ou l'actualité des informations fournies. Milo Weiler Photography n'est pas responsable des dommages résultant de l'utilisation de ce site web."),
  h2("Droit applicable"),
  p("Cette mention légale est régie par le droit belge. Tout litige découlant de ce site web sera soumis à la juridiction exclusive des tribunaux d'Anvers, Belgique."),
];

keyCounter = 200;
const legalNl = [
  h2("Bedrijfsinformatie"),
  p("Milo Weiler Photography"),
  p("BTW: BE 0791 549 197"),
  p("Hof Savelkoul 40, 2640 Mortsel, België"),
  p("E-mail: milo.weiler@gmail.com"),
  p("Telefoon: +32 476 50 62 09"),
  h2("Verantwoordelijk voor de inhoud"),
  p("Milo Weiler is verantwoordelijk voor de inhoud van deze website in overeenstemming met het Belgisch recht."),
  h2("Intellectueel eigendom"),
  p("Alle foto's, afbeeldingen, teksten en andere inhoud op deze website zijn het exclusieve eigendom van Milo Weiler Photography, tenzij anders vermeld. Elke reproductie, distributie of gebruik van de inhoud zonder voorafgaande schriftelijke toestemming is strikt verboden."),
  h2("Aansprakelijkheid"),
  p("Milo Weiler Photography doet al het mogelijke om de juistheid en volledigheid van de informatie op deze website te waarborgen. Er wordt echter geen garantie gegeven met betrekking tot de juistheid, volledigheid of actualiteit van de verstrekte informatie. Milo Weiler Photography is niet aansprakelijk voor schade die voortvloeit uit het gebruik van deze website."),
  h2("Toepasselijk recht"),
  p("Deze juridische mededeling wordt beheerst door het Belgisch recht. Geschillen die voortvloeien uit deze website vallen onder de exclusieve bevoegdheid van de rechtbanken van Antwerpen, België."),
];

// ── Terms of Use content ──────────────────────────────────────
keyCounter = 300;
const termsEn = [
  h2("Acceptance of Terms"),
  p("By accessing and using this website (miloweiler.com), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website."),
  h2("Intellectual Property & Copyright"),
  p("All photographs displayed on this website are protected by copyright law and are the intellectual property of Milo Weiler Photography. These images may not be downloaded, copied, reproduced, modified, distributed, displayed, or used in any way without the express written permission of Milo Weiler."),
  h2("Usage Rights"),
  p("Photographs commissioned by clients are subject to the terms agreed upon in the individual project contract. Unless otherwise specified in writing:"),
  bullet("The photographer retains full copyright of all images."),
  bullet("Clients receive a license to use the images for the agreed purposes only."),
  bullet("Images may not be sublicensed, sold, or transferred to third parties without written consent."),
  bullet("Credit to Milo Weiler Photography is required when images are published online."),
  h2("Limitation of Liability"),
  p('This website and its content are provided "as is" without warranties of any kind, either express or implied. Milo Weiler Photography shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.'),
  h2("Modifications"),
  p("Milo Weiler Photography reserves the right to modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the new terms."),
  h2("Governing Law"),
  p("These Terms of Use are governed by and construed in accordance with Belgian law."),
];

keyCounter = 400;
const termsFr = [
  h2("Acceptation des conditions"),
  p("En accédant et en utilisant ce site web (miloweiler.com), vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site."),
  h2("Propriété intellectuelle & Droits d'auteur"),
  p("Toutes les photographies affichées sur ce site sont protégées par le droit d'auteur et sont la propriété intellectuelle de Milo Weiler Photography. Ces images ne peuvent être téléchargées, copiées, reproduites, modifiées, distribuées, affichées ou utilisées de quelque manière que ce soit sans l'autorisation écrite expresse de Milo Weiler."),
  h2("Droits d'utilisation"),
  p("Les photographies commandées par les clients sont soumises aux conditions convenues dans le contrat de projet individuel. Sauf indication contraire par écrit :"),
  bullet("Le photographe conserve l'intégralité des droits d'auteur sur toutes les images."),
  bullet("Les clients reçoivent une licence d'utilisation des images uniquement aux fins convenues."),
  bullet("Les images ne peuvent être sous-licenciées, vendues ou transférées à des tiers sans consentement écrit."),
  bullet("Le crédit à Milo Weiler Photography est requis lors de la publication en ligne."),
  h2("Limitation de responsabilité"),
  p("Ce site web et son contenu sont fournis \"en l'état\" sans garantie d'aucune sorte. Milo Weiler Photography ne pourra être tenu responsable de tout dommage direct, indirect, accessoire ou consécutif résultant de l'utilisation de ce site."),
  h2("Modifications"),
  p("Milo Weiler Photography se réserve le droit de modifier ces Conditions d'Utilisation à tout moment. L'utilisation continue du site après modification vaut acceptation des nouvelles conditions."),
  h2("Droit applicable"),
  p("Ces Conditions d'Utilisation sont régies par le droit belge."),
];

keyCounter = 500;
const termsNl = [
  h2("Aanvaarding van de voorwaarden"),
  p("Door deze website (miloweiler.com) te bezoeken en te gebruiken, aanvaardt u deze Gebruiksvoorwaarden. Als u niet akkoord gaat met deze voorwaarden, gebruik deze website dan niet."),
  h2("Intellectueel eigendom & Auteursrecht"),
  p("Alle foto's op deze website zijn beschermd door het auteursrecht en zijn het intellectueel eigendom van Milo Weiler Photography. Deze afbeeldingen mogen niet worden gedownload, gekopieerd, gereproduceerd, gewijzigd, verspreid, weergegeven of op welke manier dan ook worden gebruikt zonder de uitdrukkelijke schriftelijke toestemming van Milo Weiler."),
  h2("Gebruiksrechten"),
  p("Foto's in opdracht van klanten zijn onderworpen aan de voorwaarden die zijn overeengekomen in het individuele projectcontract. Tenzij schriftelijk anders bepaald:"),
  bullet("De fotograaf behoudt het volledige auteursrecht op alle afbeeldingen."),
  bullet("Klanten ontvangen een licentie om de afbeeldingen alleen voor de overeengekomen doeleinden te gebruiken."),
  bullet("Afbeeldingen mogen niet in sublicentie worden gegeven, verkocht of overgedragen aan derden zonder schriftelijke toestemming."),
  bullet("Vermelding van Milo Weiler Photography is vereist bij online publicatie."),
  h2("Beperking van aansprakelijkheid"),
  p("Deze website en de inhoud ervan worden aangeboden \"zoals ze zijn\" zonder enige garantie. Milo Weiler Photography is niet aansprakelijk voor directe, indirecte, incidentele of gevolgschade die voortvloeit uit het gebruik van deze website."),
  h2("Wijzigingen"),
  p("Milo Weiler Photography behoudt zich het recht voor om deze Gebruiksvoorwaarden op elk moment te wijzigen. Voortgezet gebruik van de website na wijzigingen geldt als aanvaarding van de nieuwe voorwaarden."),
  h2("Toepasselijk recht"),
  p("Deze Gebruiksvoorwaarden worden beheerst door het Belgisch recht."),
];

// ── Cookie Notice content ─────────────────────────────────────
keyCounter = 600;
const cookieEn = [
  h2("What Are Cookies?"),
  p("Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site."),
  h2("Cookies We Use"),
  p("This website currently does not use any tracking or analytics cookies. We only use essential cookies that are strictly necessary for the website to function properly."),
  h2("Essential Cookies"),
  p("These cookies are necessary for the basic functionality of the website, such as:"),
  bullet("Remembering your language preference."),
  bullet("Remembering your theme preference (light/dark mode)."),
  h2("Third-Party Cookies"),
  p("This website does not currently use any third-party cookies. In the future, we may implement analytics tools (such as Google Analytics) to better understand how visitors use our site. If we do, this notice will be updated accordingly."),
  h2("Your Rights"),
  p("Under the General Data Protection Regulation (GDPR), you have the right to control and manage cookies. You can configure your browser to refuse all cookies or to indicate when a cookie is being sent."),
  h2("Contact"),
  p("If you have any questions about our use of cookies, please contact us at milo.weiler@gmail.com."),
];

keyCounter = 700;
const cookieFr = [
  h2("Que sont les cookies ?"),
  p("Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web plus efficacement et fournir des informations aux propriétaires du site."),
  h2("Cookies que nous utilisons"),
  p("Ce site web n'utilise actuellement aucun cookie de suivi ou d'analyse. Nous n'utilisons que des cookies essentiels strictement nécessaires au bon fonctionnement du site."),
  h2("Cookies essentiels"),
  p("Ces cookies sont nécessaires au fonctionnement de base du site web, notamment :"),
  bullet("Mémoriser votre préférence de langue."),
  bullet("Mémoriser votre préférence de thème (mode clair/sombre)."),
  h2("Cookies tiers"),
  p("Ce site web n'utilise actuellement aucun cookie tiers. À l'avenir, nous pourrions mettre en place des outils d'analyse (tels que Google Analytics) pour mieux comprendre comment les visiteurs utilisent notre site. Le cas échéant, cette notice sera mise à jour."),
  h2("Vos droits"),
  p("En vertu du Règlement Général sur la Protection des Données (RGPD), vous avez le droit de contrôler et de gérer les cookies. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour vous avertir lorsqu'un cookie est envoyé."),
  h2("Contact"),
  p("Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à milo.weiler@gmail.com."),
];

keyCounter = 800;
const cookieNl = [
  h2("Wat zijn cookies?"),
  p("Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze worden veel gebruikt om websites efficiënter te laten werken en om informatie te verstrekken aan de eigenaren van de site."),
  h2("Cookies die wij gebruiken"),
  p("Deze website maakt momenteel geen gebruik van tracking- of analytische cookies. We gebruiken alleen essentiële cookies die strikt noodzakelijk zijn voor het goed functioneren van de website."),
  h2("Essentiële cookies"),
  p("Deze cookies zijn noodzakelijk voor de basisfunctionaliteit van de website, zoals:"),
  bullet("Het onthouden van uw taalvoorkeur."),
  bullet("Het onthouden van uw themavoorkeur (lichte/donkere modus)."),
  h2("Cookies van derden"),
  p("Deze website maakt momenteel geen gebruik van cookies van derden. In de toekomst kunnen we analysetools (zoals Google Analytics) implementeren om beter te begrijpen hoe bezoekers onze site gebruiken. Als dat het geval is, wordt deze verklaring dienovereenkomstig bijgewerkt."),
  h2("Uw rechten"),
  p("Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u het recht om cookies te beheren. U kunt uw browser zo instellen dat alle cookies worden geweigerd of dat u wordt gewaarschuwd wanneer een cookie wordt verzonden."),
  h2("Contact"),
  p("Als u vragen heeft over ons gebruik van cookies, neem dan contact met ons op via milo.weiler@gmail.com."),
];

// ── Migration ─────────────────────────────────────────────────
export default defineMigration({
  title: "Seed businessInfo, legal pages, TrustedBy labels, and category short names",
  async *migrate() {
    // 1. Business Info
    yield createOrReplace({
      _id: "businessInfo",
      _type: "businessInfo",
      email: "milo.weiler@gmail.com",
      phone: "+32 476 50 62 09",
      vat: "BE 0791 549 197",
      address: {
        _type: "object",
        street: "Hof Savelkoul 40",
        postalCode: "2640",
        city: "Mortsel",
        country: "Belgium",
      },
      mailtoSubject: {
        _type: "localeString",
        en: "Photography Project",
        fr: "Projet Photographique",
        nl: "Fotografieproject",
      },
      mailtoBody: {
        _type: "localeText",
        en: "Hi Milo,\n\nI have a photography project for you.\nCould we talk about this any time soon?\n\nThanks in advance,\n\n",
        fr: "Bonjour Milo,\n\nJ'ai un projet photographique pour vous.\nPourrions-nous en discuter prochainement ?\n\nMerci d'avance,\n\n",
        nl: "Hallo Milo,\n\nIk heb een fotografieproject voor je.\nKunnen we hier binnenkort over praten?\n\nAlvast bedankt,\n\n",
      },
      whatsappNumber: "32476506209",
      whatsappMessage: {
        _type: "localeText",
        en: "Hi Milo,\nI got your WhatsApp from your website miloweiler.com. Are you free to talk any time soon about a project I have in mind?\nThanks,\n",
        fr: "Bonjour Milo,\nJ'ai trouvé votre WhatsApp sur votre site miloweiler.com. Seriez-vous disponible pour discuter d'un projet que j'ai en tête ?\nMerci,\n",
        nl: "Hallo Milo,\nIk heb je WhatsApp gevonden op je website miloweiler.com. Heb je binnenkort tijd om te praten over een project dat ik in gedachten heb?\nBedankt,\n",
      },
      socialInstagram: "https://www.instagram.com/miloweiler/",
      socialUnsplash: "https://unsplash.com/@miloweiler",
      socialLinkedin: "https://www.linkedin.com/in/mwphotography",
    });

    // 2. Legal Notice
    yield createOrReplace({
      _id: "legalNotice",
      _type: "legalNotice",
      title: { _type: "localeString", en: "Legal Notice", fr: "Mentions Légales", nl: "Juridische Mededeling" },
      body: { _type: "localeBlockContent", en: legalEn, fr: legalFr, nl: legalNl },
    });

    // 3. Terms of Use
    yield createOrReplace({
      _id: "termsOfUse",
      _type: "termsOfUse",
      title: { _type: "localeString", en: "Terms of Use", fr: "Conditions d'Utilisation", nl: "Gebruiksvoorwaarden" },
      body: { _type: "localeBlockContent", en: termsEn, fr: termsFr, nl: termsNl },
    });

    // 4. Cookie Notice
    yield createOrReplace({
      _id: "cookieNotice",
      _type: "cookieNotice",
      title: { _type: "localeString", en: "Cookie Notice", fr: "Politique de Cookies", nl: "Cookieverklaring" },
      body: { _type: "localeBlockContent", en: cookieEn, fr: cookieFr, nl: cookieNl },
    });

    // 5. Patch Trusted By — add labels
    yield patch("contactPageTBS", [
      at("artistsLabel", set({ _type: "localeString", en: "Artists", fr: "Artistes", nl: "Artiesten" })),
      at("companiesLabel", set({ _type: "localeString", en: "Companies", fr: "Entreprises", nl: "Bedrijven" })),
    ]);

    // 6. Patch Category Names — add short names
    yield patch("categoryNames", [
      at("highlightedShort", set({ _type: "localeString", en: "Highlighted", fr: "En Vedette", nl: "Uitgelicht" })),
      at("btsShort", set({ _type: "localeString", en: "Sets", fr: "Plateaux", nl: "Sets" })),
      at("corpShort", set({ _type: "localeString", en: "Brand", fr: "Marque", nl: "Merk" })),
      at("eventsShort", set({ _type: "localeString", en: "Events", fr: "Événements", nl: "Evenementen" })),
      at("docuShort", set({ _type: "localeString", en: "Portraits", fr: "Portraits", nl: "Portretten" })),
      at("studioShort", set({ _type: "localeString", en: "Products", fr: "Produits", nl: "Producten" })),
      at("artShort", set({ _type: "localeString", en: "Personal", fr: "Personnel", nl: "Persoonlijk" })),
    ]);
  },
});
