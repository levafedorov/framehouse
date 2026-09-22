export const site = {
  name: "Framehouse",
  tagline: "Brand design pro vaši firmu.",
  description:
    "Loga, firemní styl, ikony, tiskoviny a weby pro malé firmy. Ceny od, jasný postup, hotovo v týdnech.",
  announcement: "Ozveme se Vám do jednoho pracovního dne",
  // TODO: replace with the real studio address
  contactEmail: "hello@framehouse.cz",
  city: "Praha",
  // TODO: fill in real profiles or remove the ones you don't use
  // TODO: real profiles; the footer does not render the column while these are "#"
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

export const footerColumns = [
  {
    title: "Služby",
    links: [
      { label: "Loga a firemní styl", href: "/sluzby/logo" },
      { label: "Ikony", href: "/sluzby/icons" },
      { label: "Weby a e-shopy", href: "/sluzby/web" },
      { label: "Sociální sítě a tisk", href: "/sluzby/social" },
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
      { label: "Naše práce", href: "/#work" },
      { label: "Jak pracujeme", href: "/jak-pracujeme" },
      { label: "E-mail", href: "mailto:hello@framehouse.cz" },
    ],
  },
];
