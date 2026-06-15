// Local service-landing data. One entry per suburb → /locations/[slug].
// Edit copy here; pages, hub, footer links and sitemap all read from this.

export type Location = {
  slug: string;
  name: string;
  postcode: string;
  region: string; // e.g. "Western Sydney"
  blurb: string; // short, for the hub directory + footer
  intro: string; // hero value proposition (unique per suburb)
  context: string; // why businesses there need a strong website
  industries: string[];
  nearby: string[];
  blogSlug?: string; // matching blog article for cross-linking
  faqs: { q: string; a: string }[];
};

export const LOCATIONS: Location[] = [
  {
    slug: "parramatta",
    name: "Parramatta",
    postcode: "2150",
    region: "Western Sydney",
    blurb: "Fast, SEO-ready websites for Parramatta's competitive business district.",
    intro:
      "Parramatta is the commercial heart of Western Sydney and one of the fastest-growing business districts in Australia. We build fast, search-ready websites that help Parramatta businesses stand out and win more customers.",
    context:
      "Parramatta is dense, competitive and growing fast, spanning professional services, hospitality, retail, health and trades. Customers compare businesses on their phones before they choose, so a slow or hard-to-find website quietly sends them to a competitor.",
    industries: ["Professional services", "Hospitality & retail", "Health & medical", "Trades & construction"],
    nearby: ["Harris Park", "Westmead", "Rosehill", "Merrylands", "Granville"],
    blogSlug: "web-design-agency-parramatta",
    faqs: [
      {
        q: "Do you build websites for businesses in Parramatta?",
        a: "Yes. Webnetic Digital Solutions builds fast, SEO-ready websites for businesses in Parramatta (2150) and across Western Sydney, including Harris Park, Westmead, Rosehill, Merrylands and Granville. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Parramatta?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Parramatta business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Do you offer local SEO for Parramatta?",
        a: "Yes. We set up Google Business Profile, consistent business details, location-relevant content and LocalBusiness schema so nearby customers find you on Google, and we extend this with AEO and GEO for AI search.",
      },
    ],
  },
  {
    slug: "auburn",
    name: "Auburn",
    postcode: "2144",
    region: "Western Sydney",
    blurb: "Mobile-first websites and local SEO for Auburn's diverse small businesses.",
    intro:
      "Auburn is one of Sydney's most diverse and entrepreneurial suburbs, full of retail, hospitality, trades and family businesses. We build fast, mobile-first websites that help Auburn businesses reach more local customers.",
    context:
      "Auburn has a thriving, multicultural small business community, from restaurants and grocers to trades and professional services. Local customers search on mobile before they buy, so a fast, clear, mobile-first website turns those searches into walk-ins, calls and enquiries.",
    industries: ["Restaurants & grocers", "Retail", "Trades & services", "Family businesses"],
    nearby: ["Lidcombe", "Berala", "Regents Park", "Granville", "Silverwater"],
    blogSlug: "web-design-auburn",
    faqs: [
      {
        q: "Do you build websites for businesses in Auburn?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Auburn (2144) and nearby suburbs including Lidcombe, Berala, Regents Park and Granville. We work locally and remotely across Western Sydney.",
      },
      {
        q: "How much does a website cost for an Auburn business?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on pages and features, so an Auburn business does not have to overpay. Webnetic provides a fixed, itemised quote with no surprises.",
      },
      {
        q: "Can you help my Auburn business rank on Google?",
        a: "Yes. We set up local SEO, including Google Business Profile, location-relevant content and LocalBusiness schema, and extend it with AEO and GEO so you also appear in featured snippets and AI answers.",
      },
    ],
  },
  {
    slug: "ashfield",
    name: "Ashfield",
    postcode: "2131",
    region: "Sydney's Inner West",
    blurb: "Modern websites for Ashfield's food scene, retail and professional services.",
    intro:
      "Ashfield sits in Sydney's Inner West and mixes long-established local businesses with a renowned food scene and growing professional services. We build fast, findable websites that help Ashfield businesses stand out.",
    context:
      "Ashfield is busy and competitive, known for its restaurants, cafes, retail and service businesses. People search and compare on their phones before they visit, so a slow or dated website quietly sends them to a competitor.",
    industries: ["Restaurants & cafes", "Retail", "Professional services", "Health & wellness"],
    nearby: ["Summer Hill", "Croydon", "Haberfield", "Burwood", "Croydon Park"],
    blogSlug: "web-design-ashfield",
    faqs: [
      {
        q: "Do you build websites for businesses in Ashfield?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Ashfield (2131) and the surrounding Inner West, including Summer Hill, Croydon, Haberfield and Burwood. We work locally and remotely.",
      },
      {
        q: "How much does a website cost for an Ashfield business?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so an Ashfield business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Ashfield restaurant or shop get found online?",
        a: "Yes. We set up local SEO, menus, bookings and enquiry forms, optimise your Google Business Profile, and prepare your site for AEO and GEO so nearby customers find you on Google and in AI answers.",
      },
    ],
  },
  {
    slug: "granville",
    name: "Granville",
    postcode: "2142",
    region: "Western Sydney",
    blurb: "Enquiry-driven websites and local SEO for Granville trades and retail.",
    intro:
      "Granville is a hard-working Western Sydney hub, strong in trades, automotive, retail and food, and sitting right beside Parramatta. We build fast, easy-to-find websites that help local Granville businesses win more work.",
    context:
      "Granville is busy and practical, full of trades, mechanics, suppliers, shops and restaurants. Most people look up a business on their phone before they call, so a fast, clear website with obvious contact details turns those searches into jobs and sales.",
    industries: ["Trades & automotive", "Suppliers & wholesale", "Retail", "Restaurants & food"],
    nearby: ["Clyde", "Rosehill", "Merrylands", "Auburn", "Parramatta"],
    blogSlug: "web-design-granville",
    faqs: [
      {
        q: "Do you build websites for businesses in Granville?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Granville (2142) and nearby suburbs including Clyde, Rosehill, Merrylands, Auburn and Parramatta. We work locally and remotely across Western Sydney.",
      },
      {
        q: "How much does a website cost for a Granville business?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, and for trades and local services a focused enquiry-driven site usually sits at the lower end. Webnetic provides a fixed, itemised quote upfront.",
      },
      {
        q: "Can you help my Granville trade business get more leads?",
        a: "Yes. We build fast sites with click-to-call and quote forms, set up local SEO so nearby customers find you, and can add AI automation to capture and follow up leads while you are on the job.",
      },
    ],
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const locationSlugs = LOCATIONS.map((l) => l.slug);
