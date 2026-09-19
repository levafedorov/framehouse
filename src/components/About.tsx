import { site } from "@/data/site";
import styles from "./About.module.css";

const cards = [
  {
    title: `Jsme ${site.name}`,
    text: "Malý zkušený tým, který pomáhá malým firmám vypadat větší. Video, logo, ikony i web od jedněch rukou — takže všechno k sobě sedí.",
  },
  {
    title: "Rychlé dodání",
    text: "Většina projektů je hotová za 2–4 týdny. Komunikujete přímo s lidmi, kteří práci dělají — nic se nepředává dál a nic se neztrácí po cestě.",
  },
  {
    title: "Pro malé firmy",
    text: "Jasný ceník, žádná překvapení. Reálné zkušenosti z e-shopů, služeb a rodinných firem — a reálné výsledky, na které se dá odkázat.",
  },
];

export default function About() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="about"
      aria-label="O nás"
    >
      <ul className={styles.grid}>
        {cards.map((c) => (
          <li key={c.title} className={styles.card}>
            <h2 className={`eyebrow ${styles.title}`}>{c.title}</h2>
            <p className={styles.text}>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
