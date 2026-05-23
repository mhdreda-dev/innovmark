import "server-only";

import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import { isLocale, type Locale } from "@/lib/i18n";
import { fallbackServices, getFallbackHomeContent } from "./fallbacks";
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

const arabicServiceCopy = new Map(
  fallbackServices.ar.map((service) => [
    service.slug,
    {
      title: service.title,
      description: service.description,
    },
  ]),
);

const arabicServiceTitleAliases = new Map([
  ["branding & identite", "branding"],
  ["branding & identity", "branding"],
  ["creation de sites web", "website-creation"],
  ["website creation", "website-creation"],
  ["videos promotionnelles", "promotional-videos"],
  ["promotional videos", "promotional-videos"],
  ["gestion reseaux sociaux", "social-media"],
  ["social media", "social-media"],
  ["publicites payantes", "paid-ads"],
  ["paid ads", "paid-ads"],
  ["publicite", "paid-ads"],
  ["ads", "paid-ads"],
  ["strategy", "stock-management"],
  ["strategie", "stock-management"],
  ["strategie digitale", "stock-management"],
]);

function normalizeServiceTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function localizeArabicService(service: CmsService): CmsService {
  const aliasSlug = arabicServiceTitleAliases.get(normalizeServiceTitle(service.title));
  const copy = arabicServiceCopy.get(service.slug) ?? (aliasSlug ? arabicServiceCopy.get(aliasSlug) : undefined);
  if (!copy) return service;

  return {
    ...service,
    title: copy.title,
    description: copy.description,
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

const arabicHeroCopy = {
  eyebrow: "وكالة ماركتينغ بريميوم",
  title: "INNOVMARK — خلّي البراند ديالك يبان باحترافية",
  description: "كنصايبو ليك مواقع، براندينغ، إعلانات ومحتوى كرييتيف باش المشروع ديالك يكبر ويبان بثقة.",
  ctaLabel: "طلب عرض السعر",
  secondaryCtaLabel: "تواصل معنا",
};

const frenchTextReplacements = new Map([
  ["Premium Marketing Agency", "Agence marketing premium"],
  ["INNOVMARK — Transform your digital presence", "INNOVMARK — Transformez votre présence digitale"],
  ["Sites web, branding, publicité, contenu créatif et stratégie digitale pour faire grandir votre marque.", "Création de contenu, branding, publicité et stratégie digitale pour développer votre entreprise."],
  ["Websites, branding, advertising, creative content and digital strategy to grow your brand.", "Création de contenu, branding, publicité et stratégie digitale pour développer votre entreprise."],
  ["Request a quote", "Obtenir un audit gratuit"],
  ["Demander un devis", "Obtenir un audit gratuit"],
  ["Contact us", "Voir nos réalisations"],
  ["Nous contacter", "Voir nos réalisations"],
  ["Hello INNOVMARK, I would like a quote", "Bonjour INNOVMARK, je souhaite obtenir un audit gratuit."],
  ["Bonjour INNOVMARK, je veux un devis", "Bonjour INNOVMARK, je souhaite obtenir un audit gratuit."],
  ["Premium Branding", "Identité de marque premium"],
  ["Visual identities that stay in mind.", "Identités visuelles qui marquent les esprits."],
  ["AI Growth", "Croissance IA"],
  ["Data-driven strategies with measurable results.", "Stratégies pilotées par les données, résultats mesurables."],
  ["Promotional Videos", "Vidéos promotionnelles"],
  ["Premium films, reels and ads designed to stop the scroll and raise perception.", "Films, reels et publicités premium conçus pour capter l'attention et élever la perception."],
  ["Website Creation", "Création de sites web"],
  ["Fast websites and landing pages that build trust on every screen.", "Sites vitrines et pages d'atterrissage rapides qui inspirent confiance sur chaque écran."],
  ["Branding & Identity", "Identité de marque"],
  ["Logo, art direction and visual systems for a more desirable brand.", "Logo, direction artistique et système visuel pour installer une marque plus désirable."],
  ["Innovmark made our brand look like it belonged in a higher category. The work was sharp, fast, and commercially clear.", "Innovmark a donné à notre marque une présence plus haut de gamme. Le travail était précis, rapide et très clair commercialement."],
  ["The website, videos and campaign assets finally felt connected. We stopped explaining our value and started showing it.", "Le site, les vidéos et les supports de campagne sont enfin devenus cohérents. Nous n'avions plus besoin d'expliquer notre valeur, elle se voyait."],
  ["Communication was direct, premium and structured. They understood the business side, not only the visuals.", "La communication était directe, premium et structurée. Ils ont compris les enjeux business, pas seulement l'esthétique."],
  ["Founder · Retail Brand", "Fondateur · Marque retail"],
  ["Managing Partner · Service Co.", "Associée gérante · Société de services"],
  ["Owner · Real Estate Group", "Dirigeant · Groupe immobilier"],
]);

const frenchAuditHref = `https://wa.me/212771450503?text=${encodeURIComponent("Bonjour INNOVMARK, je souhaite obtenir un audit gratuit.")}`;

function frenchText(value: string) {
  return frenchTextReplacements.get(value) ?? value;
}

function localizeFrenchHomeContent(content: CmsHomeContent): CmsHomeContent {
  return {
    ...content,
    hero: {
      ...content.hero,
      eyebrow: frenchText(content.hero.eyebrow),
      title: frenchText(content.hero.title),
      description: frenchText(content.hero.description),
      ctaLabel: frenchText(content.hero.ctaLabel),
      ctaHref: frenchAuditHref,
      secondaryCtaLabel: frenchText(content.hero.secondaryCtaLabel),
      secondaryCtaHref: "/fr#work",
      whatsappMessage: frenchText(content.hero.whatsappMessage),
      features: content.hero.features.map((feature) => ({
        ...feature,
        title: frenchText(feature.title),
        description: frenchText(feature.description),
      })),
    },
    services: content.services.map((service) => ({
      ...service,
      title: frenchText(service.title),
      description: frenchText(service.description),
    })),
    testimonials: content.testimonials.map((testimonial) => ({
      ...testimonial,
      quote: frenchText(testimonial.quote),
      role: frenchText(testimonial.role),
    })),
  };
}

function localizeHomeContent(locale: Locale, content: CmsHomeContent): CmsHomeContent {
  return locale === "fr" ? localizeFrenchHomeContent(content) : content;
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
    const serviceSource = locale === "ar" ? services : services.length ? services : frServices;
    const partnerSource = partners.length ? partners : frPartners;
    const testimonialSource = testimonials.length ? testimonials : frTestimonials;
    const seoSource = seo ?? frSeo;
    const heroTextSource = locale === "ar" ? null : heroSource;

    return localizeHomeContent(locale, {
      locale,
      sections: withPartnersSection(homeSource ? asSections(homeSource.sections) : fallback.sections),
      hero: heroSource
        ? {
            eyebrow: locale === "ar" ? arabicHeroCopy.eyebrow : hero?.eyebrow ?? heroTextSource?.eyebrow ?? fallback.hero.eyebrow,
            title: locale === "ar" ? arabicHeroCopy.title : hero?.title ?? heroTextSource?.title ?? fallback.hero.title,
            description: locale === "ar" ? arabicHeroCopy.description : hero?.description ?? heroTextSource?.description ?? fallback.hero.description,
            ctaLabel: locale === "ar" ? arabicHeroCopy.ctaLabel : hero?.ctaLabel ?? heroTextSource?.ctaLabel ?? fallback.hero.ctaLabel,
            ctaHref: locale === "ar" ? hero?.ctaHref ?? fallback.hero.ctaHref : hero?.ctaHref ?? heroSource.ctaHref,
            secondaryCtaLabel: locale === "ar" ? arabicHeroCopy.secondaryCtaLabel : hero?.secondaryCtaLabel ?? heroTextSource?.secondaryCtaLabel ?? fallback.hero.secondaryCtaLabel,
            secondaryCtaHref: locale === "ar" ? hero?.secondaryCtaHref ?? fallback.hero.secondaryCtaHref : hero?.secondaryCtaHref ?? heroSource.secondaryCtaHref ?? fallback.hero.secondaryCtaHref,
            whatsappMessage: locale === "ar" ? hero?.whatsappMessage ?? fallback.hero.whatsappMessage : hero?.whatsappMessage ?? heroSource.whatsappMessage ?? fallback.hero.whatsappMessage,
            heroVideoUrl: hero?.heroVideoUrl ?? hero?.backgroundVideo?.url ?? heroSource.heroVideoUrl ?? heroSource.backgroundVideo?.url ?? "",
            features: locale === "ar" ? (hero ? asFeatures(hero.features) : fallback.hero.features) : hero ? asFeatures(hero.features) : asFeatures(heroSource.features),
            carouselImages: carouselImages.length ? carouselImages : fallback.hero.carouselImages,
            backgroundVideoUrl: hero?.backgroundVideo?.url ?? heroSource.backgroundVideo?.url,
          }
        : fallback.hero,
      services: serviceSource.length
        ? serviceSource.map(mapService).map((service) => locale === "ar" ? localizeArabicService(service) : service)
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
    });
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
