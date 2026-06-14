import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { SERVICE_ICONS, ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Digital Agency Services Sydney | Web, SEO & AI — Webnetic",
  description:
    "Explore Webnetic's services: web development, SEO, AEO, GEO, AI integration, AI automation and social media management for Sydney businesses.",
  path: "/services",
});

export default function ServicesHub() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />

      <section className="container-page mt-10">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title="One agency for web, search and AI"
          intro="Webnetic brings web development, search optimisation and AI under one roof. Each service stands on its own — and together they form a system that helps Sydney businesses get found, win trust and grow."
        />
      </section>

      <section className="container-page mt-16">
        <div className="grid gap-4 lg:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal as="div" key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface p-7 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow sm:flex-row"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-hairline text-brand transition-colors group-hover:border-brand/40">
                    <Icon size={22} />
                  </span>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-medium text-ink">{s.h1}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.valueProp}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
                      Learn more
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTABand title="Not sure which service you need?" subtitle="Tell us your goal and we'll recommend the right mix — and only what genuinely moves the needle." />
    </>
  );
}
