export const site = {
  name: "Framehouse",
  tagline: "Brand design pro vaši firmu.",
  description:
    "Loga, firemní styl, ikony, tiskoviny a weby pro malé firmy. Ceny od, jasný postup, hotovo v týdnech.",
  announcement: "Ozveme se Vám do jednoho pracovního dne",
  // TODO: replace with the real studio address
  contactEmail: "hello@framehouse.cz",
  web3formsKey: "f69428f5-ebc1-4bbe-ba9b-c3099ad699e8",
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
  { label: "Kontakt", href: "/#contact" },
];
