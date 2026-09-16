"use client";

import { useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "./Icons";
import type { Project } from "@/data/projects";
import styles from "./HeroVideo.module.css";

export default function HeroVideo({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div
      className={styles.frame}
      style={{ backgroundImage: `url(${project.poster})` }}
    >
      <div className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          src={project.video}
          poster={project.poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onClick={toggle}
        />
        <button
          type="button"
          className={`${styles.playBtn} ${playing ? styles.playBtnHidden : ""}`}
          onClick={toggle}
          aria-label={playing ? "Pozastavit video" : "Přehrát video"}
        >
          {playing ? <Pause size={22} /> : <Play size={24} />}
        </button>
      </div>

      <div className={styles.caption}>
        <p className={styles.headline}>
          {(project.headline ?? [project.client]).map((line, i) => (
            <span key={i} className={styles.line}>
              {line}
            </span>
          ))}
        </p>
        <a href="#work" className={styles.case}>
          Zobrazit projekt
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
