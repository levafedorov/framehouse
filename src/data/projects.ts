export type Category = "logo" | "identity" | "icons" | "print";

/** Rows of the work section, in display order */
export const categories: { id: Category; label: string }[] = [
  {
    id: "logo",
    label: "Loga a identita",
  },
  {
    id: "identity",
    label: "Firemní styl a obaly",
  },
  {
    id: "icons",
    label: "Ikony a ilustrace",
  },
  {
    id: "print",
    label: "Tiskoviny",
  },
];

/** Client work, a realised concept, or a concept (e.g. a competition entry) */
export type ProjectKind = "client" | "realized" | "concept";

export const kindLabel: Record<ProjectKind, string> = {
  client: "Klient",
  realized: "Realizace",
  concept: "Koncept",
};

export type Project = {
  slug: string;
  /**
   * Client work: the client name.
   * Concepts: the industry instead of the name — the name stays only
   * in the pixels of the image, never in text, alt or file names.
   */
  name: string;
  /** What we made */
  service: string;
  /**
   * One line under the card image, the only place the visitor reads what
   * the piece is: "Logo pro Hinna" for client work, "Návrh loga — obor"
   * or "Koncept identity — obor" for a concept. Also the link's aria-label.
   */
  caption: string;
  category: Category;
  kind: ProjectKind;
  /** 4:3 image of the piece for the hero of /prace/[slug], public/media/work/<slug>-cover.jpg */
  cover: string;
  /** 3:2 card image, a clean crop of the piece (no letterbox, no blur fill), public/media/work/<slug>-card.jpg */
  poster: string;
  /** Hi-res image for the homepage hero where the cover is too small; falls back to `cover` */
  heroImage?: string;
  /** Shows the "Nové" badge */
  isNew?: boolean;
  /** Left out where we don't know it */
  year?: string;

  /* --- detail page, /prace/[slug] --- */

  /**
   * The two story cards. The same pair of fields serves every kind; only
   * the labels differ (see `storyLabels`): client and realised work read
   * "Zadání / Řešení", a concept — which had no client brief — reads
   * "Výchozí bod / Co jsme zkoušeli".
   */
  /** What the work starts from, 1–2 plain sentences */
  brief?: string;
  /** What we did or tried, 1–2 plain sentences */
  solution?: string;
  /**
   * Where the piece comes from — a competition, a study — shown next to
   * the name in the hero (concepts never carry a client name)
   */
  context?: string;
  /** The facts strip: služba, klient/obor, kontext … */
  facts?: Fact[];
  /** 4:5 details of the piece, public/media/work/<slug>-still-<label>.jpg */
  stills?: Still[];
};

/** Labels of the two story cards, per kind */
export const storyLabels: Record<ProjectKind, [string, string]> = {
  client: ["Zadání", "Řešení"],
  realized: ["Zadání", "Řešení"],
  concept: ["Výchozí bod", "Co jsme zkoušeli"],
};

export type FactIcon =
  | "service"
  | "format"
  | "length"
  | "year"
  | "channel"
  | "industry"
  | "context";

export type Fact = { label: string; value: string; icon: FactIcon };

export type Still = { src: string; label: string };

/** Tile colour of the work's category, shared by the hero and the CTA */
export const categoryTone: Record<
  Category,
  "blue" | "brown" | "rose" | "sage" | "olive"
> = {
  logo: "brown",
  identity: "rose",
  icons: "sage",
  print: "blue",
};

export const projectPath = (slug: string) => `/prace/${slug}`;

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Up to three other works, the same category first */
export const relatedProjects = (project: Project): Project[] =>
  projects
    .filter((p) => p.slug !== project.slug)
    .sort(
      (a, b) =>
        Number(b.category === project.category) -
        Number(a.category === project.category),
    )
    .slice(0, 3);

/* file names match the manifest in scripts/build-work-media.mjs */
const card = (slug: string) => `/media/work/${slug}-card.jpg`;
const cover = (slug: string) => `/media/work/${slug}-cover.jpg`;
const still = (slug: string, id: string, label: string): Still => ({
  src: `/media/work/${slug}-still-${id}.jpg`,
  label,
});

const fact = {
  service: (value: string): Fact => ({ label: "Služba", value, icon: "service" }),
  client: (value: string): Fact => ({ label: "Klient", value, icon: "industry" }),
  industry: (value: string): Fact => ({ label: "Obor", value, icon: "industry" }),
  year: (value: string): Fact => ({ label: "Rok", value, icon: "year" }),
};

/**
 * The designer's portfolio — the strongest twelve pieces. Client work
 * carries the client's name; concepts carry only the industry (issue #19).
 * The order here is the display order within each kind. More pieces sit
 * in the source folder and can be added the same way.
 */
const all: Project[] = [
  /* ---------------- client work ---------------- */
  {
    slug: "kooperativa",
    name: "Kooperativa",
    service: "Sada ikon a merch",
    caption: "Sada ikon a merch pro Kooperativu",
    category: "icons",
    kind: "client",
    cover: cover("kooperativa"),
    poster: card("kooperativa"),
    heroImage: "/media/work/kooperativa-hero.jpg",
    isNew: true,
    brief:
      "Sada ikon pojistných produktů pro Kooperativu: cestovní pojištění, vozidla, podnikatelé, majetek a životní pojištění.",
    solution:
      "Pět barevných dlaždic s jednoduchým symbolem, každá s vlastní barvou v CMYK. Ikony pak nesly láhev, visačku pro staff, tašky a tričko na akce.",
    facts: [fact.service("Ikony a merch"), fact.client("Kooperativa")],
    stills: [
      still("kooperativa", "ikony", "Ikony"),
      still("kooperativa", "visacky", "Visačky"),
      still("kooperativa", "tasky", "Tašky"),
    ],
  },
  {
    slug: "hinna",
    name: "Hinna",
    service: "Logo",
    caption: "Logo pro Hinna",
    category: "logo",
    kind: "client",
    cover: cover("hinna"),
    poster: card("hinna"),
    year: "2021",
    brief:
      "Logo pro módní značku Hinna, která prodává trička a mikiny z organické bavlny.",
    solution:
      "Geometrický wordmark s tečkou, jednobarevný, aby seděl na výšivce, štítku i v hlavičce e-shopu. Značka ho používá od roku 2021.",
    facts: [fact.service("Logo"), fact.client("Hinna"), fact.year("2021")],
    stills: [
      still("hinna", "web", "Web"),
      still("hinna", "mikina", "Mikina"),
      still("hinna", "mikina-bila", "Mikina bílá"),
    ],
  },
  {
    slug: "llama-loca",
    name: "Llama Loca",
    service: "Logo",
    caption: "Logo pro Llama Loca",
    category: "logo",
    kind: "client",
    cover: cover("llama-loca"),
    poster: card("llama-loca"),
    brief: "Logo pro Llama Loca, malou značku s hravým jménem.",
    solution:
      "Lama nakreslená jednou nepřerušenou linkou, pod ní volný rukopisný nápis. Funguje v jedné barvě i v malé velikosti.",
    facts: [fact.service("Logo"), fact.client("Llama Loca")],
  },
  {
    slug: "quality-equals-cost",
    name: "Quality equals cost",
    service: "Logo",
    caption: "Logo pro Quality equals cost",
    category: "logo",
    kind: "client",
    cover: cover("quality-equals-cost"),
    poster: card("quality-equals-cost"),
    brief: "Logo pro značku Quality equals cost.",
    solution:
      "Červené Q, které zároveň připomíná tlačítko zapnutí, a název ve třech řádcích. Funguje v jedné barvě i v malé velikosti.",
    facts: [fact.service("Logo"), fact.client("Quality equals cost")],
  },
  {
    slug: "kismi",
    name: "Kismi",
    service: "Vizitky a certifikát",
    caption: "Vizitky a certifikát pro Kismi",
    category: "identity",
    kind: "client",
    cover: cover("kismi"),
    poster: card("kismi"),
    brief: "Vizitky a certifikát pro vizážistku Kismi (foto, video, make-up).",
    solution:
      "Bílá, zlatá a růžová, mramorová textura. Oboustranná vizitka a certifikát se zlatou linkou, připravené k tisku.",
    facts: [fact.service("Tiskoviny"), fact.client("Kismi")],
    stills: [still("kismi", "vizitky", "Vizitky")],
  },

  /* ---------------- concepts ---------------- */
  {
    slug: "koncept-doprava",
    name: "Dopravní skupina",
    service: "Logo a identita",
    caption: "Koncept identity — doprava a logistika",
    category: "logo",
    kind: "concept",
    cover: cover("koncept-doprava"),
    poster: card("koncept-doprava"),
    brief: "Dopravní a logistická skupina s krátkým názvem na V.",
    solution:
      "Ostré V, do kterého je vepsaný symbol cíle cesty, dálnice a letadla. Červená, černá a bílá, verze se jménem i samostatný piktogram. Lahve, kontejner, vizitky a desky.",
    facts: [
      fact.service("Logo a identita"),
      fact.industry("Doprava a logistika"),
    ],
    stills: [
      still("koncept-doprava", "znacka", "Značka"),
      still("koncept-doprava", "aplikace", "Aplikace"),
      still("koncept-doprava", "varianty", "Varianty"),
    ],
  },
  {
    slug: "koncept-danova-poradkyne",
    name: "Daňová poradkyně",
    service: "Logo a identita",
    caption: "Koncept identity — daňové poradenství",
    category: "logo",
    kind: "concept",
    cover: cover("koncept-danova-poradkyne"),
    poster: card("koncept-danova-poradkyne"),
    brief: "Daňová poradkyně, která chce působit přesně a klidně.",
    solution:
      "Wordmark se svislou linkou a X, které je zároveň procentem, v měděné barvě na tmavě modré. Vizitky, hlavička a polep na dveře.",
    facts: [
      fact.service("Logo a identita"),
      fact.industry("Daňové poradenství"),
    ],
    stills: [
      still("koncept-danova-poradkyne", "znak", "Znak"),
      still("koncept-danova-poradkyne", "vizitky", "Vizitky"),
    ],
  },
  {
    slug: "koncept-rezidence",
    name: "Rezidenční projekt",
    service: "Logo",
    caption: "Návrh loga — rezidenční projekt",
    category: "logo",
    kind: "concept",
    cover: cover("koncept-rezidence"),
    poster: card("koncept-rezidence"),
    brief: "Rezidenční projekt na okraji města.",
    solution:
      "Tři směry monogramu z iniciál: s lístkem, geometrický z tenkých linek a s ornamentem. Hnědá a tmavě zelená, aplikace na vizuál domu.",
    facts: [fact.service("Logo"), fact.industry("Reality")],
    stills: [
      still("koncept-rezidence", "smer-1", "Směr 1"),
      still("koncept-rezidence", "smer-2", "Směr 2"),
      still("koncept-rezidence", "smer-3", "Směr 3"),
    ],
  },
  {
    slug: "koncept-kosmetika",
    name: "Přírodní kosmetika",
    service: "Obaly",
    caption: "Návrh obalů — přírodní kosmetika",
    category: "identity",
    kind: "concept",
    cover: cover("koncept-kosmetika"),
    poster: card("koncept-kosmetika"),
    brief: "Řada přírodní kosmetiky inspirovaná Asií.",
    solution:
      "Lahvička a krabička ve čtyřech barevných variantách podle vůně. Pagoda a torii jako jemný motiv na obalu.",
    facts: [fact.service("Obaly"), fact.industry("Kosmetika")],
    stills: [
      still("koncept-kosmetika", "bila", "Bílá"),
      still("koncept-kosmetika", "oranzova", "Oranžová"),
      still("koncept-kosmetika", "modra", "Modrá"),
    ],
  },
  {
    slug: "koncept-autolakovna",
    name: "Autolakovna",
    service: "Firemní oblečení",
    caption: "Návrh firemního oblečení — autolakovna",
    category: "identity",
    kind: "concept",
    cover: cover("koncept-autolakovna"),
    poster: card("koncept-autolakovna"),
    brief: "Pracovní polokošile pro tým autolakovny, s logy partnerů na zádech.",
    solution:
      "Tři směry: barevné linky na bílé, vlny s opakovaným názvem na šedé a na tyrkysové.",
    facts: [
      fact.service("Firemní oblečení"),
      fact.industry("Autoservis a lakovna"),
    ],
    stills: [
      still("koncept-autolakovna", "bila", "Bílá"),
      still("koncept-autolakovna", "seda", "Šedá"),
      still("koncept-autolakovna", "tyrkysova", "Tyrkysová"),
    ],
  },
  {
    slug: "koncept-maskot",
    name: "Rodinný e-shop",
    service: "Maskot a logo",
    caption: "Návrh maskota — rodinný e-shop",
    category: "icons",
    kind: "concept",
    cover: cover("koncept-maskot"),
    poster: card("koncept-maskot"),
    brief: "Rodinný e-shop, který má ve jménu cukr.",
    solution:
      "Dvě kostky cukru, které se drží kolem ramen, a čtyřlístek se srdcem. Barevná, černá a inverzní verze, kulatá samolepka.",
    facts: [fact.service("Maskot a logo"), fact.industry("E-shop")],
    stills: [
      still("koncept-maskot", "verze", "Verze"),
      still("koncept-maskot", "samolepky", "Samolepky"),
    ],
  },
  {
    slug: "koncept-safari-park",
    name: "Safari park",
    service: "Ilustrace a merch",
    caption: "Ilustrace a merch — safari park",
    category: "icons",
    kind: "concept",
    cover: cover("koncept-safari-park"),
    poster: card("koncept-safari-park"),
    brief: "Safari park hledal motivy na plátěné tašky.",
    solution:
      "Nosorožec, žirafa a zebra jako plošné ilustrace v teplé paletě, s vlastním nápisem. Tisk na tašky.",
    facts: [fact.service("Ilustrace"), fact.industry("Zoo a safari")],
    stills: [
      still("koncept-safari-park", "nosorozec", "Nosorožec"),
      still("koncept-safari-park", "zirafa", "Žirafa"),
      still("koncept-safari-park", "taska", "Taška"),
    ],
  },
];

const kindOrder: ProjectKind[] = ["client", "realized", "concept"];

/** Real client work first, then realised concepts, then concepts (stable sort) */
export const projects: Project[] = [...all].sort(
  (a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
);

/** Only the rows that have something to show */
export const workRows = categories
  .map((c) => ({ ...c, items: projects.filter((p) => p.category === c.id) }))
  .filter((row) => row.items.length > 0);

export const heroProject = projects[0];
