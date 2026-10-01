import ServiceCard from "./ServiceCard";
import { priceList, priceTerms } from "@/data/pricing";
import { serviceById } from "@/data/services";
import styles from "./ServiceGrid.module.css";

/**
 * The full ceník on /sluzby: one tile per service, in the order of the
 * price list. The tile carries only what decides a click — the pictogram,
 * the name, the price and the lead time; what the price includes waits on
 * the service's page.
 */
export default function ServiceGrid() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="cenik"
      aria-labelledby="cenik-title"
    >
      <h1 id="cenik-title" className={styles.head}>
        <span className={`eyebrow rule-label ${styles.label}`}>
          Služby a ceny
        </span>
        <span className={`display ${styles.title}`}>Ceník</span>
      </h1>

      <ul className={styles.grid}>
        {priceList.map((item) => {
          const service = serviceById(item.id);
          if (!service) return null;
          return (
            <li key={item.id} className={styles.cell}>
              <ServiceCard service={service} />
            </li>
          );
        })}
      </ul>

      <div className={styles.terms}>
        <p className={styles.included}>{priceTerms.included}</p>
        <p className={`muted ${styles.vat}`}>{priceTerms.vat}</p>
      </div>
    </section>
  );
}
