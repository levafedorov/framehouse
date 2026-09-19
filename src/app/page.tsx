import Bundles from "@/components/Bundles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";

/**
 * hero → services with prices (the coloured tile band) → proof (work) →
 * bundles → contact. "How we work" lives on its own page: /jak-pracujeme.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Bundles />
      </main>
      <Footer />
    </>
  );
}
