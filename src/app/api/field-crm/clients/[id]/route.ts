import { NextResponse } from "next/server";
import type { FieldCRMStatus } from "@prisma/client";
import { requireAdmin } from "@/lib/cms/auth";
import { getPrisma } from "@/lib/cms/prisma";
import { fieldCRMStatuses, parseFieldCRMPayload, serializeFieldCRMClient, validateFieldCRMPayload } from "@/lib/field-crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Params) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required." }, { status: 500 });

  const { id } = await context.params;
  const client = await prisma.fieldCRMClient.findUnique({ where: { id } });
  if (!client) return NextResponse.json({ error: "Client not found." }, { status: 404 });

  return NextResponse.json({ client: serializeFieldCRMClient(client) });
}

export async function PATCH(request: Request, context: Params) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required before updating Field CRM clients." }, { status: 500 });

  const { id } = await context.params;
  const body = await request.json();

  if (Object.keys(body).length === 1 && typeof body.status === "string") {
    const status = body.status.toUpperCase();
    if (!fieldCRMStatuses.includes(status as FieldCRMStatus)) {
      return NextResponse.json({ error: "Invalid client status." }, { status: 400 });
    }
    const client = await prisma.fieldCRMClient.update({
      where: { id },
      data: { status: status as FieldCRMStatus },
    });
    return NextResponse.json({ client: serializeFieldCRMClient(client) });
  }

  const data = parseFieldCRMPayload(body);
  const error = validateFieldCRMPayload(data);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const client = await prisma.fieldCRMClient.update({ where: { id }, data });
  return NextResponse.json({ client: serializeFieldCRMClient(client) });
}

export async function DELETE(_request: Request, context: Params) {
  await requireAdmin();
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ error: "DATABASE_URL is required before deleting Field CRM clients." }, { status: 500 });

  const { id } = await context.params;
  await prisma.fieldCRMClient.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
