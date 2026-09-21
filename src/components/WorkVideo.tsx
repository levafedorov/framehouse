"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import styles from "./WorkVideo.module.css";

/**
 * The loop on a work page, /prace/[slug]: the poster paints first, the
 * video takes over once it plays. Playback starts from an effect (React
 * does not serialise `muted`, so a markup autoplay would be blocked) and
 * not at all for people who asked for reduced motion.
 */
export default function WorkVideo({ project }: { project: Project }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.preload = "auto";
    void v.play().catch(() => {});
  }, []);

  return (
    <div className={styles.wrap}>
      {project.poster && (
        <Image
          src={project.poster}
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.poster}
        />
      )}
      <video
        ref={ref}
        className={styles.video}
        src={project.video}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${project.service} ${project.name}`}
      />
    </div>
  );
}
