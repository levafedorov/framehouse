import Image from "next/image";
import Link from "next/link";
import { kindLabel, projectPath, type Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

/**
 * A landscape card the work fills edge to edge. Only two things sit on
 * top of it: the kind tag (Klient / Realizace / Koncept) and, for new
 * pieces, "Nové". The name lives in the row label, not on the card.
 * The whole card is one link to the work's page, /prace/[slug].
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectPath(project.slug)}
      className={styles.card}
      aria-label={`${project.name} — ${project.service}`}
    >
      <Image
        src={project.poster}
        alt=""
        fill
        sizes="(max-width: 600px) 72vw, (max-width: 900px) 46vw, 22vw"
        quality={70}
        className={styles.poster}
      />

      <span className={`eyebrow ${styles.tag}`}>{kindLabel[project.kind]}</span>
      {project.isNew && (
        <span className={`eyebrow ${styles.tag} ${styles.new}`}>Nové</span>
      )}
    </Link>
  );
}
