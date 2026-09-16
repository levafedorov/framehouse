"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ArrowRight, ChevronLeft, ChevronRight } from "./Icons";
import { projects } from "@/data/projects";
import styles from "./RecentWork.module.css";

export default function RecentWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 4);
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step =
        first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setIndex(Math.round(el.scrollLeft / step));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      className={`container ${styles.section}`}
      aria-labelledby="recent-title"
    >
      <div className={styles.head}>
        <h2 id="recent-title" className="section-title">
          Poslední práce
        </h2>
        <div className={styles.headRight}>
          <a href="#work" className={styles.viewAll}>
            Všechny práce
            <ArrowRight />
          </a>
          {canScroll && (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(-1)}
                aria-label="Předchozí"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(1)}
                aria-label="Další"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {projects.map((p) => (
          <div key={p.slug} className={styles.slide}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {canScroll && (
        <div className={styles.dots} aria-hidden>
          {projects.map((p, i) => (
            <span
              key={p.slug}
              className={`${styles.dot} ${i === index ? styles.dotOn : ""}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
