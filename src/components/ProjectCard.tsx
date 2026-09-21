"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { kindLabel, projectPath, type Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

/**
 * A landscape card the work fills edge to edge. Only two things sit on
 * top of it: the kind tag (Klient / Realizace / Koncept) and, for new
 * pieces, "Nové". The name lives in the row label, not on the card.
 * The whole card is one link to the work's page, /prace/[slug]; the
 * loop plays while it is hovered or focused.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  };

  const stop = () => videoRef.current?.pause();

  return (
    <Link
      href={projectPath(project.slug)}
      className={styles.card}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      aria-label={`${project.name} — ${project.service}`}
    >
      {project.video && project.poster ? (
        <>
          <Image
            src={project.poster}
            alt=""
            fill
            sizes="(max-width: 600px) 72vw, (max-width: 900px) 46vw, 22vw"
            quality={70}
            className={styles.poster}
          />
          <video
            ref={videoRef}
            className={styles.video}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        </>
      ) : (
        <div className={styles.tile}>
          <Image
            src={project.logo}
            alt=""
            width={140}
            height={140}
            className={styles.tileLogo}
          />
        </div>
      )}

      <span className={`eyebrow ${styles.tag}`}>{kindLabel[project.kind]}</span>
      {project.isNew && (
        <span className={`eyebrow ${styles.tag} ${styles.new}`}>Nové</span>
      )}
    </Link>
  );
}
