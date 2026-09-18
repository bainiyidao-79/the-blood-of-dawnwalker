import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { listArticles, listSections } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  entries.push({
    url: `${siteUrl}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  });

  for (const section of listSections()) {
    entries.push({
      url: `${siteUrl}/${section}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const meta of listArticles(section)) {
      entries.push({
        url: `${siteUrl}/${section}/${meta.slug}`,
        lastModified: meta.updated ? new Date(meta.updated) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
