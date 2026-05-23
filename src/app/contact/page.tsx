import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact · INNOVMARK",
  description:
    "Parlez-nous de votre projet. INNOVMARK vous repond en moins de 24h pour vos sites web, branding et campagnes marketing.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 min-h-screen overflow-hidden pt-24">
        <section className="relative px-6 pb-16 pt-12 md:pb-24 md:pt-20 lg:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse 44% 34% at 50% 4%, rgba(56,189,248,0.16), transparent 68%), radial-gradient(ellipse 38% 34% at 78% 28%, rgba(16,185,129,0.12), transparent 70%), radial-gradient(ellipse 36% 32% at 20% 70%, rgba(139,92,246,0.10), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <div className="reveal-on-scroll text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300" />
                <span className="cinematic-text text-[10px] uppercase tracking-[0.42em] text-white/64">
                  Brief rapide
                </span>
                <span className="h-px w-10 bg-gradient-to-r from-emerald-300 via-violet-300 to-cyan-200" />
              </div>
              <h1 className="cinematic-text text-4xl font-light leading-[1.02] tracking-tight text-white md:text-6xl">
                Parlez-nous de votre projet
              </h1>
              <p className="cinematic-text mt-5 text-base leading-7 text-white/70 md:text-xl">
                Reponse en moins de 24h
              </p>
            </div>

            <div className="reveal-on-scroll mt-10 rounded-xl border border-white/10 bg-[#0b0f14] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.34)] md:p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
