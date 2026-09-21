import type { BundleId } from "./bundles";
import { projects, type Project } from "./projects";

export type ServiceId =
  | "video"
  | "logo"
  | "identity"
  | "icons"
  | "web"
  | "eshop"
  | "social"
  | "print";

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
  /** "Co dostanete": exactly four short points */
  deliverables: [string, string, string, string];
  /** "Jak to probíhá": four steps, brief → drafty → doladění → předání */
  steps: [Step, Step, Step, Step];
  /** What the price depends on — one short line */
  priceNote: string;
  /** What the lead time depends on — one short line */
  termNote: string;
  /** "Co není součástí": 3–4 short points */
  excluded: string[];
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

// TODO: prices and lead times are placeholders except video, logo and web —
// confirm before launch (issue #13).
export const services: Service[] = [
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
  {
    id: "logo",
    title: "Logo",
    result: "Značka, která funguje na vizitce i na ceduli.",
    from: "od 12 000 Kč",
    days: "od 7 dnů",
    tone: "brown",
    shape: "oval",
    facts: ["Nové logo nebo redesign", "Funguje malé i velké, barevně i jednobarevně"],
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
    examples: ["dogfitness"],
    ctaTitle: "Pojďme dát vaší firmě tvář.",
  },
  {
    id: "identity",
    title: "Firemní styl",
    result: "Paleta, typografie a nosiče, aby všechno k sobě sedělo.",
    from: "od 18 000 Kč",
    days: "od 14 dnů",
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
    ctaTitle: "Pojďme sladit všechno, co od vás lidé vidí.",
  },
  {
    id: "icons",
    title: "Ikony",
    result: "Sada ikon ve stylu značky pro web i sociální sítě.",
    from: "od 8 000 Kč",
    days: "od 5 dnů",
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
    examples: ["aromatica"],
    ctaTitle: "Pojďme dát vašim ikonám jeden rukopis.",
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
    title: "Sociální sítě",
    result: "Avatar, cover a šablony postů, které zvládnete sami.",
    from: "od 6 000 Kč",
    days: "od 5 dnů",
    tone: "rose",
    shape: "oval",
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
    excluded: ["Vedení sítí a psaní postů", "Reklama", "Fotky a videa do postů"],
    ctaTitle: "Pojďme, ať vaše sítě vypadají jako jedna značka.",
  },
  {
    id: "print",
    title: "Tiskoviny",
    result: "Vizitky, hlavička a polep — včetně tiskových dat.",
    from: "od 5 000 Kč",
    days: "od 5 dnů",
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
    ctaTitle: "Pojďme připravit tiskoviny, které nemusíte předělávat.",
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
export const serviceHero = (id: ServiceId) => `/media/services/hero/${id}.webp`;
