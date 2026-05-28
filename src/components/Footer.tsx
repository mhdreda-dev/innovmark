import { isLocale, localizedHref, type Locale } from "@/lib/i18n";

const WA_HREF =
  "https://wa.me/212771450503?text=Bonjour%20Innovmark%2C%20je%20souhaite%20am%C3%A9liorer%20ma%20pr%C3%A9sence%20digitale.";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/innovmark" },
  { label: "Facebook", href: "https://www.facebook.com/innovmark" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/innovmark" },
  { label: "WhatsApp", href: WA_HREF },
];

const mobileSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/innovmark" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/innovmark" },
  { label: "Facebook", href: "https://www.facebook.com/innovmark" },
];

/* ─── Desktop link columns ─────────────────────────── */
const footerLinks = {
  Studio: [
    { label: "À propos",    href: "/pourquoi-nous" },
    { label: "Processus",   href: "/processus" },
    { label: "Réalisations",href: "/#work" },
  ],
  Services: [
    { label: "Vidéos",      href: "/services/promotional-videos" },
    { label: "Sites web",   href: "/services/website-creation" },
    { label: "Identité de marque", href: "/services/branding" },
    { label: "Publicités",  href: "/services/paid-ads" },
  ],
  Contact: [
    { label: "WhatsApp",               href: WA_HREF },
    { label: "contact@innovmark.ma",   href: "mailto:contact@innovmark.ma" },
    { label: "Page contact",           href: "/contact" },
  ],
};

const arFooterLinks = {
  "الاستوديو": [
    { label: "علاش حنا",    href: "/pourquoi-nous" },
    { label: "طريقة الخدمة", href: "/processus" },
    { label: "الأعمال",     href: "/#work" },
  ],
  "الخدمات": [
    { label: "الفيديوهات",     href: "/services/promotional-videos" },
    { label: "المواقع",     href: "/services/website-creation" },
    { label: "براندينغ وهوية",  href: "/services/branding" },
    { label: "الإعلانات",   href: "/services/paid-ads" },
  ],
  "التواصل": [
    { label: "واتساب",                href: WA_HREF },
    { label: "contact@innovmark.ma",  href: "mailto:contact@innovmark.ma" },
    { label: "صفحة التواصل",          href: "/contact" },
  ],
};

/* ─── Locale-aware copy helpers ─────────────────────── */
function t(locale: string | undefined, fr: string, en: string, ar: string) {
  if (locale === "ar") return ar;
  if (locale === "en") return en;
  return fr;
}

/* ─── Component ─────────────────────────────────────── */
export default function Footer({ locale }: { locale?: string }) {
  const activeLocale: Locale | undefined = locale && isLocale(locale) ? locale : undefined;
  const isArabic = locale === "ar";
  const desktopLinks = isArabic ? arFooterLinks : footerLinks;
  const contactLinks = isArabic ? arFooterLinks["التواصل"] : footerLinks.Contact;

  const tagline = t(
    locale,
    "Studio créatif spécialisé en branding, contenu digital et croissance d’image.",
    "Creative studio specialized in branding, digital content and brand growth.",
    "ستوديو كرييتيف متخصص فالبراندينغ، المحتوى الرقمي ونمو صورة العلامة.",
  );

  const copyright = t(
    locale,
    "© Innovmark Studio",
    "© Innovmark Studio",
    "© Innovmark Studio",
  );

  const legalLabel   = t(locale, "Mentions légales", "Legal",        "معلومات قانونية");
  const privacyLabel = t(locale, "Confidentialité",  "Privacy",      "الخصوصية");
  const locationLabel = t(locale, "Sidi Kacem • Maroc", "Sidi Kacem • Morocco", "سيدي قاسم • المغرب");
  const contactTitle = t(locale, "Contact direct", "Direct contact", "تواصل مباشر");
  const socialTitle = t(locale, "Réseaux", "Social", "الشبكات");
  const waLabel = t(locale, "WhatsApp — Réponse rapide", "WhatsApp — Fast reply", "واتساب");

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070b] text-white shadow-[0_-24px_90px_rgba(0,0,0,0.35)]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-52 w-[min(760px,82vw)] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(122,217,255,0.38), rgba(124,58,237,0.14) 45%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:hidden">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-200 to-violet-400 shadow-[0_0_22px_rgba(122,217,255,0.75)]" />
            <span className="text-sm font-light uppercase tracking-[0.3em] text-white">
              Innovmark
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-6 text-white/74">
            Studio créatif spécialisé en branding, contenu digital et croissance.
          </p>

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-emerald-300/80 bg-[#25D366] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white shadow-[0_18px_42px_rgba(37,211,102,0.28)] transition duration-300 hover:bg-[#1ebe5a]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
            </svg>
            WhatsApp — Réponse rapide
          </a>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {mobileSocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.065] px-3.5 text-xs font-medium text-white/76 transition duration-300 hover:border-cyan-200/35 hover:bg-white/[0.1] hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-xs text-white/58">Sidi Kacem • Maroc</p>
            <p className="mt-2 text-xs text-white/46">© Innovmark Studio</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:block md:pb-20 md:pt-16 lg:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:rounded-[28px] sm:p-7 lg:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.95fr] lg:gap-12 rtl-text-right">
            <div>
              <div className="mb-5 flex items-center justify-center gap-3 md:justify-start rtl-row">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-200 to-violet-400 shadow-[0_0_22px_rgba(122,217,255,0.75)]" />
                <span className="text-sm font-light uppercase tracking-[0.34em] text-white">
                  Innovmark
                </span>
              </div>
              <p className="mx-auto max-w-sm text-center text-[15px] leading-7 text-white/76 md:mx-0 md:text-left">
                {tagline}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start rtl-row">
                <span className="w-full rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-center text-xs font-medium tracking-[0.12em] text-white/72 uppercase sm:w-auto sm:tracking-[0.18em]">
                  {locationLabel}
                </span>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-emerald-400 bg-emerald-500 px-4 py-2 text-center text-xs font-medium tracking-[0.12em] text-white uppercase shadow-[0_14px_32px_rgba(16,185,129,0.25)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-600 hover:shadow-[0_18px_42px_rgba(16,185,129,0.34)] sm:w-auto sm:tracking-[0.18em]"
                >
                  {waLabel}
                </a>
              </div>
            </div>

            {Object.entries(desktopLinks).slice(0, 2).map(([title, cols]) => (
              <div key={title} className="text-center md:text-left rtl-text-right">
                <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/92">
                  {title}
                </h4>
                <ul className="space-y-3.5">
                  {cols.map((l) => (
                    <li key={l.label}>
                      <a
                        href={localizedHref(l.href, activeLocale)}
                        className="inline-flex text-sm text-white/62 transition duration-200 hover:-translate-y-0.5 hover:text-cyan-100"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="text-center md:text-left rtl-text-right">
              <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/92">
                {contactTitle}
              </h4>
              <ul className="space-y-3.5">
                {contactLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={localizedHref(l.href, activeLocale)}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex text-sm text-white/62 transition duration-200 hover:-translate-y-0.5 hover:text-cyan-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <h4 className="mb-4 mt-8 text-[11px] font-medium uppercase tracking-[0.34em] text-white/92">
                {socialTitle}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start rtl-row">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.055] px-3.5 text-xs font-medium text-white/72 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-cyan-200/35 hover:bg-white/[0.085] hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-center md:flex-row md:text-left rtl-row">
            <span className="text-xs text-white/54">{copyright}</span>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href={localizedHref("/", activeLocale)} className="text-xs text-white/54 transition-colors hover:text-cyan-100">
                {legalLabel}
              </a>
              <a href={localizedHref("/", activeLocale)} className="text-xs text-white/54 transition-colors hover:text-cyan-100">
                {privacyLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
