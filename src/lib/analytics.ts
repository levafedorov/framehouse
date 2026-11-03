import posthog from "posthog-js";

export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export function track(event: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;
  try {
    posthog.capture(event, properties);
  } catch {}
}

export function identify(email: string, properties: Record<string, string>) {
  if (!analyticsEnabled || !email) return;
  try {
    if (!posthog.has_opted_in_capturing()) return;
    posthog.identify(email.trim().toLowerCase(), properties);
  } catch {}
}
