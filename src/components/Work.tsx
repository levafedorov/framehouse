import WorkRow from "./WorkRow";
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
          Vybrané práce <em>týmu</em> — od loga po obaly.
        </h2>
      </div>

      <ul className={styles.rows}>
        {workRows.map((row) => (
          <WorkRow
            key={row.id}
            label={row.label}
            blurb={row.blurb}
            items={row.items}
          />
        ))}
      </ul>
    </section>
  );
}
