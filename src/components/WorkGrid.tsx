"use client";

import Image from "next/image";
import { useState } from "react";
import {
  categoryFilterLabel,
  categoryLabel,
  projects,
  type Category,
} from "@/data/projects";
import styles from "./WorkGrid.module.css";

type Filter = "all" | Category;

const filters: Filter[] = ["all", "video", "logo", "icons", "website"];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      className={`container ${styles.section}`}
      id="work"
      aria-labelledby="work-title"
    >
      <div className={styles.head}>
        <h2 id="work-title" className="section-title">
          Naše práce
        </h2>
        <div
          className={styles.filters}
          role="tablist"
          aria-label="Filtrovat práce"
        >
          {filters.map((f) => {
            const on = f === filter;
            const label =
              f === "all" ? `Vše (${projects.length})` : categoryFilterLabel[f];
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={on}
                className={`${styles.chip} ${on ? styles.chipOn : ""}`}
                onClick={() => setFilter(f)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className={styles.grid}>
          {visible.map((p) => (
            <article key={p.slug} className={styles.tile}>
              <Image
                src={p.logo}
                alt={`Logo ${p.client}`}
                width={p.logoShape === "wide" ? 220 : 96}
                height={p.logoShape === "wide" ? 85 : 96}
                className={`${styles.logo} ${
                  p.logoShape === "wide" ? styles.logoWide : styles.logoSquare
                }`}
              />
              <span className={styles.tag}>{categoryLabel[p.category]}</span>
              <span className="visually-hidden">{p.client}</span>
            </article>
          ))}
        </div>
      ) : (
        <p className={`muted ${styles.empty}`}>
          Zatím tu nic není —{" "}
          {categoryFilterLabel[filter as Category].toLowerCase()} brzy přibudou.
        </p>
      )}
    </section>
  );
}
