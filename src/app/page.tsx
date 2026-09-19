import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import RecentWork from "@/components/RecentWork";
import ServiceTiles from "@/components/ServiceTiles";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceTiles />
        <RecentWork />
        <Pricing />
        <About />
      </main>
      <Footer />
    </>
  );
}
