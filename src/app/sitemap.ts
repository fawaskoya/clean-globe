import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { ALL_SERVICES } from "@/lib/services-data";

const SITE_URL = "https://www.thecleanglobe.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/about/mission-vision`, changeFrequency: "yearly", priority: 0.5, lastModified: now },
    { url: `${SITE_URL}/about/advisory-board`, changeFrequency: "yearly", priority: 0.5, lastModified: now },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/insights`, changeFrequency: "weekly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
  ];

  let serviceSlugs: string[] = ALL_SERVICES.map((s) => s.slug);
  let blogEntries: MetadataRoute.Sitemap = [];
  let projectEntries: MetadataRoute.Sitemap = [];

  try {
    const dbServices = await db.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    if (dbServices.length > 0) {
      serviceSlugs = dbServices.map((s) => s.slug);
    }

    const blogPosts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogEntries = blogPosts.map((p) => ({
      url: `${SITE_URL}/insights/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: p.updatedAt,
    }));

    const projects = await db.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    projectEntries = projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: p.updatedAt,
    }));
  } catch {
    // Fall back to static catalogue at build time when the DB is unreachable.
  }

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
    lastModified: now,
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
