const WHATSAPP_NUMBER = "212771450503";
const WHATSAPP_MSG = encodeURIComponent(
  "Bonjour Innovmark, je souhaite recevoir une analyse rapide de ma présence digitale."
);
const AR_WHATSAPP_MSG = encodeURIComponent(
  "السلام عليكم Innovmark، بغيت نهضر معاكم على مشروع جديد."
);

export default function CTA({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const message = isArabic ? AR_WHATSAPP_MSG : WHATSAPP_MSG;
  const contactHref = locale === "ar" ? "/ar/contact" : locale === "en" ? "/en/contact" : "/fr/contact";
  const trustItems = isArabic
    ? ["جواب فـ 24 ساعة", "مواكبة شخصية", "بلا التزام"]
    : ["Réponse sous 24h", "Accompagnement personnalisé", "Sans engagement"];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Layered gradient background — pure CSS */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-10 mx-auto h-40 max-w-3xl opacity-[0.12] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 42% 46% at 50% 50%, rgba(79,140,255,0.52), transparent 72%), radial-gradient(ellipse 28% 34% at 18% 42%, rgba(125,211,252,0.35), transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="premium-glass relative min-w-0 rounded-2xl px-4 py-9 text-center shadow-[0_24px_70px_rgba(15,23,42,0.09)] sm:px-5 md:px-10 md:py-16">
        <div className="mb-5 inline-flex max-w-full items-center gap-3 md:mb-6">
          <span className="h-px w-6 shrink-0 bg-gradient-to-r from-cyan-200 to-violet-400 sm:w-8" />
          <span className="cinematic-text text-[10px] uppercase tracking-[0.16em] text-blue-700/72 md:text-[11px] md:tracking-[0.46em]">
            {isArabic ? "تحليل سريع للمشروع" : "Audit offert"}
          </span>
          <span className="h-px w-6 shrink-0 bg-gradient-to-l from-cyan-200 to-violet-400 sm:w-8" />
        </div>

        <h2 className="cinematic-text mb-5 text-3xl font-light leading-[1.12] tracking-tight text-slate-950 sm:text-4xl md:mb-6 md:text-6xl md:leading-[1.08]">
          {isArabic ? "واجد تطور صورة المشروع ديالك؟" : "Prêt à développer votre image ?"}
        </h2>

        <p className="cinematic-text mx-auto mb-7 max-w-xl text-sm leading-6 text-slate-600 md:mb-10 md:text-lg md:leading-8">
          {isArabic
            ? "توصل بتحليل سريع وشوف كيفاش تقدر تحسن الحضور ديالك فالإنترنت."
            : "Recevez une analyse rapide et découvrez comment améliorer votre présence digitale."}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4 rtl-md-row">
          <a
            href={contactHref}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-blue-500/25 bg-blue-600 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_36px_rgba(79,140,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_18px_46px_rgba(79,140,255,0.34)] sm:w-auto md:px-8 md:py-4 md:tracking-[0.15em]"
          >
            {isArabic ? "حصل على تحليل مجاني" : "Obtenir mon audit gratuit"}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 text-white transition duration-300 group-hover:translate-x-0.5 rtl-arrow">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-blue-200/70 bg-white/62 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/60 hover:bg-white hover:text-slate-950 sm:w-auto md:px-8 md:py-4 md:tracking-[0.15em]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9 rounded-full border border-emerald-300/20 bg-emerald-200/12 p-2 text-emerald-600 opacity-100 shadow-[0_8px_24px_rgba(37,211,102,0.10)] transition duration-300 group-hover:scale-105">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
            </svg>
            {isArabic ? "واتساب مباشر" : "WhatsApp direct"}
          </a>
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 md:mt-8 md:tracking-widest">
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-100 text-[10px] text-emerald-600 shadow-[0_0_0_1px_rgba(16,185,129,0.14)_inset]">
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
