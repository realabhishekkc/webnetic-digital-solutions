import { mailtoQuote } from "@/lib/site";
import { Reveal } from "./Reveal";
import { ArrowRight, BulbBrain } from "./icons";

export function CTABand({
  title = "Ready to grow? Let's talk.",
  subtitle = "Tell us what you're building. We'll reply within one business day with clear next steps, no pressure and no jargon.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-page my-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(56,182,255,0.18), transparent 60%)" }}
        />
        <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 opacity-10">
          <BulbBrain size={160} />
        </div>
        <h2 className="mx-auto max-w-2xl text-display-md font-semibold text-ink">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={mailtoQuote("Project enquiry")} className="btn-primary">
            Start a project <ArrowRight size={16} />
          </a>
          <a href="/contact" className="btn-ghost">
            Contact us
          </a>
        </div>
      </Reveal>
    </section>
  );
}
