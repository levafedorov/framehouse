import Image from "next/image";
import Button from "./Button";
import { pricing, site } from "@/data/site";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="pricing"
      aria-label="Ceník"
    >
      <ul className={styles.grid}>
        {pricing.map((p) => (
          <li
            key={p.id}
            className={`${styles.tile} ${p.image ? styles.photo : styles.sage}`}
          >
            {p.image && (
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                className={styles.img}
              />
            )}
            <div className={styles.center}>
              <h2 className={`serif ${styles.title}`}>{p.title}</h2>
              <p className={`eyebrow ${styles.from}`}>{p.from}</p>
              <p className={styles.note}>{p.note}</p>
            </div>
            <div className={styles.actions}>
              <Button href="#work" variant="outline" size="sm">
                Ukázky
              </Button>
              <Button
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(p.title)}`}
                variant="outline"
                size="sm"
              >
                Napište nám
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
