"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { requireAdmin } from "@/lib/cms/auth";
import { defaultHomeSections, getFallbackHomeContent } from "@/lib/cms/fallbacks";
import { getPrisma } from "@/lib/cms/prisma";
import { cleanText, cleanUrl, safeJson } from "@/lib/cms/sanitize";
import { isLocale, type Locale } from "@/lib/i18n";

type ActionState = { ok: boolean; message: string };

const localeSchema = z.enum(["fr", "en", "ar"]);

const featureSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(240),
});

const carouselSchema = z.object({
  id: z.string().min(1).max(120),
  src: z.string().min(1).max(1200),
  alt: z.string().min(1).max(180),
  rotation: z.coerce.number().min(-20).max(20),
});

const heroSchema = z.object({
  locale: localeSchema,
  eyebrow: z.string().min(1).max(160),
  title: z.string().min(1).max(220),
  description: z.string().min(1).max(1200),
  ctaLabel: z.string().max(100).default(""),
  ctaHref: z.string().max(1200).default(""),
  secondaryCtaLabel: z.string().max(100).optional(),
  secondaryCtaHref: z.string().max(1200).optional(),
  whatsappMessage: z.string().max(500).optional(),
  heroVideoUrl: z.string().max(1200).optional().default(""),
  features: z.array(featureSchema).max(6),
  carouselImages: z.array(carouselSchema).max(12).default([]),
});

const serviceSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).max(120),
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(800),
  icon: z.string().min(1).max(80),
  tone: z.enum(["cyan", "violet", "emerald"]),
  href: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.coerce.number(),
});

const testimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string().min(1).max(1200),
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(160),
  rating: z.coerce.number().min(1).max(5),
  isActive: z.boolean(),
  sortOrder: z.coerce.number(),
});

const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(160),
  logoUrl: z.string().min(1).max(1200),
  websiteUrl: z.string().min(1).max(1200),
  description: z.string().max(300).optional(),
  order: z.coerce.number().optional(),
  isActive: z.boolean(),
});

const seoSchema = z.object({
  locale: localeSchema,
  title: z.string().min(1).max(180),
  description: z.string().min(1).max(500),
  keywords: z.array(z.string().min(1).max(60)).max(30),
  ogImage: z.string().optional(),
  structuredData: z.record(z.string(), z.unknown()).optional(),
  noIndex: z.boolean(),
});

function dbOrMessage(): ReturnType<typeof getPrisma> {
  return getPrisma();
}

function refresh(locale: Locale) {
  revalidateTag("cms-home", { expire: 0 });
  revalidatePath(`/${locale}`);
}

function clampTilt(value: unknown) {
  const numericValue = Number(value ?? 0);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.min(20, Math.max(-20, numericValue));
}

function cleanCarouselImages(value: unknown) {
  return safeJson<unknown[]>(value, [])
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"))
    .map((item, index) => ({
      id: cleanText(item.id, 120) || `hero-image-${index + 1}`,
      src: cleanUrl(item.src),
      alt: cleanText(item.alt, 180) || "Hero image",
      rotation: clampTilt(item.rotation),
    }))
    .filter((item) => item.src);
}

function zodMessage(error: z.ZodError) {
  const first = error.issues[0];
  if (!first) return "Please check the highlighted CMS fields.";
  const path = first.path.length ? first.path.join(".") : "form";
  if (path.startsWith("carouselImages")) {
    return "Please upload or choose valid hero images, or remove empty image rows before saving.";
  }
  return `Please check ${path}: ${first.message}`;
}

export async function saveHomeSections(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const locale = localeSchema.parse(formData.get("locale"));
  const sections = safeJson<string[]>(formData.get("sections"), defaultHomeSections).filter(Boolean);

  await prisma.homePageContent.upsert({
    where: { locale_status: { locale, status: "DRAFT" } },
    create: { locale, status: "DRAFT", title: "Homepage", sections },
    update: { sections },
  });

  refresh(locale);
  return { ok: true, message: "Homepage section order saved as draft." };
}

export async function saveHomeSectionItems(state: ActionState, formData: FormData): Promise<ActionState> {
  const raw = formData.get("sectionItems");
  if (typeof raw === "string") {
    const items = safeJson<{ id: string }[]>(raw, []);
    formData.set("sections", JSON.stringify(items.map((item) => item.id).filter(Boolean)));
  }
  return saveHomeSections(state, formData);
}

export async function saveHero(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const parsedResult = heroSchema.safeParse({
    locale: formData.get("locale"),
    eyebrow: cleanText(formData.get("eyebrow"), 160),
    title: cleanText(formData.get("title"), 220),
    description: cleanText(formData.get("description"), 1200),
    ctaLabel: cleanText(formData.get("ctaLabel"), 100),
    ctaHref: cleanUrl(formData.get("ctaHref")),
    secondaryCtaLabel: cleanText(formData.get("secondaryCtaLabel"), 100),
    secondaryCtaHref: cleanUrl(formData.get("secondaryCtaHref")),
    whatsappMessage: cleanText(formData.get("whatsappMessage"), 500),
    heroVideoUrl: cleanUrl(formData.get("heroVideoUrl")),
    features: safeJson(formData.get("features"), []),
    carouselImages: cleanCarouselImages(formData.get("carouselImages")),
  });

  if (!parsedResult.success) {
    return { ok: false, message: zodMessage(parsedResult.error) };
  }

  const parsed = parsedResult.data;

  await prisma.heroSection.upsert({
    where: { locale_status: { locale: parsed.locale, status: "DRAFT" } },
    create: { ...parsed, status: "DRAFT" },
    update: parsed,
  });

  refresh(parsed.locale);
  return { ok: true, message: "Hero saved as draft." };
}

export async function saveServices(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const locale = localeSchema.parse(formData.get("locale"));
  const items = z.array(serviceSchema).parse(safeJson(formData.get("items"), []));

  await prisma.$transaction(async (tx) => {
    await tx.serviceSection.deleteMany({ where: { locale, status: "DRAFT" } });
    if (items.length) {
      await tx.serviceSection.createMany({
        data: items.map((item, index) => ({
          locale,
          status: "DRAFT",
          slug: cleanText(item.slug, 120),
          title: cleanText(item.title, 160),
          description: cleanText(item.description, 800),
          icon: cleanText(item.icon, 80),
          tone: item.tone,
          href: item.href ? cleanUrl(item.href) : null,
          isActive: item.isActive,
          sortOrder: index,
        })),
      });
    }
  });

  refresh(locale);
  return { ok: true, message: "Services saved as draft." };
}

export async function saveTestimonials(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const locale = localeSchema.parse(formData.get("locale"));
  const items = z.array(testimonialSchema).parse(safeJson(formData.get("items"), []));

  await prisma.$transaction(async (tx) => {
    await tx.testimonial.deleteMany({ where: { locale, status: "DRAFT" } });
    if (items.length) {
      await tx.testimonial.createMany({
        data: items.map((item, index) => ({
          locale,
          status: "DRAFT",
          quote: cleanText(item.quote, 1200),
          name: cleanText(item.name, 120),
          role: cleanText(item.role, 160),
          rating: item.rating,
          isActive: item.isActive,
          sortOrder: index,
        })),
      });
    }
  });

  refresh(locale);
  return { ok: true, message: "Testimonials saved as draft." };
}

export async function savePartners(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const locale = localeSchema.parse(formData.get("locale"));
  const parsedResult = z.array(partnerSchema).safeParse(safeJson(formData.get("items"), []));
  if (!parsedResult.success) {
    return { ok: false, message: zodMessage(parsedResult.error) };
  }

  const items = parsedResult.data.map((item) => ({
    name: cleanText(item.name, 160),
    logoUrl: cleanUrl(item.logoUrl),
    websiteUrl: cleanUrl(item.websiteUrl),
    description: cleanText(item.description, 300),
    isActive: item.isActive,
  }));

  const invalid = items.find((item) => !item.name || !item.logoUrl || !item.websiteUrl);
  if (invalid) {
    return { ok: false, message: "Each partner needs a name, logo and valid website URL before saving." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.partner.deleteMany({ where: { locale, status: "DRAFT" } });
    if (items.length) {
      await tx.partner.createMany({
        data: items.map((item, index) => ({
          locale,
          status: "DRAFT",
          name: item.name,
          logoUrl: item.logoUrl,
          websiteUrl: item.websiteUrl,
          description: item.description || null,
          order: index,
          isActive: item.isActive,
        })),
      });
    }
  });

  refresh(locale);
  return { ok: true, message: "Partners saved as draft." };
}

export async function saveSeo(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before saving CMS content." };

  const parsed = seoSchema.parse({
    locale: formData.get("locale"),
    title: cleanText(formData.get("title"), 180),
    description: cleanText(formData.get("description"), 500),
    keywords: cleanText(formData.get("keywords"), 1000).split(",").map((item) => item.trim()).filter(Boolean),
    ogImage: cleanUrl(formData.get("ogImage")),
    structuredData: safeJson(formData.get("structuredData"), undefined),
    noIndex: formData.get("noIndex") === "true",
  });

  const seoData = {
    locale: parsed.locale,
    title: parsed.title,
    description: parsed.description,
    keywords: parsed.keywords,
    structuredData: parsed.structuredData as Prisma.InputJsonValue | undefined,
    noIndex: parsed.noIndex,
  };

  await prisma.seoMetadata.upsert({
    where: { locale_status_pagePath: { locale: parsed.locale, status: "DRAFT", pagePath: `/${parsed.locale}` } },
    create: { ...seoData, pagePath: `/${parsed.locale}`, status: "DRAFT" },
    update: seoData,
  });

  refresh(parsed.locale);
  return { ok: true, message: "SEO saved as draft." };
}

export async function publishHomepage(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const prisma = dbOrMessage();
  if (!prisma) return { ok: false, message: "DATABASE_URL is required before publishing CMS content." };

  const locale = localeSchema.parse(formData.get("locale"));
  const fallback = getFallbackHomeContent(locale);
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    const [homeDraft, heroDraft, serviceDrafts, partnerDrafts, testimonialDrafts, seoDraft] = await Promise.all([
      tx.homePageContent.findUnique({ where: { locale_status: { locale, status: "DRAFT" } } }),
      tx.heroSection.findUnique({ where: { locale_status: { locale, status: "DRAFT" } } }),
      tx.serviceSection.findMany({ where: { locale, status: "DRAFT" }, orderBy: { sortOrder: "asc" } }),
      tx.partner.findMany({ where: { locale, status: "DRAFT" }, orderBy: { order: "asc" } }),
      tx.testimonial.findMany({ where: { locale, status: "DRAFT" }, orderBy: { sortOrder: "asc" } }),
      tx.seoMetadata.findUnique({ where: { locale_status_pagePath: { locale, status: "DRAFT", pagePath: `/${locale}` } } }),
    ]);

    await tx.homePageContent.upsert({
      where: { locale_status: { locale, status: "PUBLISHED" } },
      create: { locale, status: "PUBLISHED", title: "Homepage", sections: homeDraft?.sections ?? fallback.sections, publishedAt: now },
      update: { sections: homeDraft?.sections ?? fallback.sections, publishedAt: now },
    });

    const hero = heroDraft ?? fallback.hero;
    await tx.heroSection.upsert({
      where: { locale_status: { locale, status: "PUBLISHED" } },
      create: {
        locale,
        status: "PUBLISHED",
        eyebrow: hero.eyebrow,
        title: hero.title,
        description: hero.description,
        ctaLabel: hero.ctaLabel,
        ctaHref: hero.ctaHref,
        secondaryCtaLabel: hero.secondaryCtaLabel,
        secondaryCtaHref: hero.secondaryCtaHref,
        whatsappMessage: hero.whatsappMessage,
        heroVideoUrl: "heroVideoUrl" in hero ? hero.heroVideoUrl : "",
        features: (hero.features ?? []) as Prisma.InputJsonValue,
        carouselImages: (hero.carouselImages ?? []) as Prisma.InputJsonValue,
        publishedAt: now,
      },
      update: {
        eyebrow: hero.eyebrow,
        title: hero.title,
        description: hero.description,
        ctaLabel: hero.ctaLabel,
        ctaHref: hero.ctaHref,
        secondaryCtaLabel: hero.secondaryCtaLabel,
        secondaryCtaHref: hero.secondaryCtaHref,
        whatsappMessage: hero.whatsappMessage,
        heroVideoUrl: "heroVideoUrl" in hero ? hero.heroVideoUrl : "",
        features: (hero.features ?? []) as Prisma.InputJsonValue,
        carouselImages: (hero.carouselImages ?? []) as Prisma.InputJsonValue,
        publishedAt: now,
      },
    });

    await tx.serviceSection.deleteMany({ where: { locale, status: "PUBLISHED" } });
    await tx.serviceSection.createMany({
      data: (serviceDrafts.length ? serviceDrafts : fallback.services).map((service, index) => ({
        locale,
        status: "PUBLISHED",
        slug: service.slug,
        title: service.title,
        description: service.description,
        icon: service.icon,
        tone: service.tone,
        href: "href" in service ? service.href : null,
        isActive: service.isActive,
        sortOrder: index,
        publishedAt: now,
      })),
    });

    await tx.partner.deleteMany({ where: { locale, status: "PUBLISHED" } });
    if (partnerDrafts.length) {
      await tx.partner.createMany({
        data: partnerDrafts.map((partner, index) => ({
          locale,
          status: "PUBLISHED",
          name: partner.name,
          logoUrl: partner.logoUrl,
          websiteUrl: partner.websiteUrl,
          description: partner.description,
          order: index,
          isActive: partner.isActive,
          publishedAt: now,
        })),
      });
    }

    await tx.testimonial.deleteMany({ where: { locale, status: "PUBLISHED" } });
    await tx.testimonial.createMany({
      data: (testimonialDrafts.length ? testimonialDrafts : fallback.testimonials).map((item, index) => ({
        locale,
        status: "PUBLISHED",
        quote: item.quote,
        name: item.name,
        role: item.role,
        rating: item.rating,
        isActive: item.isActive,
        sortOrder: index,
        publishedAt: now,
      })),
    });

    const seo = seoDraft ?? fallback.seo;
    await tx.seoMetadata.upsert({
      where: { locale_status_pagePath: { locale, status: "PUBLISHED", pagePath: `/${locale}` } },
      create: {
        locale,
        status: "PUBLISHED",
        pagePath: `/${locale}`,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        structuredData: seo.structuredData as Prisma.InputJsonValue | undefined,
        noIndex: seo.noIndex,
        publishedAt: now,
      },
      update: {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        structuredData: seo.structuredData as Prisma.InputJsonValue | undefined,
        noIndex: seo.noIndex,
        publishedAt: now,
      },
    });
  });

  refresh(locale);
  return { ok: true, message: "Published. Homepage changes are live." };
}

export async function seedDraft(localeInput: string): Promise<void> {
  await requireAdmin();
  const locale = isLocale(localeInput) ? localeInput : "fr";
  const prisma = dbOrMessage();
  if (!prisma) return;

  const fallback = getFallbackHomeContent(locale);
  await prisma.$transaction([
    prisma.homePageContent.upsert({
      where: { locale_status: { locale, status: "DRAFT" } },
      create: { locale, status: "DRAFT", title: "Homepage", sections: fallback.sections },
      update: {},
    }),
    prisma.heroSection.upsert({
      where: { locale_status: { locale, status: "DRAFT" } },
      create: { locale, status: "DRAFT", eyebrow: fallback.hero.eyebrow, title: fallback.hero.title, description: fallback.hero.description, ctaLabel: fallback.hero.ctaLabel, ctaHref: fallback.hero.ctaHref, secondaryCtaLabel: fallback.hero.secondaryCtaLabel, secondaryCtaHref: fallback.hero.secondaryCtaHref, whatsappMessage: fallback.hero.whatsappMessage, heroVideoUrl: fallback.hero.heroVideoUrl, features: fallback.hero.features as Prisma.InputJsonValue, carouselImages: fallback.hero.carouselImages as Prisma.InputJsonValue },
      update: {},
    }),
    prisma.seoMetadata.upsert({
      where: { locale_status_pagePath: { locale, status: "DRAFT", pagePath: `/${locale}` } },
      create: { locale, status: "DRAFT", pagePath: `/${locale}`, title: fallback.seo.title, description: fallback.seo.description, keywords: fallback.seo.keywords, noIndex: false },
      update: {},
    }),
  ]);
}
