"use client";

import type { ReactNode } from "react";
import Button from "./Button";
import CircleLink from "./CircleLink";
import { useInquiry } from "./inquiryContext";
import type { InquiryRequest } from "@/data/inquiry";

type Props = {
  request: InquiryRequest;
  children: ReactNode;
  className?: string;
} & (
  | {
      look?: "button";
      button?: {
        variant?: "dark" | "light" | "outline";
        size?: "md" | "sm";
        arrow?: boolean;
      };
    }
  | { look: "circle"; button?: never }
);

export default function InquiryTrigger({
  request,
  children,
  className,
  ...rest
}: Props) {
  const { open } = useInquiry();
  const onClick = () => open(request);

  if (rest.look === "circle") {
    return (
      <CircleLink onClick={onClick} className={className}>
        {children}
      </CircleLink>
    );
  }
  return (
    <Button {...rest.button} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}
