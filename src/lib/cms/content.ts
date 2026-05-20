import "server-only";

import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import { isLocale, type Locale } from "@/lib/i18n";
import { getFallbackHomeContent } from "./fallbacks";
import { getPrisma } from "./prisma";
import type { CmsCarouselImage, CmsFeature, CmsHomeContent, CmsPartner, CmsService, CmsTestimonial } from "./types";

function asFeatures(value: Prisma.JsonValue | null | undefined): CmsFeature[] {
  return Array.isArray(value)
    ? value.filter((item): item is CmsFeature => Boolean(item && typeof item === "object" && "title" in item && "description" in item))
    : [];
}

function getCarouselImageUrl(item: Record<string, unknown>) {
  const imageUrl = item.imageUrl || item.url || item.secureUrl || item.src || item.mediaUrl;
  return typeof imageUrl === "string" ? imageUrl : "";
}

function asCarousel(value: Prisma.JsonValue | null | undefined): CmsCarouselImage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => Boolean(item && typeof item === "object" && !Array.isArray(item)))
    .map((item, index): CmsCarouselImage | null => {
      const record = item as Record<string, unknown>;
      const imageUrl = getCarouselImageUrl(record);
      if (!imageUrl) {
        console.warn("Missing hero carousel imageUrl", record);
        return null;
      }

      return {
        id: typeof record.id === "string" && record.id ? record.id : `hero-image-${index + 1}`,
        src: imageUrl,
        imageUrl,
        alt: typeof record.alt === "string" && record.alt ? record.alt : "Hero image",
        rotation: Number.isFinite(Number(record.rotation)) ? Number(record.rotation) : 0,
      };
    })
    .filter((item): item is CmsCarouselImage => Boolean(item));
}

function asSections(value: Prisma.JsonValue | null | undefined): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function withPartnersSection(sections: string[]) {
  if (sections.includes("partners")) return sections;
  const capabilitiesIndex = sections.indexOf("capabilities");
  if (capabilitiesIndex === -1) return [...sections, "partners"];
  return [
    ...sections.slice(0, capabilitiesIndex + 1),
    "partners",
    ...sections.slice(capabilitiesIndex + 1),
  ];
}

function mapService(service: {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  tone: string;
  href: string | null;
  isActive: boolean;
  sortOrder: number;
}): CmsService {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    description: service.description,
    icon: service.icon,
    tone: service.tone as CmsService["tone"],
    href: service.href ?? undefined,
    isActive: service.isActive,
    sortOrder: service.sortOrder,
  };
}

function mapTestimonial(item: {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
}): CmsTestimonial {
  return {
    id: item.id,
    quote: item.quote,
    name: item.name,
    role: item.role,
    rating: item.rating,
    isActive: item.isActive,
    sortOrder: item.sortOrder,
  };
}

async function getPublishedHomeContentUncached(localeInput: string): Promise<CmsHomeContent> {
  const locale: Locale = isLocale(localeInput) ? localeInput : "fr";
  const fallback = getFallbackHomeContent(locale);
  const prisma = getPrisma();
  if (!prisma) return fallback;

  try {
    const [home, hero, services, partners, testimonials, seo, frHome, frHero, frServices, frPartners, frTestimonials, frSeo] = await prisma.$transaction([
      prisma.homePageContent.findUnique({ where: { locale_status: { locale, status: "PUBLISHED" } } }),
      prisma.heroSection.findUnique({
        where: { locale_status: { locale, status: "PUBLISHED" } },
        include: { backgroundVideo: true },
      }),
      prisma.serviceSection.findMany({
        where: { locale, status: "PUBLISHED", isActive: true },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.partner.findMany({
        where: { locale, status: "PUBLISHED", isActive: true },
        orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.testimonial.findMany({
        where: { locale, status: "PUBLISHED", isActive: true },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.seoMetadata.findUnique({
        where: { locale_status_pagePath: { locale, status: "PUBLISHED", pagePath: `/${locale}` } },
        include: { ogImage: true },
      }),
      prisma.homePageContent.findUnique({ where: { locale_status: { locale: "fr", status: "PUBLISHED" } } }),
      prisma.heroSection.findUnique({
        where: { locale_status: { locale: "fr", status: "PUBLISHED" } },
        include: { backgroundVideo: true },
      }),
      prisma.serviceSection.findMany({
        where: { locale: "fr", status: "PUBLISHED", isActive: true },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.partner.findMany({
        where: { locale: "fr", status: "PUBLISHED", isActive: true },
        orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.testimonial.findMany({
        where: { locale: "fr", status: "PUBLISHED", isActive: true },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      }),
      prisma.seoMetadata.findUnique({
        where: { locale_status_pagePath: { locale: "fr", status: "PUBLISHED", pagePath: "/fr" } },
        include: { ogImage: true },
      }),
    ]);

    const homeSource = home ?? frHome;
    const heroSource = hero ?? frHero;
    const localeCarouselImages = hero ? asCarousel(hero.carouselImages) : [];
    const frCarouselImages = frHero ? asCarousel(frHero.carouselImages) : [];
    const carouselImages = localeCarouselImages.length ? localeCarouselImages : frCarouselImages;
    const serviceSource = services.length ? services : frServices;
    const partnerSource = partners.length ? partners : frPartners;
    const testimonialSource = testimonials.length ? testimonials : frTestimonials;
    const seoSource = seo ?? frSeo;

    return {
      locale,
      sections: withPartnersSection(homeSource ? asSections(homeSource.sections) : fallback.sections),
      hero: heroSource
        ? {
            eyebrow: hero?.eyebrow ?? heroSource.eyebrow,
            title: hero?.title ?? heroSource.title,
            description: hero?.description ?? heroSource.description,
            ctaLabel: hero?.ctaLabel ?? heroSource.ctaLabel,
            ctaHref: hero?.ctaHref ?? heroSource.ctaHref,
            secondaryCtaLabel: hero?.secondaryCtaLabel ?? heroSource.secondaryCtaLabel ?? fallback.hero.secondaryCtaLabel,
            secondaryCtaHref: hero?.secondaryCtaHref ?? heroSource.secondaryCtaHref ?? fallback.hero.secondaryCtaHref,
            whatsappMessage: hero?.whatsappMessage ?? heroSource.whatsappMessage ?? fallback.hero.whatsappMessage,
            heroVideoUrl: hero?.heroVideoUrl ?? hero?.backgroundVideo?.url ?? heroSource.heroVideoUrl ?? heroSource.backgroundVideo?.url ?? "",
            features: hero ? asFeatures(hero.features) : asFeatures(heroSource.features),
            carouselImages: carouselImages.length ? carouselImages : fallback.hero.carouselImages,
            backgroundVideoUrl: hero?.backgroundVideo?.url ?? heroSource.backgroundVideo?.url,
          }
        : fallback.hero,
      services: serviceSource.length
        ? serviceSource.map(mapService)
        : fallback.services,
      partners: partnerSource.length
        ? partnerSource.map((partner): CmsPartner => ({
            id: partner.id,
            name: partner.name,
            logoUrl: partner.logoUrl,
            websiteUrl: partner.websiteUrl,
            description: partner.description ?? undefined,
            order: partner.order,
            isActive: partner.isActive,
          }))
        : fallback.partners,
      testimonials: testimonialSource.length
        ? testimonialSource.map(mapTestimonial)
        : fallback.testimonials,
      seo: seoSource
        ? {
            title: seo?.title ?? seoSource.title,
            description: seo?.description ?? seoSource.description,
            keywords: seo?.keywords ?? seoSource.keywords,
            ogImage: seo?.ogImage?.url ?? seoSource.ogImage?.url,
            structuredData: seoSource.structuredData && typeof seoSource.structuredData === "object" && !Array.isArray(seoSource.structuredData) ? seoSource.structuredData as Record<string, unknown> : undefined,
            noIndex: seo?.noIndex ?? seoSource.noIndex,
          }
        : fallback.seo,
    };
  } catch (error) {
    console.error("CMS content fallback activated", error);
    return fallback;
  }
}

export const getPublishedHomeContent = unstable_cache(getPublishedHomeContentUncached, ["cms-home"], {
  revalidate: 300,
  tags: ["cms-home"],
});

export async function getDraftHomeContent(locale: Locale): Promise<CmsHomeContent> {
  const prisma = getPrisma();
  const fallback = getFallbackHomeContent(locale);
  if (!prisma) return fallback;

  const [home, hero, services, partners, testimonials, seo] = await prisma.$transaction([
    prisma.homePageContent.findUnique({ where: { locale_status: { locale, status: "DRAFT" } } }),
    prisma.heroSection.findUnique({ where: { locale_status: { locale, status: "DRAFT" } }, include: { backgroundVideo: true } }),
    prisma.serviceSection.findMany({ where: { locale, status: "DRAFT" }, orderBy: [{ sortOrder: "asc" }] }),
    prisma.partner.findMany({ where: { locale, status: "DRAFT" }, orderBy: [{ order: "asc" }] }),
    prisma.testimonial.findMany({ where: { locale, status: "DRAFT" }, orderBy: [{ sortOrder: "asc" }] }),
    prisma.seoMetadata.findUnique({ where: { locale_status_pagePath: { locale, status: "DRAFT", pagePath: `/${locale}` } }, include: { ogImage: true } }),
  ]);

  return {
    ...fallback,
    sections: withPartnersSection(home ? asSections(home.sections) : fallback.sections),
    hero: hero ? {
      ...fallback.hero,
      eyebrow: hero.eyebrow,
      title: hero.title,
      description: hero.description,
      ctaLabel: hero.ctaLabel,
      ctaHref: hero.ctaHref,
      secondaryCtaLabel: hero.secondaryCtaLabel ?? fallback.hero.secondaryCtaLabel,
      secondaryCtaHref: hero.secondaryCtaHref ?? fallback.hero.secondaryCtaHref,
      whatsappMessage: hero.whatsappMessage ?? fallback.hero.whatsappMessage,
      heroVideoUrl: hero.heroVideoUrl ?? hero.backgroundVideo?.url ?? "",
      features: asFeatures(hero.features),
      carouselImages: asCarousel(hero.carouselImages).length ? asCarousel(hero.carouselImages) : fallback.hero.carouselImages,
      backgroundVideoUrl: hero.backgroundVideo?.url,
    } : fallback.hero,
    services: services.length ? services.map((service) => ({
      id: service.id,
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: service.icon,
      tone: service.tone as CmsService["tone"],
      href: service.href ?? undefined,
      isActive: service.isActive,
      sortOrder: service.sortOrder,
    })) : fallback.services,
    partners: partners.length ? partners.map((partner) => ({
      id: partner.id,
      name: partner.name,
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl,
      description: partner.description ?? undefined,
      order: partner.order,
      isActive: partner.isActive,
    })) : fallback.partners,
    testimonials: testimonials.length ? testimonials.map((item) => ({
      id: item.id,
      quote: item.quote,
      name: item.name,
      role: item.role,
      rating: item.rating,
      isActive: item.isActive,
      sortOrder: item.sortOrder,
    })) : fallback.testimonials,
    seo: seo ? {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      ogImage: seo.ogImage?.url,
      structuredData: seo.structuredData && typeof seo.structuredData === "object" && !Array.isArray(seo.structuredData) ? seo.structuredData as Record<string, unknown> : undefined,
      noIndex: seo.noIndex,
    } : fallback.seo,
  };
}
