export type Category = "video" | "logo" | "icons" | "website";

export const categoryLabel: Record<Category, string> = {
  video: "Videoreklama",
  logo: "Logo",
  icons: "Ikony",
  website: "Web",
};

export const categoryFilterLabel: Record<Category, string> = {
  video: "Videoreklamy",
  logo: "Loga",
  icons: "Ikony",
  website: "Weby",
};

export type Project = {
  slug: string;
  client: string;
  /** Short line shown under the client name in cards */
  kind: string;
  category: Category;
  logo: string;
  /** How the logo should sit inside a light tile */
  logoShape?: "square" | "wide";
  /** 9:16 video, optional */
  video?: string;
  poster?: string;
  /** Short caption for the hero */
  headline?: string[];
  /** Shows the "Nové" badge */
  isNew?: boolean;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "bohemia-pet-food",
    year: "2026",
    client: "Bohemia Pet Food",
    kind: "Videoreklama",
    category: "video",
    logo: "/media/logo-bohemia.png",
    logoShape: "square",
    video: "/media/bohemia.mp4",
    poster: "/media/bohemia-poster.jpg",
    headline: ["Malá značka krmiv.", "Velká budoucnost."],
    isNew: true,
  },
  {
    slug: "akinu",
    year: "2026",
    client: "Akinu",
    kind: "Videoreklama",
    category: "video",
    logo: "/media/logo-akinu.jpg",
    logoShape: "square",
    video: "/media/akinu.mp4",
    poster: "/media/akinu-puppy.jpg",
  },
  {
    slug: "dogfitness",
    year: "2026",
    client: "Dogfitness.cz",
    kind: "Animace loga",
    category: "logo",
    logo: "/media/logo-dogfitness.png",
    logoShape: "wide",
    video: "/media/dogfitness.mp4",
    poster: "/media/dogfitness-poster.jpg",
  },
  {
    slug: "aromatica",
    year: "2026",
    client: "Aromatica",
    kind: "Ikony pro Instagram",
    category: "icons",
    logo: "/media/logo-aromatica.jpg",
    logoShape: "square",
  },
];

export const heroProject = projects[0];
