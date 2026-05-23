import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { dictionaries, isLocale, localizedHref } from "@/lib/i18n";
import { getServiceDetail, services } from "@/lib/services";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceDetail(slug, isLocale(locale) ? locale : undefined);

  if (!service) {
    return {
      title: "Service not found · INNOVMARK",
    };
  }

  return {
    title: `${service.eyebrow} · INNOVMARK`,
    description: service.summary,
  };
}

export default async function LocalizedServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const service = getServiceDetail(slug, locale);
  if (!service) notFound();

  const dict = dictionaries[locale];
  const isArabic = locale === "ar";

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <section className="relative px-4 pb-12 pt-10 sm:px-6 md:pb-20 md:pt-20 lg:px-10">
          <div
            aria-hidden
            className="absolute inset-0 opacity-45"
            style={{
              background:
                "radial-gradient(ellipse 54% 42% at 74% 12%, rgba(56,189,248,0.18), transparent 68%), radial-gradient(ellipse 42% 42% at 12% 78%, rgba(139,92,246,0.16), transparent 68%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="min-w-0 rtl-text-right">
              <div className="mb-5 flex items-center gap-3 rtl-row">
                <span className="h-px w-9 shrink-0 bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-400" />
                <span className="cinematic-text text-[10px] uppercase tracking-[0.16em] text-white/70 md:tracking-[0.42em]">
                  {service.eyebrow}
                </span>
              </div>
              <h1 className="cinematic-text max-w-4xl text-4xl font-light leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.02] lg:text-7xl">
                {service.title}
              </h1>
              <p className="cinematic-text mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-lg md:leading-8">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row rtl-md-row">
                <a
                  href={localizedHref("/contact", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-cyan-50 md:tracking-[0.18em]"
                >
                  {isArabic ? "تواصل معنا" : "Contact Us"}
                </a>
                <a
                  href={localizedHref("/services", locale)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/[0.045] px-6 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-white/82 transition-colors hover:border-cyan-100/45 hover:text-white md:tracking-[0.18em]"
                >
                  {isArabic ? "كل الخدمات" : "All Services"}
                </a>
              </div>
            </div>

            <aside className="premium-glass min-w-0 rounded-2xl p-5 md:p-7">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-cyan-100/64 md:tracking-[0.26em]">
                    {isArabic ? "المدة" : "Timeline"}
                  </span>
                  <p className="mt-2 text-2xl font-light text-white">{service.timeline}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-cyan-100/64 md:tracking-[0.26em]">
                    {isArabic ? "مناسب لـ" : "Best for"}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-white/72">{service.bestFor}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white md:text-4xl">
                {isArabic ? "شنو كنصاوبو" : "What we build"}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                {service.intro}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="premium-glass min-w-0 rounded-2xl p-5 md:p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white/82 md:tracking-[0.22em]">
                  {isArabic ? "النتائج" : "Outcomes"}
                </h3>
                <ul className="mt-5 grid gap-3">
                  {service.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-white/72 rtl-row">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-glass min-w-0 rounded-2xl p-5 md:p-6">
                <h3 className="text-sm font-medium uppercase tracking-[0.12em] text-white/82 md:tracking-[0.22em]">
                  {isArabic ? "المخرجات" : "Deliverables"}
                </h3>
                <ul className="mt-5 grid gap-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-white/72 rtl-row">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-2xl border border-white/12 bg-white/[0.055] p-5 md:flex md:items-center md:justify-between md:p-8 rtl-md-row">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-white/48 md:tracking-[0.3em]">
                {isArabic ? "مستعدين ملي تكون واجد" : "Ready when you are"}
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-white md:text-4xl">
                {isArabic ? "قول لينا شنو باغي تطلق." : "Tell us what you want to launch."}
              </h2>
            </div>
            <a
              href={localizedHref("/contact", locale)}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#1ebe5a] md:mt-0 md:w-auto md:tracking-[0.18em]"
            >
              {isArabic ? "فتح فورم التواصل" : "Open contact form"}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
