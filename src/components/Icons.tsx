import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3h1.5Z" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function StarHalf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <defs>
        <linearGradient id="halfStar">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"
        fill="url(#halfStar)"
        stroke="currentColor"
      />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 8.5H17V5.2h-2.6c-2.3 0-3.6 1.5-3.6 3.9v1.9H8.4v3.4h2.4V21h3.5v-6.6h2.5l.4-3.4h-2.9V9.4c0-.6.2-.9.7-.9Z" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.4-3.4-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

export function Train(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="3.5" width="13" height="12" rx="3" />
      <path d="M5.5 10h13M8.5 20l-2 1.5M15.5 20l2 1.5M9 13.5h.01M15 13.5h.01" />
    </svg>
  );
}

export function Parking(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M9.5 17V7.5h3.2a2.9 2.9 0 0 1 0 5.8H9.5" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M9.6 5.5c-3.2 1.6-5.1 4.4-5.1 8.1 0 3.3 1.8 5.4 4.2 5.4 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.7 0-1 .1.4-1.7 1.8-3.2 3.6-4.1l-2.2-2.7Zm9.2 0c-3.2 1.6-5.1 4.4-5.1 8.1 0 3.3 1.8 5.4 4.2 5.4 2 0 3.6-1.5 3.6-3.5 0-1.9-1.3-3.3-3.1-3.3-.4 0-.7 0-1 .1.4-1.7 1.8-3.2 3.6-4.1l-2.2-2.7Z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function ScrollDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}
