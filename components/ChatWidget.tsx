"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, mailtoQuote } from "@/lib/site";
import { BulbBrain, Mail, Close, ChevronDown, ArrowRight } from "./icons";

// Quick answers surfaced in the chat-style panel. Mirrors the most common enquiries (AEO-friendly).
const QUICK_FAQS = [
  {
    q: "What does Webnetic do?",
    a: "We are a Sydney digital agency blending web craft with AI: web development, SEO, AEO, GEO, AI integration, AI automation and social media management.",
  },
  {
    q: "How do I start a project?",
    a: "Tell us your goal by email or the contact form. We reply within one business day with clear next steps and a transparent, itemised quote.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on scope. After a short discovery call we send a fixed, itemised quote, so you know the cost upfront with no surprises.",
  },
  {
    q: "Where are you based?",
    a: "Sydney, Australia. We work with clients across Australia and remotely worldwide.",
  },
  {
    q: "How fast are your websites?",
    a: "We target sub-two-second mobile loads and green Core Web Vitals on every build.",
  },
];

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat with Webnetic"
          className="w-[min(92vw,360px)] origin-bottom-right animate-fade-up overflow-hidden rounded-2xl border border-hairline bg-surface shadow-glow-lg"
        >
          {/* header */}
          <div className="relative flex items-center gap-3 border-b border-hairline bg-surface-raised/60 p-4">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline">
              <BulbBrain size={24} />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-[#28c840]" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">Webnetic</p>
              <p className="text-xs text-ink-muted">Typically replies within a day</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <Close size={18} />
            </button>
          </div>

          {/* intro bubble */}
          <div className="p-4">
            <div className="rounded-2xl rounded-tl-sm bg-surface-raised px-4 py-3 text-sm text-ink">
              Hi there. Ask a quick question below, or start a project and we&apos;ll get straight back to you.
            </div>

            {/* FAQ list */}
            <p className="mt-4 px-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              Common questions
            </p>
            <div className="mt-2 max-h-[42vh] space-y-1.5 overflow-y-auto pr-1">
              {QUICK_FAQS.map((f, i) => {
                const isOpen = active === i;
                return (
                  <div key={i} className="rounded-xl border border-hairline">
                    <button
                      type="button"
                      onClick={() => setActive(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-surface-raised/60"
                    >
                      {f.q}
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out-expo ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-3.5 pb-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* footer CTAs */}
          <div className="space-y-2 border-t border-hairline p-4">
            <a href={mailtoQuote("Project enquiry")} className="btn-primary w-full">
              Start a project <ArrowRight size={16} />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center justify-center gap-2 text-xs text-ink-muted transition-colors hover:text-ink"
            >
              <Mail size={14} /> {SITE.email}
            </a>
          </div>
        </div>
      )}

      {/* Trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 px-4 py-3 text-sm font-medium text-ink shadow-glow backdrop-blur-xl transition-all duration-200 ease-out-expo hover:border-brand/50 hover:text-brand-bright"
      >
        {open ? <Close size={18} className="text-brand" /> : <Mail size={18} className="text-brand" />}
        <span className="hidden sm:inline">{open ? "Close" : "Let's talk"}</span>
      </button>
    </div>
  );
}
