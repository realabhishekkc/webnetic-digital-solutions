import Link from "next/link";
import { SITE, SOCIALS, mailtoQuote } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { LOCATIONS } from "@/lib/locations";
import { BulbBrain, LinkedIn, XLogo, GitHub, Mail, Pin, Phone } from "./icons";

const socialIcon = (label: string) =>
  label === "LinkedIn" ? LinkedIn : label === "X" ? XLogo : GitHub;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-hairline bg-surface/40">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <BulbBrain size={34} />
            <span className="leading-none">
              <span className="block font-display text-base font-bold tracking-tight text-ink">
                WEBNETIC
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.28em] text-ink-muted">
                Digital Solutions
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            A Sydney digital agency where ideas become intelligent digital solutions. We blend web
            craft with AI to build sites that rank, convert and run themselves.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a href={`mailto:${SITE.email}`} className="link-muted inline-flex items-center gap-2">
              <Mail size={16} className="text-brand" /> {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneE164}`} className="link-muted inline-flex items-center gap-2">
              <Phone size={16} className="text-brand" /> {SITE.phone}
            </a>
            <span className="inline-flex items-start gap-2 text-ink-muted">
              <Pin size={16} className="mt-0.5 shrink-0 text-brand" /> {SITE.street}, {SITE.addressLocality} {SITE.region} {SITE.postcode}
            </span>
          </div>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => {
              const Icon = socialIcon(s.label);
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.shortName} on ${s.label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors hover:border-brand/50 hover:text-ink"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <FooterCol title="Services">
          {SERVICES.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
          <FooterLink href="/work">Work</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterCol>

        <FooterCol title="Selected work">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-muted text-sm"
              >
                {p.name}
              </a>
            </li>
          ))}
        </FooterCol>
      </div>

      {/* Areas we serve — local internal linking */}
      <div className="border-t border-hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-sm sm:flex-row sm:items-center">
          <span className="font-medium text-ink">Areas we serve:</span>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {LOCATIONS.slice(0, 8).map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="link-muted">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="text-brand-bright">All locations</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-muted sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="link-muted">Privacy Policy</Link>
            <Link href="/terms" className="link-muted">Terms</Link>
            <a href={mailtoQuote("Project enquiry")} className="link-muted">Start a project</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink">{title}</h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-muted text-sm">
        {children}
      </Link>
    </li>
  );
}
