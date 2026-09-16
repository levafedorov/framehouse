import Button from "./Button";
import { ArrowRight } from "./Icons";
import { pricing, site } from "@/data/site";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section
      className={`container ${styles.section}`}
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className={styles.intro}>
        <h2 id="pricing-title" className="section-title">
          Jednoduchý, transparentní ceník
        </h2>
        <p className="muted">Vše, co potřebujete. Bez překvapení.</p>
      </div>

      <div className={styles.cards}>
        {pricing.map((p) => (
          <article key={p.title} className={styles.card}>
            <h3 className={styles.name}>{p.title}</h3>
            <span className={`muted ${styles.from}`}>Od</span>
            <p className={styles.price}>{p.from}</p>
            <p className={`muted ${styles.note}`}>{p.note}</p>
          </article>
        ))}
      </div>

      <Button
        href={`mailto:${site.contactEmail}?subject=Cen%C3%ADk`}
        variant="light"
        className={styles.cta}
      >
        Celý ceník
        <ArrowRight />
      </Button>
    </section>
  );
}
