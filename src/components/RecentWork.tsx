"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "./Icons";
import { projects } from "@/data/projects";
import styles from "./RecentWork.module.css";

export default function RecentWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => setCanScroll(el.scrollWidth > el.clientWidth + 4);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 10 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      className={`shell ${styles.section}`}
      id="work"
      aria-labelledby="work-title"
    >
      <div className={styles.head}>
        <h2 id="work-title" className={`eyebrow ${styles.title}`}>
          Poslední práce
        </h2>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(-1)}
            aria-label="Předchozí"
            disabled={!canScroll}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollBy(1)}
            aria-label="Další"
            disabled={!canScroll}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {projects.map((p) => (
          <div key={p.slug} className={styles.slide}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
