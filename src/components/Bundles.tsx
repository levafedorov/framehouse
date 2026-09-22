import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { ArrowRight } from "./Icons";
import {
  bundleTerms,
  bundles,
  priceFromLabel,
  weeksLabel,
} from "@/data/pricing";
import styles from "./Bundles.module.css";

/**
 * Three tall tiles, one per bundle. A full-bleed illustration (generated
 * with GPT Image 2 via Higgsfield, public/media/bundles) fills the tile;
 * the copy sits at the bottom on a dark scrim so it never fights the art.
 * The add-on line points at the service, the button at the form.
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
              <h3 className={`serif ${styles.title}`}>{b.name}</h3>
              <p className={styles.audience}>{b.forWho}</p>
              <ul className={styles.includes}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={`eyebrow ${styles.from}`}>
                {priceFromLabel(b.priceFrom)} · {weeksLabel(b.deliveryWeeks)}
              </p>
              {b.recommended && (
                <Link href={b.recommended.href} className={styles.recommended}>
                  Doporučujeme k tomu: {b.recommended.label}
                  <ArrowRight size={12} />
                </Link>
              )}
              <Button href="/#contact" variant="light" className={styles.cta}>
                Nezávazná poptávka
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.terms}>
        <p className={styles.saving}>{bundleTerms.saving}</p>
        <p className={`muted ${styles.vat}`}>{bundleTerms.vat}</p>
      </div>
    </section>
  );
}
