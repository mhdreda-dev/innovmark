import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ContactForm from "@/components/ContactForm";
import ContactVisualSection from "@/components/ContactVisualSection";
import RevealOnScroll from "@/components/RevealOnScroll";
import { dictionaries, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Contact · INNOVMARK",
  description:
    "Parlez-nous de votre projet. INNOVMARK vous répond en moins de 24h pour vos sites web, branding et campagnes marketing.",
};

export default async function LocalizedContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];
  const page = dict.pages.contact;

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <RevealOnScroll />

      <main className="relative z-10 min-h-screen overflow-hidden pt-24">
        {/* ── Hero ── */}
        <section className="relative px-6 pb-10 pt-16 md:pb-14 md:pt-24 lg:px-10">
          {/* Background: gradient orbs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl pulse-glow"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)" }}
            />
            <div
              className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }}
            />
            {/* Grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.032]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* stagger-reveal drives kicker→title→subtitle→badge entrance */}
          <div className="stagger-reveal relative mx-auto max-w-4xl text-center">
            {/* Kicker — child 1 */}
            <div className="reveal-on-scroll mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent via-cyan-300/70 to-violet-300/70" />
              <span className="cinematic-text text-[10px] uppercase tracking-[0.46em] text-white/60">
                {page.kicker}
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-violet-300/70 via-emerald-300/70 to-transparent" />
            </div>

            {/* Title — child 2 */}
            <h1 className="reveal-on-scroll cinematic-text text-4xl font-light leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
              {page.title}
            </h1>

            {/* Hero subtitle — child 3 */}
            <p className="reveal-on-scroll cinematic-text mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 md:text-xl">
              {page.heroSubtitle}
            </p>

            {/* Response badge — child 4 */}
            <div className="reveal-on-scroll mt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white/58">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-glow" />
                {page.subtitle}
              </span>
            </div>
          </div>
        </section>

        {/* ── Form + Visual ── */}
        <section className="relative px-6 pb-16 md:pb-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
              {/* Form card */}
              <div className="reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.40)] backdrop-blur-sm md:p-8">
                  <ContactForm labels={dict.contactForm} />
                </div>
              </div>

              {/* Visual section — Framer Motion handles its own entrance */}
              <div className="lg:sticky lg:top-32">
                <ContactVisualSection
                  serviceCards={page.serviceCards}
                  trustItems={page.trustItems}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Process after contact ── */}
        <section className="relative px-6 pb-20 md:pb-28 lg:px-10">
          {/* Background accent */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.08), transparent 70%)" }}
            />
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="reveal-on-scroll mb-12 text-center">
              <h2 className="cinematic-text text-3xl font-light tracking-tight text-white md:text-4xl">
                {page.processTitle}
              </h2>
            </div>

            <div className="stagger-reveal grid gap-5 md:grid-cols-3">
              {page.processSteps.map((s) => (
                <div
                  key={s.step}
                  className="reveal-on-scroll group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-white/18 hover:bg-white/[0.065] hover:shadow-[0_0_44px_rgba(139,92,246,0.12)]"
                >
                  <div className="mb-4 font-mono text-xs tracking-[0.28em] text-white/30">
                    {s.step}
                  </div>
                  <div className="mb-2 text-xl font-light text-white">{s.title}</div>
                  <div className="text-sm leading-6 text-white/58">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </>
  );
}
