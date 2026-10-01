import Image from "next/image";
import Link from "next/link";
import { projectPath, type Project } from "@/data/projects";
import { ArrowRight } from "./Icons";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectPath(project.slug)}
      className={`${styles.card} ${
        project.category === "logo" ? styles.logo : ""
      }`}
    >
      <span className={styles.media}>
        <Image
          src={project.poster}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          quality={75}
          className={styles.poster}
        />
      </span>
      <span className={styles.caption}>
        <span className={styles.text}>{project.caption}</span>
        <ArrowRight size={13} className={styles.arrow} />
      </span>
    </Link>
  );
}
