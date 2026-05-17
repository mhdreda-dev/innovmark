import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (String(session?.user?.role ?? "").toUpperCase() === "ADMIN") return session;
  return null;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login?callbackUrl=/admin/content/home");
  return session;
}
