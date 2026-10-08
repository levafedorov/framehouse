import { useState, type SubmitEvent } from "react";
import { ArrowRight, ChevronRight } from "./Icons";
import { useInquiry } from "./inquiryContext";
import {
  attributionKeys,
  attributionStorageKey,
  inquiryKindLabel,
  unsureOption,
  type InquiryRequest,
} from "@/data/inquiry";
import { site } from "@/data/site";
import styles from "./InquiryForm.module.css";

type Status = "idle" | "sending" | "sent" | "error";

function attribution(): Record<string, string> {
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(attributionStorageKey) ?? "{}");
  } catch {}
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    attributionKeys.map((k) => [k, params.get(k) ?? stored[k] ?? ""]),
  );
}

export default function InquiryForm({
  request = { kind: "obecna" },
  idPrefix = "inquiry",
  onDone,
}: {
  request?: InquiryRequest;
  idPrefix?: string;
  onDone?: () => void;
}) {
  const { options } = useInquiry();
  const [status, setStatus] = useState<Status>("idle");
  const general = request.kind === "obecna";
  const id = (name: string) => `${idPrefix}-${name}`;

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const need = general
      ? String(data.get("Service or bundle") ?? "")
      : request.kind === "balicek"
        ? `Bundle: ${request.item}`
        : (request.item ?? "");
    if (!general) data.set("Service or bundle", need);

    data.append("access_key", site.web3formsKey);
    data.append("subject", `New inquiry: ${need}`);
    data.append("from_name", `${site.name} website`);
    data.append("Form type", inquiryKindLabel[request.kind]);
    data.append(
      "Page",
      window.location.origin + window.location.pathname + window.location.search,
    );
    for (const [key, value] of Object.entries(attribution())) {
      data.append(key, value);
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" && onDone) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Děkujeme, poptávka je u nás.</p>
        <p className={styles.doneText}>
          Ozveme se Vám do jednoho pracovního dne.
        </p>
        <button type="button" className={styles.submit} onClick={onDone}>
          Zavřít
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {general && (
        <div className={`${styles.field} ${styles.wide}`}>
          <label htmlFor={id("need")} className={styles.label}>
            Co potřebujete
          </label>
          <span className={styles.selectWrap}>
            <select
              id={id("need")}
              name="Service or bundle"
              required
              defaultValue=""
              className={`${styles.input} ${styles.select}`}
            >
              <option value="" disabled>
                Vyberte službu nebo balíček
              </option>
              <optgroup label="Služby">
                {options.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Balíčky">
                {options.bundles.map((b) => (
                  <option key={b} value={`Bundle: ${b}`}>
                    {b}
                  </option>
                ))}
              </optgroup>
              <option value="Not sure, needs advice">{unsureOption}</option>
            </select>
            <ChevronRight size={14} className={styles.chevron} />
          </span>
        </div>
      )}

      <div className={`${styles.field} ${styles.wide}`}>
        <label htmlFor={id("name")} className={styles.label}>
          Jméno
        </label>
        <input
          id={id("name")}
          type="text"
          name="name"
          required
          autoComplete="name"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={id("email")} className={styles.label}>
          E-mail
        </label>
        <input
          id={id("email")}
          type="email"
          name="email"
          required
          autoComplete="email"
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={id("phone")} className={styles.label}>
          Telefon <span className={styles.optional}>nepovinné</span>
        </label>
        <input
          id={id("phone")}
          type="tel"
          name="Phone"
          autoComplete="tel"
          className={styles.input}
        />
      </div>
      <div className={`${styles.field} ${styles.wide}`}>
        <label htmlFor={id("about")} className={styles.label}>
          Pár slov o projektu <span className={styles.optional}>nepovinné</span>
        </label>
        <textarea
          id={id("about")}
          name="About the project"
          rows={4}
          className={`${styles.input} ${styles.textarea}`}
        />
      </div>
      <input
        type="checkbox"
        name="botcheck"
        className="visually-hidden"
        tabIndex={-1}
        aria-hidden
      />

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Odesílám…" : "Odeslat poptávku"}
          <span className={styles.arrow} aria-hidden>
            <ArrowRight size={14} />
          </span>
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === "sent" &&
            "Děkujeme, ozveme se Vám do jednoho pracovního dne."}
          {status === "error" && (
            <>
              Poptávku se nepodařilo odeslat. Napište nám prosím na{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
