import Image from "next/image";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

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
      </div>
    </section>
  );
}
