import type { ServiceId } from "./services";

export type BundleId = "nova-znacka" | "novy-kabat" | "znacka-v-pohybu";

export type Bundle = {
  id: BundleId;
  title: string;
  /** One sentence: who the bundle is for */
  audience: string;
  includes: string[];
  /** "od X Kč" — roughly 10–15 % below the sum of the parts */
  from: string;
  /** "X–Y týdnů" */
  term: string;
  /** Optional single add-on, links to the service card */
  recommended?: { label: string; service: ServiceId };
  /** Full-bleed illustration behind the tile text, public/media/bundles */
  image: string;
};

// TODO: prices and terms are placeholders — confirm before launch (issue #13).
// Only design items for now; web and video get added later as data, not template.
export const bundles: Bundle[] = [
  {
    id: "nova-znacka",
    title: "Nová značka",
    audience: "Pro firmu, která začíná nebo vizuál dosud neřešila.",
    includes: [
      "Logo",
      "Firemní styl: paleta, typografie, 3–4 nosiče, tisková data",
      "Sada pro sociální sítě: avatar, cover, 2–3 šablony",
    ],
    from: "od 32 000 Kč",
    term: "3–4 týdny",
    recommended: { label: "Maskot", service: "logo" },
    image: "/media/bundles/nova-znacka.jpg",
  },
  {
    id: "novy-kabat",
    title: "Nový kabát",
    audience: "Pro zaběhlou firmu, jejíž vizuál zestárl.",
    includes: [
      "Redesign loga",
      "Aktualizovaný firemní styl",
      "Nové tiskoviny: vizitky, hlavička, polep nebo cedule",
      "Sada pro sociální sítě",
    ],
    from: "od 36 000 Kč",
    term: "3–5 týdnů",
    recommended: { label: "Animované logo", service: "video" },
    image: "/media/bundles/novy-kabat.jpg",
  },
  {
    id: "znacka-v-pohybu",
    title: "Značka v pohybu",
    audience: "Pro firmu, která má logo i styl, ale chybí jí obsah.",
    includes: [
      "Maskot",
      "Sada ~8 ikon ve stylu značky",
      "Animované logo",
      "Šablony pro sítě s maskotem a ikonami",
    ],
    from: "od 28 000 Kč",
    term: "3–4 týdny",
    recommended: { label: "Tiskoviny s maskotem", service: "print" },
    image: "/media/bundles/znacka-v-pohybu.jpg",
  },
];

export const bundleTitle = (id: BundleId) =>
  bundles.find((b) => b.id === id)?.title ?? "";
