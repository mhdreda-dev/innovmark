import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactVisualSection from "@/components/ContactVisualSection";
import RevealOnScroll from "@/components/RevealOnScroll";
import { dictionaries, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: "Contact · INNOVMARK",
    description:
      "Parlez-nous de votre projet. INNOVMARK vous répond en moins de 24h pour vos sites web, branding et campagnes marketing.",
  },
  en: {
    title: "Contact · INNOVMARK",
    description:
      "Tell us about your project. INNOVMARK replies in less than 24h for websites, branding and marketing campaigns.",
  },
  ar: {
    title: "تواصل معنا · INNOVMARK",
    description:
      "هضر لينا على المشروع ديالك. INNOVMARK كتجاوبك فـ 24 ساعة بخصوص المواقع، البراندينغ، المحتوى والإعلانات.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLocale[locale] ?? metadataByLocale.fr;
}

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];
  const page = dict.pages.contact;

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <RevealOnScroll />

      <main className="relative z-10 min-h-screen overflow-hidden pt-[5.5rem] sm:pt-24">
        {/* ── Hero ── */}
        <section className="relative px-4 pb-8 pt-8 sm:px-6 md:pb-12 md:pt-14 lg:px-10">
          {/* Background: premium light depth */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="pulse-glow absolute -top-20 left-1/2 h-[280px] w-[360px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(79,140,255,0.10), transparent 70%)" }}
            />
            <div
              className="absolute right-4 top-1/4 h-[180px] w-[180px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(79,140,255,0.08), transparent 72%)" }}
            />
            <div
              className="absolute bottom-0 left-8 h-[160px] w-[160px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 72%)" }}
            />
            {/* Grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(79,140,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.14) 1px, transparent 1px)",
                backgroundSize: "76px 76px",
              }}
            />
          </div>

          {/* stagger-reveal drives kicker→title→subtitle→badge entrance */}
          <div className="stagger-reveal relative mx-auto max-w-4xl text-center">
            {/* Kicker — child 1 */}
            <div className="reveal-on-scroll mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 shrink-0 bg-gradient-to-r from-transparent via-blue-400/60 to-cyan-300/60 sm:w-10" />
              <span className="cinematic-text text-[10px] uppercase tracking-[0.12em] text-blue-700/60 md:tracking-[0.46em]">
                {page.kicker}
              </span>
              <span className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-300/60 via-blue-400/60 to-transparent sm:w-10" />
            </div>

            {/* Title — child 2 */}
            <h1 className="reveal-on-scroll cinematic-text text-[2.2rem] font-light leading-[1.1] tracking-tight text-slate-950 sm:text-4xl md:text-6xl lg:text-7xl">
              {page.title}
            </h1>

            {/* Hero subtitle — child 3 */}
            <p className="reveal-on-scroll cinematic-text mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base md:mt-6 md:text-xl">
              {page.heroSubtitle}
            </p>

            {/* Response badge — child 4 */}
            <div className="reveal-on-scroll mt-8">
              <span className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-blue-100/80 bg-white/78 px-4 py-2 text-center text-xs text-slate-600 shadow-[0_14px_34px_rgba(79,140,255,0.10)] backdrop-blur-xl">
                <span className="pulse-glow h-1.5 w-1.5 rounded-full bg-blue-500" />
                {page.subtitle}
              </span>
            </div>
          </div>
        </section>

        {/* ── Form + Visual ── */}
        <section className="relative px-4 pb-[4.5rem] sm:px-6 md:pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
              {/* Form card */}
              <div className="reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-100/80 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6 md:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4F8CFF]/45 to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-[#4F8CFF]/8 blur-3xl"
                  />
                  <ContactForm labels={dict.contactForm} />
                </div>
              </div>

              {/* Visual card */}
              <div className="lg:sticky lg:top-32">
                <ContactVisualSection
                  imageAlt={`${page.title} · INNOVMARK`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Process after contact ── */}
        <section className="relative px-4 pb-20 sm:px-6 md:pb-28 lg:px-10">
          {/* Background accent */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute left-1/2 top-0 h-[170px] w-[340px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(79,140,255,0.07), transparent 72%)" }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="reveal-on-scroll mb-12 text-center">
              <h2 className="cinematic-text text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
                {page.processTitle}
              </h2>
            </div>

            <div className="stagger-reveal grid gap-5 md:grid-cols-3">
              {page.processSteps.map((s) => (
                <div
                  key={s.step}
                  className="reveal-on-scroll group rounded-2xl border border-blue-100/80 bg-white/84 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_24px_58px_rgba(79,140,255,0.12)] sm:p-6"
                >
                  <div className="mb-4 font-mono text-xs tracking-[0.28em] text-blue-500/70">
                    {s.step}
                  </div>
                  <div className="mb-2 text-xl font-light text-slate-950">{s.title}</div>
                  <div className="text-sm leading-6 text-slate-600">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
