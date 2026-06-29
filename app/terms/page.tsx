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
      "We provide digital services including web development, SEO, AEO, GEO, AI integration, AI automation and social media management. The specific scope, deliverables, timeline and fees for any engagement are set out in a separate written quotation or proposal.",
    ],
  },
  {
    heading: "3. Quotes and fees",
    paragraphs: [
      "Quotes are valid for the period stated and are based on the scope provided at the time. The fees, deliverables and timeline for your project are set out in your written quotation. Any work, feature or section not described in that quotation is outside the agreed scope (see clause 6).",
    ],
  },
  {
    heading: "4. Deposit and payment",
    paragraphs: [
      "A 50% deposit is required before any project work begins. We schedule and commence work once the deposit has been received.",
      "If you choose to discontinue the project after work has started, the 50% deposit is non-refundable, as it covers work already committed and performed. Unless your quotation states otherwise, the remaining balance is payable on completion, before the website goes live or final files are handed over.",
    ],
  },
  {
    heading: "5. Project timeline and delivery",
    paragraphs: [
      "Minimum project delivery is one week. The actual timeline depends on the scope of your project and how quickly content, feedback and approvals are provided. We confirm an estimated timeline in your quotation, and delays in providing content or approvals may extend it.",
    ],
  },
  {
    heading: "6. Scope changes and additional work",
    paragraphs: [
      "Any additional feature, page or section that was not discussed or included in your quotation, or that you wish to add after the website is live, is outside the agreed scope. We are glad to help with it; it will be quoted separately and charged as additional work, and begins once that quote is approved.",
    ],
  },
  {
    heading: "7. Content and materials",
    paragraphs: [
      "Unless your quotation states otherwise, you provide the content and images for your project. To deliver our best work, we rely on you to:",
    ],
    list: [
      "Provide all text content and images, and ensure you hold the rights or licences to use them.",
      "Provide accurate information, timely feedback and approvals.",
      "Make payments in accordance with these terms and your quotation.",
    ],
  },
  {
    heading: "8. Support and updates",
    paragraphs: [
      "Every website includes free content updates and support for one month (30 days) after the website goes live. This covers minor content changes and fixes, and does not include new features, additional sections or redesigns.",
      "After this period, ongoing updates, maintenance and support are available under a separate maintenance plan or quoted as needed.",
    ],
  },
  {
    heading: "9. Domains and hosting",
    paragraphs: [
      "Your domain name is your property. When we purchase or register a domain on your behalf, we will require additional information from you (such as your name, address and contact details) as required by the domain registrar.",
      "If you wish to host your website with your own provider, a domain or website transfer fee applies. If you would also like us to set up the hosting and configuration on your behalf, a setup fee applies. Both are quoted before any work begins.",
    ],
  },
  {
    heading: "10. Intellectual property",
    paragraphs: [
      "Unless otherwise agreed in writing, ownership of the final deliverables transfers to you upon full payment. We retain the right to reuse general knowledge, techniques and non-confidential components, and to reference completed work in our portfolio unless you request otherwise.",
    ],
  },
  {
    heading: "11. Third-party services",
    paragraphs: [
      "Our work may rely on third-party platforms and services (for example domain registrars, hosting, AI providers and analytics). We are not responsible for the availability, performance, pricing or policies of those third parties.",
    ],
  },
  {
    heading: "12. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, Webnetic is not liable for any indirect, incidental or consequential loss arising from the use of our website or services. Nothing in these terms excludes, restricts or modifies any rights you have under the Australian Consumer Law.",
    ],
  },
  {
    heading: "13. Governing law",
    paragraphs: [
      `These terms are governed by the laws of New South Wales, ${SITE.country}, and you submit to the non-exclusive jurisdiction of its courts.`,
    ],
  },
  {
    heading: "14. Contact",
    paragraphs: [`For any questions about these terms, contact us at ${SITE.email}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      crumb="Terms"
      path="/terms"
      updated="16 June 2026"
      intro={`These Terms of Service govern your use of the ${SITE.name} website and your engagement of our services.`}
      sections={sections}
    />
  );
}
