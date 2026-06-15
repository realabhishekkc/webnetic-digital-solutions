import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, getLocation, locationSlugs } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { getPost } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { SITE, mailtoQuote } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { FAQAccordion } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { localServiceSchema, faqSchema } from "@/lib/schema";
import { SERVICE_ICONS, Check, ArrowRight, ArrowUpRight, Pin, Gauge, Search, Flow } from "@/components/icons";

export function generateStaticParams() {
  return locationSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return pageMeta({
    title: `Web Design ${loc.name} | Websites, SEO & AI — Webnetic`,
    description: `Web design and development for ${loc.name} (${loc.postcode}) businesses. Fast, SEO-ready websites, AI and automation from Webnetic. Get a quote.`,
    path: `/locations/${loc.slug}`,
    ogTitle: `Web Design & Development in ${loc.name}, Sydney`,
  });
}

const INCLUDED = [
  { icon: Gauge, title: "Fast, mobile-first sites", detail: "Sub-two-second loads and green Core Web Vitals, since most local searches happen on a phone." },
  { icon: Search, title: "Local SEO", detail: "Google Business Profile, location pages and LocalBusiness schema so nearby customers find you." },
  { icon: Flow, title: "AI & automation", detail: "Chatbots and automations that capture and follow up enquiries while you work." },
];

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const post = loc.blogSlug ? getPost(loc.blogSlug) : null;
  const others = LOCATIONS.filter((l) => l.slug !== loc.slug);

  return (
    <>
      <JsonLd data={[localServiceSchema(loc), faqSchema(loc.faqs)]} />
      <Breadcrumbs
        items={[
          { name: "Locations", path: "/locations" },
          { name: loc.name, path: `/locations/${loc.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="container-page mt-10">
        <Reveal className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{ background: "radial-gradient(circle at 80% -10%, rgba(56,182,255,0.18), transparent 55%)" }}
          />
          <span className="eyebrow">
            <Pin size={13} /> {loc.region} · {loc.postcode}
          </span>
          <h1 className="mt-6 max-w-3xl text-display-lg font-semibold text-ink">
            Web Design &amp; Development in {loc.name}, Sydney
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{loc.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mailtoQuote(`Website enquiry — ${loc.name}`)} className="btn-primary">
              Request a free quote <ArrowRight size={16} />
            </a>
            <Link href="/work" className="btn-ghost">
              See our work
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Why local */}
      <section className="container-page mt-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Local focus"
            title={`Why ${loc.name} businesses need a strong website`}
            intro={loc.context}
          />
          <Reveal>
            <div className="surface-card p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Industries we work with in {loc.name}
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {loc.industries.map((ind) => (
                  <li key={ind} className="flex items-center gap-2 text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {ind}
                  </li>
                ))}
              </ul>
              <h3 className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Also serving nearby
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{loc.nearby.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="container-page mt-24">
        <SectionHeading eyebrow="What you get" title={`What we build for ${loc.name} businesses`} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {INCLUDED.map((item, i) => (
            <Reveal as="div" key={item.title} delay={i * 0.05}>
              <div className="surface-card h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-brand">
                  <item.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services offered (internal links to service pages) */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="Services"
          title={`Our services for ${loc.name}`}
          intro={`Everything a ${loc.name} business needs to get found, win trust and grow online.`}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal as="div" key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-brand/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hairline text-brand">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="block text-sm text-ink-muted">{s.tagline}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="FAQ"
          title={`Web design in ${loc.name}: your questions answered`}
          intro="Direct answers to what local businesses and AI answer engines most often ask."
        />
        <div className="mt-10">
          <FAQAccordion faqs={loc.faqs} />
        </div>
      </section>

      {/* Cross-links: blog + other locations */}
      <section className="container-page mt-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {post && (
            <div>
              <h2 className="font-display text-display-sm font-semibold text-ink">Read more</h2>
              <Link
                href={`/blog/${post.slug}`}
                className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-brand/40"
              >
                <span>
                  <span className="block font-medium text-ink">{post.title}</span>
                  <span className="block text-sm text-ink-muted">{post.excerpt}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-ink-muted transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink">Other areas we serve</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/locations/${o.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface p-4 transition-colors hover:border-brand/40"
                >
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Pin size={15} className="text-brand" /> {o.name}
                  </span>
                  <ArrowUpRight size={16} className="text-ink-muted transition-transform group-hover:rotate-12" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={`Let's grow your ${loc.name} business online.`}
        subtitle={`Tell us about your project. We reply within one business day with clear next steps and a transparent quote. Email ${SITE.email}.`}
      />
    </>
  );
}
