import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Jak pracujeme — ${site.name}`,
  description:
    "Fixní cena nebo platba za iteraci, exkluzivní licence, jasný postup. A co neděláme, abyste věděli předem.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <Header />
      <main>
        <section className={`shell ${styles.intro}`} id="top">
          <div className={styles.card}>
            <p className={`eyebrow ${styles.eyebrow}`}>Jak pracujeme</p>
            <h1 className={`serif ${styles.title}`}>
              Jasná cena, jasný postup, žádná překvapení.
            </h1>
          </div>
        </section>
        <About />
      </main>
      <Footer />
    </>
  );
}
