import { Reveal } from "./Reveal";

export type Step = { step: string; detail: string };

const DEFAULT_STEPS: Step[] = [
  { step: "Discover", detail: "We map your goals, audience and the actions that matter, then scope the work." },
  { step: "Design & build", detail: "We craft the experience and build it as fast, semantic, accessible code." },
  { step: "Optimise", detail: "We tune performance, SEO, AEO and GEO so you rank and get cited." },
  { step: "Automate & grow", detail: "We add AI automation and track results as they compound." },
];

// Animated horizontal timeline (stacks on mobile).
export function ProcessTimeline({ steps = DEFAULT_STEPS }: { steps?: Step[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
      {/* connecting line on desktop */}
      <span
        aria-hidden
        className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-brand/50 via-brand/20 to-transparent md:block"
      />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.step} delay={i * 0.08} className="relative">
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-surface font-display text-base font-semibold text-brand-bright shadow-glow">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-display text-lg font-medium text-ink">{s.step}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.detail}</p>
        </Reveal>
      ))}
    </ol>
  );
}
