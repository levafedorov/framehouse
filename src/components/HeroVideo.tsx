"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import styles from "./HeroVideo.module.css";

/**
 * The hero's LCP element. The poster is a next/image with priority (crop of
 * the visible frame, served as AVIF/WebP); the video sits on top and takes
 * over once it plays.
 *
 * The video is not autoplayed by markup: on phones it would compete with
 * the poster, fonts and JS for the connection. It starts from an effect —
 * right away on desktop, after the load event on phones.
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

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      v.preload = "auto";
      void v.play().catch(() => {});
    };
    const desktop = window.matchMedia("(min-width: 901px)").matches;
    if (desktop || document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

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
        muted
        loop
        playsInline
        preload="none"
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
