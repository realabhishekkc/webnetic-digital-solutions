"use client";

import { mailtoQuote } from "@/lib/site";
import { HeroCanvas } from "./HeroCanvas";
import { Typewriter } from "./Typewriter";
import { ArrowRight, Bolt } from "./icons";

const TERMINAL_LINES = [
  "building responsive layouts...",
  "training automations...",
  "optimising for search...",
  "wiring AI integrations...",
  "shipping Core Web Vitals...",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
      <HeroCanvas />

      <div className="container-page relative w-full">
        <div className="max-w-3xl">
          <span className="eyebrow animate-fade-up">
            <Bolt size={13} /> Web + AI agency · Sydney
          </span>

          <h1 className="mt-6 text-display-lg font-semibold text-ink [animation-delay:60ms] animate-fade-up">
            We build <span className="text-gradient">intelligent websites</span> that rank, convert,
            and run themselves.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted [animation-delay:140ms] animate-fade-up">
            Web development, SEO, AEO, GEO and AI automation for Sydney businesses. Engineered for
            speed, search, and the AI answer engines your customers now ask.
          </p>

          {/* live terminal */}
          <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-xl border border-hairline bg-surface/60 px-4 py-2.5 backdrop-blur-md [animation-delay:200ms] animate-fade-up">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="truncate">
              <span className="mr-2 font-mono text-sm text-ink-muted">webnetic ~</span>
              <Typewriter lines={TERMINAL_LINES} />
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3 [animation-delay:260ms] animate-fade-up">
            <a href={mailtoQuote("Start a project")} className="btn-primary">
              Start a project <ArrowRight size={16} />
            </a>
            <a href="#work" className="btn-ghost">
              View our work
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted sm:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-9 w-px animate-pulse-glow bg-gradient-to-b from-brand to-transparent" />
      </div>
    </section>
  );
}
