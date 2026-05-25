import type { MetadataRoute } from "next";
import { blogSlugs } from "@/lib/blog";
import { locales, type Locale } from "@/lib/i18n";
import { servicesForSitemap } from "@/lib/seo";

const SITE_URL = "https://innovmark.site";

const staticPaths = ["/", "/contact", "/services", "/pourquoi-nous", "/processus", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const servicePaths = servicesForSitemap().map((slug) => `/services/${slug}`);
  const blogPaths = blogSlugs.map((slug) => `/blog/${slug}`);

  return [...staticPaths, ...servicePaths, ...blogPaths].flatMap((path) =>
    locales.map((locale) => entry(locale, path, now)),
  );
}

function entry(locale: Locale, path: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  const isHome = path === "/";
  return {
    url: sitemapUrl(locale, path),
    lastModified,
    changeFrequency: isHome || path.startsWith("/blog") ? "weekly" : "monthly",
    priority: isHome ? 1 : path === "/services" || path === "/blog" ? 0.9 : 0.75,
    alternates: {
      languages: sitemapAlternates(path),
    },
    images: isHome ? [`${SITE_URL}/images/hero-showcase/branding-showcase.jpg`] : undefined,
  };
}

function sitemapUrl(locale: Locale, path = "/") {
  if (path === "/") return `${SITE_URL}/${locale}`;
  return `${SITE_URL}/${locale}${path}`;
}

function sitemapAlternates(path = "/") {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, sitemapUrl(locale, path)])),
    "x-default": sitemapUrl("fr", path),
  };
}
