import Link from "next/link";

// Deterministic: evaluated once at module load, identical on server and client.
const CURRENT_YEAR = new Date().getFullYear();

const WA_HREF = "https://wa.me/212771450503";

/* ─── Desktop link columns ─────────────────────────── */
const footerLinks = {
  Studio: [
    { label: "À propos",    href: "/#why" },
    { label: "Processus",   href: "/#process" },
    { label: "Réalisations",href: "/#work" },
  ],
  Services: [
    { label: "Vidéos",      href: "/services/promotional-videos" },
    { label: "Sites web",   href: "/services/website-creation" },
    { label: "Branding",    href: "/services/branding" },
    { label: "Publicités",  href: "/services/paid-ads" },
  ],
  Contact: [
    { label: "WhatsApp",               href: WA_HREF },
    { label: "contact@innovmark.ma",   href: "mailto:contact@innovmark.ma" },
    { label: "Contact page",           href: "/contact" },
  ],
};

const arFooterLinks = {
  "الاستوديو": [
    { label: "علاش حنا",    href: "/ar#why" },
    { label: "طريقة الخدمة", href: "/ar/processus" },
    { label: "الأعمال",     href: "/ar#work" },
  ],
  "الخدمات": [
    { label: "الفيديوهات",     href: "/ar/services/promotional-videos" },
    { label: "المواقع",     href: "/ar/services/website-creation" },
    { label: "براندينغ وهوية",  href: "/ar/services/branding" },
    { label: "الإعلانات",   href: "/ar/services/paid-ads" },
  ],
  "التواصل": [
    { label: "واتساب",                href: WA_HREF },
    { label: "contact@innovmark.ma",  href: "mailto:contact@innovmark.ma" },
    { label: "صفحة التواصل",          href: "/ar/contact" },
  ],
};

/* ─── Locale-aware copy helpers ─────────────────────── */
function t(locale: string | undefined, fr: string, en: string, ar: string) {
  if (locale === "ar") return ar;
  if (locale === "en") return en;
  return fr;
}

function localHref(path: string, locale?: string) {
  if (!locale) return path;
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) return path;
  if (path.startsWith(`/${locale}`)) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/* ─── Component ─────────────────────────────────────── */
export default function Footer({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const desktopLinks = isArabic ? arFooterLinks : footerLinks;

  /* Essential mobile links — 3 items max */
  const mobileNavLinks = [
    {
      label: t(locale, "Accueil", "Home", "الرئيسية"),
      href: localHref("/", locale),
    },
    {
      label: t(locale, "Services", "Services", "الخدمات"),
      href: localHref("/services", locale),
    },
    {
      label: t(locale, "Contact", "Contact", "تواصل معنا"),
      href: localHref("/contact", locale),
    },
  ];

  const tagline = t(
    locale,
    "Studio créatif premium pour marques exigeantes.",
    "Premium creative studio for demanding brands.",
    "وكالة ماركتينغ بريميوم كتعاون المشاريع تبان باحترافية فالإنترنت.",
  );

  const copyright = t(
    locale,
    `© ${CURRENT_YEAR} Innovmark Studio. Tous droits réservés.`,
    `© ${CURRENT_YEAR} Innovmark Studio. All rights reserved.`,
    `© ${CURRENT_YEAR} Innovmark Studio. جميع الحقوق محفوظة.`,
  );

  const legalLabel   = t(locale, "Mentions légales", "Legal",        "معلومات قانونية");
  const privacyLabel = t(locale, "Confidentialité",  "Privacy",      "الخصوصية");
  const waLabel      = t(locale, "Écrire sur WhatsApp", "Chat on WhatsApp", "تواصل معنا فواتساب");

  return (
    <footer className="border-t border-white/12 bg-white/[0.055] backdrop-blur-md">

      {/* ══════════════════════════════════════════
          DESKTOP layout  (md and above)
      ══════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 lg:px-10">
          {/* 4-column grid — unchanged from original */}
          <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1fr] gap-10 pb-16 rtl-text-right">
            {/* Brand column */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-200 to-violet-400" />
                <span className="text-sm font-light tracking-[0.38em] uppercase text-white">
                  Innovmark
                </span>
              </div>
              <p className="max-w-xs text-sm leading-7 text-white/68">
                {isArabic
                  ? "خدمات فالإنترنت للمشاريع اللي باغية تبان بقيمة، توصل الرسالة بوضوح، وتكبر بثقة."
                  : "Premium marketing systems for brands that want to look expensive, communicate clearly and grow with confidence."}
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(desktopLinks).map(([title, cols]) => (
              <div key={title}>
                <h4 className="mb-5 text-[11px] tracking-[0.34em] uppercase text-white/82">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {cols.map((l) => (
                    <li key={l.label}>
                      <a
                        href={localHref(l.href, locale)}
                        className="text-sm text-white/68 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop bottom bar */}
          <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-8 rtl-row">
            <span className="text-xs text-white/52">{copyright}</span>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/48 transition-colors hover:text-white/78">{legalLabel}</a>
              <a href="#" className="text-xs text-white/48 transition-colors hover:text-white/78">{privacyLabel}</a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE layout  (below md)
      ══════════════════════════════════════════ */}
      <div className="md:hidden">
        <div className="mx-auto max-w-lg px-4 pt-10 pb-8 sm:px-6">

          {/* Logo */}
          <div className="mb-3 flex items-center gap-2 rtl-row">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-200 to-violet-400" />
            <span className="text-sm font-light uppercase tracking-[0.26em] text-white sm:tracking-[0.38em]">
              Innovmark
            </span>
          </div>

          {/* Tagline */}
          <p className="mb-8 text-sm leading-6 text-white/58">{tagline}</p>

          {/* Essential nav links — horizontal row */}
          <nav aria-label="Footer navigation">
            <ul className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5">
              {mobileNavLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white sm:tracking-[0.22em]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* WhatsApp CTA */}
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full border border-white/14 bg-white/[0.06] text-sm font-medium tracking-wide text-white transition-all duration-200 active:scale-95"
          >
            {/* WhatsApp icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[#25D366]" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>{waLabel}</span>
          </a>

          {/* Divider + copyright */}
          <div className="border-t border-white/[0.08] pt-6 text-center">
            <span className="text-[11px] text-white/38">{copyright}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
