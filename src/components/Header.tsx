"use client";

import Link from "next/link";
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
      <div className={styles.bar}>
        <Link href="/" className={`serif ${styles.logo}`}>
          {site.name}
        </Link>

        <nav className={styles.nav} aria-label="Hlavní">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <Button
            href={`mailto:${site.contactEmail}`}
            variant="light"
            size="sm"
            className={styles.cta}
          >
            Napište nám
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Mobilní">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`serif ${styles.mobileLink}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowRight />
            </Link>
          ))}
          <Button
            href={`mailto:${site.contactEmail}`}
            variant="light"
            block
            className={styles.mobileCta}
          >
            Napište nám
          </Button>
        </nav>
      </div>
    </header>
  );
}
