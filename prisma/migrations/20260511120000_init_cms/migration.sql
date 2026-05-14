CREATE TYPE "CmsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "MediaKind" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

CREATE TABLE "HomePageContent" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "title" TEXT,
  "sections" JSONB NOT NULL DEFAULT '[]',
  "draftData" JSONB,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HomePageContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HeroSection" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "eyebrow" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "ctaLabel" TEXT NOT NULL,
  "ctaHref" TEXT NOT NULL,
  "secondaryCtaLabel" TEXT,
  "secondaryCtaHref" TEXT,
  "whatsappMessage" TEXT,
  "features" JSONB NOT NULL DEFAULT '[]',
  "carouselImages" JSONB NOT NULL DEFAULT '[]',
  "backgroundVideoId" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ServiceSection" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'Sparkles',
  "tone" TEXT NOT NULL DEFAULT 'cyan',
  "href" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ServiceSection_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Testimonial" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "quote" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "avatarId" TEXT,
  "rating" INTEGER NOT NULL DEFAULT 5,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FAQ" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "category" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SeoMetadata" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "pagePath" TEXT NOT NULL DEFAULT '/',
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "ogImageId" TEXT,
  "structuredData" JSONB,
  "noIndex" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SeoMetadata_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MediaAsset" (
  "id" TEXT NOT NULL,
  "kind" "MediaKind" NOT NULL,
  "provider" TEXT NOT NULL DEFAULT 'local',
  "url" TEXT NOT NULL,
  "secureUrl" TEXT,
  "publicId" TEXT,
  "filename" TEXT NOT NULL,
  "alt" TEXT,
  "mimeType" TEXT NOT NULL,
  "width" INTEGER,
  "height" INTEGER,
  "duration" DOUBLE PRECISION,
  "sizeBytes" INTEGER NOT NULL,
  "folder" TEXT NOT NULL DEFAULT 'cms',
  "metadata" JSONB,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HomePageContent_locale_status_key" ON "HomePageContent"("locale", "status");
CREATE INDEX "HomePageContent_locale_status_idx" ON "HomePageContent"("locale", "status");
CREATE UNIQUE INDEX "HeroSection_locale_status_key" ON "HeroSection"("locale", "status");
CREATE INDEX "HeroSection_locale_status_isActive_idx" ON "HeroSection"("locale", "status", "isActive");
CREATE UNIQUE INDEX "ServiceSection_locale_status_slug_key" ON "ServiceSection"("locale", "status", "slug");
CREATE INDEX "ServiceSection_locale_status_isActive_sortOrder_idx" ON "ServiceSection"("locale", "status", "isActive", "sortOrder");
CREATE INDEX "Testimonial_locale_status_isActive_sortOrder_idx" ON "Testimonial"("locale", "status", "isActive", "sortOrder");
CREATE INDEX "FAQ_locale_status_isActive_sortOrder_idx" ON "FAQ"("locale", "status", "isActive", "sortOrder");
CREATE UNIQUE INDEX "SeoMetadata_locale_status_pagePath_key" ON "SeoMetadata"("locale", "status", "pagePath");
CREATE INDEX "SeoMetadata_locale_status_pagePath_idx" ON "SeoMetadata"("locale", "status", "pagePath");
CREATE INDEX "MediaAsset_kind_isActive_createdAt_idx" ON "MediaAsset"("kind", "isActive", "createdAt");
CREATE INDEX "MediaAsset_provider_publicId_idx" ON "MediaAsset"("provider", "publicId");

ALTER TABLE "HeroSection" ADD CONSTRAINT "HeroSection_backgroundVideoId_fkey" FOREIGN KEY ("backgroundVideoId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SeoMetadata" ADD CONSTRAINT "SeoMetadata_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
