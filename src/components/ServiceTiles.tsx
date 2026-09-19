import { IconsIcon, LogoIcon, VideoIcon, WebsiteIcon } from "./Icons";
import { services } from "@/data/site";
import styles from "./ServiceTiles.module.css";

const icon = {
  video: VideoIcon,
  icons: IconsIcon,
  logo: LogoIcon,
  website: WebsiteIcon,
} as const;

export default function ServiceTiles() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="services"
      aria-label="Služby"
    >
      <ul className={styles.grid}>
        {services.map((s, i) => {
          const Icon = icon[s.id];
          return (
            <li
              key={s.id}
              className={`${styles.tile} ${styles[s.tone]} ${
                s.shape === "oval" ? styles.oval : ""
              }`}
            >
              <a href="#work" className={styles.link}>
                <span className={`eyebrow ${styles.index}`}>0{i + 1}</span>
                <Icon size={150} className={styles.icon} />
                <span className={`eyebrow ${styles.label}`}>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
