import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

const BASE = SITE_CONFIG.siteUrl;

const routes = [
  "",
  "/product",
  "/product/skill-intelligence",
  "/product/adaptive-learning",
  "/product/ai-authoring",
  "/product/analytics",
  "/solutions",
  "/solutions/learning-development",
  "/solutions/hr",
  "/solutions/managers",
  "/solutions/enterprise",
  "/skills-gap-diagnostic",
  "/pricing",
  "/demo",
  "/about",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/product") || path.startsWith("/solutions") ? 0.8 : 0.6,
  }));
}
