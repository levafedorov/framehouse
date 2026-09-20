import Bundles from "@/components/Bundles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";

/**
 * hero → proof (work) → services with prices → bundles → contact,
 * as planned in issue #21. "How we work" lives on its own page: /jak-pracujeme.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Bundles />
      </main>
      <Footer />
    </>
  );
}
