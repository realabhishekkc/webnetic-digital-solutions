import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/Section";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { BulbBrain, Bolt, Shield, Gauge, Spark } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "About Webnetic | A Sydney Web & AI Agency",
  description:
    "Webnetic Digital Solutions is a lean, expert Sydney agency blending web development, IT and AI automation. Learn our story, philosophy and approach to craft.",
  path: "/about",
});

const VALUES = [
  { icon: Gauge, title: "Performance is a feature", body: "Speed is not a nice-to-have. Fast sites rank better, convert better and respect people's time. We treat Core Web Vitals as a requirement, not a report card." },
  { icon: Spark, title: "Intelligence, applied", body: "We use AI where it genuinely helps — building faster, automating the repetitive, and adding real capability — never as a gimmick." },
  { icon: Shield, title: "Craft over shortcuts", body: "Hand-built, semantic, accessible code. No recycled themes, no bloat, no dark patterns. Work we're proud to put our name on." },
  { icon: Bolt, title: "Outcomes over output", body: "We measure success by what changes for you — rankings, enquiries, hours saved — not by the length of a deliverables list." },
];

const CAPABILITIES = [
  "Custom web development (WordPress & headless)",
  "Technical, on-page & content SEO",
  "AEO & GEO for search and AI answer engines",
  "AI integration: chatbots, features & APIs",
  "AI automation: content, leads & operations",
  "Social media strategy & management",
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="container-page mt-10">
        <SectionHeading
          as="h1"
          eyebrow="About"
          title="Where ideas become intelligent digital solutions"
          intro="Webnetic Digital Solutions is a Sydney agency built on a simple belief: the best digital work blends genuine web craft with practical AI. The lightbulb is the idea; the brain is the intelligence that makes it real."
        />
      </section>

      {/* Story */}
      <section className="container-page mt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="prose-content space-y-5 text-lg">
            <p>
              Webnetic was founded to close a gap. Most businesses are told to choose: a web studio
              that makes things look good, a marketing agency that chases rankings, or a developer who
              can wire up AI. Each solves a slice of the problem and leaves you to stitch the rest
              together.
            </p>
            <p>
              We do it differently. We build the website, engineer it to rank on Google and to be
              cited by AI answer engines, and automate the work behind it — as one connected system.
              That combination of web development, IT and AI automation is what lets a small site
              punch far above its weight.
            </p>
            <p>
              We are a lean, expert team based in Sydney. That means you work directly with the people
              doing the work, decisions happen quickly, and nothing gets lost in translation. We take
              on a focused number of projects so each one gets real attention.
            </p>
          </Reveal>

          <Reveal>
            <div className="surface-card relative overflow-hidden p-8">
              <div aria-hidden className="absolute -right-6 -top-6 opacity-10">
                <BulbBrain size={140} />
              </div>
              <h2 className="font-display text-lg font-medium text-ink">At a glance</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                  <dt className="text-ink-muted">Based in</dt>
                  <dd className="text-ink">{SITE.locality}, {SITE.country}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                  <dt className="text-ink-muted">Focus</dt>
                  <dd className="text-right text-ink">Web · Search · AI</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                  <dt className="text-ink-muted">Team</dt>
                  <dd className="text-right text-ink">Lean, senior, hands-on</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">Contact</dt>
                  <dd className="text-right">
                    <a href={`mailto:${SITE.email}`} className="text-brand-bright">{SITE.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder background */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="The team"
          title="Senior expertise across web, IT and AI"
          intro="Webnetic is led by a founder with a background spanning web development, IT and AI automation — the same blend of skills the agency is built on. Rather than invent a roster of staff, we keep the team lean and senior, and bring in trusted specialists when a project calls for it."
        />
      </section>

      {/* Capabilities */}
      <section className="container-page mt-16">
        <Reveal className="surface-card p-8">
          <h2 className="font-display text-lg font-medium text-ink">Capabilities</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <li key={c} className="flex items-center gap-3 text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Values */}
      <section className="container-page mt-24">
        <SectionHeading eyebrow="How we think" title="The principles behind the work" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal as="div" key={v.title} delay={i * 0.05}>
              <div className="surface-card flex h-full gap-5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-hairline text-brand">
                  <v.icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand title="Let's build something intelligent." />
    </>
  );
}
