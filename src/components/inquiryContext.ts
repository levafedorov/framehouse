"use client";

import { createContext, useContext } from "react";
import type { InquiryOptions, InquiryRequest } from "@/data/inquiry";

type Inquiry = {
  options: InquiryOptions;
  open: (request: InquiryRequest) => void;
};

export const InquiryContext = createContext<Inquiry | null>(null);

export function useInquiry() {
  const value = useContext(InquiryContext);
  if (!value) throw new Error("useInquiry outside InquiryProvider");
  return value;
}
