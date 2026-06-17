"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BulbBrain } from "./icons";

const STORAGE_KEY = "webnetic-cookie-consent";

// Cookie consent notice (Australian Privacy Act 1988 / Australian Privacy Principles).
// Bottom-centred; remembers the choice so it shows once per browser.
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setShow(true), 900);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage unavailable — do not block the page */
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      // Expose the choice for any future analytics gating.
      document.documentElement.dataset.cookieConsent = choice;
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
    >
      <div className="w-full max-w-2xl animate-fade-up rounded-2xl border border-hairline bg-surface/95 p-5 shadow-glow-lg backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 hidden shrink-0 sm:block">
            <BulbBrain size={30} />
          </span>
          <div className="flex-1">
            <h2 className="font-display text-base font-semibold text-ink">We value your privacy</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              We use cookies to keep this site working, remember your preferences and understand how
              it is used. In line with the{" "}
              <span className="text-ink">Australian Privacy Act 1988 (Cth)</span> and the Australian
              Privacy Principles, you can accept or decline non-essential cookies for your session.
              Read our{" "}
              <Link href="/privacy-policy" className="text-brand-bright underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button type="button" onClick={() => decide("accepted")} className="btn-primary text-sm">
                Accept all
              </button>
              <button type="button" onClick={() => decide("declined")} className="btn-ghost text-sm">
                Decline non-essential
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
