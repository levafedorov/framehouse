"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      tabIndex={0}
    >
      <div className={styles.media}>
        {project.video && project.poster ? (
          <>
            <Image
              src={project.poster}
              alt=""
              fill
              sizes="(max-width: 600px) 270px, (max-width: 900px) 240px, 25vw"
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
              width={120}
              height={120}
              className={styles.tileLogo}
            />
          </div>
        )}
      </div>
      <h3 className={styles.name}>{project.client}</h3>
      <p className={`muted ${styles.kind}`}>{project.kind}</p>
    </article>
  );
}
