"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { ArrowRight, Close, Menu } from "./Icons";
import { nav, site } from "@/data/site";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <a href="#top" className={styles.logo}>
            {site.name}
          </a>
          <nav className={styles.nav} aria-label="Hlavní">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          <Button
            href={`mailto:${site.contactEmail}`}
            size="sm"
            className={styles.cta}
          >
            Napište nám
            <ArrowRight className={styles.ctaArrow} />
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        hidden={!open}
      >
        <nav className={`container ${styles.mobileNav}`} aria-label="Mobilní">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowRight />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
