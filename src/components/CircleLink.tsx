import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";
import styles from "./CircleLink.module.css";

type Props = {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
};

export default function CircleLink({
  href,
  onClick,
  children,
  ariaLabel,
  className,
}: Props) {
  const inner = (
    <>
      <span className={styles.circle} aria-hidden>
        <ArrowRight size={14} />
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </>
  );
  const classes = `${styles.link} ${className ?? ""}`;

  if (href === undefined) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </button>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {inner}
    </Link>
  );
}
