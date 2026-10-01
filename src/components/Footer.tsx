import Link from "next/link";
import ContactForm from "./ContactForm";
import { footerColumns, site } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.top}>
        <div className={styles.contact}>
          <p className={`eyebrow ${styles.label}`}>Napište nám</p>
          <h2 className={styles.title}>
            Buďme
            <br />v kontaktu.
          </h2>
          <p className={styles.hint}>
            Nechte nám e-mail, ozveme se Vám do jednoho pracovního dne. Nebo
            pište rovnou na{" "}
            <a href={`mailto:${site.contactEmail}`} className={styles.mail}>
              {site.contactEmail}
            </a>
            .
          </p>
          <ContactForm />
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className={styles.col}>
            <p className={`eyebrow ${styles.label}`}>{col.title}</p>
            <ul className={styles.links}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* "Sledujte nás" comes back once site.social has real profiles */}
      </div>

      <div className={styles.bottom}>
        <p className={`serif ${styles.wordmark}`}>{site.name}</p>
        <span className={styles.dash} aria-hidden />
        <p className={`serif ${styles.motto}`}>{site.motto}</p>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {site.name}, {site.city}. Všechna práva
          vyhrazena.
        </p>
      </div>
    </footer>
  );
}
