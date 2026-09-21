import Image from "next/image";
import Button from "./Button";
import { ArrowRight } from "./Icons";
import { heroProject, projectPath } from "@/data/projects";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

const strip = ["Logo", "Ikony", "Web", "Tisk"];

/**
 * Two pieces of real work side by side: a concept on the left, the
 * newest client piece on the right with the headline over it.
 * (The video panel that used to sit on the right is parked until video
 * ads are back on the menu.)
 */
export default function Hero() {
  return (
    <section className={`shell ${styles.section}`} id="top">
      <div className={styles.card}>
        <div className={styles.left}>
          {/* hidden on phones (see .left in the CSS), so it must not be
              preloaded — lazy images inside display:none are never fetched */}
          <Image
            src="/media/work/koncept-kosmetika-3.jpg"
            alt="Návrh obalů přírodní kosmetiky — lahvička a krabička v oranžové"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.img}
          />
          <p className={`serif ${styles.note}`}>
            <em>Oceněno na TopDesigner.cz</em>
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
          <Image
            src={heroProject.cover}
            alt={`${heroProject.service} pro ${heroProject.name}`}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 55vw"
            className={styles.rightImg}
          />
          <div className={styles.copy}>
            <a
              href={projectPath(heroProject.slug)}
              className={`eyebrow ${styles.eyebrow}`}
            >
              Nová práce · {heroProject.name}
            </a>
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
