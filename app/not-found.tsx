import Link from "next/link";
import { BulbBrain, ArrowRight, Search } from "@/components/icons";
import { SERVICES } from "@/lib/services";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
      <span className="relative inline-flex">
        <BulbBrain size={96} className="animate-pulse-glow" />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(56,182,255,0.45), transparent 70%)" }}
        />
      </span>
      <p className="mt-8 font-mono text-sm uppercase tracking-[0.3em] text-brand-bright">Error 404</p>
      <h1 className="mt-4 text-display-md font-semibold text-ink">This idea hasn&apos;t lit up yet</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home <ArrowRight size={16} />
        </Link>
        <Link href="/services" className="btn-ghost">
          <Search size={16} /> Browse services
        </Link>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {SERVICES.slice(0, 4).map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="rounded-full border border-hairline px-4 py-1.5 text-sm text-ink-muted transition-colors hover:border-brand/50 hover:text-ink"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
