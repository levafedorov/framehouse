export const site = {
  name: "Framehouse",
  tagline: "Krátká videa. Skutečné výsledky.",
  description: "Tvoříme videoreklamy, ikony, loga a weby pro malé firmy.",
  // TODO: replace with the real studio address
  contactEmail: "hello@framehouse.cz",
};

export const nav = [
  { label: "Práce", href: "#work" },
  { label: "Ceník", href: "#pricing" },
  { label: "O nás", href: "#about" },
  { label: "Kontakt", href: "#contact" },
];

export const services = [
  { id: "video", label: "Videoreklamy" },
  { id: "icons", label: "Ikony" },
  { id: "logo", label: "Loga" },
  { id: "website", label: "Weby" },
] as const;

export const pricing = [
  {
    title: "Videoreklama",
    from: "35 000 Kč",
    note: "Koncept, produkce, střih.",
  },
  {
    title: "Logo a ikony",
    from: "12 000 Kč",
    note: "Čisté, škálovatelné, Vaše.",
  },
  { title: "Web", from: "45 000 Kč", note: "Moderní, mobilní, rychlý." },
];
