import {
  ArrowUpRight,
  Check,
  Clapperboard,
  Crown,
  Eye,
  Globe2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { type Locale } from "@/lib/i18n";

type Pack = {
  name: string;
  whatsappName?: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  saving?: string;
  note?: string;
  entryNote?: string;
  secondaryBadge?: string;
  ctaText?: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  popular?: boolean;
};

const whatsappPhone = "212771450503";

const packs: Pack[] = [
  {
    name: "Pack Découverte",
    price: "250 DH",
    entryNote: "Parfait pour tester nos services",
    description: "Pour tester rapidement un contenu professionnel avant d'accélérer votre présence digitale.",
    features: [
      "1 vidéo conçue pour capter l'attention",
      "Tournage sur place pour montrer votre activité",
      "Montage clair prêt à publier",
      "Format optimisé pour les réseaux sociaux",
      "Livraison rapide pour passer à l'action",
    ],
    icon: Clapperboard,
  },
  {
    name: "Pack Visibilité",
    price: "500 DH",
    oldPrice: "750 DH",
    discount: "-33%",
    saving: "Économisez 250 DH",
    note: "Choisi par la majorité de nos clients",
    description: "Le meilleur rapport visibilité/prix pour générer plus de demandes sans gros investissement.",
    features: [
      "3 vidéos conçues pour attirer plus de clients",
      "Tournage complet pour valoriser votre offre",
      "Montage professionnel orienté conversion",
      "Formats prêts pour Instagram, Facebook et TikTok",
      "Livraison HD pour une image plus crédible",
      "Conseils de publication pour maximiser l'impact",
    ],
    icon: Eye,
    popular: true,
  },
  {
    name: "Pack Business Digital",
    price: "1499 DH",
    oldPrice: "2500 DH",
    discount: "-40%",
    saving: "Économisez 1001 DH",
    secondaryBadge: "🏆 Meilleur rapport qualité/prix",
    description: "Pour transformer votre visibilité en vraie présence digitale avec un site qui rassure.",
    features: [
      "3 vidéos conçues pour créer la confiance",
      "Site web professionnel qui transforme les visiteurs en prospects",
      "Intégration WhatsApp pour recevoir plus de demandes",
      "Formulaire de contact pour capter les prospects",
      "Optimisation mobile pour convertir sur smartphone",
    ],
    icon: Globe2,
  },
  {
    name: "Pack Premium Business",
    price: "2999 DH",
    oldPrice: "5000 DH",
    discount: "-40%",
    saving: "Économisez 2001 DH",
    secondaryBadge: "👑 Solution complète",
    description: "Pour installer une image premium et créer un système complet de conversion digitale.",
    features: [
      "6 vidéos conçues pour renforcer votre autorité",
      "Site web complet pensé pour convertir",
      "SEO de base pour être plus visible sur Google",
      "Google Maps pour rassurer les clients locaux",
      "WhatsApp Business pour professionnaliser le contact",
      "Accompagnement personnalisé pour avancer plus vite",
    ],
    icon: Crown,
  },
];

const arPacks: Pack[] = [
  {
    name: "باك الانطلاقة",
    whatsappName: "Pack Découverte",
    price: "250 DH",
    entryNote: "مثالي باش تجرب خدماتنا",
    description: "بدا بأول محتوى احترافي وخلي الزبناء يتعرفو على الخدمة ديالك.",
    features: ["فيديو احترافي كيشد الانتباه", "تصوير فالمحل ولا فبلاصة الخدمة", "مونتاج جاهز للنشر", "مناسب لإنستغرام وتيك توك وفايسبوك", "تسليم سريع"],
    ctaText: "🚀 بدا المشروع ديالك دابا",
    icon: Clapperboard,
  },
  {
    name: "باك الظهور",
    whatsappName: "Pack Visibilité",
    price: "500 DH",
    oldPrice: "750 DH",
    discount: "-33%",
    saving: "وفّر 250 DH",
    note: "اختيار أغلب الزبناء",
    description: "خلي النشاط ديالك يبان أكثر ويوصل لناس أكثر.",
    features: ["3 فيديوهات احترافية", "تصوير كامل للخدمة أو المنتوج", "مونتاج احترافي كيحفز التفاعل", "فورمات جاهزة للسوشيال ميديا", "جودة HD", "نصائح للنشر وتحسين الوصول"],
    ctaText: "📈 بغيت نزيد فالزبناء ديالي",
    icon: Eye,
    popular: true,
  },
  {
    name: "باك بزنس ديجيتال",
    whatsappName: "Pack Business Digital",
    price: "1499 DH",
    oldPrice: "2500 DH",
    discount: "-40%",
    saving: "وفّر 1001 DH",
    secondaryBadge: "🏆 أفضل قيمة مقابل الثمن",
    description: "الحل المناسب باش تولي عندك صورة احترافية وتستقبل طلبات أكثر.",
    features: ["3 فيديوهات لبناء الثقة", "موقع إلكتروني احترافي", "ربط مباشر مع WhatsApp", "فورم لاستقبال الطلبات", "متوافق مع الهاتف والحاسوب"],
    ctaText: "💬 طلب استشارة مجانية",
    icon: Globe2,
  },
  {
    name: "باك بريميوم بزنس",
    whatsappName: "Pack Premium Business",
    price: "2999 DH",
    oldPrice: "5000 DH",
    discount: "-40%",
    saving: "وفّر 2001 DH",
    secondaryBadge: "👑 الحل الكامل",
    description: "للشركات والمشاريع اللي باغين يكبرو بسرعة ويقويو الحضور الرقمي ديالهم.",
    features: ["6 فيديوهات احترافية", "موقع إلكتروني متكامل", "تحسين الظهور فـ Google", "ربط Google Maps", "إعداد WhatsApp Business", "مواكبة واستشارة شخصية"],
    ctaText: "🚀 بدا المشروع ديالك دابا",
    icon: Crown,
  },
];

function whatsappHref(pack: Pack) {
  const packName = pack.whatsappName ?? pack.name;
  const message = `Bonjour Innovmark, je souhaite réserver le ${packName}.`;
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export default function Pricing({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedPacks = isArabic ? arPacks : packs;

  return (
    <section className="relative overflow-hidden bg-[#f7f8fb] px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 md:pb-20 md:pt-14 lg:px-10" dir={isArabic ? "rtl" : undefined}>
      <div className="mx-auto max-w-7xl">
        <div className="pricing-heading mx-auto mb-4 flex max-w-3xl flex-col items-center text-center md:mb-7 [&>.reveal-on-scroll]:gap-2 md:[&>.reveal-on-scroll]:gap-3">
          <SectionLabel
            kicker={isArabic ? "باقاتنا" : "Nos Packs"}
            title={
              isArabic
                ? "حلول مناسبة لكل مرحلة من نمو مشروعك"
                : "Des solutions adaptées à chaque étape de votre croissance"
            }
            subtitle={
              isArabic
                ? "اختار الصيغة المناسبة لنشاطك وطور حضورك الرقمي مع Innovmark."
                : "Choisissez la formule adaptée à votre activité et développez votre présence digitale avec Innovmark."
            }
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {displayedPacks.map((pack, index) => {
            const Icon = pack.icon;
            const cardClass = pack.popular
              ? "border-blue-950 bg-[#061a44] shadow-[0_32px_100px_rgba(6,26,68,0.30)] xl:-translate-y-6 xl:scale-[1.035]"
              : "border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
            const mutedTextClass = pack.popular ? "text-blue-100/78" : "text-slate-600";
            const titleClass = pack.popular ? "text-[#fff]" : "text-slate-950";
            const priceClass = pack.popular ? "text-[#fff]" : "text-slate-950";
            const oldPriceClass = pack.popular ? "text-blue-100/58" : "text-slate-400";
            const savingClass = pack.popular ? "text-sky-200" : "text-blue-600";
            const iconShellClass = pack.popular
              ? "border-blue-300/20 bg-blue-500/15 text-blue-100"
              : "border-blue-100 bg-blue-50 text-blue-700";
            const checkClass = pack.popular ? "bg-blue-400/18 text-blue-100 ring-blue-300/20" : "bg-blue-50 text-blue-700 ring-blue-100";
            const buttonClass = pack.popular
              ? "bg-sky-300 text-slate-950 hover:bg-sky-200"
              : "bg-blue-600 text-[#fff] hover:bg-blue-500";

            return (
              <article
                key={pack.name}
                dir={isArabic ? "rtl" : "ltr"}
                className={`reveal-on-scroll relative flex h-full min-w-0 flex-col rounded-lg border p-4 transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_84px_rgba(15,23,42,0.14)] sm:p-5 md:p-6 xl:min-h-[700px] xl:p-5 ${cardClass}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex min-h-12 items-center justify-between gap-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${iconShellClass}`}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  {pack.discount && (
                    <span className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-[#fff] shadow-[0_12px_28px_rgba(37,99,235,0.24)]">
                      {pack.discount}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  {pack.popular && (
                    <span className="mb-3 inline-flex max-w-full items-center rounded-lg bg-blue-500/18 px-3 py-1.5 text-xs font-semibold text-blue-50 ring-1 ring-blue-300/20">
                      {isArabic ? "⭐ الأكثر طلباً" : "⭐ Le Plus Choisi"}
                    </span>
                  )}
                  <h3 className={`text-2xl font-semibold leading-tight ${titleClass}`}>{pack.name}</h3>
                  {pack.note && (
                    <p className="mt-2 rounded-lg bg-blue-500/16 px-3 py-2 text-xs font-semibold text-blue-50 ring-1 ring-blue-300/18">
                      {pack.note}
                    </p>
                  )}
                  {pack.secondaryBadge && (
                    <p className={`mt-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      pack.popular
                        ? "bg-blue-500/16 text-blue-50 ring-1 ring-blue-300/18"
                        : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                    }`}>
                      {pack.secondaryBadge}
                    </p>
                  )}
                  <div className="mt-5 min-w-0">
                    {pack.oldPrice && (
                      <span className={`block text-sm font-semibold leading-none line-through decoration-2 ${oldPriceClass}`}>
                        {pack.oldPrice}
                      </span>
                    )}
                    <div className="mt-2 flex min-w-0 items-end gap-2">
                      <strong className={`text-[3.35rem] font-semibold leading-[0.95] tracking-normal ${priceClass} sm:text-6xl md:text-[4rem]`}>
                        {pack.price.replace(" DH", "")}
                      </strong>
                      <span className={`pb-1 text-base font-semibold ${mutedTextClass}`}>DH</span>
                    </div>
                    {pack.saving && (
                      <span className={`mt-3 block text-sm font-semibold leading-5 ${savingClass}`}>
                        {pack.saving}
                      </span>
                    )}
                    {pack.entryNote && (
                      <span className={`mt-3 block text-sm font-semibold leading-5 ${savingClass}`}>
                        {pack.entryNote}
                      </span>
                    )}
                  </div>
                  <p className={`mt-5 text-sm leading-6 xl:min-h-[120px] ${mutedTextClass}`}>{pack.description}</p>
                </div>

                <ul className="mt-5 space-y-3 xl:mt-7 xl:flex-1 xl:space-y-3.5">
                  {pack.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-3 text-sm leading-6 ${pack.popular ? "text-blue-50/88" : "text-slate-700"}`}>
                      <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${checkClass}`}>
                        <Check aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappHref(pack)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-center text-sm font-bold shadow-[0_18px_42px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(37,99,235,0.28)] xl:mt-8 ${buttonClass}`}
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>{isArabic ? pack.ctaText : "Réserver sur WhatsApp"}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="reveal-on-scroll mx-auto mt-4 flex max-w-4xl items-center justify-center text-sm font-semibold text-slate-700 md:mt-6">
          <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
            {isArabic ? "✓ مواكبة شخصية" : "✓ Accompagnement personnalisé"}
          </span>
        </div>
      </div>
    </section>
  );
}
