import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import siteMetadata from "@/data/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;
  const publishedBlogs = allBlogs.filter((post) => !post.draft);

  // Static pages with strategic priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // Homepage gets highest priority
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9, // Blog index is very important
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9, // Work/portfolio page
    },
    {
      url: `${siteUrl}/hire`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8, // Hire page for business
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7, // Contact page
    },
  ];

  // Dynamic blog posts with proper SEO metadata
  const blogRoutes: MetadataRoute.Sitemap = publishedBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const postDate = new Date(post.lastmod || post.date);
      const daysSincePost = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24));

      // Recent posts get higher priority and more frequent updates
      let priority = 0.7;
      let changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never" = "monthly";

      if (daysSincePost < 7) {
        priority = 0.8;
        changeFrequency = "weekly";
      } else if (daysSincePost < 30) {
        priority = 0.7;
        changeFrequency = "monthly";
      } else if (daysSincePost < 365) {
        priority = 0.6;
        changeFrequency = "yearly";
      } else {
        priority = 0.5;
        changeFrequency = "never";
      }

      return {
        url: `${siteUrl}/${post.path}`,
        lastModified: postDate,
        changeFrequency,
        priority,
      };
    });

  // Tag pages (if you have individual tag pages)
  const tagRoutes: MetadataRoute.Sitemap = [];
  const uniqueTags = [...new Set(publishedBlogs.flatMap((post) => post.tags || []))];

  uniqueTags.forEach((tag) => {
    if (tag) {
      tagRoutes.push({
        url: `${siteUrl}/blog/tags/${slug(tag)}/page/1`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  });

  // Blog pagination pages
  const postsPerPage = 5; // Adjust based on your pagination
  const totalPages = Math.ceil(publishedBlogs.length / postsPerPage);
  const paginationRoutes: MetadataRoute.Sitemap = [];

  for (let page = 2; page <= totalPages; page++) {
    paginationRoutes.push({
      url: `${siteUrl}/blog/page/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    });
  }

  return [...staticPages, ...blogRoutes, ...tagRoutes, ...paginationRoutes];
}
