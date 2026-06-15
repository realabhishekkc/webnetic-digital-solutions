// Full content for the seven service pages. Edit copy here — pages render from this data.

export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  icon: string; // maps to components/icons.tsx
  name: string; // short nav/card label
  h1: string;
  titleTag: string; // <= ~60 chars
  metaDescription: string; // <= ~155 chars
  tagline: string; // one-line descriptor for mega-menu / cards
  valueProp: string; // short, direct value proposition paragraph
  included: { title: string; detail: string }[];
  process: { step: string; detail: string }[];
  outcomes: string[];
  caseRelevance?: { projectSlug: string; note: string };
  faqs: FAQ[];
  relatedServices: string[]; // slugs
  relatedProjects: string[]; // slugs
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    icon: "code",
    name: "Web Development",
    h1: "Web Development in Sydney",
    titleTag: "Web Development Sydney | Fast, Custom Sites — Webnetic",
    metaDescription:
      "Custom WordPress and headless websites and web apps built for speed, Core Web Vitals and conversion. Sydney web development by Webnetic.",
    tagline: "Fast custom sites and web apps, on WordPress and headless.",
    valueProp:
      "We build WordPress and headless sites that load in under two seconds, score green on Core Web Vitals and turn visitors into enquiries. Every build is hand-coded for performance, accessibility and search from the first line.",
    included: [
      { title: "Custom design & build", detail: "Bespoke, responsive front-ends with no recycled themes or page-builder bloat." },
      { title: "WordPress & headless", detail: "Classic WordPress, headless WordPress, or fully custom Next.js, matched to your needs." },
      { title: "Core Web Vitals tuning", detail: "Image optimisation, code-splitting and caching for green LCP, CLS and INP." },
      { title: "Accessibility (WCAG AA)", detail: "Semantic markup, keyboard support and contrast baked in, not bolted on." },
      { title: "Analytics & tracking", detail: "Privacy-respecting analytics and conversion events wired from day one." },
      { title: "Handover & docs", detail: "Clean code, a maintainable CMS and documentation so your team stays in control." },
    ],
    process: [
      { step: "Discover", detail: "We map your goals, audience and the actions that matter, then define scope and architecture." },
      { step: "Design & build", detail: "We design the experience and build it as fast, semantic, accessible code." },
      { step: "Optimise", detail: "We tune performance, accessibility and on-page SEO before launch." },
      { step: "Launch & support", detail: "We ship, monitor Core Web Vitals and hand over a site your team can run." },
    ],
    outcomes: [
      "A site that loads in under two seconds on mobile",
      "Green Core Web Vitals and a Lighthouse score of 90+",
      "A CMS your team can update without a developer",
      "A foundation built for SEO, AEO and GEO from launch",
    ],
    caseRelevance: { projectSlug: "one-life-tours-zakynthos", note: "an enquiry-driven tour site built to convert browsers into bookings." },
    faqs: [
      {
        q: "Do you build on WordPress or custom code?",
        a: "Both. We build classic and headless WordPress when you need an editor-friendly CMS, and fully custom Next.js when you need maximum speed and control. We recommend the right tool for your goals rather than defaulting to one.",
      },
      {
        q: "How fast will my website be?",
        a: "We target sub-two-second loads on mobile and green Core Web Vitals. We achieve this with optimised images, code-splitting, caching and minimal third-party scripts.",
      },
      {
        q: "How much does a website cost in Sydney?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, with larger or multi-template web apps costing more. We scope transparently and give you a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Will I be able to edit the site myself?",
        a: "Yes. We hand over an editable CMS with documentation, so your team can update content, pages and media without writing code.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A focused marketing site typically takes three to six weeks; larger web apps take longer. We confirm a realistic timeline during discovery and keep you updated at each milestone.",
      },
      {
        q: "Do you redesign or migrate existing websites?",
        a: "Yes. We redesign dated sites and migrate between platforms, including moving to or from WordPress and headless setups, while preserving your SEO with proper redirects and a clean technical handover.",
      },
    ],
    relatedServices: ["seo", "ai-integration", "ai-automation"],
    relatedProjects: ["one-life-tours-zakynthos", "sasa-grup"],
  },
  {
    slug: "seo",
    icon: "search",
    name: "SEO",
    h1: "SEO Services in Sydney",
    titleTag: "SEO Services Sydney | Rank Higher on Google — Webnetic",
    metaDescription:
      "Technical, on-page and content SEO that ranks Sydney businesses higher on Google. Audits, fixes and content built around real search intent.",
    tagline: "Technical, on-page and content SEO that ranks on Google.",
    valueProp:
      "We help Sydney businesses rank on Google with technical SEO, on-page optimisation and content built around real search intent. No tricks, just durable rankings from a fast, well-structured, genuinely useful site.",
    included: [
      { title: "Technical SEO audit", detail: "Crawlability, indexation, site speed, structured data and architecture reviewed and fixed." },
      { title: "Keyword & intent research", detail: "We map the queries your customers actually search and the intent behind them." },
      { title: "On-page optimisation", detail: "Titles, meta, headings, internal links and content tuned per page." },
      { title: "Content strategy", detail: "Topic clusters that build topical authority and capture long-tail demand." },
      { title: "Core Web Vitals", detail: "Performance work that doubles as a direct ranking and UX win." },
      { title: "Reporting", detail: "Clear monthly reporting on rankings, traffic and conversions, not vanity metrics." },
    ],
    process: [
      { step: "Audit", detail: "We benchmark your current rankings, technical health and competitors." },
      { step: "Fix", detail: "We resolve technical issues and optimise existing pages first for quick wins." },
      { step: "Build", detail: "We create and optimise content around prioritised keyword clusters." },
      { step: "Grow", detail: "We track, refine and expand coverage as rankings compound." },
    ],
    outcomes: [
      "Higher rankings for the keywords that drive revenue",
      "More qualified organic traffic, month over month",
      "A technically clean site search engines trust",
      "Reporting tied to leads and sales, not just clicks",
    ],
    caseRelevance: { projectSlug: "tech-trends-central", note: "a publication scaled with a search-first content pipeline." },
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Most sites see early movement within 8–12 weeks, with meaningful gains over 4–6 months. Technical fixes and existing-page optimisation deliver the fastest wins; content authority compounds over time.",
      },
      {
        q: "What is the difference between technical and on-page SEO?",
        a: "Technical SEO makes your site crawlable, fast and well-structured for search engines. On-page SEO optimises the content of each page, such as titles, headings, copy and internal links, for specific queries. You need both.",
      },
      {
        q: "Do you guarantee a number one ranking?",
        a: "No reputable agency can guarantee a specific ranking, because Google's algorithm and your competitors change constantly. We do guarantee a sound technical foundation, intent-led content and transparent reporting that moves rankings durably.",
      },
      {
        q: "Is SEO still worth it with AI search?",
        a: "Yes. The same fundamentals of fast sites, clear structure and authoritative content also feed AI answer engines. We extend classic SEO with AEO and GEO so you rank on Google and get cited in AI answers.",
      },
      {
        q: "How much do SEO services cost in Sydney?",
        a: "Pricing depends on your starting point and goals, and whether you need a one-off audit or an ongoing programme. After reviewing your site and competitors we recommend a scope and quote it transparently, with no lock-in surprises.",
      },
      {
        q: "Do you do local SEO for Sydney businesses?",
        a: "Yes. We optimise for local intent with Google Business Profile setup, consistent name, address and contact details, local landing pages and LocalBusiness schema, so nearby customers find you first.",
      },
    ],
    relatedServices: ["aeo", "geo", "web-development"],
    relatedProjects: ["tech-trends-central", "one-life-tours-zakynthos"],
  },
  {
    slug: "aeo",
    icon: "answer",
    name: "AEO",
    h1: "Answer Engine Optimization (AEO)",
    titleTag: "AEO Services Sydney | Win Featured Snippets — Webnetic",
    metaDescription:
      "Answer Engine Optimization: structured data, concise answer blocks and FAQ schema that win featured snippets and voice search. Webnetic, Sydney.",
    tagline: "Structured answers built for snippets and voice search.",
    valueProp:
      "Answer Engine Optimization makes your content the answer. We structure pages with schema, concise answer blocks and FAQs so Google's featured snippets, voice assistants and answer engines lift your content cleanly.",
    included: [
      { title: "Answer-first content", detail: "Headings phrased as real questions with tight, self-contained answers up top." },
      { title: "Structured data", detail: "FAQPage, HowTo, Article and Q&A schema implemented and validated." },
      { title: "Featured-snippet targeting", detail: "We identify snippet opportunities and format content to win them." },
      { title: "Voice-search readiness", detail: "Natural-language phrasing for conversational and voice queries." },
      { title: "Definition & list blocks", detail: "Concise definitions, lists and tables that engines extract reliably." },
      { title: "Schema validation", detail: "Every page checked against Google's Rich Results requirements." },
    ],
    process: [
      { step: "Identify", detail: "We find the questions your audience asks and the snippets worth winning." },
      { step: "Structure", detail: "We reformat content with answer blocks, lists and tables." },
      { step: "Mark up", detail: "We add and validate the right structured data for each page." },
      { step: "Measure", detail: "We track snippet wins, impressions and answer placements." },
    ],
    outcomes: [
      "Featured snippets and 'people also ask' placements",
      "Content that voice assistants read aloud",
      "Valid, rich structured data across the site",
      "Higher click-through from richer search results",
    ],
    faqs: [
      {
        q: "What is Answer Engine Optimization (AEO)?",
        a: "AEO is the practice of structuring content so search and answer engines can extract a direct answer to a user's question. It combines question-led headings, concise answer blocks and structured data like FAQ schema to win featured snippets and voice results.",
      },
      {
        q: "How is AEO different from SEO?",
        a: "SEO aims to rank a page; AEO aims to be the extracted answer. SEO focuses on rankings and traffic, while AEO focuses on snippets, voice answers and zero-click visibility. They share a foundation, so we run them together.",
      },
      {
        q: "Does AEO help with voice search?",
        a: "Yes. Voice assistants typically read a single concise answer. By phrasing content as natural questions with short, self-contained answers, AEO makes your pages the source a voice assistant quotes.",
      },
      {
        q: "What schema does AEO use?",
        a: "Most often FAQPage, Q&A, HowTo and Article schema. We choose and validate the markup that matches each page's content so it qualifies for rich results.",
      },
      {
        q: "How do you measure AEO success?",
        a: "We track featured-snippet and 'people also ask' placements, impressions and click-through in Search Console, and whether voice assistants read your content. The goal is owning the answer, not just ranking a link.",
      },
      {
        q: "Is AEO the same as GEO?",
        a: "No. AEO targets answer features inside traditional search, such as snippets and voice results. GEO targets citations inside generative AI engines like ChatGPT and Perplexity. They overlap and we run them together, but they are distinct disciplines.",
      },
    ],
    relatedServices: ["geo", "seo", "ai-integration"],
    relatedProjects: ["tech-trends-central"],
  },
  {
    slug: "geo",
    icon: "spark",
    name: "GEO",
    h1: "Generative Engine Optimization (GEO)",
    titleTag: "Generative Engine Optimization (GEO) Services — Webnetic",
    metaDescription:
      "GEO gets your brand cited inside AI answers like Google AI Overviews, ChatGPT, Perplexity, Gemini and Claude. Generative Engine Optimization by Webnetic.",
    tagline: "Get cited inside AI answers: ChatGPT, Perplexity, AI Overviews.",
    valueProp:
      "Generative Engine Optimization gets your brand cited inside AI answers. As people ask ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews instead of searching, GEO makes sure the AI mentions and links you, not your competitor.",
    included: [
      { title: "Entity & authority building", detail: "Consistent brand entity, clear facts and authoritative content models can trust." },
      { title: "Citation-ready content", detail: "Fact-dense, well-attributed writing AI engines can quote with confidence." },
      { title: "Structured data", detail: "Organization, Service and FAQ schema so engines parse your brand correctly." },
      { title: "Topical clusters", detail: "Depth across a topic so you become the obvious source on it." },
      { title: "AI-crawler access", detail: "robots and technical setup that welcomes GPTBot, PerplexityBot and Google-Extended." },
      { title: "Answer monitoring", detail: "We track how AI engines describe and cite your brand over time." },
    ],
    process: [
      { step: "Audit", detail: "We test how AI engines currently answer questions in your space and who they cite." },
      { step: "Strengthen", detail: "We fix entity consistency, schema and factual clarity across your site." },
      { step: "Publish", detail: "We create citation-worthy, fact-dense content in topical clusters." },
      { step: "Track", detail: "We monitor mentions and citations across AI engines and refine." },
    ],
    outcomes: [
      "Your brand cited and linked inside AI answers",
      "Consistent, accurate brand description across engines",
      "Authority content models reach for first",
      "A measurable share of AI-driven discovery",
    ],
    faqs: [
      {
        q: "What is Generative Engine Optimization (GEO)?",
        a: "GEO is the practice of optimising your content and brand so generative AI engines like ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews cite and recommend you in their answers. It focuses on entity clarity, authoritative fact-dense content and structured data engines can trust.",
      },
      {
        q: "How is GEO different from SEO?",
        a: "SEO optimises for ranked links on a search results page. GEO optimises for being named and cited inside a synthesised AI answer where there may be no traditional results list. SEO and GEO share fundamentals, but GEO adds entity consistency, citation-worthy content and AI-crawler access.",
      },
      {
        q: "Why does GEO matter in 2026?",
        a: "A growing share of searches now end in an AI answer rather than a click. If AI engines do not understand or trust your brand, they recommend competitors. GEO ensures you are the source those answers cite.",
      },
      {
        q: "Can you control what AI says about my brand?",
        a: "You cannot directly control model output, but you strongly influence it. Clear, consistent, well-structured and authoritative information across your site and the wider web is what models learn from and cite. That is exactly what GEO builds.",
      },
      {
        q: "How do you measure GEO results?",
        a: "We run prompts across the major AI engines and track whether your brand is mentioned, how accurately it is described, and whether it is cited or linked. We benchmark before we start and report on changes over time.",
      },
      {
        q: "How long does GEO take to work?",
        a: "GEO compounds as engines re-crawl and models update. Entity and schema fixes can register within weeks, while citation authority builds over a few months of consistent, fact-dense publishing.",
      },
    ],
    relatedServices: ["aeo", "seo", "ai-integration"],
    relatedProjects: ["tech-trends-central", "hashifyai"],
  },
  {
    slug: "ai-integration",
    icon: "chip",
    name: "AI Integration & Solutions",
    h1: "AI Integration & Solutions",
    titleTag: "AI Integration Services Sydney | Chatbots & APIs — Webnetic",
    metaDescription:
      "Custom AI integration: chatbots, AI features, API integrations and bespoke tooling built into your website and product. Webnetic, Sydney.",
    tagline: "Chatbots, AI features, API integrations and custom tooling.",
    valueProp:
      "We embed AI where it earns its place. From support chatbots and smart search to API integrations and custom internal tools, we build AI features that solve real problems. Practical, reliable and measurable, never novelty.",
    included: [
      { title: "AI chatbots & assistants", detail: "Support and sales assistants grounded in your content, not generic answers." },
      { title: "AI-powered features", detail: "Smart search, recommendations, summarisation and content generation in-product." },
      { title: "API integrations", detail: "Connect LLMs and third-party services into your existing stack securely." },
      { title: "Custom internal tools", detail: "Bespoke tooling that automates analysis, drafting and decision support." },
      { title: "Retrieval (RAG)", detail: "Grounded answers from your own documents and data for accuracy and trust." },
      { title: "Guardrails & evaluation", detail: "Safety, cost controls and quality evaluation built into every build." },
    ],
    process: [
      { step: "Discover", detail: "We find where AI adds real value and define success metrics." },
      { step: "Prototype", detail: "We build a focused prototype to prove value before full investment." },
      { step: "Integrate", detail: "We ship the feature into your site or product with guardrails." },
      { step: "Refine", detail: "We evaluate quality and cost, then tune for accuracy and ROI." },
    ],
    outcomes: [
      "AI features that resolve real user needs",
      "Lower support load and faster responses",
      "Grounded, accurate answers from your own data",
      "Controlled costs with built-in guardrails",
    ],
    faqs: [
      {
        q: "What AI can you integrate into my website?",
        a: "Common builds include support and sales chatbots, AI-powered search and recommendations, content summarisation and generation, and custom tools that automate internal work. We ground them in your data so answers are accurate.",
      },
      {
        q: "Which AI models do you use?",
        a: "We choose the model that fits the task, defaulting to the latest and most capable Claude models for quality, and selecting others where they suit cost or capability. We design integrations so the underlying model can be swapped as the field evolves.",
      },
      {
        q: "How do you keep AI answers accurate?",
        a: "We use retrieval-augmented generation (RAG) to ground responses in your own documents, add guardrails to constrain behaviour, and run evaluations to measure quality before and after launch.",
      },
      {
        q: "Is my data safe with AI integrations?",
        a: "Yes. We use providers and configurations that do not train on your data, apply least-privilege access, and keep sensitive information within controlled, auditable boundaries.",
      },
    ],
    relatedServices: ["ai-automation", "web-development", "geo"],
    relatedProjects: ["tech-trends-central", "hashifyai"],
  },
  {
    slug: "ai-automation",
    icon: "flow",
    name: "AI Automation",
    h1: "AI Automation Services",
    titleTag: "AI Automation Sydney | Workflow & Content Pipelines — Webnetic",
    metaDescription:
      "AI automation for Sydney businesses: workflow automation, content pipelines and lead and ops automation that cut costs and save hours. Webnetic.",
    tagline: "Workflow, content and ops automation that saves hours.",
    valueProp:
      "We automate the repetitive work that drains your team. From content pipelines to lead routing and operations, we design AI-powered workflows that run reliably in the background and cut hours of manual effort every week.",
    included: [
      { title: "Workflow automation", detail: "Connect your tools so data and tasks move without manual copy-paste." },
      { title: "Content pipelines", detail: "AI-assisted research, drafting, review and publishing at scale with quality control." },
      { title: "Lead automation", detail: "Capture, qualify, route and follow up on leads automatically." },
      { title: "Ops automation", detail: "Reporting, data entry and recurring admin handled in the background." },
      { title: "Human-in-the-loop", detail: "Review and approval gates where judgement matters most." },
      { title: "Monitoring & alerts", detail: "Logging and alerts so automations stay reliable and observable." },
    ],
    process: [
      { step: "Map", detail: "We document the manual process and find the highest-value step to automate." },
      { step: "Design", detail: "We design a workflow with the right balance of automation and human review." },
      { step: "Build", detail: "We implement and test the automation against real cases." },
      { step: "Operate", detail: "We monitor, measure time saved and expand to adjacent tasks." },
    ],
    outcomes: [
      "Hours of manual work removed every week",
      "Lower content and operations costs",
      "Faster, more consistent lead follow-up",
      "Reliable, monitored workflows you can trust",
    ],
    caseRelevance: { projectSlug: "tech-trends-central", note: "an automated tech-news publication powered by an AI content pipeline." },
    faqs: [
      {
        q: "What can AI automation do for my business?",
        a: "It removes repetitive manual work, including content production, lead capture and follow-up, reporting, data entry and tool-to-tool data flow. The result is lower cost, fewer errors and time returned to your team for higher-value work.",
      },
      {
        q: "How much can AI automation cut content costs?",
        a: "It varies by workflow, but AI-assisted pipelines commonly cut production time substantially by automating research and first drafts while keeping human review for quality. We measure time saved before and after so the ROI is concrete.",
      },
      {
        q: "Will automation replace my team?",
        a: "No. It removes the tedious parts so your team focuses on judgement, strategy and relationships. We design human-in-the-loop checkpoints so people stay in control of anything that matters.",
      },
      {
        q: "What tools do you automate with?",
        a: "We work with your existing stack and connect it using workflow platforms, APIs and custom code, layering in AI where it adds value. The automation is built to be monitored, maintainable and observable.",
      },
    ],
    relatedServices: ["ai-integration", "social-media-management", "web-development"],
    relatedProjects: ["tech-trends-central", "sasa-grup"],
  },
  {
    slug: "social-media-management",
    icon: "share",
    name: "Social Media Management",
    h1: "Social Media Management in Sydney",
    titleTag: "Social Media Management Sydney | Content & Growth — Webnetic",
    metaDescription:
      "Social media management for Sydney businesses: strategy, content, scheduling and growth, amplified by AI-assisted production. Webnetic.",
    tagline: "Strategy, content, scheduling and growth, AI-amplified.",
    valueProp:
      "We run social media that compounds. Clear strategy, on-brand content and consistent scheduling, amplified by AI-assisted production so you post more, and post better, without burning your team out.",
    included: [
      { title: "Channel strategy", detail: "The right platforms, cadence and content pillars for your audience and goals." },
      { title: "Content creation", detail: "On-brand posts, captions and graphics produced with AI-assisted workflows." },
      { title: "Scheduling & publishing", detail: "Planned calendars and reliable, consistent posting." },
      { title: "Community engagement", detail: "Replies and engagement that build relationships, not just reach." },
      { title: "Growth & analytics", detail: "Performance tracking tied to followers, engagement and traffic." },
      { title: "Repurposing pipeline", detail: "Turn one piece of content into many across formats and channels." },
    ],
    process: [
      { step: "Strategy", detail: "We define audience, channels, pillars and a measurable goal." },
      { step: "Create", detail: "We produce a batch of on-brand content with AI-assisted workflows." },
      { step: "Schedule", detail: "We plan and publish consistently across your channels." },
      { step: "Grow", detail: "We review analytics and double down on what works." },
    ],
    outcomes: [
      "A consistent, on-brand presence across channels",
      "More content output without more overhead",
      "Engagement that builds an audience",
      "Social traffic feeding your website and pipeline",
    ],
    faqs: [
      {
        q: "Which social platforms do you manage?",
        a: "We focus on the platforms where your audience actually is, commonly LinkedIn, Instagram, Facebook, X and TikTok. We recommend a focused set rather than spreading thin across every channel.",
      },
      {
        q: "How does AI help with social media management?",
        a: "AI accelerates research, drafting, captioning and repurposing, so you can produce more high-quality content in less time. A human keeps editorial control to protect brand voice and quality.",
      },
      {
        q: "How often will you post?",
        a: "Cadence depends on platform and goals, but consistency beats volume. We set a sustainable schedule in the strategy phase and hold to it, because regular posting is what builds an audience.",
      },
      {
        q: "Do you handle community engagement too?",
        a: "Yes. Beyond publishing, we engage with comments and messages to build genuine relationships, which is what turns reach into a loyal, converting audience.",
      },
    ],
    relatedServices: ["ai-automation", "seo", "geo"],
    relatedProjects: ["sasa-grup", "tech-trends-central"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const serviceSlugs = SERVICES.map((s) => s.slug);
