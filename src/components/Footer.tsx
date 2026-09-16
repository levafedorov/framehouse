import { nav, site } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo}>
          {site.name}
        </a>
        <nav className={styles.nav} aria-label="Patička">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
