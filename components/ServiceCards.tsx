import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SERVICE_ICONS, ArrowRight } from "./icons";
import { Reveal } from "./Reveal";

// Elegant interactive service cards. Hover reveals detail + glow. No emojis — inline-SVG icons.
export function ServiceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => {
        const Icon = SERVICE_ICONS[s.icon];
        return (
          <Reveal as="div" key={s.slug} delay={i * 0.05}>
            <Link
              href={`/services/${s.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(56,182,255,0.35), transparent 70%)" }}
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand-bright">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-ink">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{s.tagline}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
                Explore
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
