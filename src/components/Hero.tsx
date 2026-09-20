import Image from "next/image";
import Button from "./Button";
import HeroVideo from "./HeroVideo";
import { ArrowRight } from "./Icons";
import { heroProject } from "@/data/projects";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

const strip = ["Video", "Logo", "Ikony", "Web"];

export default function Hero() {
  return (
    <section className={`shell ${styles.section}`} id="top">
      <div className={styles.card}>
        <div className={styles.left}>
          {/* hidden on phones (see .left in the CSS), so it must not be
              preloaded — lazy images inside display:none are never fetched */}
          <Image
            src="/media/bohemia-run.jpg"
            alt="Pes běží ranní alejí — záběr z videoreklamy pro Bohemia Pet Food"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.img}
          />
          <p className={`serif ${styles.note}`}>
            <em>Vzniklo bez kamery.</em>
            <ArrowRight size={16} />
          </p>
        </div>

        <div className={styles.strip} aria-hidden>
          <div className={styles.stripTrack}>
            {Array.from({ length: 3 }).flatMap((_, r) =>
              strip.map((w) => (
                <span key={`${r}-${w}`} className={styles.stripWord}>
                  {w}
                </span>
              )),
            )}
          </div>
        </div>

        <div className={styles.right}>
          <HeroVideo project={heroProject} poster="/media/bohemia-hero.jpg" />
          <div className={styles.copy}>
            <p className={`eyebrow ${styles.eyebrow}`}>
              Nová videoreklama · {heroProject.name}
            </p>
            <h1 className={`serif ${styles.title}`}>{site.tagline}</h1>
            <div className={styles.actions}>
              <Button href="#work" variant="light" size="sm">
                Naše práce
              </Button>
              <Button href="#services" variant="light" size="sm">
                Služby a ceny
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
