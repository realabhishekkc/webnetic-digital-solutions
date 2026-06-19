import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService, serviceSlugs } from "@/lib/services";
import { getProject } from "@/lib/projects";
import { pageMeta } from "@/lib/seo";
import { mailtoQuote } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { FAQAccordion } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { SERVICE_ICONS, Check, ArrowRight, ArrowUpRight } from "@/components/icons";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return pageMeta({
    title: s.titleTag,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    ogTitle: s.h1,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const Icon = SERVICE_ICONS[s.icon];
  const related = SERVICES.filter((x) => s.relatedServices.includes(x.slug));
  const projects = s.relatedProjects.map(getProject).filter(Boolean);
  const caseProject = s.caseRelevance ? getProject(s.caseRelevance.projectSlug) : null;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.h1, description: s.metaDescription, slug: s.slug }),
          faqSchema(s.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ]}
      />

      {/* Hero */}
      <PageHero
        image={`/heroes/service-${s.slug}.jpg`}
        icon={<Icon size={26} />}
        title={s.h1}
        intro={s.valueProp}
      >
        <a href={mailtoQuote(`${s.name} enquiry`)} className="btn-primary">
          Start a project <ArrowRight size={16} />
        </a>
        <Link href="/services" className="btn-ghost">
          All services
        </Link>
      </PageHero>

      {/* What's included */}
      <section className="container-page mt-24">
        <SectionHeading eyebrow="What's included" title="Concrete deliverables, no filler" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.included.map((item, i) => (
            <Reveal as="div" key={item.title} delay={i * 0.04}>
              <div className="surface-card h-full p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Check size={18} />
                </span>
                <h3 className="mt-4 font-display text-base font-medium text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="Our process"
          title={`How we deliver ${s.name.toLowerCase()}`}
          intro="A focused, transparent path from first conversation to measurable results."
        />
        <div className="mt-12">
          <ProcessTimeline steps={s.process} />
        </div>
      </section>

      {/* Outcomes */}
      <section className="container-page mt-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What you get"
            title="Outcomes that move the business"
            intro="We measure success by what changes for you, not by deliverables for their own sake."
          />
          <Reveal>
            <ul className="surface-card divide-y divide-hairline">
              {s.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Check size={14} />
                  </span>
                  <span className="text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Case relevance */}
      {caseProject && s.caseRelevance && (
        <section className="container-page mt-24">
          <Reveal className="surface-card flex flex-col gap-6 overflow-hidden p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">In practice</span>
              <p className="mt-4 text-lg leading-relaxed text-ink">
                See it applied on{" "}
                <span className="font-medium text-brand-bright">{caseProject.name}</span> —{" "}
                {s.caseRelevance.note}
              </p>
            </div>
            <a href={caseProject.url} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
              Visit {caseProject.domain} <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="FAQ"
          title={`${s.name} questions, answered`}
          intro="Direct answers to what clients and AI answer engines most often ask."
        />
        <div className="mt-10">
          <FAQAccordion faqs={s.faqs} />
        </div>
      </section>

      {/* Internal links */}
      <section className="container-page mt-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink">Related services</h2>
            <div className="mt-6 space-y-3">
              {related.map((r) => {
                const RIcon = SERVICE_ICONS[r.icon];
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-brand/40"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline text-brand">
                        <RIcon size={18} />
                      </span>
                      <span>
                        <span className="block font-medium text-ink">{r.name}</span>
                        <span className="block text-sm text-ink-muted">{r.tagline}</span>
                      </span>
                    </span>
                    <ArrowRight size={18} className="text-ink-muted transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink">Relevant work</h2>
            <div className="mt-6 space-y-3">
              {projects.map((p) => (
                <a
                  key={p!.slug}
                  href={p!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-brand/40"
                >
                  <span>
                    <span className="block font-medium text-ink">{p!.name}</span>
                    <span className="block text-sm text-ink-muted">{p!.category}</span>
                  </span>
                  <ArrowUpRight size={18} className="text-ink-muted transition-transform group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand title={`Let's build your ${s.name.toLowerCase()}.`} />
    </>
  );
}
