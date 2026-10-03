import Image from "next/image";
import { ArrowRight } from "./Icons";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

const jumps = [
  { href: "#work", label: "Naše práce" },
  { href: "#services", label: "Co děláme" },
];

export default function Hero() {
  return (
    <section className={styles.section} id="top">
      <h1 className="visually-hidden">
        {site.name} — {site.tagline}
      </h1>
      <div className={styles.card}>
        <Image
          src="/media/hero/profesionalni-pohled-2.jpg"
          alt="profesionální pohled"
          width={1900}
          height={759}
          priority
          fetchPriority="high"
          sizes="(max-width: 600px) 100vw, 1400px"
          className={styles.img}
        />
        <nav className={styles.jumps} aria-label="Na stránce">
          {jumps.map((j) => (
            <a key={j.href} href={j.href} className={styles.jump}>
              {j.label}
              <ArrowRight size={17} className={styles.jumpArrow} />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
