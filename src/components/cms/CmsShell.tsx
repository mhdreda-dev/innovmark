import Link from "next/link";

const navItems = [
  { href: "/admin/content", label: "Overview" },
  { href: "/admin/content/home", label: "Home" },
  { href: "/admin/content/services", label: "Services" },
  { href: "/admin/content/testimonials", label: "Testimonials" },
  { href: "/admin/content/seo", label: "SEO" },
  { href: "/admin/content/media", label: "Media" },
  { href: "/admin/field-crm", label: "Field CRM" },
];

export function CmsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030610] text-white">
      <div aria-hidden className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.16),transparent_32%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl gap-6 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
        <aside className="sticky top-6 hidden h-[calc(100svh-48px)] w-64 shrink-0 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl lg:block">
          <Link href="/admin/content" className="block rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.34em] text-cyan-100/70">Innovmark</div>
            <div className="mt-2 text-2xl font-light tracking-tight">CMS</div>
          </Link>
          <nav className="mt-5 grid gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/admin/login" className="absolute inset-x-4 bottom-4 rounded-full border border-white/15 px-4 py-2 text-center text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white">
            Account
          </Link>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mb-4 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.055] p-2 backdrop-blur-xl lg:hidden">
            <nav className="flex w-max max-w-none gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="shrink-0 rounded-xl px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function CmsHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="mb-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl sm:p-5 md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.38em] text-cyan-100/70">{eyebrow}</div>
          <h1 className="mt-3 break-words text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/64">{description}</p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}

export function CmsCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5 md:p-6">
      <div className="mb-5">
        <h2 className="break-words text-xl font-light tracking-tight">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>}
      </div>
      {children}
    </section>
  );
}
