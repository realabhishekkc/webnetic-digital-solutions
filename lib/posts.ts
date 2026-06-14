// Blog content. Each post renders from structured sections so we can auto-build a table of contents.

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Post = {
  slug: string;
  title: string;
  titleTag: string;
  metaDescription: string;
  excerpt: string;
  category: "Web" | "SEO" | "AI" | "Automation" | "Business";
  date: string; // ISO
  updated?: string;
  readingTime: number; // minutes
  author: string;
  heroAlt: string;
  intro: string;
  sections: Section[];
};

export const POSTS: Post[] = [
  {
    slug: "what-is-geo-and-why-it-matters-in-2026",
    title: "What is GEO and why it matters in 2026",
    titleTag: "What is GEO? Generative Engine Optimization in 2026",
    metaDescription:
      "GEO (Generative Engine Optimization) gets your brand cited inside AI answers. Here is what it is, how it differs from SEO and why it matters in 2026.",
    excerpt:
      "Generative Engine Optimization is how brands earn citations inside AI answers from ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews. Here is what it is and why it matters now.",
    category: "AI",
    date: "2026-02-18",
    readingTime: 7,
    author: "Webnetic Digital Solutions",
    heroAlt: "Abstract neural network of glowing cyan nodes representing AI answer engines",
    intro:
      "Generative Engine Optimization (GEO) is the practice of optimising your content and brand so generative AI engines cite and recommend you in their answers. As more searches end in an AI answer rather than a list of blue links, GEO is becoming as important as SEO.",
    sections: [
      {
        id: "what-is-geo",
        heading: "What is GEO?",
        blocks: [
          {
            type: "p",
            text: "GEO, or Generative Engine Optimization, is the practice of making your brand and content the source that AI engines cite. Those engines include ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews. Where SEO aims to rank a link on a results page, GEO aims to get your brand named, quoted and linked inside a synthesised answer.",
          },
          {
            type: "p",
            text: "The shift matters because AI answers often resolve a query without a click. If the model does not understand or trust your brand, it recommends a competitor — and you never see the traffic at all.",
          },
        ],
      },
      {
        id: "geo-vs-seo",
        heading: "GEO vs SEO: what is the difference?",
        blocks: [
          {
            type: "p",
            text: "GEO and SEO share a foundation — fast sites, clean structure and authoritative content — but optimise for different outcomes.",
          },
          {
            type: "table",
            head: ["", "SEO", "GEO"],
            rows: [
              ["Goal", "Rank a link on the results page", "Be cited inside an AI answer"],
              ["Unit of success", "Position and clicks", "Mentions and citations"],
              ["Key levers", "Keywords, links, technical health", "Entity clarity, fact density, structured data"],
              ["Primary surface", "Google search results", "ChatGPT, Perplexity, Gemini, AI Overviews"],
            ],
          },
        ],
      },
      {
        id: "how-geo-works",
        heading: "How does GEO actually work?",
        blocks: [
          { type: "p", text: "GEO rests on a few practical pillars that make your brand legible and trustworthy to language models:" },
          {
            type: "ul",
            items: [
              "Entity consistency: use the exact same brand name, description and facts everywhere, reinforced with structured data.",
              "Citation-ready content: write fact-dense, well-attributed, self-contained passages that a model can quote with confidence.",
              "Topical authority: cover a topic in depth so you become the obvious source for it.",
              "AI-crawler access: allow GPTBot, PerplexityBot, Google-Extended and similar crawlers so engines can read you.",
              "Structured data: Organization, Service and FAQ schema so engines parse your brand correctly.",
            ],
          },
        ],
      },
      {
        id: "why-2026",
        heading: "Why GEO matters in 2026",
        blocks: [
          {
            type: "p",
            text: "AI answers have moved from novelty to default. A growing share of informational and commercial queries now start — and end — in an AI engine. Brands that are clear, consistent and authoritative become the cited source; everyone else becomes invisible inside the answer layer.",
          },
          {
            type: "quote",
            text: "If AI engines do not understand your brand, they will confidently recommend someone else's.",
          },
          {
            type: "p",
            text: "The good news: GEO compounds with SEO and AEO. The same investment in clarity, structure and authority pays off across Google rankings, featured snippets and AI citations at once.",
          },
        ],
      },
      {
        id: "getting-started",
        heading: "How to get started with GEO",
        blocks: [
          {
            type: "ol",
            items: [
              "Audit how AI engines currently answer questions in your space and who they cite.",
              "Fix entity consistency and add Organization, Service and FAQ schema across your site.",
              "Publish fact-dense, citation-worthy content in focused topical clusters.",
              "Confirm AI crawlers are allowed in robots.txt.",
              "Monitor how engines describe and cite your brand, then refine.",
            ],
          },
          {
            type: "p",
            text: "If you want help, Webnetic builds GEO into every site we ship from Sydney — alongside SEO and AEO — so you rank on Google and get cited in AI answers.",
          },
        ],
      },
    ],
  },
  {
    slug: "aeo-vs-seo-what-is-the-difference",
    title: "AEO vs SEO: what is the difference?",
    titleTag: "AEO vs SEO: What Is the Difference? (2026 Guide)",
    metaDescription:
      "AEO optimises to be the extracted answer; SEO optimises to rank a link. Here is how Answer Engine Optimization and SEO differ and how to use both.",
    excerpt:
      "SEO ranks a page; AEO makes your content the answer. Here is how Answer Engine Optimization differs from SEO, and why modern sites need both.",
    category: "SEO",
    date: "2026-01-29",
    readingTime: 6,
    author: "Webnetic Digital Solutions",
    heroAlt: "A search result expanding into a highlighted answer snippet on a dark interface",
    intro:
      "SEO and AEO are often confused. SEO works to rank a page in search results; AEO (Answer Engine Optimization) works to make your content the answer that search engines and voice assistants extract. They share a foundation but pursue different wins, and modern sites need both.",
    sections: [
      {
        id: "definitions",
        heading: "AEO and SEO, defined",
        blocks: [
          {
            type: "p",
            text: "SEO (Search Engine Optimization) is the practice of improving a page so it ranks higher in search results for relevant queries. AEO (Answer Engine Optimization) is the practice of structuring content so search engines, voice assistants and answer engines can lift a direct answer from it — winning featured snippets, 'people also ask' boxes and spoken answers.",
          },
        ],
      },
      {
        id: "comparison",
        heading: "AEO vs SEO at a glance",
        blocks: [
          {
            type: "table",
            head: ["", "SEO", "AEO"],
            rows: [
              ["Goal", "Rank the page", "Be the extracted answer"],
              ["Wins", "Higher positions, more clicks", "Snippets, voice answers, zero-click visibility"],
              ["Content shape", "Comprehensive pages", "Question-led headings, concise answer blocks"],
              ["Schema focus", "Broad technical markup", "FAQPage, HowTo, Q&A"],
            ],
          },
        ],
      },
      {
        id: "how-to-do-aeo",
        heading: "How to optimise for answer engines",
        blocks: [
          { type: "p", text: "AEO is mostly about formatting content so a machine can extract it cleanly:" },
          {
            type: "ul",
            items: [
              "Phrase headings as the questions people actually ask.",
              "Give a tight, self-contained answer in the first one or two sentences, then expand.",
              "Use lists, tables and definition blocks where they aid extraction.",
              "Add and validate FAQ, HowTo and Q&A structured data.",
              "Keep answers complete so an engine can quote them without surrounding context.",
            ],
          },
        ],
      },
      {
        id: "do-you-need-both",
        heading: "Do you need both SEO and AEO?",
        blocks: [
          {
            type: "p",
            text: "Yes. AEO without SEO means your perfectly formatted answers never get discovered. SEO without AEO means you rank but lose the snippet — and the voice answer — to a competitor who structured their content better. Run together, they cover both the ranked link and the extracted answer.",
          },
          {
            type: "p",
            text: "And both feed Generative Engine Optimization (GEO): the same clarity and structure that win snippets also help AI engines cite you. Webnetic builds SEO, AEO and GEO as one connected practice.",
          },
        ],
      },
    ],
  },
  {
    slug: "how-ai-automation-cuts-content-costs",
    title: "How AI automation cuts content costs",
    titleTag: "How AI Automation Cuts Content Costs (Real Workflows)",
    metaDescription:
      "AI automation cuts content costs by automating research, drafting and publishing while keeping human review. Here are the workflows that deliver ROI.",
    excerpt:
      "AI content pipelines cut production time by automating research and first drafts while humans keep editorial control. Here are the workflows that actually deliver ROI.",
    category: "Automation",
    date: "2026-01-12",
    readingTime: 6,
    author: "Webnetic Digital Solutions",
    heroAlt: "A flowing pipeline of connected nodes representing an automated content workflow",
    intro:
      "AI automation cuts content costs by removing the slow, repetitive parts of production — research, first drafts, formatting and distribution — while keeping humans in control of quality. Done well, an AI content pipeline produces more, faster, without sacrificing the editorial standard your brand depends on.",
    sections: [
      {
        id: "where-cost-goes",
        heading: "Where content costs actually go",
        blocks: [
          {
            type: "p",
            text: "Most content budgets are spent not on the writing itself but on everything around it: researching the topic, gathering sources, outlining, drafting, editing, formatting, adding metadata and distributing across channels. Automating the predictable steps is where the savings are.",
          },
        ],
      },
      {
        id: "the-pipeline",
        heading: "An AI content pipeline, step by step",
        blocks: [
          { type: "p", text: "A practical, quality-controlled pipeline looks like this:" },
          {
            type: "ol",
            items: [
              "Research: AI gathers and summarises sources on the topic for a human to review.",
              "Outline: AI proposes a structure aligned to search intent; an editor approves it.",
              "Draft: AI produces a first draft in your brand voice from the approved outline.",
              "Edit: a human edits for accuracy, nuance and voice — the irreplaceable step.",
              "Optimise: AEO and SEO formatting, schema and internal links are applied.",
              "Publish & repurpose: the piece is published and automatically repurposed into social and email formats.",
            ],
          },
        ],
      },
      {
        id: "human-in-the-loop",
        heading: "Why human-in-the-loop is non-negotiable",
        blocks: [
          {
            type: "quote",
            text: "AI handles the volume; humans guarantee the quality. Remove the human and you scale your mistakes.",
          },
          {
            type: "p",
            text: "The goal is not to remove editors but to free them from low-value work so they spend their time on judgement, accuracy and brand voice. That is what keeps AI-assisted content trustworthy enough to rank and to be cited.",
          },
        ],
      },
      {
        id: "the-savings",
        heading: "What the savings look like",
        blocks: [
          {
            type: "p",
            text: "Because the time-consuming research and first-draft stages are automated, teams typically produce substantially more content for the same effort, or the same volume in far less time. The exact figure depends on your workflow, which is why we measure time-per-piece before and after so the ROI is concrete, not hypothetical.",
          },
          {
            type: "p",
            text: "Webnetic designs and builds these pipelines for Sydney businesses — including the AI content engine behind Tech Trends Central — with monitoring and human review built in.",
          },
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postSlugs = POSTS.map((p) => p.slug);
export const POST_CATEGORIES = ["All", "Web", "SEO", "AI", "Automation", "Business"] as const;
