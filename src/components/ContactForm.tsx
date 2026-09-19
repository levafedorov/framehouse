"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import styles from "./ContactForm.module.css";

/**
 * No backend yet: the form opens the visitor's mail client with a
 * pre-filled message. Swap `onSubmit` for a real endpoint later.
 */
export default function ContactForm() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Poptávka");
    const body = encodeURIComponent(
      `Dobrý den,\n\nmám zájem o spolupráci. Ozvěte se mi prosím na ${email}.\n\n`,
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="contact-email" className="visually-hidden">
        Váš e-mail
      </label>
      <input
        id="contact-email"
        type="email"
        required
        placeholder="Váš e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
        autoComplete="email"
      />
      <button type="submit" className={`eyebrow ${styles.submit}`}>
        Odeslat
      </button>
    </form>
  );
}
