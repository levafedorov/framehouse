import { site } from "@/data/site";
import styles from "./About.module.css";

/**
 * One paragraph each — how we work, what we don't do (this alone filters out
 * the wrong requests) and who we are. The designer is named here, once.
 */
const cards = [
  {
    title: "Jak pracujeme",
    text: "Fixní cena, nebo platba za iteraci — vyberete si. Postup je vždy stejný: brief, drafty, doladění, předání. Výsledek dostanete s exkluzivní, časově neomezenou licencí; práci si necháváme v portfoliu, white-label je +50 %. Podpora po předání je za zvláštní cenu.",
  },
  {
    title: "Co neděláme",
    text: "Nenatáčíme ani nestříháme cizí materiál, nevedeme sociální sítě, neděláme reklamu ani SEO. Žádný backend, platby ani integrace. Názvy nevymýšlíme, jen ověříme. Tisk zajistíte sami — my dodáme tisková data.",
  },
  {
    // TODO: confirm the designer's name and credit line (issue #19)
    title: `Kdo je ${site.name}`,
    text: "Malý tým pro malé firmy: logo, ikony, tiskoviny i web od jedněch rukou, takže všechno k sobě sedí. Loga a firemní styl navrhuje Dinara — její práce se umisťují na 1.–3. místě v soutěžích TopDesigner.cz. Mluvíte přímo s lidmi, kteří práci dělají.",
  },
];

export default function About() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="about"
      aria-label="Jak pracujeme"
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
