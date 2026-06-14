"use client";

import { usePathname } from "next/navigation";
import { mailtoQuote } from "@/lib/site";
import { Mail } from "./icons";

// Subtle, non-intrusive floating affordance linking to contact.
export function FloatingContact() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <a
      href={mailtoQuote("Project enquiry")}
      aria-label="Email Webnetic about a project"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/80 px-4 py-3 text-sm font-medium text-ink shadow-glow backdrop-blur-xl transition-all duration-200 ease-out-expo hover:border-brand/50 hover:text-brand-bright"
    >
      <Mail size={18} className="text-brand" />
      <span className="hidden sm:inline">Let&apos;s talk</span>
    </a>
  );
}
