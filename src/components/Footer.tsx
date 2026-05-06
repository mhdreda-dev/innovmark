// Deterministic: evaluated once at module load, identical on server and client.
const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = {
  Studio: [
    { label: "À propos", href: "/#why" },
    { label: "Processus", href: "/#process" },
    { label: "Réalisations", href: "/#work" },
  ],
  Services: [
    { label: "Vidéos", href: "/services/promotional-videos" },
    { label: "Sites web", href: "/services/website-creation" },
    { label: "Branding", href: "/services/branding" },
    { label: "Publicités", href: "/services/paid-ads" },
  ],
  Contact: [
    { label: "WhatsApp", href: "https://wa.me/212771450503" },
    { label: "contact@innovmark.ma", href: "mailto:contact@innovmark.ma" },
    { label: "Contact page", href: "/contact" },
  ],
};

const arFooterLinks = {
  "الاستوديو": [
    { label: "من نحن", href: "/ar#why" },
    { label: "المنهجية", href: "/ar/processus" },
    { label: "الأعمال", href: "/ar#work" },
  ],
  "الخدمات": [
    { label: "الفيديو", href: "/ar/services/promotional-videos" },
    { label: "المواقع", href: "/ar/services/website-creation" },
    { label: "الهوية", href: "/ar/services/branding" },
    { label: "الإعلانات", href: "/ar/services/paid-ads" },
  ],
  "التواصل": [
    { label: "واتساب", href: "https://wa.me/212771450503" },
    { label: "contact@innovmark.ma", href: "mailto:contact@innovmark.ma" },
    { label: "صفحة التواصل", href: "/ar/contact" },
  ],
};

export default function Footer({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const links = isArabic ? arFooterLinks : footerLinks;

  return (
    <footer className="border-t border-white/12 bg-white/[0.055] pt-14 pb-8 backdrop-blur-md md:pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 pb-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] md:gap-12 md:pb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-200 to-violet-400" />
              <span className="text-white text-sm tracking-[0.38em] uppercase font-light">
                Innovmark
              </span>
            </div>
            <p className="text-white/68 text-sm leading-7 max-w-xs">
              {isArabic
                ? "أنظمة تسويق راقية للعلامات التي تريد حضوراً أقوى، تواصلاً أوضح، ونمواً بثقة."
                : "Premium marketing systems for brands that want to look expensive, communicate clearly and grow with confidence."}
            </p>
          </div>

          {Object.entries(links).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/82 text-[11px] tracking-[0.34em] uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-white/68 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <span className="text-white/52 text-xs">
            © {CURRENT_YEAR} Innovmark Studio. {isArabic ? "جميع الحقوق محفوظة." : "Tous droits réservés."}
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/48 hover:text-white/78 text-xs">
              {isArabic ? "الشروط القانونية" : "Mentions légales"}
            </a>
            <a href="#" className="text-white/48 hover:text-white/78 text-xs">
              {isArabic ? "الخصوصية" : "Confidentialité"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
