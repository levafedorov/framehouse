import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";
import styles from "./CircleLink.module.css";

type Props = {
  href: string;
  children?: ReactNode;
  ariaLabel?: string;
  tone?: "caps" | "plain";
  className?: string;
};

export default function CircleLink({
  href,
  children,
  ariaLabel,
  tone = "caps",
  className,
}: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={[styles.link, styles[tone], className ?? ""].join(" ")}
    >
      <span className={styles.circle} aria-hidden>
        <ArrowRight size={14} />
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </Link>
  );
}
