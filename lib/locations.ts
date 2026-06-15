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
  {
    slug: "sydney-cbd",
    name: "Sydney CBD",
    postcode: "2000",
    region: "Sydney CBD",
    blurb: "Polished, high-performance websites for the competitive Sydney CBD market.",
    intro:
      "The Sydney CBD is one of the most competitive business markets in the country, from corporate offices to hospitality, retail and startups. We build fast, polished websites that help CBD businesses stand out and convert.",
    context:
      "In the Sydney CBD, clients judge you in seconds and competition is intense. A fast, professional, search-ready website is essential to win attention, trust and enquiries in a crowded, high-expectation market.",
    industries: ["Corporate & professional services", "Finance & legal", "Hospitality & retail", "Startups & tech"],
    nearby: ["Haymarket", "The Rocks", "Pyrmont", "Barangaroo", "Surry Hills"],
    faqs: [
      {
        q: "Do you build websites for businesses in the Sydney CBD?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in the Sydney CBD (2000) and surrounding areas including Haymarket, Pyrmont, Barangaroo and Surry Hills. We work on-site and remotely.",
      },
      {
        q: "How much does a website cost in the Sydney CBD?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a CBD business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you build a website for a corporate or professional services firm?",
        a: "Yes. We build refined, fast and accessible sites for corporate, finance, legal and professional services firms, with the performance, SEO and structured data that build credibility and generate enquiries.",
      },
    ],
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    postcode: "2170",
    region: "South West Sydney",
    blurb: "Mobile-first websites and local SEO for fast-growing Liverpool businesses.",
    intro:
      "Liverpool is a major South West Sydney centre, growing fast around health, education, retail and trades. We build fast, findable websites that help Liverpool businesses reach more local customers.",
    context:
      "Liverpool is busy and growing, with a diverse mix of medical, retail, trades and professional services. Most customers search on their phone first, so a fast, mobile-first, locally optimised website turns those searches into enquiries.",
    industries: ["Health & medical", "Retail", "Trades & construction", "Professional services"],
    nearby: ["Casula", "Moorebank", "Warwick Farm", "Prestons", "Cabramatta"],
    faqs: [
      {
        q: "Do you build websites for businesses in Liverpool?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Liverpool (2170) and across South West Sydney, including Casula, Moorebank, Warwick Farm and Prestons. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Liverpool?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Liverpool business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Liverpool business rank on Google?",
        a: "Yes. We set up local SEO, including Google Business Profile, location-relevant content and LocalBusiness schema, and extend it with AEO and GEO so you also appear in featured snippets and AI answers.",
      },
    ],
  },
  {
    slug: "blacktown",
    name: "Blacktown",
    postcode: "2148",
    region: "Western Sydney",
    blurb: "Fast websites and strong local SEO for Blacktown's diverse business community.",
    intro:
      "Blacktown is one of Sydney's largest and most diverse municipalities, full of trades, retail, health and family businesses. We build fast websites and local SEO that help Blacktown businesses get found.",
    context:
      "Blacktown has a huge, varied local economy and strong competition for local searches. A quick, clear website with strong local SEO helps you stand out to nearby customers searching on Google before they choose.",
    industries: ["Trades & services", "Retail", "Health & medical", "Family businesses"],
    nearby: ["Seven Hills", "Kings Langley", "Doonside", "Prospect", "Marayong"],
    faqs: [
      {
        q: "Do you build websites for businesses in Blacktown?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Blacktown (2148) and nearby suburbs including Seven Hills, Kings Langley, Doonside and Prospect. We work locally and remotely across Western Sydney.",
      },
      {
        q: "How much does a website cost in Blacktown?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Blacktown business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Blacktown business get more local leads?",
        a: "Yes. We build fast sites with click-to-call and enquiry forms, set up local SEO so nearby customers find you, and can add AI automation to capture and follow up leads automatically.",
      },
    ],
  },
  {
    slug: "bankstown",
    name: "Bankstown",
    postcode: "2200",
    region: "Canterbury-Bankstown",
    blurb: "Mobile-first websites for Bankstown's vibrant, multicultural business hub.",
    intro:
      "Bankstown is the heart of Canterbury-Bankstown, a vibrant, diverse business hub spanning retail, food, trades and professional services. We build fast, mobile-first websites that help Bankstown businesses grow.",
    context:
      "Bankstown's business community is large, multicultural and competitive, from restaurants and shops to clinics and trades. A fast, mobile-first site with local SEO turns local searches into walk-ins and enquiries.",
    industries: ["Restaurants & food", "Retail", "Trades & services", "Health & medical"],
    nearby: ["Yagoona", "Punchbowl", "Greenacre", "Padstow", "Chester Hill"],
    faqs: [
      {
        q: "Do you build websites for businesses in Bankstown?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Bankstown (2200) and nearby suburbs including Yagoona, Punchbowl, Greenacre and Padstow. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Bankstown?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Bankstown business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Bankstown restaurant or shop get found online?",
        a: "Yes. We build fast sites with menus, bookings and enquiry forms, optimise your Google Business Profile, and prepare your site for AEO and GEO so nearby customers find you on Google and in AI answers.",
      },
    ],
  },
  {
    slug: "castle-hill",
    name: "Castle Hill",
    postcode: "2154",
    region: "The Hills District",
    blurb: "Premium, fast websites for established Hills District businesses.",
    intro:
      "Castle Hill is the commercial heart of The Hills District, home to established retail, professional services and a strong small business community. We build premium, fast websites that help Hills businesses convert.",
    context:
      "Castle Hill customers expect polish and convenience. A fast, well-designed, search-ready website helps Hills District businesses match high local expectations and win more enquiries from a competitive market.",
    industries: ["Professional services", "Retail", "Health & wellness", "Home & trades"],
    nearby: ["Baulkham Hills", "Bella Vista", "Kellyville", "Norwest", "Rouse Hill"],
    faqs: [
      {
        q: "Do you build websites for businesses in Castle Hill?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Castle Hill (2154) and across The Hills District, including Baulkham Hills, Bella Vista, Kellyville and Norwest. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Castle Hill?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Castle Hill business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Hills District business rank on Google?",
        a: "Yes. We set up local SEO, including Google Business Profile, location-relevant content and LocalBusiness schema, and extend it with AEO and GEO so you also appear in featured snippets and AI answers.",
      },
    ],
  },
  {
    slug: "chatswood",
    name: "Chatswood",
    postcode: "2067",
    region: "Lower North Shore",
    blurb: "Refined, high-performance websites for the competitive Chatswood market.",
    intro:
      "Chatswood is a busy Lower North Shore commercial centre, strong in retail, professional services, finance and hospitality. We build fast, refined websites that help Chatswood businesses stand out.",
    context:
      "Chatswood is competitive and design-conscious, with discerning customers and dense retail. A fast, polished, search-optimised website helps you earn attention and trust on the North Shore.",
    industries: ["Professional services", "Retail", "Finance", "Hospitality"],
    nearby: ["Willoughby", "Artarmon", "Lane Cove", "North Sydney", "Roseville"],
    faqs: [
      {
        q: "Do you build websites for businesses in Chatswood?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Chatswood (2067) and across the Lower North Shore, including Willoughby, Artarmon, Lane Cove and North Sydney. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Chatswood?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Chatswood business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Chatswood business rank on Google?",
        a: "Yes. We set up local SEO, including Google Business Profile, location-relevant content and LocalBusiness schema, and extend it with AEO and GEO so you also appear in featured snippets and AI answers.",
      },
    ],
  },
  {
    slug: "hurstville",
    name: "Hurstville",
    postcode: "2220",
    region: "St George",
    blurb: "Mobile-first websites for Hurstville's busy retail and food businesses.",
    intro:
      "Hurstville is a major Southern Sydney hub in the St George area, strong in retail, food, professional services and health. We build fast, mobile-first websites that help Hurstville businesses reach local customers.",
    context:
      "Hurstville is dense and diverse, with strong retail and a thriving food scene. Local customers compare on mobile, so a fast, locally optimised website turns searches into visits and enquiries.",
    industries: ["Retail", "Restaurants & food", "Professional services", "Health & medical"],
    nearby: ["Kogarah", "Allawah", "Penshurst", "Beverly Hills", "Carlton"],
    faqs: [
      {
        q: "Do you build websites for businesses in Hurstville?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Hurstville (2220) and across the St George area, including Kogarah, Allawah, Penshurst and Beverly Hills. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Hurstville?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Hurstville business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Hurstville business get found online?",
        a: "Yes. We set up local SEO, optimise your Google Business Profile, and prepare your site for AEO and GEO so nearby customers find you on Google and in AI answers.",
      },
    ],
  },
  {
    slug: "penrith",
    name: "Penrith",
    postcode: "2750",
    region: "Greater Western Sydney",
    blurb: "Fast, lead-focused websites for Penrith's growing local economy.",
    intro:
      "Penrith anchors Greater Western Sydney, with a fast-growing economy across retail, trades, health and hospitality. We build fast websites and local SEO that help Penrith businesses win more work.",
    context:
      "Penrith is growing quickly and its businesses compete hard for local attention. A fast, clear website with strong local SEO helps nearby customers find and choose you over competitors.",
    industries: ["Trades & construction", "Retail", "Health & medical", "Hospitality"],
    nearby: ["Kingswood", "Jamisontown", "Emu Plains", "St Marys", "Cranebrook"],
    faqs: [
      {
        q: "Do you build websites for businesses in Penrith?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Penrith (2750) and nearby suburbs including Kingswood, Jamisontown, Emu Plains and St Marys. We work locally and remotely across Western Sydney.",
      },
      {
        q: "How much does a website cost in Penrith?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Penrith business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Penrith trade business get more leads?",
        a: "Yes. We build fast sites with click-to-call and quote forms, set up local SEO so nearby customers find you, and can add AI automation to capture and follow up leads while you are on the job.",
      },
    ],
  },
  {
    slug: "burwood",
    name: "Burwood",
    postcode: "2134",
    region: "Sydney's Inner West",
    blurb: "Modern, fast websites for Burwood's retail, dining and service businesses.",
    intro:
      "Burwood is a thriving Inner West commercial centre, known for its retail, dining and professional services. We build fast, modern websites that help Burwood businesses stand out and convert.",
    context:
      "Burwood is busy and competitive, with strong retail and a popular food scene. A fast, mobile-first, search-ready website helps your business get found and chosen by nearby customers.",
    industries: ["Retail", "Restaurants & cafes", "Professional services", "Health & wellness"],
    nearby: ["Strathfield", "Croydon", "Enfield", "Croydon Park", "Five Dock"],
    faqs: [
      {
        q: "Do you build websites for businesses in Burwood?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Burwood (2134) and across the Inner West, including Strathfield, Croydon, Enfield and Five Dock. We work locally and remotely.",
      },
      {
        q: "How much does a website cost in Burwood?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Burwood business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Burwood business rank on Google?",
        a: "Yes. We set up local SEO, including Google Business Profile, location-relevant content and LocalBusiness schema, and extend it with AEO and GEO so you also appear in featured snippets and AI answers.",
      },
    ],
  },
  {
    slug: "merrylands",
    name: "Merrylands",
    postcode: "2160",
    region: "Western Sydney",
    blurb: "Enquiry-driven websites and local SEO for Merrylands businesses near Parramatta.",
    intro:
      "Merrylands is a busy Western Sydney centre right beside Parramatta, strong in retail, trades, food and family businesses. We build fast, findable websites that help Merrylands businesses grow.",
    context:
      "Merrylands has a large, practical local economy and plenty of competition for local searches. A fast website with click-to-call, enquiry forms and local SEO turns nearby searches into customers.",
    industries: ["Retail", "Trades & services", "Restaurants & food", "Family businesses"],
    nearby: ["Guildford", "Granville", "Holroyd", "Westmead", "South Wentworthville"],
    faqs: [
      {
        q: "Do you build websites for businesses in Merrylands?",
        a: "Yes. Webnetic builds fast, SEO-ready websites for businesses in Merrylands (2160) and nearby suburbs including Guildford, Granville, Holroyd and Westmead. We work locally and remotely across Western Sydney.",
      },
      {
        q: "How much does a website cost in Merrylands?",
        a: "Most agencies charge around $1,000 to $3,000 for a small business website. The same quality can often be delivered from around $500 to $3,000 depending on scope, so a Merrylands business does not have to overpay. Webnetic provides a fixed, itemised quote after a short discovery call.",
      },
      {
        q: "Can you help my Merrylands business get more local leads?",
        a: "Yes. We build fast sites with click-to-call and enquiry forms, set up local SEO so nearby customers find you, and can add AI automation to capture and follow up leads automatically.",
      },
    ],
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const locationSlugs = LOCATIONS.map((l) => l.slug);
