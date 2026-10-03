"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight } from "./Icons";
import styles from "./Work.module.css";

export default function WorkScroller({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [hidden, setHidden] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [overflows, setOverflows] = useState(true);

  const update = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const bottom = el.scrollTop + el.clientHeight;
    const items = Array.from(el.children) as HTMLElement[];
    setHidden(items.filter((li) => li.offsetTop >= bottom - 1).length);
    setAtEnd(el.scrollHeight - bottom < 2);
    setOverflows(el.scrollHeight - el.clientHeight > 2);
  }, []);

  useEffect(() => {
    const el = listRef.current;
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

  const step = () => {
    const el = listRef.current;
    if (!el) return;
    if (atEnd) {
      el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).rowGap) || 0;
    const row = first ? first.offsetHeight + gap : el.clientHeight / 2;
    el.scrollBy({ top: row, behavior: "smooth" });
  };

  return (
    <>
      <div className={`${styles.viewport} ${atEnd ? "" : styles.more}`}>
        <ul className={styles.grid} ref={listRef}>
          {children}
        </ul>
      </div>

      {overflows && (
        <button
          type="button"
          className={styles.next}
          onClick={step}
          aria-label={atEnd ? "Zpět na začátek prací" : "Ukázat další práce"}
        >
          <span
            className={`${styles.nextCircle} ${atEnd ? styles.up : ""}`}
            aria-hidden
          >
            <ArrowRight size={14} />
          </span>
          <span className={styles.nextLabel}>
            {atEnd
              ? "Zpět na začátek"
              : hidden > 0
                ? `Další práce (${hidden})`
                : "Další práce"}
          </span>
        </button>
      )}
    </>
  );
}
