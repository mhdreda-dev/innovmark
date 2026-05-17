import type { Locale } from "@/lib/i18n";

export type CmsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type CmsFeature = {
  title: string;
  description: string;
};

export type CmsCarouselImage = {
  id: string;
  src: string;
  alt: string;
  rotation: number;
};

export type CmsHero = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  whatsappMessage: string;
  heroVideoUrl?: string;
  features: CmsFeature[];
  carouselImages: CmsCarouselImage[];
  backgroundVideoUrl?: string;
};

export type CmsService = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  tone: "cyan" | "violet" | "emerald";
  href?: string;
  isActive: boolean;
  sortOrder: number;
};

export type CmsTestimonial = {
  id?: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
};

export type CmsPartner = {
  id?: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description?: string;
  order: number;
  isActive: boolean;
};

export type CmsSeo = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: Record<string, unknown>;
  noIndex: boolean;
};

export type CmsMediaAsset = {
  id: string;
  kind: "IMAGE" | "VIDEO" | "DOCUMENT";
  provider: string;
  url: string;
  filename: string;
  alt?: string | null;
  mimeType: string;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  sizeBytes: number;
  createdAt: string;
};

export type CmsHomeContent = {
  locale: Locale;
  sections: string[];
  hero: CmsHero;
  services: CmsService[];
  partners: CmsPartner[];
  testimonials: CmsTestimonial[];
  seo: CmsSeo;
};
