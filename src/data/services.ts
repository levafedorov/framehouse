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

  /** "Co dostanete": 4–6 short points — formats, versions, what is handed over */
  deliverables: string[];
  /** "Jak to probíhá": 3–4 steps; omit to use `defaultSteps` */
  steps?: string[];
  /** What the price depends on, shown next to `from` */
  priceNote: string;
  /** What the lead time depends on, shown next to `days` */
  termNote: string;
  /** "Co není součástí": 2–3 points that cut wrong expectations */
  excluded: string[];
  /** Project slugs shown as examples, up to four; the block is omitted when empty */
  examples?: string[];
  /** One extra line with a link, e.g. "Nemáte firemní styl? …" */
  note?: { text: string; href: string };
};

/** brief → drafty → doladění → předání, the same for every service */
export const defaultSteps = [
  "Brief: co potřebujete, pro koho a kde to bude fungovat.",
  "Drafty: 2–3 směry, vyberete jeden.",
  "Doladění: úpravy vybraného směru.",
  "Předání: finální soubory a licence.",
];

/** The lines every service page repeats (see About) */
export const serviceTerms = {
  payment: "Fixní cena, nebo platba za iteraci — vyberete si.",
  licence:
    "Exkluzivní, časově neomezená licence; práci si necháváme v portfoliu. White-label +50 %. Podpora po předání je za zvláštní cenu.",
};

// TODO: prices and lead times are placeholders except video, logo and web —
// confirm before launch (issue #13).
export const services: Service[] = [
  {
    id: "video",
    title: "Videoreklama",
    result: "Krátké video pro Instagram a TikTok, které si lidé dokoukají.",
    from: "od 35 000 Kč",
    days: "od 10 dnů",
    tone: "blue",
    deliverables: [
      "Krátké AI video z vašich fotek, produktů a briefu — bez natáčení.",
      "MP4 ve formátu platformy: 9:16, 1:1 nebo 16:9.",
      "Poster frame ke každému formátu.",
      "Další formáty na přání, cena podle jejich počtu.",
    ],
    steps: [
      "Brief: produkt, cíl, platforma a délka.",
      "Drafty: storyboard a první verze scén.",
      "Doladění: střih, tempo, text v obraze.",
      "Předání: MP4 v dohodnutých formátech a poster frame.",
    ],
    priceNote: "Záleží na délce videa a počtu formátů.",
    termNote: "Záleží na délce videa a na tom, jak rychle schválíte drafty.",
    excluded: [
      "Nenatáčíme ani nestříháme cizí materiál — video vzniká bez kamery.",
      "Nevedeme sociální sítě ani nenastavujeme reklamní kampaně.",
    ],
    examples: ["bohemia-pet-food", "akinu"],
  },
  {
    id: "logo",
    title: "Logo",
    result: "Značka, která funguje na vizitce i na ceduli.",
    from: "od 12 000 Kč",
    days: "od 7 dnů",
    tone: "brown",
    shape: "oval",
    deliverables: [
      "Nové logo, nebo redesign toho stávajícího.",
      "SVG, PDF a PNG pro tisk i obrazovku.",
      "Barevná, jednobarevná a inverzní verze.",
      "Základní pravidla použití: ochranná zóna, minimální velikost, čeho se vyvarovat.",
    ],
    priceNote:
      "Záleží na počtu směrů v draftech a na tom, zda jde o nové logo, nebo redesign.",
    termNote: "Záleží na rychlosti zpětné vazby.",
    excluded: [
      "Název nevymýšlíme — jen ověříme, že se s ním dá pracovat.",
      "Firemní styl a nosiče nejsou součástí; jsou samostatná služba nebo balíček.",
    ],
    examples: ["dogfitness"],
  },
  {
    id: "identity",
    title: "Firemní styl",
    result: "Paleta, typografie a nosiče, aby všechno k sobě sedělo.",
    from: "od 18 000 Kč",
    days: "od 14 dnů",
    tone: "rose",
    bundle: "nova-znacka",
    deliverables: [
      "Barevná paleta a typografie.",
      "3–4 nosiče podle toho, co používáte: vizitka, hlavička, podpis v e-mailu, cedule.",
      "Tisková data k nosičům.",
      "Jednoduchý brandbook na jednu stranu: jak styl používat.",
    ],
    priceNote: "Záleží na počtu nosičů a na tom, zda už máte logo.",
    termNote: "Záleží na počtu nosičů a rychlosti zpětné vazby.",
    excluded: [
      "Logo není součástí — navazujeme na to, které máte, nebo ho uděláme zvlášť.",
      "Rozsáhlý brandbook ani šablony pro sítě; ty jsou samostatná služba.",
      "Tisk zajistíte sami — dodáme tisková data.",
    ],
  },
  {
    id: "icons",
    title: "Ikony",
    result: "Sada ikon ve stylu značky pro web i sociální sítě.",
    from: "od 8 000 Kč",
    days: "od 5 dnů",
    tone: "sage",
    bundle: "znacka-v-pohybu",
    deliverables: [
      "Sada zhruba 8 ikon ve stylu vaší značky.",
      "SVG pro web a PNG pro sítě a prezentace.",
      "Jednotná mřížka a síla linky, aby ikony seděly k sobě.",
      "Seznam ikon odsouhlasíme před kreslením.",
    ],
    priceNote: "Záleží na počtu ikon a míře detailu.",
    termNote: "Záleží na počtu ikon.",
    excluded: [
      "Ne velké ikonové knihovny — na ty jsou hotové sady.",
      "Ne ilustrace ani maskot; maskot je součástí balíčku Značka v pohybu.",
    ],
    examples: ["aromatica"],
  },
  {
    id: "web",
    title: "Web a landing page",
    result: "Stránka, která přivede poptávky — analytiku nastavíme zdarma.",
    from: "od 45 000 Kč",
    days: "od 21 dnů",
    tone: "olive",
    deliverables: [
      "Webová vizitka o 1–3 stránkách (kdo jste, co děláte, kontakt), nebo landing page pro jeden cíl.",
      "Design ve vašem firemním stylu, responzivní na telefonu i počítači.",
      "Formulář, mapa a odkazy na sociální sítě.",
      "Doména a hosting zřízené na vaše jméno.",
      "Analytika jako dárek: Google Analytics, Search Console a cíle pro formulář a telefon.",
      "Předání přístupů a krátký návod, jak si sami měníte texty a fotky.",
    ],
    steps: [
      "Brief: cíl stránky, obsah a co už máte — logo, texty, fotky.",
      "Drafty: struktura a design hlavní stránky.",
      "Doladění: ostatní stránky, formulář, texty.",
      "Předání: spuštění na vaší doméně, analytika, návod a přístupy.",
    ],
    priceNote:
      "Záleží na počtu stránek a na tom, zda máte hotové texty a fotky.",
    termNote: "Záleží na počtu stránek a na tom, jak rychle dodáte podklady.",
    excluded: [
      "Žádný backend, platby ani integrace — na to je e-shop nebo systém na míru.",
      "Neděláme reklamu ani SEO; nastavíme jen měření.",
      "Web po předání nespravujeme — podpora je za zvláštní cenu.",
    ],
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
    deliverables: [
      "Šablona Shoptet nebo Upgates v barvách a písmech vaší značky.",
      "Hlavička, patička, bannery a obálky kategorií.",
      "Styl produktové karty a ikony.",
      "Šablony promo bannerů, které si sami upravíte.",
    ],
    priceNote: "Záleží na platformě a počtu bannerů a kategorií.",
    termNote: "Záleží na rozsahu a na tom, jak rychle dodáte podklady.",
    excluded: [
      "Jen vzhled existujícího e-shopu — nový e-shop nestavíme.",
      "Žádný backend, platby ani napojení na sklad či účetnictví.",
      "Produktové fotky a texty nedodáváme.",
    ],
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
    deliverables: [
      "Avatar pro profily.",
      "Cover pro Facebook, LinkedIn nebo YouTube.",
      "2–3 šablony postů, které si sami upravíte.",
      "Vše v editovatelném formátu, ne jen obrázky.",
    ],
    priceNote: "Záleží na počtu sítí a šablon.",
    termNote: "Záleží na počtu šablon.",
    excluded: [
      "Nevedeme sociální sítě ani nepíšeme posty.",
      "Nenastavujeme reklamu.",
      "Bez loga a stylu šablony nedávají smysl — navazujeme na to, co máte, nebo na balíček Nová značka.",
    ],
  },
  {
    id: "print",
    title: "Tiskoviny",
    result: "Vizitky, hlavička a polep — včetně tiskových dat.",
    from: "od 5 000 Kč",
    days: "od 5 dnů",
    tone: "brown",
    bundle: "novy-kabat",
    deliverables: [
      "Vizitky, hlavička dopisu a polep nebo cedule.",
      "Tisková data: PDF ve správné velikosti, se spadávkou a v CMYK.",
      "Zdrojové soubory pro budoucí úpravy.",
      "Náhledy ke schválení před předáním.",
    ],
    priceNote: "Záleží na počtu tiskovin a jmenných nebo jazykových variant.",
    termNote: "Záleží na počtu tiskovin.",
    excluded: [
      "Netiskneme — tisk zajistíte sami, my dodáme tisková data.",
      "Bez firemního stylu vycházíme z toho, co máte; nový styl je samostatná služba.",
    ],
  },
];

export const serviceAnchor = (id: ServiceId) => `service-${id}`;

/** Detail page of a service */
export const servicePath = (id: ServiceId) => `/sluzby/${id}`;

export const serviceById = (id: string) => services.find((s) => s.id === id);

/** Up to four projects named in `examples`, in the order given there */
export const serviceExamples = (service: Service): Project[] =>
  (service.examples ?? [])
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined)
    .slice(0, 4);
