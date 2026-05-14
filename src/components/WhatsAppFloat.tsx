const WHATSAPP_NUMBER = "212771450503";
const MSG = encodeURIComponent("Bonjour Innovmark, je souhaite discuter d'un projet.");
const AR_MSG = encodeURIComponent("السلام عليكم Innovmark، بغيت نهضر معاكم على مشروع جديد.");

export default function WhatsAppFloat({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${isArabic ? AR_MSG : MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isArabic ? "تواصل معنا فواتساب" : "Discuter sur WhatsApp"}
      className="group fixed bottom-4 end-4 z-50 md:bottom-6 md:end-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 blur-md transition-opacity group-hover:opacity-60 md:opacity-40 md:blur-xl" />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black shadow-[0_6px_20px_rgba(37,211,102,0.28)] transition-transform group-hover:scale-105 md:h-14 md:w-14 md:shadow-[0_8px_30px_rgba(37,211,102,0.4)]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 md:h-6 md:w-6">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
        </svg>
      </span>
    </a>
  );
}
