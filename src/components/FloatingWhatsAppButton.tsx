const WHATSAPP_NUMBER = "212771450503";
const WHATSAPP_MESSAGE = "Bonjour Innovmark, je souhaite améliorer ma présence digitale.";
const AR_WHATSAPP_MESSAGE = "السلام عليكم Innovmark، بغيت نحسن الحضور ديالي فالإنترنت.";

function getWhatsAppMessage(locale?: string) {
  return locale === "ar" ? AR_WHATSAPP_MESSAGE : WHATSAPP_MESSAGE;
}

export default function FloatingWhatsAppButton({ locale }: { locale?: string }) {
  const message = encodeURIComponent(getWhatsAppMessage(locale));

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp — Réponse rapide"
      className="group fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[60] inline-flex max-w-[calc(100vw-2rem)] items-center justify-center gap-2.5 rounded-full border border-emerald-200/30 bg-slate-950/82 p-3 text-white shadow-[0_18px_48px_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-emerald-200/50 hover:bg-slate-950/92 hover:shadow-[0_22px_58px_rgba(15,23,42,0.34),0_0_34px_rgba(16,185,129,0.16)] sm:px-4 sm:py-3 md:bottom-6 md:right-6"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-emerald-300/20 opacity-45 blur-xl transition-opacity duration-300 group-hover:opacity-70"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-emerald-300/30 animate-[whatsappPulse_2.8s_ease-out_infinite]"
      />
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-emerald-200/20 bg-emerald-300/12 text-emerald-300 shadow-[0_8px_24px_rgba(16,185,129,0.16)] transition duration-300 group-hover:scale-105 sm:h-9 sm:w-9">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
        </svg>
      </span>
      <span className="relative hidden whitespace-nowrap pr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88 sm:inline md:tracking-[0.18em]">
        WhatsApp — Réponse rapide
      </span>
      <style>{`
        @keyframes whatsappPulse {
          0% {
            opacity: 0.56;
            transform: scale(1);
          }
          70% {
            opacity: 0;
            transform: scale(1.28);
          }
          100% {
            opacity: 0;
            transform: scale(1.28);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          a[aria-label="WhatsApp — Réponse rapide"] span {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </a>
  );
}
