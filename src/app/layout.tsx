import type { Metadata } from "next";
import InquiryProvider from "@/components/InquiryProvider";
import { bundles } from "@/data/pricing";
import { services } from "@/data/services";
import { site } from "@/data/site";
import "./globals.css";

/* the two files every page needs first; the rest arrive on demand via unicode-range */
const preloadFonts = [
  "/fonts/manrope-latin-wght-normal.woff2",
  "/fonts/bodoni-moda-latin-opsz-normal.woff2",
];

const inquiryOptions = {
  services: services.map((s) => s.title),
  bundles: bundles.map((b) => b.name),
};

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
      <body>
        <InquiryProvider options={inquiryOptions}>{children}</InquiryProvider>
      </body>
    </html>
  );
}
