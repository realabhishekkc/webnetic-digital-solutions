"use client";

import { useState } from "react";
import type { FAQ as FAQType } from "@/lib/services";
import { ChevronDown } from "./icons";

export function FAQAccordion({ faqs }: { faqs: FAQType[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-surface-raised/50"
            >
              <span className="font-display text-base font-medium text-ink sm:text-lg">{f.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out-expo ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-ink-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
