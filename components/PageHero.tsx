import Image from "next/image";
import type { ReactNode } from "react";

// Title hero with an abstract on-brand background image + dark overlay (legible on both themes).
export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  icon,
  children,
  align = "left",
}: {
  image: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="container-page mt-6">
      <div className="relative overflow-hidden rounded-3xl border border-hairline">
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
        {/* dark overlays for text legibility (kept theme-independent) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,9,16,0.92) 0%, rgba(5,9,16,0.78) 48%, rgba(5,9,16,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(5,9,16,0.85) 0%, rgba(5,9,16,0) 60%)" }}
        />

        <div
          className={`relative animate-fade-up px-6 py-14 sm:px-12 sm:py-16 lg:py-20 ${
            align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
          }`}
        >
          {icon && (
            <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-brand-bright">
              {icon}
            </span>
          )}
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-brand-bright">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-6 text-display-lg font-semibold text-white">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200/90">{intro}</p>}
          {children && <div className={align === "center" ? "mt-8 flex flex-wrap justify-center gap-3" : "mt-8 flex flex-wrap gap-3"}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
