"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  onConsentChange,
  onCookieSettingsOpen,
  readConsent,
  saveConsent,
} from "@/lib/consent";
import styles from "./CookieConsent.module.css";

type View = "auto" | "hidden" | "bar" | "settings";

const decided = () => readConsent() !== null;

export default function CookieConsent() {
  const hasConsent = useSyncExternalStore(onConsentChange, decided, () => true);
  const [chosen, setView] = useState<View>("auto");
  const [analytics, setAnalytics] = useState(false);
  const view = chosen === "auto" ? (hasConsent ? "hidden" : "bar") : chosen;

  useEffect(
    () =>
      onCookieSettingsOpen(() => {
        setAnalytics(readConsent()?.analytics ?? false);
        setView("settings");
      }),
    [],
  );

  if (view === "hidden") return null;

  const decide = (value: boolean) => {
    saveConsent(value);
    setView("hidden");
  };

  return (
    <section
      className={styles.panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
    >
      <p id="cookie-title" className={styles.title}>
        {view === "settings" ? "Nastavení cookies" : "Cookies na tomto webu"}
      </p>

      {view === "bar" ? (
        <p className={styles.text}>
          Používáme nezbytné cookies, aby web fungoval. S Vaším souhlasem také
          analytické, díky kterým víme, co na webu funguje a co zlepšit.{" "}
          <Link href="/ochrana-osobnich-udaju" className={styles.link}>
            Více informací
          </Link>
        </p>
      ) : (
        <ul className={styles.list}>
          <li className={styles.row}>
            <div>
              <p className={styles.name}>Nezbytné</p>
              <p className={styles.text}>
                Zapamatují si Vaši volbu cookies a údaje z formuláře. Bez nich
                web nefunguje, proto jsou vždy zapnuté.
              </p>
            </div>
            <input
              type="checkbox"
              className={styles.toggle}
              checked
              disabled
              aria-label="Nezbytné cookies"
            />
          </li>
          <li className={styles.row}>
            <div>
              <p className={styles.name}>Analytické</p>
              <p className={styles.text}>
                Měří návštěvnost a pohyb po webu (PostHog, servery v EU), abychom
                web mohli zlepšovat.{" "}
                <Link href="/ochrana-osobnich-udaju" className={styles.link}>
                  Více informací
                </Link>
              </p>
            </div>
            <input
              type="checkbox"
              className={styles.toggle}
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Analytické cookies"
            />
          </li>
        </ul>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={() => decide(false)}
        >
          Odmítnout
        </button>
        {view === "bar" ? (
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              setAnalytics(readConsent()?.analytics ?? false);
              setView("settings");
            }}
          >
            Nastavení
          </button>
        ) : (
          <button
            type="button"
            className={styles.button}
            onClick={() => decide(analytics)}
          >
            Uložit výběr
          </button>
        )}
        <button
          type="button"
          className={styles.button}
          onClick={() => decide(true)}
        >
          Přijmout vše
        </button>
      </div>
    </section>
  );
}
