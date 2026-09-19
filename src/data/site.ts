export const site = {
  name: "Framehouse",
  tagline: "Krátká videa. Skutečné výsledky.",
  description: "Tvoříme videoreklamy, ikony, loga a weby pro malé firmy.",
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
  { label: "Práce", href: "#work" },
  { label: "Služby", href: "#services" },
  { label: "Ceník", href: "#pricing" },
  { label: "O nás", href: "#about" },
];

export const services = [
  { id: "video", label: "Videoreklamy", tone: "blue", shape: "square" },
  { id: "logo", label: "Loga", tone: "brown", shape: "oval" },
  { id: "icons", label: "Ikony", tone: "rose", shape: "square" },
  { id: "website", label: "Weby", tone: "sage", shape: "square" },
] as const;

export const pricing = [
  {
    id: "video",
    title: "Videoreklama",
    from: "od 35 000 Kč",
    note: "Koncept, produkce, střih.",
    image: "/media/bohemia-bowl.jpg",
    tone: "dark",
  },
  {
    id: "logo",
    title: "Logo a ikony",
    from: "od 12 000 Kč",
    note: "Čisté, škálovatelné, Vaše.",
    image: "/media/akinu-box.jpg",
    tone: "dark",
  },
  {
    id: "website",
    title: "Web",
    from: "od 45 000 Kč",
    note: "Moderní, mobilní, rychlý.",
    image: null,
    tone: "sage",
  },
] as const;

export const footerColumns = [
  {
    title: "Služby",
    links: [
      { label: "Videoreklamy", href: "#services" },
      { label: "Loga", href: "#services" },
      { label: "Ikony", href: "#services" },
      { label: "Weby", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Naše práce", href: "#work" },
      { label: "Ceník", href: "#pricing" },
      { label: "O nás", href: "#about" },
    ],
  },
  {
    title: "Kontakt",
    links: [{ label: "E-mail", href: "mailto:hello@framehouse.cz" }],
  },
];
