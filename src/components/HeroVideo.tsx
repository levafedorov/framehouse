"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import styles from "./HeroVideo.module.css";

/**
 * The hero's LCP element. The poster is a next/image with priority (crop of
 * the visible frame, served as AVIF/WebP); the video sits on top and takes
 * over once it plays.
 */
export default function HeroVideo({
  project,
  poster,
}: {
  project: Project;
  /** 3:4 crop of the first frame, public/media */
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (sound) {
      v.muted = true;
      setSound(false);
    } else {
      v.muted = false;
      v.currentTime = 0;
      void v.play().catch(() => {});
      setSound(true);
    }
  };

  return (
    <div className={styles.wrap}>
      <Image
        src={poster}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 55vw"
        className={styles.poster}
      />
      <video
        ref={ref}
        className={styles.video}
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Videoreklama ${project.name}`}
      />
      <button
        type="button"
        className={`eyebrow ${styles.sound}`}
        onClick={toggleSound}
        aria-pressed={sound}
      >
        <span className={styles.dot} />
        {sound ? "Ztlumit" : "Pustit se zvukem"}
      </button>
    </div>
  );
}
