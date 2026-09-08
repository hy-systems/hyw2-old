import type { MetadataRoute } from "next";
import { getAllLocationSlugs } from "../lib/locations";

const SITE = "https://hysystems.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/infrastructure", "/services", "/performance", "/audit", "/privacy", "/terms"].map(
    (path) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const locationRoutes = getAllLocationSlugs().map((slug) => ({
    url: `${SITE}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...locationRoutes];
}
