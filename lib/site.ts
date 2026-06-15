// Single source of truth for brand-wide constants, navigation and contact info.

export const SITE = {
  name: "Webnetic Digital Solutions",
  shortName: "Webnetic",
  tagline: "Where ideas become intelligent digital solutions.",
  description:
    "Webnetic Digital Solutions is a Sydney digital agency blending web craft with AI — web development, SEO, AEO, GEO, AI integration, automation and social media.",
  url: "https://www.webnetic.com.au",
  email: "info@webnetic.com.au",
  locality: "Sydney",
  region: "NSW",
  country: "Australia",
  countryCode: "AU",
  areaServed: "Sydney, Australia",
  hours: "Mon–Fri, 9:00am–6:00pm (AEST)",
  founded: "2024",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/webnetic-digital-solutions", handle: "webnetic-digital-solutions" },
  { label: "X", href: "https://x.com/webneticau", handle: "@webneticau" },
  { label: "GitHub", href: "https://github.com/webnetic", handle: "webnetic" },
] as const;

// sameAs links used in Organization / LocalBusiness JSON-LD for entity consistency (GEO).
export const SAME_AS = SOCIALS.map((s) => s.href);

export type NavItem = { label: string; href: string; hasMega?: boolean };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMega: true },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const mailtoQuote = (subject = "Project enquiry") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
