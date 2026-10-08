import Link from "next/link";
import InquiryTrigger from "./InquiryTrigger";
import {
  bundleTerms,
  bundles,
  priceFromLabel,
  weeksLabel,
} from "@/data/pricing";
import styles from "./Bundles.module.css";

const glue = (text: string) => text.replace(/ ([a-zA-Z]) /g, " $1 ");

export default function Bundles() {
  return (
    <section
      className={styles.section}
      id="bundles"
      aria-labelledby="bundles-title"
    >
      <h2 id="bundles-title" className={`eyebrow rule-label ${styles.label}`}>
        Balíčky
      </h2>

      <ol className={styles.grid}>
        {bundles.map((b, i) => (
          <li key={b.id} className={styles.col}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.name}>{glue(b.name)}</h3>
            <p className={styles.audience}>{b.forWho}</p>

            <ul className={styles.includes}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.foot}>
              <p className={styles.from}>
                {priceFromLabel(b.priceFrom)}
                <span aria-hidden> · </span>
                {weeksLabel(b.deliveryWeeks)}
              </p>
              {b.recommended && (
                <Link href={b.recommended.href} className={styles.recommended}>
                  Doporučujeme k tomu: {b.recommended.label}
                </Link>
              )}
              <InquiryTrigger
                look="circle"
                request={{ kind: "balicek", item: b.name }}
                className={styles.cta}
              >
                Nezávazná poptávka
              </InquiryTrigger>
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.terms}>
        {bundleTerms.saving} {bundleTerms.vat}
      </p>
    </section>
  );
}
