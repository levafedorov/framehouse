export type InquiryKind = "obecna" | "sluzba" | "balicek";

export const inquiryKindLabel: Record<InquiryKind, string> = {
  obecna: "general",
  sluzba: "service",
  balicek: "bundle",
};

export type InquiryRequest = { kind: InquiryKind; item?: string };

export type InquiryOptions = {
  services: string[];
  bundles: string[];
};

export const unsureOption = "Nevím, poraďte";

export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "gclid",
] as const;

export const attributionStorageKey = "framehouse-attribution";
