import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Privacy Policy — Webnetic Digital Solutions",
    description:
      "How Webnetic Digital Solutions collects, uses and protects your personal information, in line with the Australian Privacy Principles.",
    path: "/privacy-policy",
  }),
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    paragraphs: [
      `${SITE.name} ("Webnetic", "we", "us" or "our") is a digital agency based in ${SITE.locality}, ${SITE.country}. We are committed to protecting your privacy and handling your personal information in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).`,
    ],
  },
  {
    heading: "2. Information we collect",
    paragraphs: ["We collect personal information that you provide to us directly, and limited technical information automatically when you use our website."],
    list: [
      "Contact details you submit, such as your name, email address, company and message.",
      "Project information you choose to share when enquiring about our services.",
      "Technical data such as your browser type, device and pages visited, where analytics are enabled.",
    ],
  },
  {
    heading: "3. How we use your information",
    paragraphs: ["We use your personal information to:"],
    list: [
      "Respond to your enquiries and provide quotes.",
      "Deliver and improve our services.",
      "Communicate with you about your project.",
      "Meet our legal and regulatory obligations.",
    ],
  },
  {
    heading: "4. Disclosure",
    paragraphs: [
      "We do not sell your personal information. We may share it with trusted service providers who help us operate our business (for example, email and hosting providers), only as needed and under appropriate confidentiality obligations.",
    ],
  },
  {
    heading: "5. Data security",
    paragraphs: [
      "We take reasonable steps to protect your personal information from misuse, loss, and unauthorised access or disclosure. No method of transmission over the internet is completely secure, however, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "6. Cookies and analytics",
    paragraphs: [
      "Our website may use cookies and privacy-respecting analytics to understand how the site is used and to improve it. You can control cookies through your browser settings. Where analytics are enabled, we will display a consent notice.",
    ],
  },
  {
    heading: "7. Your rights",
    paragraphs: [
      `You may request access to, or correction of, the personal information we hold about you. To make a request or raise a concern, contact us at ${SITE.email}. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC).`,
    ],
  },
  {
    heading: "8. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The current version will always be available on this page, with the date of the last update shown above.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      crumb="Privacy Policy"
      path="/privacy-policy"
      updated="14 June 2026"
      intro={`This Privacy Policy explains how ${SITE.name} collects, uses, discloses and protects your personal information when you visit our website or engage our services.`}
      sections={sections}
    />
  );
}
