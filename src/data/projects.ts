export type Category = "video" | "logo" | "icons" | "website";

/** Rows of the work section, in display order */
export const categories: { id: Category; label: string; blurb: string }[] = [
  {
    id: "video",
    label: "Videoreklamy",
    blurb: "Krátká videa pro sítě a web — vznikají bez kamery, z fotek a briefu.",
  },
  {
    id: "logo",
    label: "Loga a identita",
    blurb: "Značky, které fungují na vizitce, na ceduli i v animaci.",
  },
  {
    id: "icons",
    label: "Ikony",
    blurb: "Sady ikon ve stylu značky pro web a sociální sítě.",
  },
  {
    id: "website",
    label: "Weby",
    blurb: "Vizitky a landing pages ve firemním stylu, s analytikou v ceně.",
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
  logo: string;
  /** How the logo should sit inside a light tile */
  logoShape?: "square" | "wide";
  /** short loop, optional (the hero one is a 3:4 crop, ~1 MB) */
  video?: string;
  /** 3:2 landscape crop for the work card, public/media/*-card.jpg */
  poster?: string;
  /** Shows the "Nové" badge */
  isNew?: boolean;
  year: string;

  /* --- detail page, /prace/[slug] --- */

  /**
   * The two story cards. The same pair of fields serves every kind; only
   * the labels differ (see `storyLabels`): client and realised work read
   * "Zadání / Řešení", a concept — which had no client brief — reads
   * "Výchozí bod / Co jsme zkoušeli".
   */
  /** What the work starts from, 2–3 plain sentences */
  brief?: string;
  /** What we did or tried, 2–3 plain sentences */
  solution?: string;
  /**
   * Concepts only: where the piece comes from — a competition, a study —
   * shown next to the industry in the hero (never a client name)
   */
  context?: string;
  /** The facts strip: služba, formát, délka, rok … (concepts: obor, kontext) */
  facts?: Fact[];
  /** 4:5 frames from the piece, public/media/work/<slug>-<n>.jpg */
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
  video: "blue",
  logo: "brown",
  icons: "sage",
  website: "olive",
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

const all: Project[] = [
  {
    slug: "bohemia-pet-food",
    year: "2026",
    name: "Bohemia Pet Food",
    service: "Videoreklama",
    category: "video",
    kind: "client",
    logo: "/media/logo-bohemia.png",
    logoShape: "square",
    video: "/media/bohemia-hero.mp4",
    poster: "/media/bohemia-card.jpg",
    isNew: true,
    brief:
      "Krátká videoreklama na krmivo pro psy, do feedu a stories na Instagramu a TikToku. Klient měl fotky produktu a brief — žádné natočené záběry ani rozpočet na natáčení.",
    solution:
      "Video vzniklo bez kamery, z produktových fotek a briefu. Pes v ranní aleji, moment krmení a produkt v záběru, sestříhané do vertikálního formátu pro sítě.",
    facts: [
      { label: "Služba", value: "Videoreklama", icon: "service" },
      { label: "Formát", value: "Vertikální video", icon: "format" },
      { label: "Délka", value: "12 s", icon: "length" },
      { label: "Rok", value: "2026", icon: "year" },
    ],
    stills: [
      { src: "/media/work/bohemia-pet-food-1.jpg", label: "Alej" },
      { src: "/media/work/bohemia-pet-food-2.jpg", label: "Krmení" },
      { src: "/media/work/bohemia-pet-food-3.jpg", label: "Miska" },
    ],
  },
  {
    slug: "akinu",
    year: "2026",
    name: "Akinu",
    service: "Videoreklama",
    category: "video",
    kind: "client",
    logo: "/media/logo-akinu.jpg",
    logoShape: "square",
    video: "/media/akinu.mp4",
    poster: "/media/akinu-card.jpg",
    brief:
      "Videoreklama pro značku psího krmiva Akinu, pro Instagram a TikTok. K dispozici byly fotky produktu, barvy značky a brief.",
    solution:
      "Kreslený příběh v barvách značky: pes, balíček Akinu a cesta k misce, jednou linkou na červené. Bez natáčení, z podkladů klienta, ve vertikálním formátu pro sítě.",
    facts: [
      { label: "Služba", value: "Videoreklama", icon: "service" },
      { label: "Formát", value: "9:16", icon: "format" },
      { label: "Délka", value: "10 s", icon: "length" },
      { label: "Rok", value: "2026", icon: "year" },
    ],
    stills: [
      { src: "/media/work/akinu-1.jpg", label: "Silueta" },
      { src: "/media/work/akinu-2.jpg", label: "Balíček" },
      { src: "/media/work/akinu-3.jpg", label: "Značka" },
    ],
  },
  {
    slug: "dogfitness",
    year: "2026",
    name: "Dogfitness.cz",
    service: "Animace loga",
    category: "logo",
    kind: "client",
    logo: "/media/logo-dogfitness.png",
    logoShape: "wide",
    video: "/media/dogfitness.mp4",
    poster: "/media/dogfitness-card.jpg",
    brief:
      "Dogfitness.cz mělo hotové logo a chtělo ho rozhýbat: krátkou animaci na začátek videí a do stories.",
    solution:
      "Pes z loga se rozběhne a doběhne k nápisu. Jedna krátká smyčka, která funguje i bez zvuku, předaná jako MP4 ve vertikálním formátu.",
    facts: [
      { label: "Služba", value: "Animace loga", icon: "service" },
      { label: "Formát", value: "9:16", icon: "format" },
      { label: "Délka", value: "8 s", icon: "length" },
      { label: "Rok", value: "2026", icon: "year" },
    ],
    stills: [
      { src: "/media/work/dogfitness-1.jpg", label: "Pes" },
      { src: "/media/work/dogfitness-2.jpg", label: "Rozběh" },
      { src: "/media/work/dogfitness-3.jpg", label: "Logo" },
    ],
  },
  {
    slug: "aromatica",
    year: "2026",
    name: "Aromatica",
    service: "Ikony pro Instagram",
    category: "icons",
    kind: "client",
    logo: "/media/logo-aromatica.jpg",
    logoShape: "square",
    brief:
      "Sada ikon pro instagramový profil Aromatica, aby výběry příběhů a posty držely jeden styl.",
    solution:
      "Ikony v jemném akvarelovém stylu, který navazuje na značku: jedna paleta, jedna mřížka. Předáno jako PNG pro Instagram.",
    facts: [
      { label: "Služba", value: "Ikony", icon: "service" },
      { label: "Použití", value: "Instagram", icon: "channel" },
      { label: "Rok", value: "2026", icon: "year" },
    ],
  },
  // TODO: replace with the real TopDesigner.cz concept (issue #19) — the
  // images below are a generated placeholder so the concept layout can be
  // tested. Concepts carry the industry as `name`, never a client name.
  {
    slug: "koncept-pekarna",
    year: "2026",
    name: "Pekárna",
    service: "Návrh loga",
    category: "logo",
    kind: "concept",
    logo: "/media/work/koncept-pekarna-1.jpg",
    logoShape: "square",
    context: "Soutěžní návrh",
    brief:
      "Malá řemeslná pekárna bez vlastní značky. Chtěli jsme značku, která obstojí na papírovém sáčku i na ceduli nad vchodem a nepotřebuje k tomu doprovodný text.",
    solution:
      "Klas v kruhu, dvě barvy: tmavě hnědá a okrová. Zkoušeli jsme sílu linky a míru zjednodušení, aby znak fungoval i v malé velikosti na razítku.",
    facts: [
      { label: "Služba", value: "Návrh loga", icon: "service" },
      { label: "Obor", value: "Pekárna", icon: "industry" },
      { label: "Kontext", value: "Soutěžní návrh", icon: "context" },
      { label: "Rok", value: "2026", icon: "year" },
    ],
    stills: [
      { src: "/media/work/koncept-pekarna-1.jpg", label: "Znak" },
      { src: "/media/work/koncept-pekarna-2.jpg", label: "Sáček" },
      { src: "/media/work/koncept-pekarna-3.jpg", label: "Cedule" },
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
