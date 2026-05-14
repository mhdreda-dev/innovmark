import { redirect } from "next/navigation";
import { LoginForm } from "@/components/cms/LoginForm";
import { getAdminSession } from "@/lib/cms/auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await getAdminSession();
  if (session) redirect("/admin/content");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#030610] px-5 text-white">
      <div aria-hidden className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_75%_60%,rgba(139,92,246,0.16),transparent_30%)]" />
      <LoginForm hasError={Boolean(error)} />
    </main>
  );
}
