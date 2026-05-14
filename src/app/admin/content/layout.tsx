import { requireAdmin } from "@/lib/cms/auth";
import { CmsShell } from "@/components/cms/CmsShell";

export default async function AdminContentLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <CmsShell>{children}</CmsShell>;
}
