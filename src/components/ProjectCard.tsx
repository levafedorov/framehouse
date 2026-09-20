"use client";

import Image from "next/image";
import { useRef } from "react";
import { kindLabel, type Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

/**
 * A landscape card the work fills edge to edge. Only two things sit on
 * top of it: the kind tag (Klient / Realizace / Koncept) and, for new
 * pieces, "Nové". The name lives in the row label, not on the card.
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
    <article
      className={styles.card}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
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
    </article>
  );
}
