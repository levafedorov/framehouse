import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/data/projects";
import styles from "./Work.module.css";

export default function Work() {
  return (
    <section
      className={`shell ${styles.section}`}
      id="work"
      aria-labelledby="work-title"
    >
      <h2 id="work-title" className={styles.head}>
        <span className={`display ${styles.title}`}>Naše práce</span>
        <em className={`serif ${styles.sub}`}>od loga po obaly</em>
      </h2>

      <ul className={styles.grid}>
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
