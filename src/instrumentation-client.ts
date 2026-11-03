import posthog from "posthog-js";
import { onConsentChange, readConsent } from "@/lib/consent";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const internalFlag = "heartflect-internal";

function markInternal() {
  try {
    const param = new URLSearchParams(window.location.search).get("internal");
    if (param === "1") localStorage.setItem(internalFlag, "1");
    if (param === "0") localStorage.removeItem(internalFlag);
    if (localStorage.getItem(internalFlag) === "1") {
      posthog.setInternalOrTestUser();
    }
  } catch {}
}

function applyConsent(analytics: boolean) {
  if (analytics) {
    if (!posthog.has_opted_in_capturing()) posthog.opt_in_capturing();
    markInternal();
  } else if (!posthog.has_opted_out_capturing()) {
    posthog.opt_out_capturing();
  }
}

if (key) {
  try {
    posthog.init(key, {
      api_host: "/ingest",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://eu.posthog.com",
      defaults: "2026-08-30",
      person_profiles: "always",
      cookieless_mode: "on_reject",
      opt_out_capturing_by_default: true,
      capture_dead_clicks: true,
      capture_heatmaps: true,
      capture_exceptions: true,
      capture_performance: { web_vitals: true, network_timing: true },
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask]",
      },
      internal_or_test_user_hostname:
        /^(localhost|127\.0\.0\.1)$|\.vercel\.app$/,
      loaded: () => {
        const consent = readConsent();
        if (consent) applyConsent(consent.analytics);
      },
    });
    onConsentChange((consent) => applyConsent(consent.analytics));
  } catch {}
}
