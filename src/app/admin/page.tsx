import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/cms/auth";

export default async function AdminPage() {
  await requireAdmin();
  redirect("/admin/content/home");
}
