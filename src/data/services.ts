import {
  serviceDays,
  serviceFrom,
  type BundleId,
  type PriceId,
} from "./pricing";
import { projects, type Project } from "./projects";

/** Everything in the ceník, plus the pages that are not offered there */
export type ServiceId = PriceId | "video" | "web" | "eshop";

export type Tone = "blue" | "brown" | "rose" | "sage" | "olive";

export type Step = { title: string; text: string };

export type Service = {
  id: ServiceId;
  title: string;
  /** One line: the result the client gets */
  result: string;
  /** "od X Kč" */
  from: string;
  /** "od X dnů" */
  days: string;
  /** A real frame from a project; falls back to a coloured tile */
  image?: string;
  tone: Tone;
  /** Oval tile on desktop, like the accent tile in the reference */
  shape?: "oval";
  /** Set when the service is part of a bundle */
  bundle?: BundleId;

  /* --- detail page, /sluzby/[id] (issues #20–#22) --- */

  /** Two short facts under the hero stats */
  facts: [string, string];
  /** "Co dostanete", where the ceník has nothing to say */
  deliverables?: string[];
  /** "Jak to probíhá": four steps, brief → drafty → doladění → předání */
  steps: [Step, Step, Step, Step];
  /** What the price depends on — one short line */
  priceNote: string;
  /** What the lead time depends on — one short line */
  termNote: string;
  /** Kept from the earlier layout; no section renders it today */
  excluded?: string[];
  /** Project slugs shown as examples, up to three; the block is omitted when empty */
  examples?: string[];
  /** Serif headline of the closing CTA card */
  ctaTitle: string;
  /** One extra line with a link, e.g. "Nemáte firemní styl? …" */
  note?: { text: string; href: string };
};

/** brief → drafty → doladění → předání, reused where a service has nothing specific */
export const defaultSteps: [Step, Step, Step, Step] = [
  { title: "Brief", text: "Co potřebujete, pro koho a kde to bude fungovat." },
  { title: "Návrh", text: "Dva až tři směry, vyberete jeden." },
  { title: "Doladění", text: "Úpravy vybraného směru." },
  { title: "Předání", text: "Finální soubory a licence." },
];

/** The lines every service page repeats (see About) */
export const serviceTerms = {
  payment: "Fixní cena, nebo platba za iteraci — vyberete si.",
  licence:
    "Exkluzivní, časově neomezená licence. White-label +50 %. Podpora po předání za zvláštní cenu.",
};

// Prices and lead times of the design services live in the ceník
// (src/data/pricing.ts); web and e-shop are not in it and carry their own.
export const services: Service[] = [
  /* Video ads are parked for now — the entry stays for when they are back.
  {
    id: "video",
    title: "Videoreklama",
    result: "Krátké video, které lidé dokoukají.",
    from: "od 35 000 Kč",
    days: "od 10 dnů",
    tone: "blue",
    facts: ["Krátká videa do 30–45 s", "Vzniká bez kamery, z fotek a briefu"],
    deliverables: [
      "Hotové video ve vysoké kvalitě",
      "Formáty pro web a sociální sítě",
      "Titulky a text v obraze",
      "Poster frame ke každému formátu",
    ],
    steps: [
      { title: "Brief", text: "Produkt, cíl, platforma a délka." },
      { title: "Návrh", text: "Storyboard a první verze scén." },
      { title: "Výroba", text: "Střih, tempo, text v obraze." },
      { title: "Dodání", text: "MP4 v dohodnutých formátech." },
    ],
    priceNote: "Cena závisí na délce videa a počtu formátů.",
    termNote: "Běžná doba od schválení storyboardu.",
    excluded: [
      "Natáčení a střih cizího materiálu",
      "Herci a lokace",
      "Vedení sociálních sítí",
      "Nastavení reklamních kampaní",
    ],
    examples: ["bohemia-pet-food", "akinu"],
    ctaTitle: "Pojďme vytvořit video, které prodává.",
  },
  */
  {
    id: "logo",
    title: "Logo",
    result: "Značka, která funguje na vizitce i na ceduli.",
    from: serviceFrom("logo"),
    days: serviceDays("logo") ?? "",
    tone: "brown",
    shape: "oval",
    facts: [
      "Nové logo nebo redesign",
      "Funguje malé i velké, barevně i jednobarevně",
    ],
    deliverables: [
      "Logo v SVG, PDF a PNG",
      "Barevná, jednobarevná a inverzní verze",
      "Pravidla použití na jednu stranu",
      "Zdrojové soubory",
    ],
    steps: defaultSteps,
    priceNote: "Cena závisí na počtu směrů a na tom, zda jde o redesign.",
    termNote: "Běžná doba při rychlé zpětné vazbě.",
    excluded: [
      "Vymýšlení názvu — jen ho ověříme",
      "Firemní styl a nosiče",
      "Registrace ochranné známky",
    ],
    examples: ["hinna", "llama-loca", "quality-equals-cost"],
    ctaTitle: "Pojďme dát vaší firmě tvář.",
  },
  {
    id: "logo-redesign",
    title: "Redesign loga",
    result: "Vaše logo v současné podobě, bez toho abyste začínali znovu.",
    from: serviceFrom("logo-redesign"),
    days: serviceDays("logo-redesign") ?? "po domluvě",
    tone: "blue",
    facts: ["Vychází z loga, které máte", "Zachová to, co na vás lidé znají"],
    steps: [
      { title: "Brief", text: "Co na logu drhne a co musí zůstat." },
      { title: "Návrh", text: "Dvě varianty modernizace." },
      { title: "Doladění", text: "Úpravy vybrané varianty." },
      { title: "Předání", text: "Kompletní sada souborů." },
    ],
    priceNote: "Cena závisí na stavu podkladů a rozsahu změn.",
    termNote: "Běžná doba při rychlé zpětné vazbě.",
    ctaTitle: "Pojďme vašemu logu vrátit formu.",
  },
  {
    id: "identity",
    title: "Firemní styl",
    result: "Paleta, typografie a nosiče, aby všechno k sobě sedělo.",
    from: serviceFrom("identity"),
    days: serviceDays("identity") ?? "",
    tone: "rose",
    bundle: "nova-znacka",
    facts: ["Navazuje na vaše logo", "3–4 nosiče podle toho, co používáte"],
    deliverables: [
      "Barevná paleta a typografie",
      "Vizitka, hlavička, podpis v e-mailu, cedule",
      "Tisková data k nosičům",
      "Brandbook na jednu stranu",
    ],
    steps: [
      { title: "Brief", text: "Co máte, co používáte, kde vás lidé vidí." },
      { title: "Návrh", text: "Paleta, písmo a první nosič." },
      { title: "Doladění", text: "Ostatní nosiče ve stejném stylu." },
      { title: "Předání", text: "Tisková data a brandbook." },
    ],
    priceNote: "Cena závisí na počtu nosičů.",
    termNote: "Běžná doba pro 3–4 nosiče.",
    excluded: ["Logo — je samostatná služba", "Rozsáhlý brandbook", "Tisk"],
    examples: ["kismi", "koncept-kosmetika", "koncept-autolakovna"],
    ctaTitle: "Pojďme sladit všechno, co od vás lidé vidí.",
  },
  {
    id: "icons",
    title: "Sada ikon",
    result: "Sada ikon ve stylu značky pro web i sociální sítě.",
    from: serviceFrom("icons"),
    days: serviceDays("icons") ?? "od 5 dnů",
    tone: "sage",
    bundle: "znacka-v-pohybu",
    facts: ["Sada zhruba 8 ikon", "Jednotná mřížka a síla linky"],
    deliverables: [
      "SVG pro web",
      "PNG pro sítě a prezentace",
      "Jednotná mřížka a linka",
      "Seznam ikon odsouhlasený předem",
    ],
    steps: [
      { title: "Brief", text: "Které ikony a kde budou." },
      { title: "Návrh", text: "Styl na dvou až třech ikonách." },
      { title: "Doladění", text: "Zbytek sady ve stejném stylu." },
      { title: "Předání", text: "SVG a PNG." },
    ],
    priceNote: "Cena závisí na počtu ikon a míře detailu.",
    termNote: "Běžná doba pro sadu 8 ikon.",
    excluded: ["Velké ikonové knihovny", "Ilustrace a maskot", "Animace ikon"],
    examples: ["kooperativa", "koncept-maskot", "koncept-safari-park"],
    ctaTitle: "Pojďme dát vašim ikonám jeden rukopis.",
  },
  {
    id: "maskot",
    title: "Maskot",
    result: "Postava, která mluví za vaši značku.",
    from: serviceFrom("maskot"),
    days: serviceDays("maskot") ?? "po domluvě",
    tone: "olive",
    shape: "oval",
    bundle: "znacka-v-pohybu",
    facts: ["Postava ve třech pozicích", "Navazuje na vaše logo a barvy"],
    steps: [
      { title: "Brief", text: "Komu maskot mluví a kde se objeví." },
      { title: "Návrh", text: "Dva až tři charaktery, vyberete jeden." },
      { title: "Doladění", text: "Pozice a výrazy vybrané postavy." },
      { title: "Předání", text: "Vektory a pravidla použití." },
    ],
    priceNote: "Cena závisí na složitosti postavy a počtu pozic.",
    termNote: "Běžná doba pro postavu ve třech pozicích.",
    examples: ["koncept-maskot", "koncept-safari-park"],
    ctaTitle: "Pojďme vaší značce dát tvář.",
  },
  {
    id: "logo-animace",
    title: "Animované logo",
    result: "Logo, které se rozhýbe na webu i v prezentaci.",
    from: serviceFrom("logo-animace"),
    days: serviceDays("logo-animace") ?? "po domluvě",
    tone: "blue",
    bundle: "znacka-v-pohybu",
    facts: ["Krátká animace vašeho loga", "Pro web, prezentace i sítě"],
    steps: [
      { title: "Brief", text: "Kde se animace objeví a jak dlouhá má být." },
      { title: "Návrh", text: "Dva pohybové směry." },
      { title: "Doladění", text: "Tempo a detaily vybraného směru." },
      { title: "Předání", text: "MP4, Lottie a GIF." },
    ],
    priceNote: "Cena závisí na složitosti loga a délce animace.",
    termNote: "Běžná doba, když logo už máte hotové.",
    ctaTitle: "Pojďme vaše logo rozhýbat.",
  },
  {
    id: "web",
    title: "Web a landing page",
    result: "Stránka, která přivede poptávky.",
    from: "od 45 000 Kč",
    days: "od 21 dnů",
    tone: "olive",
    facts: ["Vizitka o 1–3 stránkách nebo landing page", "Analytika v ceně"],
    deliverables: [
      "Design ve vašem stylu, responzivní",
      "Formulář, mapa, odkazy na sítě",
      "Doména a hosting na vaše jméno",
      "Analytika a návod, jak měnit texty",
    ],
    steps: [
      { title: "Brief", text: "Cíl stránky, obsah a co už máte." },
      { title: "Návrh", text: "Struktura a design hlavní stránky." },
      { title: "Doladění", text: "Ostatní stránky, formulář, texty." },
      { title: "Spuštění", text: "Na vaší doméně, s analytikou a přístupy." },
    ],
    priceNote: "Cena závisí na počtu stránek a na tom, zda máte texty a fotky.",
    termNote: "Běžná doba, když podklady dodáte včas.",
    excluded: [
      "Backend, platby a integrace",
      "Reklama a SEO — nastavíme jen měření",
      "Správa webu po předání",
    ],
    ctaTitle: "Pojďme postavit stránku, která se vyplatí.",
    note: {
      text: "Nemáte firemní styl? Navrhneme ho společně s webem.",
      href: "/#bundles",
    },
  },
  {
    id: "eshop",
    title: "Nový vzhled e-shopu",
    result: "Shoptet nebo Upgates v barvách vaší značky.",
    from: "od 25 000 Kč",
    days: "od 14 dnů",
    tone: "blue",
    facts: ["Jen vzhled existujícího e-shopu", "Shoptet nebo Upgates"],
    deliverables: [
      "Šablona v barvách a písmech značky",
      "Hlavička, patička, bannery",
      "Obálky kategorií a produktová karta",
      "Šablony promo bannerů k úpravě",
    ],
    steps: [
      { title: "Brief", text: "Platforma, kategorie, co prodáváte." },
      { title: "Návrh", text: "Hlavní stránka a produktová karta." },
      { title: "Doladění", text: "Bannery, kategorie, detaily." },
      { title: "Nasazení", text: "Šablona a soubory k nahrání." },
    ],
    priceNote: "Cena závisí na platformě a počtu bannerů.",
    termNote: "Běžná doba, když podklady dodáte včas.",
    excluded: [
      "Stavba nového e-shopu",
      "Backend, platby, sklad",
      "Produktové fotky a texty",
    ],
    ctaTitle: "Pojďme dát vašemu e-shopu nový kabát.",
  },
  {
    id: "social",
    title: "Sada pro sociální sítě",
    result: "Avatar, cover a šablony postů, které zvládnete sami.",
    from: serviceFrom("social"),
    days: serviceDays("social") ?? "od 5 dnů",
    tone: "rose",
    bundle: "nova-znacka",
    facts: ["Navazuje na vaše logo a styl", "Šablony upravíte sami"],
    deliverables: [
      "Avatar pro profily",
      "Cover pro Facebook, LinkedIn nebo YouTube",
      "2–3 šablony postů",
      "Vše v editovatelném formátu",
    ],
    steps: [
      { title: "Brief", text: "Které sítě a o čem postujete." },
      { title: "Návrh", text: "Avatar, cover a první šablona." },
      { title: "Doladění", text: "Ostatní šablony." },
      { title: "Předání", text: "Soubory a krátký návod." },
    ],
    priceNote: "Cena závisí na počtu sítí a šablon.",
    termNote: "Běžná doba pro jednu síť.",
    excluded: [
      "Vedení sítí a psaní postů",
      "Reklama",
      "Fotky a videa do postů",
    ],
    ctaTitle: "Pojďme, ať vaše sítě vypadají jako jedna značka.",
  },
  {
    id: "print",
    title: "Tiskoviny",
    result: "Vizitky, hlavička a polep — včetně tiskových dat.",
    from: serviceFrom("print"),
    days: serviceDays("print") ?? "od 5 dnů",
    tone: "brown",
    bundle: "novy-kabat",
    facts: ["Tisková data připravená pro tiskárnu", "Navazuje na váš styl"],
    deliverables: [
      "Vizitky, hlavička, polep nebo cedule",
      "PDF se spadávkou v CMYK",
      "Zdrojové soubory",
      "Náhledy ke schválení",
    ],
    steps: [
      { title: "Brief", text: "Co tisknete a v jakém množství." },
      { title: "Návrh", text: "První tiskovina ve vašem stylu." },
      { title: "Doladění", text: "Ostatní tiskoviny a varianty." },
      { title: "Předání", text: "Tisková data a zdroje." },
    ],
    priceNote: "Cena závisí na počtu tiskovin a variant.",
    termNote: "Běžná doba pro 2–3 tiskoviny.",
    excluded: ["Tisk — dodáme jen data", "Nový firemní styl", "Distribuce"],
    examples: ["kismi"],
    ctaTitle: "Pojďme připravit tiskoviny, které nemusíte předělávat.",
  },
  {
    id: "logo-dotazeni",
    title: "Dotažení hotového loga",
    result: "Logo, které máte, připravené na tisk i na web.",
    from: serviceFrom("logo-dotazeni"),
    days: serviceDays("logo-dotazeni") ?? "po domluvě",
    tone: "sage",
    shape: "oval",
    facts: ["Pro logo, které už máte odjinud", "Převod do vektoru a varianty"],
    steps: [
      { title: "Podklady", text: "Pošlete, co k logu máte." },
      { title: "Převod", text: "Překreslíme do vektoru a vyčistíme tvary." },
      { title: "Varianty", text: "Barevná, černobílá, inverzní, symbol." },
      { title: "Předání", text: "Soubory a pravidla použití." },
    ],
    priceNote: "Cena závisí na kvalitě podkladů.",
    termNote: "Běžná doba, když máte podklady po ruce.",
    ctaTitle: "Pojďme vaše logo dotáhnout do konce.",
  },
];

export const serviceAnchor = (id: ServiceId) => `service-${id}`;

/** Detail page of a service */
export const servicePath = (id: ServiceId) => `/sluzby/${id}`;

export const serviceById = (id: string) => services.find((s) => s.id === id);

/** Up to three projects named in `examples`, in the order given there */
export const serviceExamples = (service: Service): Project[] =>
  (service.examples ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined)
    .slice(0, 3);

/** Watercolor hero illustration, public/media/services/hero */
/* file names carry a style suffix: replacing an image must change its URL,
   because optimized variants are cached for a year. The services that came
   with the ceník have only a pictogram; their pages show that instead. */
const withHeroArt = new Set<ServiceId>([
  "logo",
  "identity",
  "icons",
  "social",
  "print",
  "web",
  "eshop",
  "video",
]);

export const serviceHero = (id: ServiceId) =>
  withHeroArt.has(id) ? `/media/services/hero/${id}-flat.webp` : undefined;

/** White line-art pictogram, public/media/services */
export const servicePicto = (id: ServiceId) => `/media/services/${id}.png`;
