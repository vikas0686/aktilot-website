import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/demo/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/docs/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/docs/architecture/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/docs/observability/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/docs/api/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/blog/`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
