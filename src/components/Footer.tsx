import InlineInquiry from "./InlineInquiry";
import { site } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.top}>
        <div>
          <p className={`eyebrow ${styles.label}`}>Napište nám</p>
          <h2 className={styles.title}>
            Buďme
            <br />v kontaktu.
          </h2>
          <p className={styles.hint}>
            Napište, co potřebujete, ozveme se Vám do jednoho pracovního dne.
            Nebo pište rovnou na{" "}
            <a href={`mailto:${site.contactEmail}`} className={styles.mail}>
              {site.contactEmail}
            </a>
            .
          </p>
        </div>
        <InlineInquiry />
      </div>

      <div className={styles.bottom}>
        <p className={`serif ${styles.wordmark}`}>{site.name}</p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {site.name}, {site.city}. Všechna práva
          vyhrazena.
        </p>
      </div>
    </footer>
  );
}
