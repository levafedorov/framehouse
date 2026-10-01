import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ServiceGrid from "@/components/ServiceGrid";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Služby a ceny — ${site.name}`,
  description:
    "Ceník: logo, firemní styl, ikony, maskot, animované logo, sociální sítě a tiskoviny. Ceny od, konečné, bez DPH navíc.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceGrid />
      </main>
      <Footer />
    </>
  );
}
