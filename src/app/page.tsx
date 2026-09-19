import About from "@/components/About";
import Bundles from "@/components/Bundles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceTiles from "@/components/ServiceTiles";
import Work from "@/components/Work";

/**
 * Page order follows the plan in issue #21:
 * hero → proof (work) → services with prices → bundles → how we work → contact.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceTiles />
        <Work />
        <Services />
        <Bundles />
        <About />
      </main>
      <Footer />
    </>
  );
}
