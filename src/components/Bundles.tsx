import Image from "next/image";
import Button from "./Button";
import { ArrowRight } from "./Icons";
import { bundles } from "@/data/bundles";
import { serviceAnchor } from "@/data/services";
import { site } from "@/data/site";
import styles from "./Bundles.module.css";

/**
 * Three tall tiles, one per bundle. A full-bleed illustration (generated
 * with GPT Image 2 via Higgsfield, public/media/bundles) fills the tile;
 * the copy sits at the bottom on a dark scrim so it never fights the art.
 */
export default function Bundles() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="bundles"
      aria-labelledby="bundles-title"
    >
      <div className={styles.head}>
        <h2 id="bundles-title" className={`eyebrow ${styles.heading}`}>
          Balíčky
        </h2>
        <p className={`muted ${styles.hint}`}>
          Kombinace služeb podle toho, kde vaše firma právě je.
        </p>
      </div>

      <ul className={styles.grid}>
        {bundles.map((b) => (
          <li key={b.id} className={styles.tile}>
            <Image
              src={b.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              className={styles.img}
            />

            <div className={styles.copy}>
              <h3 className={`serif ${styles.title}`}>{b.title}</h3>
              <p className={styles.audience}>{b.audience}</p>
              <ul className={styles.includes}>
                {b.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={`eyebrow ${styles.from}`}>
                {b.from} · {b.term}
              </p>
              {b.recommended && (
                <a
                  href={`#${serviceAnchor(b.recommended.service)}`}
                  className={styles.recommended}
                >
                  Doporučujeme k tomu: {b.recommended.label}
                  <ArrowRight size={12} />
                </a>
              )}
              <Button
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Balíček ${b.title}`)}`}
                variant="light"
                size="sm"
                className={styles.cta}
              >
                Nezávazná poptávka
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
