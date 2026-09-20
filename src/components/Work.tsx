import ProjectCard from "./ProjectCard";
import { workRows } from "@/data/projects";
import styles from "./Work.module.css";

/**
 * One row per category: the label and a one-liner on the left, the work
 * itself on the right as landscape cards the piece fills edge to edge.
 * Rows are divided by hairlines, like a case-study index.
 */
export default function Work() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="work"
      aria-labelledby="work-title"
    >
      <div className={styles.head}>
        <h2 id="work-title" className={`serif ${styles.title}`}>
          Vybrané práce <em>týmu</em> — od loga po video.
        </h2>
      </div>

      <ul className={styles.rows}>
        {workRows.map((row) => (
          <li key={row.id} className={styles.row}>
            <div className={styles.aside}>
              <h3 className={`eyebrow ${styles.category}`}>{row.label}</h3>
              <p className={`muted ${styles.blurb}`}>{row.blurb}</p>
            </div>
            <ul className={styles.strip}>
              {row.items.map((p) => (
                <li key={p.slug} className={styles.cell}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
