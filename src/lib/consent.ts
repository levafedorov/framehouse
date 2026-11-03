export type Consent = { analytics: boolean; at: number };

const storageKey = "heartflect-consent";
const changeEvent = "heartflect:consent";
const settingsEvent = "heartflect:cookie-settings";
const maxAge = 365 * 24 * 60 * 60 * 1000;

export function readConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (typeof value?.analytics !== "boolean" || typeof value.at !== "number") {
      return null;
    }
    if (Date.now() - value.at > maxAge) return null;
    return value;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  const consent: Consent = { analytics, at: Date.now() };
  try {
    localStorage.setItem(storageKey, JSON.stringify(consent));
  } catch {}
  window.dispatchEvent(new CustomEvent(changeEvent, { detail: consent }));
}

export function onConsentChange(listener: (consent: Consent) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<Consent>).detail);
  window.addEventListener(changeEvent, handler);
  return () => window.removeEventListener(changeEvent, handler);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(settingsEvent));
}

export function onCookieSettingsOpen(listener: () => void) {
  window.addEventListener(settingsEvent, listener);
  return () => window.removeEventListener(settingsEvent, listener);
}
