export const site = {
  name: "Framehouse",
  tagline: "Video, logo a web pro malé firmy.",
  description:
    "Videoreklamy, loga, firemní styl, ikony a weby pro malé firmy. Ceny od, jasný postup, hotovo v týdnech.",
  announcement: "Ozveme se Vám do jednoho pracovního dne",
  // TODO: replace with the real studio address
  contactEmail: "hello@framehouse.cz",
  city: "Praha",
  // TODO: fill in real profiles or remove the ones you don't use
  social: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "youtube", label: "YouTube", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
  ] as { id: SocialId; label: string; href: string }[],
};

export type SocialId = "instagram" | "linkedin" | "youtube" | "tiktok";

export const nav = [
  { label: "Práce", href: "/#work" },
  { label: "Služby", href: "/#services" },
  { label: "Balíčky", href: "/#bundles" },
  { label: "Jak pracujeme", href: "/jak-pracujeme" },
  { label: "Kontakt", href: "/#contact" },
];

/** The four coloured tiles under the hero — shortcuts into the services grid */
export const serviceTiles = [
  { id: "video", label: "Videoreklamy", tone: "blue", shape: "square" },
  { id: "logo", label: "Loga", tone: "brown", shape: "oval" },
  { id: "icons", label: "Ikony", tone: "rose", shape: "square" },
  { id: "web", label: "Weby", tone: "sage", shape: "square" },
] as const;

export const footerColumns = [
  {
    title: "Služby",
    links: [
      { label: "Videoreklamy", href: "/#service-video" },
      { label: "Loga a firemní styl", href: "/#service-logo" },
      { label: "Ikony", href: "/#service-icons" },
      { label: "Weby a e-shopy", href: "/#service-web" },
      { label: "Sociální sítě a tisk", href: "/#service-social" },
    ],
  },
  {
    title: "Balíčky",
    links: [
      { label: "Nová značka", href: "/#bundles" },
      { label: "Nový kabát", href: "/#bundles" },
      { label: "Značka v pohybu", href: "/#bundles" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Vybrané práce", href: "/#work" },
      { label: "Jak pracujeme", href: "/jak-pracujeme" },
      { label: "E-mail", href: "mailto:hello@framehouse.cz" },
    ],
  },
];
