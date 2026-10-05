import CircleLink from "./CircleLink";
import { groupPriceLabel, priceGroups } from "@/data/pricing";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-title"
    >
      <p className={`eyebrow rule-label ${styles.label}`}>Služby a ceny</p>

      <div className={styles.head}>
        <h2 id="services-title" className={`display ${styles.title}`}>
          Co děláme
        </h2>
      </div>

      <ol className={styles.grid}>
        {priceGroups.map((g, i) => (
          <li key={g.id} className={styles.col}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.name}>{g.title}</h3>
            <p className={styles.price}>{groupPriceLabel(g)}</p>
            <CircleLink
              href={g.href}
              ariaLabel={`${g.title}: zjistit více`}
              className={styles.more}
            >
              Zjistit více
            </CircleLink>
          </li>
        ))}
      </ol>
    </section>
  );
}
