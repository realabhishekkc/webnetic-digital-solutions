import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service — Webnetic Digital Solutions",
  description:
    "The terms and conditions governing your use of the Webnetic Digital Solutions website and engagement of our services.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of terms",
    paragraphs: [
      `By accessing this website or engaging ${SITE.name} ("Webnetic", "we", "us"), you agree to these Terms of Service. If you do not agree, please do not use our website or services.`,
    ],
  },
  {
    heading: "2. Services",
    paragraphs: [
      "We provide digital services including web development, SEO, AEO, GEO, AI integration, AI automation and social media management. The specific scope, deliverables, timeline and fees for any engagement will be set out in a separate written proposal or agreement.",
    ],
  },
  {
    heading: "3. Quotes and fees",
    paragraphs: [
      "Quotes are valid for the period stated and are based on the scope provided at the time. Changes to scope may affect fees and timelines. Payment terms will be specified in your proposal or invoice.",
    ],
  },
  {
    heading: "4. Intellectual property",
    paragraphs: [
      "Unless otherwise agreed in writing, ownership of deliverables transfers to you upon full payment. We retain the right to reuse general knowledge, techniques and non-confidential components, and to reference completed work in our portfolio unless you request otherwise.",
    ],
  },
  {
    heading: "5. Client responsibilities",
    paragraphs: ["To deliver our best work, we rely on you to:"],
    list: [
      "Provide accurate information, content and timely feedback.",
      "Ensure you hold the rights to any materials you supply.",
      "Make payments in accordance with agreed terms.",
    ],
  },
  {
    heading: "6. Third-party services",
    paragraphs: [
      "Our work may rely on third-party platforms and services (for example hosting, AI providers and analytics). We are not responsible for the availability, performance or policies of those third parties.",
    ],
  },
  {
    heading: "7. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, Webnetic is not liable for any indirect, incidental or consequential loss arising from the use of our website or services. Nothing in these terms excludes rights you have under the Australian Consumer Law.",
    ],
  },
  {
    heading: "8. Governing law",
    paragraphs: [
      `These terms are governed by the laws of New South Wales, ${SITE.country}, and you submit to the non-exclusive jurisdiction of its courts.`,
    ],
  },
  {
    heading: "9. Contact",
    paragraphs: [`For any questions about these terms, contact us at ${SITE.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      crumb="Terms"
      path="/terms"
      updated="14 June 2026"
      intro={`These Terms of Service govern your use of the ${SITE.name} website and your engagement of our services.`}
      sections={sections}
    />
  );
}
