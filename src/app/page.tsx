import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import RecentWork from "@/components/RecentWork";
import WorkGrid from "@/components/WorkGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RecentWork />
        <WorkGrid />
        <Pricing />
        <About />
      </main>
      <Footer />
    </>
  );
}
