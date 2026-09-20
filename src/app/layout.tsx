import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";

/* the two files every page needs first; the rest arrive on demand via unicode-range */
const preloadFonts = [
  "/fonts/dm-sans-latin-wght-normal.woff2",
  "/fonts/instrument-serif-latin-400-normal.woff2",
];

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs">
      <head>
        {preloadFonts.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
