"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import InquiryForm from "./InquiryForm";
import { Close } from "./Icons";
import { InquiryContext } from "./inquiryContext";
import {
  attributionKeys,
  attributionStorageKey,
  type InquiryOptions,
  type InquiryRequest,
} from "@/data/inquiry";
import styles from "./InquiryModal.module.css";

export default function InquiryProvider({
  options,
  children,
}: {
  options: InquiryOptions;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [request, setRequest] = useState<InquiryRequest | null>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const found = attributionKeys.filter((k) => params.get(k));
      if (found.length === 0) return;
      const stored = Object.fromEntries(found.map((k) => [k, params.get(k)]));
      sessionStorage.setItem(attributionStorageKey, JSON.stringify(stored));
    } catch {}
  }, []);

  const open = useCallback((next: InquiryRequest) => {
    setRequest(next);
    setRound((n) => n + 1);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !request || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
  }, [request, round]);

  const onClose = () => {
    document.documentElement.style.overflow = "";
    setRequest(null);
  };

  const title =
    request?.kind === "balicek"
      ? `Balíček ${request.item}`
      : request?.kind === "sluzba"
        ? request.item
        : null;

  return (
    <InquiryContext.Provider value={{ options, open }}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="inquiry-title"
        onClose={onClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {request && (
          <div className={styles.panel}>
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Zavřít"
            >
              <Close size={20} />
            </button>
            <p className={`eyebrow ${styles.eyebrow}`}>Nezávazná poptávka</p>
            <h2 id="inquiry-title" className={styles.title}>
              {title ?? "Napište nám"}
            </h2>
            <InquiryForm key={round} request={request} onDone={close} />
          </div>
        )}
      </dialog>
    </InquiryContext.Provider>
  );
}
