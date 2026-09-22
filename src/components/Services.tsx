import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";
import styles from "./Services.module.css";

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
        {services.map((s) => (
          <li key={s.id} className={styles.cell}>
            <ServiceCard service={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}
