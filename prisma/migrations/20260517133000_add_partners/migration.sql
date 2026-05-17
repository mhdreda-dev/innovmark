CREATE TABLE "Partner" (
  "id" TEXT NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'fr',
  "status" "CmsStatus" NOT NULL DEFAULT 'DRAFT',
  "name" TEXT NOT NULL,
  "logoUrl" TEXT NOT NULL,
  "websiteUrl" TEXT NOT NULL,
  "description" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Partner_locale_status_isActive_order_idx" ON "Partner"("locale", "status", "isActive", "order");
