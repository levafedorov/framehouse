import ContactForm from "./ContactForm";
import { InstagramIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "./Icons";
import { footerColumns, site } from "@/data/site";
import styles from "./Footer.module.css";

const socialIcon = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
} as const;

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.contact}>
            <p className={`eyebrow ${styles.label}`}>Napište nám</p>
            <ContactForm />
            <p className={styles.hint}>
              Nebo rovnou na{" "}
              <a href={`mailto:${site.contactEmail}`} className={styles.mail}>
                {site.contactEmail}
              </a>
              . {site.announcement}.
            </p>
          </div>

          <div className={styles.columns}>
            {footerColumns.map((col) => (
              <div key={col.title} className={styles.col}>
                <p className={`eyebrow ${styles.label}`}>{col.title}</p>
                <ul className={styles.links}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={styles.link}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.social}>
          <p className={`eyebrow ${styles.label}`}>Sledujte nás</p>
          <ul className={styles.socialList}>
            {site.social.map((s) => {
              const Icon = socialIcon[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    className={styles.socialLink}
                    aria-label={s.label}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={`serif ${styles.wordmark}`}>{site.name}</p>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {site.name}, {site.city}. Všechna práva
            vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
