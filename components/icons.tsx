// Inline SVG icon set. No emojis anywhere — these are the real icons used across the UI.
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/**
 * Lightbulb-brain mark — the brand motif.
 * Half filament, half brain, with radiating spark lines. Reused for logo, favicon,
 * section dividers and the loading/404 states.
 */
export function BulbBrain({ size = 28, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="bb-grad" x1="8" y1="6" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E88E5" />
          <stop offset="0.5" stopColor="#38B6FF" />
          <stop offset="1" stopColor="#7DD3FF" />
        </linearGradient>
      </defs>
      {/* radiating sparks */}
      <g stroke="url(#bb-grad)" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
        <path d="M24 3v3.5" />
        <path d="M8.5 9.5l2.4 2.4" />
        <path d="M39.5 9.5l-2.4 2.4" />
        <path d="M4 24h3.2" />
        <path d="M40.8 24H44" />
      </g>
      {/* bulb glass */}
      <path
        d="M16 30.5c-2.6-2-4.3-5.2-4.3-8.8C11.7 14.9 17.2 9.5 24 9.5s12.3 5.4 12.3 12.2c0 3.6-1.7 6.8-4.3 8.8-1.2.9-1.9 2.3-1.9 3.8v.7H17.9v-.7c0-1.5-.7-2.9-1.9-3.8Z"
        stroke="url(#bb-grad)"
        strokeWidth="1.8"
        fill="rgba(56,182,255,0.06)"
      />
      {/* left half: filament */}
      <path d="M24 14.5v8M24 22.5l-3-2.5M24 22.5l3-2.5" stroke="#7DD3FF" strokeWidth="1.5" strokeLinecap="round" />
      {/* right half: brain folds */}
      <path
        d="M27 15.6c2 .4 3.4 2 3.4 3.9 0 1-.4 1.9-1 2.6.7.6 1.1 1.5 1.1 2.5 0 1.8-1.4 3.3-3.2 3.7"
        stroke="#38B6FF"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* base */}
      <path d="M19 39.5h10M20.5 42.5h7" stroke="url(#bb-grad)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Code(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="m9 8-5 4 5 4M15 8l5 4-5 4M13 5l-2 14" />
    </svg>
  );
}
export function Search(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
export function Answer(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l.8-5.5A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11.5h7M8.5 14.5h4" />
    </svg>
  );
}
export function Spark(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5 13.6 11 16 12l-2.4 1L12 15.5 10.4 13 8 12l2.4-1L12 8.5Z" />
    </svg>
  );
}
export function Chip(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" />
    </svg>
  );
}
export function Flow(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M5 8.2v3.3a2 2 0 0 0 2 2h3M19 8.2v3.3a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}
export function Share(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="m8.1 10.9 7.8-3.8M8.1 13.1l7.8 3.8" />
    </svg>
  );
}
export function ArrowRight(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function ArrowUpRight(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
export function Check(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}
export function ChevronDown(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
export function Menu(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function Close(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
export function Sun(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" />
    </svg>
  );
}
export function Moon(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
export function Mail(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
export function Phone(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}
export function Pin(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
export function Clock(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}
export function Bolt(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
export function Gauge(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 18a8 8 0 1 1 14 0" />
      <path d="M12 14l4-4" />
      <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Shield(p: IconProps) {
  const { size, ...rest } = p;
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// LinkedIn / X / GitHub brand glyphs (filled, simple)
export function LinkedIn({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z" />
    </svg>
  );
}
export function XLogo({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
export function GitHub({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  code: Code,
  search: Search,
  answer: Answer,
  spark: Spark,
  chip: Chip,
  flow: Flow,
  share: Share,
};
