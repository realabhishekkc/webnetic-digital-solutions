import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/Section";
import { ServiceCards } from "@/components/ServiceCards";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FAQAccordion } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { PROJECTS } from "@/lib/projects";
import { ArrowRight, Bolt, Search, Flow, Pin } from "@/components/icons";
import type { FAQ } from "@/lib/services";

export const metadata: Metadata = {
  title: { absolute: "Webnetic Digital Solutions | Web Development, SEO & AI in Sydney" },
  description:
    "Sydney digital agency building intelligent websites that rank, convert and run themselves — web development, SEO, AEO, GEO, AI integration and automation.",
  alternates: { canonical: "/" },
};

const TRUST = [
  "Tour & experience operators",
  "Local service businesses",
  "Tech publishers",
  "Startups & founders",
];

const DIFFERENTIATORS = [
  {
    icon: Bolt,
    title: "AI-native builds",
    body: "AI is woven into how we build and what we ship, from automated content pipelines to in-product AI features, not bolted on as an afterthought.",
  },
  {
    icon: Search,
    title: "Search-first engineering",
    body: "Every site is engineered for SEO, AEO and GEO from the first line, so you rank on Google and get cited in AI answers.",
  },
  {
    icon: Flow,
    title: "Automation built in",
    body: "We automate the repetitive work like content, leads and operations, so your site doesn't just sit there; it works for you.",
  },
  {
    icon: Pin,
    title: "Sydney-based, hands-on",
    body: "A lean expert team based in Sydney. You work directly with the people building your project, with no account-manager telephone game.",
  },
];

const HOME_FAQS: FAQ[] = [
  {
    q: "What does Webnetic Digital Solutions do?",
    a: "Webnetic is a Sydney digital agency that blends web development with AI. We build fast custom websites and web apps, and offer SEO, AEO, GEO, AI integration, AI automation and social media management, all engineered to rank, convert and run themselves.",
  },
  {
    q: "Where is Webnetic based?",
    a: "Webnetic Digital Solutions is based in Sydney, Australia, and works with clients locally and remotely. You can reach us at info@webnetic.com.au.",
  },
  {
    q: "What is the difference between SEO, AEO and GEO?",
    a: "SEO ranks your pages in Google search results. AEO (Answer Engine Optimization) structures content to win featured snippets and voice answers. GEO (Generative Engine Optimization) gets your brand cited inside AI answers like ChatGPT and Google AI Overviews. We do all three together.",
  },
  {
    q: "How do I start a project with Webnetic?",
    a: "Email info@webnetic.com.au or use the contact page with a few details about your goals. We reply within one business day with clear next steps and a transparent, itemised quote.",
  },
  {
    q: "How fast are the websites you build?",
    a: "We target sub-two-second mobile loads and green Core Web Vitals, achieved through optimised images, code-splitting, caching and minimal third-party scripts.",
  },
  {
    q: "Do you work with businesses outside Sydney?",
    a: "Yes. We are based in Sydney and work with clients across Australia and remotely worldwide. Our process runs smoothly over video calls and shared docs, so location is rarely a barrier.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope, and you may not need to pay full agency rates. Most agencies charge around $1,000 to $3,000 for a small business website, while the same quality can often be delivered from around $500 to $3,000. After a short discovery call we send a fixed, itemised quote so you know the cost upfront, with no surprises.",
  },
  {
    q: "Which AI engines does GEO target?",
    a: "Our Generative Engine Optimization targets the engines people now ask instead of searching: ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. We make your brand the source these engines cite.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Beyond launch we offer maintenance, performance monitoring, SEO and content programmes, and automation upkeep. You can engage us project-by-project or on a retainer.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Hero />

      {/* Trust strip */}
      <section className="container-page mt-16">
        <Reveal className="surface-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-ink">
            A modern agency where ideas become intelligent digital solutions, trusted by the
            businesses building what&apos;s next.
          </p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-ink-muted">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Services overview */}
      <section className="container-page mt-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What we do"
            title="Seven services, one connected system"
            intro="From the first line of code to the AI that runs your operations, each capability strengthens the others."
          />
          <Link href="/services" className="btn-ghost shrink-0">
            All services <ArrowRight size={16} />
          </Link>
        </div>
        <ServiceCards />
      </section>

      {/* How we work */}
      <section className="container-page mt-28">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from idea to growth"
          intro="No mystery, no bloat. Four focused stages that take you from a conversation to a system that compounds."
        />
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="container-page mt-28 scroll-mt-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects, real outcomes"
            intro="A snapshot of sites and systems we've designed, built and automated."
          />
          <Link href="/work" className="btn-ghost shrink-0">
            View all work <ArrowRight size={16} />
          </Link>
        </div>
        <ProjectGrid projects={PROJECTS.slice(0, 4)} />
      </section>

      {/* Why Webnetic */}
      <section className="container-page mt-28">
        <SectionHeading
          eyebrow="Why Webnetic"
          title="Built differently, on purpose"
          intro="Most agencies do web or marketing or AI. We engineer all three into a single system designed around how people, and AI engines, actually find and choose businesses today."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal as="div" key={d.title} delay={i * 0.05}>
              <div className="surface-card flex h-full gap-5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-hairline text-brand">
                  <d.icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page mt-28">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          intro="The things people, and AI answer engines, most often ask about Webnetic."
        />
        <div className="mt-10">
          <FAQAccordion faqs={HOME_FAQS} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
