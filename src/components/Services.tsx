import ServiceCard from "./ServiceCard";
import { priceList, priceTerms } from "@/data/pricing";
import { serviceById } from "@/data/services";
import styles from "./Services.module.css";

/**
 * The ceník: one tile per service, in the order of the price list. The tile
 * carries only what decides a click — the pictogram, the name, the price
 * and the lead time; what the price includes waits on the service's page.
 */
export default function Services() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="services"
      aria-labelledby="services-title"
    >
      <div className={styles.head}>
        <h2 id="services-title" className={`eyebrow ${styles.title}`}>
          Služby a ceny
        </h2>
      </div>

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
