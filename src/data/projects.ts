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
  /** 9:16 video, optional */
  video?: string;
  poster?: string;
  /** Shows the "Nové" badge */
  isNew?: boolean;
  year: string;
};

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
    video: "/media/bohemia.mp4",
    poster: "/media/bohemia-poster.jpg",
    isNew: true,
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
    poster: "/media/akinu-puppy.jpg",
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
    poster: "/media/dogfitness-poster.jpg",
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
  },
  // TODO: add the TopDesigner.cz logo concepts (issue #19) as kind: "concept"
];

// TODO: remove — duplicates so the horizontal strips can be tested
const testDuplicates: Project[] = all.flatMap((p) =>
  [1, 2, 3].map((i) => ({
    ...p,
    slug: `${p.slug}-dup-${i}`,
    kind: (i === 1 ? "realized" : "concept") as ProjectKind,
    isNew: false,
  })),
);

const kindOrder: ProjectKind[] = ["client", "realized", "concept"];

/** Real client work first, then realised concepts, then concepts */
export const projects: Project[] = [...all, ...testDuplicates].sort(
  (a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind),
);

/** Only the rows that have something to show */
export const workRows = categories
  .map((c) => ({ ...c, items: projects.filter((p) => p.category === c.id) }))
  .filter((row) => row.items.length > 0);

export const heroProject = projects[0];
