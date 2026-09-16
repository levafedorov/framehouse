import Button from "./Button";
import { ArrowRight, ClockIcon, ShieldIcon, TeamIcon } from "./Icons";
import { site } from "@/data/site";
import styles from "./About.module.css";

const points = [
  {
    Icon: TeamIcon,
    title: "Malý tým",
    text: "Přímá komunikace, nic se nepředává dál.",
  },
  {
    Icon: ClockIcon,
    title: "Rychlé dodání",
    text: "Většina projektů za 2–4 týdny.",
  },
  {
    Icon: ShieldIcon,
    title: "Pro malé firmy",
    text: "Reálné zkušenosti, reálné výsledky.",
  },
];

export default function About() {
  return (
    <section
      className={`container ${styles.section}`}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="about-title" className={styles.title}>
            Jsme {site.name}
          </h2>
          <p className={`muted ${styles.text}`}>
            Malý zkušený tým, který pomáhá malým firmám vypadat větší. Jasná
            komunikace, přátelský přístup a dodržené termíny.
          </p>
        </div>

        <ul className={styles.points}>
          {points.map(({ Icon, title, text }) => (
            <li key={title} className={styles.point}>
              <Icon />
              <div className={styles.pointBody}>
                <h3 className={styles.pointTitle}>{title}</h3>
                <p className={`muted ${styles.pointText}`}>{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.contact} id="contact">
          <h3 className={styles.contactTitle}>Pojďme to probrat</h3>
          <p className={`muted ${styles.contactText}`}>
            Napište nám o svém projektu a ozveme se Vám do jednoho pracovního
            dne.
          </p>
          <Button
            href={`mailto:${site.contactEmail}`}
            className={styles.contactBtn}
          >
            Napište nám
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
