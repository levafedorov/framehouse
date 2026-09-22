/**
 * Ceník a balíčky — one source of truth for every price on the site.
 * Templates never carry a number; they format what they read here.
 *
 * The studio is not registered for VAT, so every price is final. Prices are
 * quoted as "od X Kč": a floor, not an estimate, and never a calculator.
 */

const NBSP = " ";

/** 16000 → "16 000 Kč", spaces non-breaking so a price never splits */
export const czk = (amount: number) =>
  `${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}Kč`;

export const priceFromLabel = (amount: number) => `od ${czk(amount)}`;

export const workdaysLabel = (days: number) =>
  `${days} ${days === 1 ? "pracovní den" : days < 5 ? "pracovní dny" : "pracovních dnů"}`;

export const weeksLabel = (weeks: number) =>
  `${weeks} ${weeks === 1 ? "týden" : weeks < 5 ? "týdny" : "týdnů"}`;

/* ------------------------------------------------------------------ */
/* ceník — single services                                             */
/* ------------------------------------------------------------------ */

export type PriceId =
  | "logo"
  | "logo-redesign"
  | "identity"
  | "icons"
  | "maskot"
  | "logo-animace"
  | "social"
  | "print"
  | "logo-dotazeni";

export type PriceItem = {
  id: PriceId;
  name: string;
  /** Kč, always shown as "od" */
  priceFrom: number;
  /** What the price covers, when it is not one piece: "za 8 ks", "k logu" */
  unit?: string;
  includes: string[];
  /** Working days; omitted where the lead time is agreed case by case */
  deliveryDays?: number;
  note?: string;
  /** Sub-items with their own floor price, e.g. the print sheet */
  parts?: { name: string; priceFrom: number }[];
  /** Detail page under /sluzby, where the service has one */
  service?: string;
};

export const priceList: PriceItem[] = [
  {
    id: "logo",
    name: "Logo",
    priceFrom: 6000,
    includes: [
      "Validace názvu",
      "3 směry, jeden vybraný dopracovaný",
      "2 kola korektur",
      "SVG a PNG ve variantách barevná, černobílá, inverzní, symbol",
      "Jednostránková pravidla použití",
    ],
    deliveryDays: 10,
    service: "logo",
  },
  {
    id: "logo-redesign",
    name: "Redesign loga",
    priceFrom: 5000,
    includes: [
      "Modernizace stávajícího loga",
      "2 varianty",
      "2 kola korektur",
      "Kompletní sada souborů",
    ],
    deliveryDays: 7,
  },
  {
    id: "identity",
    name: "Firemní styl",
    priceFrom: 8000,
    unit: "k logu",
    includes: [
      "Paleta a typografie",
      "4 nosiče: vizitka, e-mailový podpis, hlavičkový papír, avatar a cover pro sítě",
      "Tisková data",
      "Manuál na 3–5 stran",
    ],
    deliveryDays: 10,
    service: "identity",
  },
  {
    id: "icons",
    name: "Sada ikon",
    priceFrom: 5500,
    unit: "za 8 ks",
    includes: ["Ve stylu vaší značky", "SVG pro web i tisk"],
    note: "Další ikona od 700 Kč.",
    service: "icons",
  },
  {
    id: "maskot",
    name: "Maskot",
    priceFrom: 9900,
    includes: ["Postava ve 3 pozicích", "Vektor", "Pravidla použití"],
  },
  {
    id: "logo-animace",
    name: "Animované logo",
    priceFrom: 3900,
    includes: ["Krátká animace loga pro video a web", "MP4, Lottie a GIF"],
  },
  {
    id: "social",
    name: "Sada pro sociální sítě",
    priceFrom: 3500,
    includes: [
      "Avatar a cover",
      "2–3 šablony příspěvků, které si upravíte sami",
    ],
    service: "social",
  },
  {
    id: "print",
    name: "Tiskoviny",
    priceFrom: 900,
    includes: [],
    note: "Návrh, ne tisk.",
    parts: [
      { name: "Vizitka", priceFrom: 900 },
      { name: "Hlavičkový papír", priceFrom: 1200 },
      { name: "Polep auta", priceFrom: 4000 },
      { name: "Cedule nebo roll-up", priceFrom: 1500 },
    ],
    service: "print",
  },
  {
    id: "logo-dotazeni",
    name: "Dotažení hotového loga",
    priceFrom: 2500,
    includes: [
      "Převod do vektoru a opravy",
      "Varianty pro tisk i obrazovku",
      "Pravidla použití",
    ],
    note: "Pro logo, které už máte odjinud.",
  },
];

/** Anchor of a ceník row, so a bundle can point at a service without a page */
export const priceAnchor = (id: PriceId) => `service-${id}`;

export const priceById = (id: string) => priceList.find((p) => p.id === id);

/** The ceník price of a service, for its own page to repeat without a copy */
export const serviceFrom = (id: PriceId) => {
  const item = priceById(id);
  return item ? priceFromLabel(item.priceFrom) : "";
};

export const serviceDays = (id: PriceId) => {
  const days = priceById(id)?.deliveryDays;
  return days ? workdaysLabel(days) : undefined;
};

/** The two lines that close the ceník */
export const priceTerms = {
  included:
    "V ceně: 2 kola korektur, exkluzivní licence, zdrojové soubory. Další korektury a nosiče po domluvě.",
  vat: "Ceny jsou konečné, nejsme plátci DPH.",
};

/* ------------------------------------------------------------------ */
/* balíčky                                                             */
/* ------------------------------------------------------------------ */

export type BundleId = "nova-znacka" | "novy-kabat" | "znacka-v-pohybu";

export type Bundle = {
  id: BundleId;
  name: string;
  /** One sentence: who the bundle is for */
  forWho: string;
  items: string[];
  priceFrom: number;
  deliveryWeeks: number;
  /** A single add-on; the card renders the line only when it is here */
  recommended?: { label: string; href: string };
  /** Full-bleed illustration behind the tile text, public/media/bundles */
  image: string;
};

export const bundles: Bundle[] = [
  {
    id: "nova-znacka",
    name: "Nová značka",
    forWho: "Pro firmu, která začíná nebo dosud vizuál neřešila.",
    items: [
      "Logo",
      "Firemní styl: paleta, typografie, 4 nosiče, tisková data",
      "Sada pro sociální sítě",
    ],
    priceFrom: 16000,
    deliveryWeeks: 3,
    recommended: { label: "Maskot", href: `/#${priceAnchor("maskot")}` },
    image: "/media/bundles/nova-znacka.jpg",
  },
  {
    id: "novy-kabat",
    name: "Nový kabát",
    forWho: "Pro zaběhlou firmu, jejíž vizuál zestárl.",
    items: [
      "Redesign loga",
      "Aktualizovaný firemní styl",
      "Nové tiskoviny: vizitka, hlavičkový papír, polep nebo cedule",
      "Sada pro sociální sítě",
    ],
    priceFrom: 17500,
    deliveryWeeks: 3,
    recommended: {
      label: "Animované logo",
      href: `/#${priceAnchor("logo-animace")}`,
    },
    image: "/media/bundles/novy-kabat.jpg",
  },
  {
    id: "znacka-v-pohybu",
    name: "Značka v pohybu",
    forWho: "Pro firmu, která logo a styl už má, ale chybí jí obsah.",
    items: [
      "Maskot",
      "Sada 8 ikon ve stylu značky",
      "Animované logo",
      "Šablony pro sociální sítě s maskotem a ikonami",
    ],
    priceFrom: 19500,
    deliveryWeeks: 3,
    recommended: {
      label: "Tiskoviny s maskotem: polep, cedule",
      href: `/#${priceAnchor("print")}`,
    },
    image: "/media/bundles/znacka-v-pohybu.jpg",
  },
];

export const bundleTitle = (id: BundleId) =>
  bundles.find((b) => b.id === id)?.name ?? "";

/** The two lines that close the bundles */
export const bundleTerms = {
  saving: "Balíček vyjde o 10–15 % levněji než položky zvlášť.",
  vat: priceTerms.vat,
};
