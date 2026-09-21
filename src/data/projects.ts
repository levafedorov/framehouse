export type Category = "logo" | "identity" | "icons" | "print";

/** Rows of the work section, in display order */
export const categories: { id: Category; label: string; blurb: string }[] = [
  {
    id: "logo",
    label: "Loga a identita",
    blurb: "Značky, které fungují na vizitce, na ceduli i na výšivce.",
  },
  {
    id: "identity",
    label: "Firemní styl a obaly",
    blurb: "Obaly, tiskoviny a nosiče, aby všechno k sobě sedělo.",
  },
  {
    id: "icons",
    label: "Ikony a ilustrace",
    blurb: "Sady ikon a ilustrace ve stylu značky pro web, tisk i merch.",
  },
  {
    id: "print",
    label: "Tiskoviny",
    blurb: "Vizitky, certifikáty a tiskoviny včetně tiskových dat.",
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
  category: Category;
  kind: ProjectKind;
  /** The main image of the piece, public/media/work/<slug>-<n>.jpg */
  cover: string;
  /** 3:2 card image (the cover fitted on a blurred copy of itself) */
  poster: string;
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
  /** Frames from the piece, public/media/work/<slug>-<n>.jpg */
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

const img = (slug: string, n: number) => `/media/work/${slug}-${n}.jpg`;
const card = (slug: string) => `/media/work/${slug}-card.jpg`;

// TopDesigner.cz competition places, from the folder the pieces came in.
// TODO: confirm which pieces were competition entries and which were direct
// client work (issue #19).
const place = (n: 1 | 2 | 3) => `Soutěž TopDesigner.cz, ${n}. místo`;

const fact = {
  service: (value: string): Fact => ({ label: "Služba", value, icon: "service" }),
  client: (value: string): Fact => ({ label: "Klient", value, icon: "industry" }),
  industry: (value: string): Fact => ({ label: "Obor", value, icon: "industry" }),
  context: (value: string): Fact => ({ label: "Kontext", value, icon: "context" }),
};

/**
 * The designer's portfolio — the strongest ten pieces. First places carry
 * the client's name; second and third places are concepts and carry only
 * the industry (issue #19). More pieces sit in the source folder and can
 * be added the same way.
 */
const all: Project[] = [
  /* ---------------- 1. místo — client work ---------------- */
  {
    slug: "kooperativa",
    name: "Kooperativa",
    service: "Sada ikon a merch",
    category: "icons",
    kind: "client",
    cover: img("kooperativa", 6),
    poster: card("kooperativa"),
    isNew: true,
    context: place(1),
    brief:
      "Sada ikon pojistných produktů pro Kooperativu: cestovní pojištění, auto, penze, domov a zdraví.",
    solution:
      "Pět barevných dlaždic s jednoduchým symbolem, každá s vlastní barvou v CMYK. Ikony pak nesly láhev, visačku pro staff, tašky a tričko na akce.",
    facts: [fact.service("Ikony a merch"), fact.client("Kooperativa"), fact.context(place(1))],
    stills: [
      { src: img("kooperativa", 2), label: "Ikony" },
      { src: img("kooperativa", 3), label: "Visačka" },
      { src: img("kooperativa", 4), label: "Tašky" },
    ],
  },
  {
    slug: "hinna",
    name: "Hinna",
    service: "Logo a merch",
    category: "logo",
    kind: "client",
    cover: img("hinna", 1),
    poster: card("hinna"),
    context: place(1),
    brief: "Logo pro módní značku Hinna, která prodává mikiny a trička.",
    solution:
      "Geometrický wordmark s tečkou, jednobarevný, aby seděl na výšivce i na štítku. Aplikace na mikinu, tričko a web.",
    facts: [fact.service("Logo"), fact.client("Hinna"), fact.context(place(1))],
    stills: [
      { src: img("hinna", 1), label: "Znak" },
      { src: img("hinna", 2), label: "Wordmark" },
      { src: img("hinna", 3), label: "Merch" },
    ],
  },
  {
    slug: "weber",
    name: "Weber",
    service: "Logotyp",
    category: "logo",
    kind: "client",
    cover: img("weber", 1),
    poster: card("weber"),
    context: place(1),
    brief: "Logotyp pro svatební salon Weber.",
    solution:
      "Měkký wordmark s motýlem v písmenu b. Barevná, jednobarevná a inverzní verze a návrh na výloze salonu.",
    facts: [fact.service("Logotyp"), fact.client("Weber"), fact.context(place(1))],
  },
  {
    slug: "llama-loca",
    name: "Llama Loca",
    service: "Logo",
    category: "logo",
    kind: "client",
    cover: img("llama-loca", 1),
    poster: card("llama-loca"),
    context: place(1),
    brief: "Logo pro Llama Loca, malou značku s hravým jménem.",
    solution:
      "Lama nakreslená jednou nepřerušenou linkou, pod ní volný rukopisný nápis. Funguje v jedné barvě i v malé velikosti.",
    facts: [fact.service("Logo"), fact.client("Llama Loca"), fact.context(place(1))],
  },
  {
    slug: "kismi",
    name: "Kismi",
    service: "Vizitky a certifikát",
    category: "identity",
    kind: "client",
    cover: img("kismi", 1),
    poster: card("kismi"),
    context: place(1),
    brief: "Vizitky a certifikát pro Kismi, kurzy líčení.",
    solution:
      "Bílá, zlatá a růžová, mramorová textura. Oboustranná vizitka a certifikát se zlatou linkou, připravené k tisku.",
    facts: [fact.service("Tiskoviny"), fact.client("Kismi"), fact.context(place(1))],
    stills: [
      { src: img("kismi", 1), label: "Vizitky" },
      { src: img("kismi", 2), label: "Certifikát" },
    ],
  },

  /* ---------------- 2. místo — concepts ---------------- */
  {
    slug: "koncept-kosmetika",
    name: "Přírodní kosmetika",
    service: "Obaly",
    category: "identity",
    kind: "concept",
    cover: img("koncept-kosmetika", 3),
    poster: card("koncept-kosmetika"),
    context: place(2),
    brief: "Řada přírodní kosmetiky inspirovaná Asií.",
    solution:
      "Lahvička a krabička ve čtyřech barevných variantách podle vůně. Pagoda a torii jako jemný motiv na obalu.",
    facts: [fact.service("Obaly"), fact.industry("Kosmetika"), fact.context(place(2))],
    stills: [
      { src: img("koncept-kosmetika", 1), label: "Bílá" },
      { src: img("koncept-kosmetika", 3), label: "Oranžová" },
      { src: img("koncept-kosmetika", 4), label: "Modrá" },
    ],
  },
  {
    slug: "koncept-rezidence",
    name: "Rezidenční projekt",
    service: "Logo a identita",
    category: "logo",
    kind: "concept",
    cover: img("koncept-rezidence", 1),
    poster: card("koncept-rezidence"),
    context: place(2),
    brief: "Rezidenční projekt na okraji města.",
    solution:
      "Monogram RH z tenkých linek, hnědá a tmavě zelená. Aplikace na vizuál domu, vizitky a hlavičku.",
    facts: [fact.service("Logo a identita"), fact.industry("Reality"), fact.context(place(2))],
    stills: [
      { src: img("koncept-rezidence", 1), label: "Identita" },
      { src: img("koncept-rezidence", 2), label: "Znak" },
      { src: img("koncept-rezidence", 3), label: "Aplikace" },
    ],
  },
  {
    slug: "koncept-venave",
    name: "Technická firma",
    service: "Logo a identita",
    category: "logo",
    kind: "concept",
    cover: img("koncept-venave", 2),
    poster: card("koncept-venave"),
    context: place(2),
    brief: "Technická firma s krátkým názvem a písmenem V.",
    solution:
      "Ostré V v červené a černé, verze pro tmavé i světlé pozadí. Lahve, kontejner, vizitky.",
    facts: [fact.service("Logo a identita"), fact.industry("Technika"), fact.context(place(2))],
    stills: [
      { src: img("koncept-venave", 1), label: "Značka" },
      { src: img("koncept-venave", 2), label: "Aplikace" },
      { src: img("koncept-venave", 4), label: "Varianty" },
    ],
  },

  /* ---------------- 3. místo — concepts ---------------- */
  {
    slug: "koncept-safari-park",
    name: "Safari park",
    service: "Ilustrace a merch",
    category: "icons",
    kind: "concept",
    cover: img("koncept-safari-park", 3),
    poster: card("koncept-safari-park"),
    context: place(3),
    brief: "Safari park hledal motivy na plátěné tašky.",
    solution:
      "Nosorožec, žirafa a zebra jako plošné ilustrace v teplé paletě, s vlastním nápisem. Tisk na tašky.",
    facts: [fact.service("Ilustrace"), fact.industry("Zoo a safari"), fact.context(place(3))],
    stills: [
      { src: img("koncept-safari-park", 1), label: "Nosorožec" },
      { src: img("koncept-safari-park", 2), label: "Žirafa a zebra" },
      { src: img("koncept-safari-park", 4), label: "Taška" },
    ],
  },
  {
    slug: "koncept-danova-poradkyne",
    name: "Daňová poradkyně",
    service: "Logo a identita",
    category: "logo",
    kind: "concept",
    cover: img("koncept-danova-poradkyne", 2),
    poster: card("koncept-danova-poradkyne"),
    context: place(3),
    brief: "Daňová poradkyně, která chce působit přesně a klidně.",
    solution:
      "Wordmark s lomítkem a X v měděné barvě na tmavě modré. Vizitky, hlavička a razítko.",
    facts: [fact.service("Logo a identita"), fact.industry("Daňové poradenství"), fact.context(place(3))],
    stills: [
      { src: img("koncept-danova-poradkyne", 2), label: "Wordmark" },
      { src: img("koncept-danova-poradkyne", 1), label: "Identita" },
    ],
  },
];

const kindOrder: ProjectKind[] = ["client", "realized", "concept"];

/** Real client work first, then realised concepts, then concepts */
export const projects: Project[] = [...all].sort(
  (a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
);

/** Only the rows that have something to show */
export const workRows = categories
  .map((c) => ({ ...c, items: projects.filter((p) => p.category === c.id) }))
  .filter((row) => row.items.length > 0);

export const heroProject = projects[0];
