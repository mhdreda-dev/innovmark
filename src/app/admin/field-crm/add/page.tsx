import { CmsCard, CmsHeader } from "@/components/cms/CmsShell";
import { FieldCRMForm } from "@/components/field-crm/FieldCRMClient";
import { requireAdmin } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function AddFieldCRMClientPage() {
  await requireAdmin("/admin/field-crm/add");

  return (
    <>
      <CmsHeader
        eyebrow="Field CRM"
        title="Add client"
        description="Create an outdoor shooting client with appointment, location, status and payment details."
      />
      <CmsCard title="Client details" description="Remaining amount is calculated automatically from total price minus advance payment.">
        <FieldCRMForm />
      </CmsCard>
    </>
  );
}
