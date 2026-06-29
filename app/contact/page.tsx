import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { Mail, Pin, Clock } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Contact Webnetic | Web & AI Agency in Sydney",
  description:
    "Start a project with Webnetic Digital Solutions. Email info@webnetic.com.au or use our contact form. Sydney-based; we reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <PageHero
        image="/heroes/contact.jpg"
        eyebrow="Contact"
        title="Let's build something intelligent"
        intro="Tell us about your project and goals. We read every message and reply within one business day with clear, honest next steps, with no sales pressure and no jargon."
      />

      <section className="container-page mt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Details */}
          <div className="space-y-4">
            <DetailCard icon={Mail} title="Email us">
              <a href={`mailto:${SITE.email}`} className="text-brand-bright">{SITE.email}</a>
              <p className="mt-1 text-sm text-ink-muted">The fastest way to reach us.</p>
            </DetailCard>
            <DetailCard icon={Pin} title="Location">
              <p className="text-ink">{SITE.locality}, {SITE.country}</p>
              <p className="mt-1 text-sm text-ink-muted">
                Working with clients across Australia and remotely worldwide.
              </p>
            </DetailCard>
            <DetailCard icon={Clock} title="Business hours">
              <p className="text-ink">{SITE.hours}</p>
              <p className="mt-1 text-sm text-ink-muted">We reply within one business day.</p>
            </DetailCard>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function DetailCard({
  icon: Icon,
  title,
  children,
}: {
  icon: (p: { size?: number; className?: string }) => React.JSX.Element;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card flex gap-4 p-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline text-brand">
        <Icon size={20} />
      </span>
      <div>
        <h2 className="font-display text-base font-medium text-ink">{title}</h2>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
