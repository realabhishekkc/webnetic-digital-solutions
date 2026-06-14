import Link from "next/link";
import { BulbBrain } from "./icons";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Webnetic Digital Solutions — home"
      className="group inline-flex items-center gap-2.5"
    >
      <span className="relative inline-flex">
        <BulbBrain
          size={compact ? 30 : 34}
          className="transition-transform duration-300 ease-out-expo group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: "radial-gradient(circle, rgba(56,182,255,0.6), transparent 70%)" }}
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.05rem] font-bold tracking-tight text-ink">
            WEBNETIC
          </span>
          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.28em] text-ink-muted">
            Digital Solutions
          </span>
        </span>
      )}
    </Link>
  );
}
