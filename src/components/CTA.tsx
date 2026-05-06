const WHATSAPP_NUMBER = "212771450503";
const WHATSAPP_MSG = encodeURIComponent(
  "Bonjour Innovmark, je souhaite discuter d'un projet."
);
const AR_WHATSAPP_MSG = encodeURIComponent(
  "مرحباً Innovmark، أود مناقشة مشروع جديد."
);

export default function CTA({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const message = isArabic ? AR_WHATSAPP_MSG : WHATSAPP_MSG;

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-12 md:py-20"
    >
      {/* Layered gradient background — pure CSS */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(124,58,237,0.26), transparent 60%), radial-gradient(ellipse 50% 60% at 10% 30%, rgba(56,189,248,0.22), transparent 60%)",
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div className="premium-glass relative rounded-2xl px-5 py-9 text-center md:px-10 md:py-16">
        <div className="mb-5 inline-flex items-center gap-3 md:mb-6">
          <span className="w-8 h-px bg-gradient-to-r from-cyan-200 to-violet-400" />
          <span className="text-white/76 text-[10px] md:text-[11px] tracking-[0.46em] uppercase cinematic-text">
            {isArabic ? "مراجعة خاصة للمشروع" : "Private project review"}
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-cyan-200 to-violet-400" />
        </div>

        <h2 className="cinematic-text mb-5 text-3xl font-light leading-[1.08] tracking-tight text-white md:mb-6 md:text-6xl">
          {isArabic ? "جاهز لظهور أكثر احترافية" : "Ready to look more serious"}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
            {isArabic ? "من منافسيك؟" : "than your competition?"}
          </span>
        </h2>

        <p className="cinematic-text mx-auto mb-7 max-w-xl text-sm leading-6 text-white/76 md:mb-10 md:text-lg md:leading-8">
          {isArabic
            ? "أرسل رسالة قصيرة وسنرد عليك بخطوة واضحة: تدقيق، نطاق عمل، جدول زمني أو خطة إطلاق."
            : "Send a short message. We will reply quickly with the clearest next step: audit, scope, timeline or launch plan."}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4 rtl-row">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-black shadow-[0_6px_22px_rgba(37,211,102,0.2)] transition-colors hover:bg-[#1ebe5a] sm:w-auto md:px-8 md:py-4 md:tracking-[0.15em] md:shadow-[0_8px_30px_rgba(37,211,102,0.3)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
            </svg>
            {isArabic ? "واتساب مباشر" : "WhatsApp direct"}
          </a>
          <a
            href="tel:+212771450503"
            className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-white/50 hover:text-white sm:w-auto md:px-8 md:py-4 md:tracking-[0.15em]"
          >
            {isArabic ? "اتصل بالاستوديو" : "Call the studio"}
          </a>
          <a
            href="mailto:contact@innovmark.ma"
            className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border border-white/14 px-6 py-3 text-sm uppercase tracking-[0.12em] text-white/72 transition-colors hover:border-cyan-100/40 hover:text-white sm:w-auto md:px-8 md:py-4 md:tracking-[0.15em]"
          >
            {isArabic ? "البريد الإلكتروني" : "Email"}
          </a>
        </div>

        <div className="mt-8 hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-white/62 md:flex">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            {isArabic ? "رد سريع" : "Quick response"}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            {isArabic ? "نطاق واضح" : "Clear scope"}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            {isArabic ? "المغرب + دولياً" : "Morocco + International"}
          </span>
        </div>
      </div>
      </div>
    </section>
  );
}
