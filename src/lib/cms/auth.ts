import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (String(session?.user?.role ?? "").toUpperCase() === "ADMIN") return session;
  return null;
}

export async function requireAdmin(callbackUrl = "/admin/content/home") {
  const session = await getAdminSession();
  if (!session) redirect(`/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return session;
}
