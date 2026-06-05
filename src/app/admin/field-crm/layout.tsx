import { requireAdmin } from "@/lib/cms/auth";
import { CmsShell } from "@/components/cms/CmsShell";

export default async function FieldCRMLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin("/admin/field-crm");
  return <CmsShell>{children}</CmsShell>;
}
