import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
