"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({ hasError }: { hasError?: boolean }) {
  const [error, setError] = useState(hasError ? "Invalid credentials." : "");
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
            callbackUrl: "/admin/content",
          });
          if (result?.ok) window.location.href = result.url ?? "/admin/content";
          else setError("Invalid credentials.");
        });
      }}
      className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="text-[10px] uppercase tracking-[0.38em] text-cyan-100/70">Innovmark CMS</div>
      <h1 className="mt-3 text-4xl font-light tracking-tight">Admin sign in</h1>
      <p className="mt-3 text-sm leading-6 text-white/58">Use the email in `ADMIN_EMAILS` and the password in `ADMIN_PASSWORD`.</p>
      {error && <p className="mt-4 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
      <label className="mt-6 block text-sm text-white/74">
        Email
        <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none focus:border-cyan-100/40" />
      </label>
      <label className="mt-4 block text-sm text-white/74">
        Password
        <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none focus:border-cyan-100/40" />
      </label>
      <button disabled={pending} className="mt-6 min-h-12 w-full rounded-full bg-white px-5 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-cyan-100 disabled:opacity-50">
        {pending ? "Signing in..." : "Enter CMS"}
      </button>
    </form>
  );
}
