/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.webnetic.com.au",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [
      // Allow all standard crawlers
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI / answer-engine crawlers to support GEO
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
  },
  transform: async (config, path) => {
    // Tune priority/changefreq per route group
    let priority = 0.7;
    let changefreq = "weekly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path === "/services" || path === "/work" || path === "/contact") {
      priority = 0.9;
    } else if (path.startsWith("/services/")) {
      priority = 0.85;
    } else if (path === "/locations" || path.startsWith("/locations/")) {
      priority = 0.85;
    } else if (path.startsWith("/blog")) {
      priority = 0.6;
      changefreq = "monthly";
    } else if (path === "/privacy-policy" || path === "/terms") {
      priority = 0.3;
      changefreq = "yearly";
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
