CREATE TYPE "FieldCRMStatus" AS ENUM ('NEW', 'CONFIRMED', 'ON_THE_WAY', 'SHOOTING_DONE', 'EDITING', 'CLIENT_REVIEW', 'DELIVERED', 'CANCELLED');

CREATE TABLE "FieldCRMClient" (
  "id" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  "socialProfile" TEXT,
  "businessName" TEXT,
  "city" TEXT NOT NULL,
  "exactAddress" TEXT NOT NULL,
  "googleMapsLink" TEXT,
  "serviceType" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "totalPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "advancePayment" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "remainingAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "appointmentDate" TIMESTAMP(3),
  "appointmentTime" TEXT,
  "status" "FieldCRMStatus" NOT NULL DEFAULT 'NEW',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FieldCRMClient_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FieldCRMClient_city_idx" ON "FieldCRMClient"("city");
CREATE INDEX "FieldCRMClient_status_idx" ON "FieldCRMClient"("status");
CREATE INDEX "FieldCRMClient_appointmentDate_appointmentTime_idx" ON "FieldCRMClient"("appointmentDate", "appointmentTime");
