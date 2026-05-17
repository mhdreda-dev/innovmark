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

function asCarousel(value: Prisma.JsonValue | null | undefined): CmsCarouselImage[] {
  return Array.isArray(value)
    ? value.filter((item): item is CmsCarouselImage => Boolean(
        item &&
        typeof item === "object" &&
        "src" in item &&
        typeof item.src === "string" &&
        item.src.length > 0 &&
        "alt" in item,
      ))
    : [];
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

async function getPublishedHomeContentUncached(localeInput: string): Promise<CmsHomeContent> {
  const locale: Locale = isLocale(localeInput) ? localeInput : "fr";
  const fallback = getFallbackHomeContent(locale);
  const prisma = getPrisma();
  if (!prisma) return fallback;

  try {
    const [home, hero, services, partners, testimonials, seo] = await prisma.$transaction([
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
    ]);

    return {
      locale,
      sections: withPartnersSection(home ? asSections(home.sections) : fallback.sections),
      hero: hero
        ? {
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
          }
        : fallback.hero,
      services: services.length
        ? services.map((service): CmsService => ({
            id: service.id,
            slug: service.slug,
            title: service.title,
            description: service.description,
            icon: service.icon,
            tone: service.tone as CmsService["tone"],
            href: service.href ?? undefined,
            isActive: service.isActive,
            sortOrder: service.sortOrder,
          }))
        : fallback.services,
      partners: partners.length
        ? partners.map((partner): CmsPartner => ({
            id: partner.id,
            name: partner.name,
            logoUrl: partner.logoUrl,
            websiteUrl: partner.websiteUrl,
            description: partner.description ?? undefined,
            order: partner.order,
            isActive: partner.isActive,
          }))
        : fallback.partners,
      testimonials: testimonials.length
        ? testimonials.map((item): CmsTestimonial => ({
            id: item.id,
            quote: item.quote,
            name: item.name,
            role: item.role,
            rating: item.rating,
            isActive: item.isActive,
            sortOrder: item.sortOrder,
          }))
        : fallback.testimonials,
      seo: seo
        ? {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
            ogImage: seo.ogImage?.url,
            structuredData: seo.structuredData && typeof seo.structuredData === "object" && !Array.isArray(seo.structuredData) ? seo.structuredData as Record<string, unknown> : undefined,
            noIndex: seo.noIndex,
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
