import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, rest: Props) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...rest,
});

export function ArrowRight({ size = 14, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={2}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft({ size = 14, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={2}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight({ size = 14, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={2}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function Plus({ size = 14, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={2}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Play({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} fill="currentColor" stroke="none">
      <path d="M8 5l12 7-12 7z" />
    </svg>
  );
}

export function Pause({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} fill="currentColor" stroke="none">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

export function Menu({ size = 22, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={1.8}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close({ size = 22, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={1.8}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

/* Service icons */

export function VideoIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <path d="M6 4l14 8-14 8z" />
    </svg>
  );
}

export function IconsIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </svg>
  );
}

export function LogoIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export function WebsiteIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="5" width="18" height="12" rx="1" />
      <path d="M8 20h8" />
    </svg>
  );
}

/* About icons */

export function TeamIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15a5 5 0 0 1 5.5 5" />
    </svg>
  );
}

export function ClockIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ShieldIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
