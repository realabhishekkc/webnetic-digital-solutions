"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown, Menu, Close, ArrowRight, SERVICE_ICONS } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo ${
        scrolled
          ? "border-b border-hairline bg-bg/70 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-4"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Logo compact={scrolled} light={!scrolled} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.hasMega ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </Link>

                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3">
                    <div className="surface-card animate-fade-up overflow-hidden p-2 shadow-glow-lg">
                      <div className="grid grid-cols-2 gap-1">
                        {SERVICES.map((s) => {
                          const Icon = SERVICE_ICONS[s.icon];
                          return (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-raised"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline text-brand transition-colors group-hover:border-brand/40">
                                <Icon size={18} />
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-ink">{s.name}</span>
                                <span className="block text-xs leading-snug text-ink-muted">
                                  {s.tagline}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      <Link
                        href="/services"
                        className="mt-1 flex items-center justify-between rounded-xl bg-surface-raised px-4 py-3 text-sm font-medium text-ink transition-colors hover:text-brand-bright"
                      >
                        View all services
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden text-sm sm:inline-flex">
            Get a quote
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="container-page lg:hidden">
          <div className="surface-card mt-3 max-h-[80vh] animate-fade-up overflow-y-auto p-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.filter((n) => !n.hasMega).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base text-ink hover:bg-surface-raised"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-hairline pt-2">
                <p className="px-3 py-1 text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Services
                </p>
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block rounded-xl px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-raised hover:text-ink"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="btn-primary mt-2 w-full">
                Get a quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
