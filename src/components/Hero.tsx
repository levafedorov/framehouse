import Button from "./Button";
import HeroVideo from "./HeroVideo";
import {
  ArrowRight,
  IconsIcon,
  LogoIcon,
  VideoIcon,
  WebsiteIcon,
} from "./Icons";
import { services, site } from "@/data/site";
import { heroProject } from "@/data/projects";
import styles from "./Hero.module.css";

const serviceIcon = {
  video: VideoIcon,
  icons: IconsIcon,
  logo: LogoIcon,
  website: WebsiteIcon,
} as const;

export default function Hero() {
  return (
    <section className={`container ${styles.hero}`} id="top">
      <div className={styles.copy}>
        <div className={styles.copyTop}>
          <h1 className={styles.title}>
            Krátká videa.
            <br />
            Skutečné výsledky.
          </h1>
          <p className={`muted ${styles.lead}`}>{site.description}</p>
          <div className={styles.actions}>
            <Button href="#work">
              Naše práce
              <ArrowRight />
            </Button>
            <Button href="#pricing" variant="light">
              Zobrazit ceník
            </Button>
          </div>
        </div>

        <ul className={styles.services}>
          {services.map((s) => {
            const Icon = serviceIcon[s.id];
            return (
              <li key={s.id} className={styles.service}>
                <Icon />
                {s.label}
              </li>
            );
          })}
        </ul>
      </div>

      <HeroVideo project={heroProject} />
    </section>
  );
}
