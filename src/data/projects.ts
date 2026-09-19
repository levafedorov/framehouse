export type Category = "video" | "logo" | "icons" | "website";

/** Real client work vs. a concept (e.g. a competition entry) */
export type ProjectKind = "client" | "concept";

export const kindLabel: Record<ProjectKind, string> = {
  client: "Klient",
  concept: "Koncept",
};

export type Project = {
  slug: string;
  /**
   * Card caption. Client work: the client name.
   * Concepts: the industry instead of the name — the name stays only
   * in the pixels of the image, never in text, alt or file names.
   */
  name: string;
  /** What we made, shown under the name */
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

/** One shared grid: real client work first, concepts after */
export const projects: Project[] = [
  ...all.filter((p) => p.kind === "client"),
  ...all.filter((p) => p.kind === "concept"),
];

export const heroProject = projects[0];
