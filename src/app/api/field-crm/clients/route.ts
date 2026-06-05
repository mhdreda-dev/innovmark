import { NextResponse } from "next/server";
import type { FieldCRMStatus } from "@prisma/client";
import { getAdminSession, requireAdmin } from "@/lib/cms/auth";
import { getPrisma } from "@/lib/cms/prisma";
import { fieldCRMStatuses, parseFieldCRMPayload, serializeFieldCRMClient, validateFieldCRMPayload } from "@/lib/field-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ clients: [] });

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();
  const city = url.searchParams.get("city")?.trim();
  const rawStatus = url.searchParams.get("status")?.trim().toUpperCase();
  const status = fieldCRMStatuses.includes(rawStatus as FieldCRMStatus) ? (rawStatus as FieldCRMStatus) : null;

  const clients = await prisma.fieldCRMClient.findMany({
    where: {
      ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { clientName: { contains: search, mode: "insensitive" } },
              { phoneNumber: { contains: search, mode: "insensitive" } },
              { businessName: { contains: search, mode: "insensitive" } },
              { city: { contains: search, mode: "insensitive" } },
              { serviceType: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ clients: clients.map(serializeFieldCRMClient) });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Admin authentication is required." }, { status: 401 });

  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required before saving Field CRM clients." }, { status: 500 });

  try {
    const body = await request.json();
    const data = parseFieldCRMPayload(body);
    const error = validateFieldCRMPayload(data);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const client = await prisma.fieldCRMClient.create({ data });
    return NextResponse.json({ client: serializeFieldCRMClient(client) }, { status: 201 });
  } catch (error) {
    console.error("Field CRM client save failed:", error);
    return NextResponse.json({ error: "Failed to save client." }, { status: 500 });
  }
}
