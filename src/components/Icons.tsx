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
      {/* triangle centred on the viewBox, not flush left */}
      <path d="M5 4l14 8-14 8z" />
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

/* Facts strip on a work page */

export function ClapperIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="9" width="18" height="11" rx="1.5" />
      <path d="M3 9l2-4h16l-2 4" />
      <path d="M9 5l-2 4" />
      <path d="M14 5l-2 4" />
      <path d="M19 5l-2 4" />
    </svg>
  );
}

export function PhoneIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 17.5h2" />
    </svg>
  );
}

export function CalendarIcon({ size = 24, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M4 10h16" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </svg>
  );
}

/* Social */

export function InstagramIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7" />
      <circle cx="8" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
      <path d="M12 10v7" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 18, ...rest }: Props) {
  return (
    <svg {...base(size, rest)}>
      <path d="M13 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M13 4c.5 2.6 2.2 4 4.5 4.2" />
    </svg>
  );
}

export function ArrowUpRight({ size = 14, ...rest }: Props) {
  return (
    <svg {...base(size, rest)} strokeWidth={2}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
