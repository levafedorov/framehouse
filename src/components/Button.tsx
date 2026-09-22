import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { ArrowRight } from "./Icons";
import styles from "./Button.module.css";

type Variant = "dark" | "light" | "outline";
type Size = "md" | "sm";

type Common = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  /** The round arrow at the end; off for plain actions */
  arrow?: boolean;
  className?: string;
};

type AnchorProps = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

function cls(
  variant: Variant,
  size: Size,
  block: boolean | undefined,
  className?: string,
) {
  return [
    styles.btn,
    styles[variant],
    size === "sm" ? styles.sm : "",
    block ? styles.block : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * The call to action: a pill with the label set in the serif of the
 * headlines and a round arrow at the end, so it reads as an invitation
 * rather than a control. Three fills: dark on paper, light on photos
 * and dark tiles, outline next to a light one.
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "dark",
    size = "md",
    block,
    arrow = true,
    className,
    children,
    ...rest
  } = props;
  const classes = cls(variant, size, block, className);
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden>
          <ArrowRight size={size === "sm" ? 13 : 15} />
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a {...(rest as AnchorProps)} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {inner}
    </button>
  );
}
