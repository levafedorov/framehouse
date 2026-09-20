"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "./Icons";
import type { Project } from "@/data/projects";
import styles from "./Work.module.css";

type Props = {
  label: string;
  blurb: string;
  items: Project[];
};

/**
 * One category row. The strip scrolls sideways; while there is more to
 * see, the edge fades into the page and the arrows in the aside are live.
 */
export default function WorkRow({ label, blurb, items }: Props) {
  const stripRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 6 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <li
      className={`${styles.row} ${canPrev ? styles.morePrev : ""} ${
        canNext ? styles.moreNext : ""
      }`}
    >
      <div className={styles.aside}>
        <h3 className={`eyebrow ${styles.category}`}>{label}</h3>
        <div className={styles.asideBottom}>
          <p className={`muted ${styles.blurb}`}>{blurb}</p>
          {(canPrev || canNext) && (
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(-1)}
                aria-label={`${label}: předchozí`}
                disabled={!canPrev}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => scrollBy(1)}
                aria-label={`${label}: další`}
                disabled={!canNext}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.stripWrap}>
        <ul className={styles.strip} ref={stripRef}>
          {items.map((p) => (
            <li key={p.slug} className={styles.cell}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
