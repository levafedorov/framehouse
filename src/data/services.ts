import type { BundleId } from "./bundles";

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
  /** Set when the service is part of a bundle */
  bundle?: BundleId;
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
    image: "/media/bohemia-bowl.jpg",
    tone: "brown",
  },
  {
    id: "logo",
    title: "Logo",
    result: "Značka, která funguje na vizitce i na ceduli.",
    from: "od 12 000 Kč",
    days: "od 7 dnů",
    tone: "brown",
  },
  {
    id: "identity",
    title: "Firemní styl",
    result: "Paleta, typografie a nosiče, aby všechno k sobě sedělo.",
    from: "od 18 000 Kč",
    days: "od 14 dnů",
    tone: "rose",
    bundle: "nova-znacka",
  },
  {
    id: "icons",
    title: "Ikony",
    result: "Sada ikon ve stylu značky pro web i sociální sítě.",
    from: "od 8 000 Kč",
    days: "od 5 dnů",
    tone: "blue",
    bundle: "znacka-v-pohybu",
  },
  {
    id: "web",
    title: "Web vizitka a landing page",
    result: "Stránka, která přivede poptávky — analytiku nastavíme zdarma.",
    from: "od 45 000 Kč",
    days: "od 21 dnů",
    tone: "sage",
  },
  {
    id: "eshop",
    title: "Nový vzhled e-shopu",
    result: "Shoptet nebo Upgates v barvách vaší značky.",
    from: "od 25 000 Kč",
    days: "od 14 dnů",
    tone: "olive",
  },
  {
    id: "social",
    title: "Sociální sítě",
    result: "Avatar, cover a šablony postů, které zvládnete sami.",
    from: "od 6 000 Kč",
    days: "od 5 dnů",
    image: "/media/akinu-box.jpg",
    tone: "rose",
    bundle: "nova-znacka",
  },
  {
    id: "print",
    title: "Tiskoviny",
    result: "Vizitky, hlavička a polep — včetně tiskových dat.",
    from: "od 5 000 Kč",
    days: "od 5 dnů",
    tone: "blue",
    bundle: "novy-kabat",
  },
];

export const serviceAnchor = (id: ServiceId) => `service-${id}`;
