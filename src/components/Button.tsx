import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "dark" | "light";
type Size = "md" | "sm";

type Common = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
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

export default function Button(props: ButtonProps) {
  const { variant = "dark", size = "md", block, className, ...rest } = props;
  const classes = cls(variant, size, block, className);

  if ("href" in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorProps)} className={classes} />;
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    />
  );
}
