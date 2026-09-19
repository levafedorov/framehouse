"use client";

import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import styles from "./HeroVideo.module.css";

export default function HeroVideo({
  project,
  poster,
}: {
  project: Project;
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
      <video
        ref={ref}
        className={styles.video}
        src={project.video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Videoreklama ${project.client}`}
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
