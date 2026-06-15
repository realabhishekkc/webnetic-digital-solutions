// Real client and portfolio projects shown on /work. Keep descriptions accurate.

export type Project = {
  slug: string;
  name: string;
  url: string; // external
  domain: string;
  category: string;
  what: string; // what it is
  did: string; // what was done
  tags: string[];
  accent: string; // gradient pair used as image fallback / overlay tint
  image: string; // screenshot in /public/projects
};

export const PROJECTS: Project[] = [
  {
    slug: "one-life-tours-zakynthos",
    name: "One Life Tours Zakynthos",
    url: "https://onelifetourszakynthos.com",
    domain: "onelifetourszakynthos.com",
    category: "Tourism & Experiences",
    what: "A tour and experiences business in Zakynthos, Greece, offering boat trips and island excursions.",
    did: "Designed and built an enquiry-driven website that showcases experiences and turns visitors into booking enquiries, optimised for speed and discovery.",
    tags: ["Web Development", "SEO", "Conversion"],
    accent: "from-[#1E88E5] to-[#38B6FF]",
    image: "/projects/one-life-tours-zakynthos.jpg",
  },
  {
    slug: "abhishek-kc-portfolio",
    name: "Abhishek KC Portfolio",
    url: "https://abhishekkc.com",
    domain: "abhishekkc.com",
    category: "Personal Portfolio",
    what: "A personal portfolio site presenting work, background and contact for a web and AI professional.",
    did: "Built a fast, refined personal brand site with clean typography, considered motion and strong on-page SEO.",
    tags: ["Web Development", "Personal Brand"],
    accent: "from-[#38B6FF] to-[#7DD3FF]",
    image: "/projects/abhishek-kc-portfolio.jpg",
  },
  {
    slug: "hashifyai",
    name: "HashifyAI",
    url: "https://hashifyai.com",
    domain: "hashifyai.com",
    category: "Premium Domain",
    what: "A premium domain currently for sale, positioned for AI, startup and crypto buyers.",
    did: "Created a sharp single-purpose landing experience designed to communicate value and capture serious purchase enquiries.",
    tags: ["Landing Page", "Branding"],
    accent: "from-[#6366F1] to-[#38B6FF]",
    image: "/projects/hashifyai.jpg",
  },
  {
    slug: "tech-trends-central",
    name: "Tech Trends Central",
    url: "https://techtrendscentral.com",
    domain: "techtrendscentral.com",
    category: "Publishing & Automation",
    what: "An automated tech-news publication powered by an AI content pipeline.",
    did: "Engineered an AI content pipeline and a search-first publishing site that produces and ranks tech-news content at scale with editorial quality control.",
    tags: ["AI Automation", "SEO", "Web Development"],
    accent: "from-[#1E88E5] to-[#7DD3FF]",
    image: "/projects/tech-trends-central.jpg",
  },
  {
    slug: "sasa-grup",
    name: "Sasa Grup",
    url: "https://sasagrup.com.au",
    domain: "sasagrup.com.au",
    category: "Local Services",
    what: "A cleaning services business operating in Australia.",
    did: "Built a clear, conversion-focused local services website with strong local SEO so nearby customers find and contact the business.",
    tags: ["Web Development", "Local SEO"],
    accent: "from-[#38B6FF] to-[#6366F1]",
    image: "/projects/sasa-grup.jpg",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
