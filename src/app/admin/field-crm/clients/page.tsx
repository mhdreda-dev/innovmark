import Link from "next/link";
import { Plus } from "lucide-react";
import { CmsHeader } from "@/components/cms/CmsShell";
import { FieldCRMClientsTable } from "@/components/field-crm/FieldCRMClient";
import { requireAdmin } from "@/lib/cms/auth";
import { getFieldCRMClients } from "@/lib/field-crm";

export const dynamic = "force-dynamic";

export default async function FieldCRMClientsPage() {
  await requireAdmin("/admin/field-crm/clients");
  const clients = await getFieldCRMClients();

  return (
    <>
      <CmsHeader
        eyebrow="Field CRM"
        title="Clients"
        description="Search clients, filter by city or status, open WhatsApp, navigate to shoots, update status and manage records."
        action={<Link href="/admin/field-crm/add" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black hover:bg-emerald-200"><Plus className="h-4 w-4" /> Add client</Link>}
      />
      <FieldCRMClientsTable clients={clients} />
    </>
  );
}
