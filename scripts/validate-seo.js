#!/usr/bin/env node

/**
 * SEO Validation Script
 * Tests the sitemap.xml and robots.txt endpoints
 */

const fetch = require("node-fetch");

const BASE_URL = "http://localhost:3000";

async function validateSitemap() {
  console.log("🔍 Validating sitemap.xml...");

  try {
    const response = await fetch(`${BASE_URL}/sitemap.xml`);
    const text = await response.text();

    // Check if it's valid XML
    if (!text.includes("<?xml") || !text.includes("<urlset")) {
      console.error("❌ Sitemap is not valid XML");
      return false;
    }

    // Count URLs
    const urlMatches = text.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;

    console.log(`✅ Sitemap contains ${urlCount} URLs`);

    // Check for priorities
    if (text.includes("<priority>1</priority>")) {
      console.log("✅ Homepage has priority 1.0");
    }

    // Check for change frequencies
    if (text.includes("<changefreq>")) {
      console.log("✅ Change frequencies are set");
    }

    // Check for last modified dates
    if (text.includes("<lastmod>")) {
      console.log("✅ Last modified dates are included");
    }

    return true;
  } catch (error) {
    console.error("❌ Error validating sitemap:", error.message);
    return false;
  }
}

async function validateRobots() {
  console.log("\n🤖 Validating robots.txt...");

  try {
    const response = await fetch(`${BASE_URL}/robots.txt`);
    const text = await response.text();

    // Check basic structure
    if (!text.includes("User-agent:")) {
      console.error("❌ Robots.txt missing User-agent directive");
      return false;
    }

    if (!text.includes("Sitemap:")) {
      console.error("❌ Robots.txt missing Sitemap directive");
      return false;
    }

    // Check for API blocking
    if (text.includes("Disallow: /api/")) {
      console.log("✅ API endpoints are blocked");
    }

    // Check for Next.js internals blocking
    if (text.includes("Disallow: /_next/")) {
      console.log("✅ Next.js internals are blocked");
    }

    // Check crawl delay
    if (text.includes("Crawl-delay:")) {
      console.log("✅ Crawl delay is set");
    }

    console.log("✅ Robots.txt is properly configured");
    return true;
  } catch (error) {
    console.error("❌ Error validating robots.txt:", error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 SEO Configuration Validation\n");

  const sitemapValid = await validateSitemap();
  const robotsValid = await validateRobots();

  if (sitemapValid && robotsValid) {
    console.log("\n🎉 All SEO configurations are valid!");
    console.log("\n📋 Next Steps:");
    console.log("1. Submit sitemap to Google Search Console");
    console.log("2. Submit sitemap to Bing Webmaster Tools");
    console.log("3. Monitor crawl statistics");
    console.log("4. Check for crawl errors after deployment");
  } else {
    console.log("\n⚠️  Some SEO configurations need attention");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
