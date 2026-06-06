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
    entryNote: "مثالي لتجربة خدماتنا",
    description: "صيغة باش تجرب محتوى احترافي بسرعة قبل ما تطور حضورك الرقمي.",
    features: ["فيديو مصمم باش يشد الانتباه", "تصوير فالمكان باش تبين النشاط ديالك", "مونتاج واضح وجاهز للنشر", "فورما مناسب للسوشيال ميديا", "تسليم سريع باش تبدا مباشرة"],
    icon: Clapperboard,
  },
  {
    name: "باك الظهور",
    whatsappName: "Pack Visibilité",
    price: "500 DH",
    oldPrice: "750 DH",
    discount: "-33%",
    saving: "وفّر 250 DH",
    note: "اختيار اغلب عملائنا",
    description: "احسن توازن بين الثمن والظهور باش تجيب طلبات اكثر بلا استثمار كبير.",
    features: ["3 فيديوهات مصممة باش تجيب زبناء اكثر", "تصوير كامل باش تبين العرض ديالك", "مونتاج احترافي مركز على التحويل", "فورما جاهز ل Instagram و Facebook و TikTok", "تسليم HD لصورة اكثر ثقة", "نصائح للنشر باش تزيد الاثر"],
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
    secondaryBadge: "🏆 افضل قيمة مقابل السعر",
    description: "باش تحول الظهور ديالك لحضور رقمي كيقنع وكيجيب التواصل.",
    features: ["3 فيديوهات مصممة باش تبني الثقة", "موقع احترافي كيحول الزوار لطلبات", "ربط WhatsApp باش تستقبل طلبات اكثر", "فورم ديال التواصل لجمع العملاء المحتملين", "تحسين للموبايل باش تحول من الهاتف"],
    icon: Globe2,
  },
  {
    name: "باك بريميوم بزنس",
    whatsappName: "Pack Premium Business",
    price: "2999 DH",
    oldPrice: "5000 DH",
    discount: "-40%",
    saving: "وفّر 2001 DH",
    secondaryBadge: "👑 حل متكامل",
    description: "باش تبني صورة بريميوم ونظام رقمي كامل كيحول الزوار لطلبات.",
    features: ["6 فيديوهات مصممة باش تقوي السلطة ديالك", "موقع كامل موجه للتحويل", "SEO اساسي باش تبان اكثر ف Google", "ربط Google Maps باش تطمئن الزبناء المحليين", "WhatsApp Business لتواصل اكثر احترافية", "مواكبة شخصية باش تتقدم بسرعة"],
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
    <section className="relative overflow-hidden bg-[#f7f8fb] px-4 pb-28 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-10" dir={isArabic ? "rtl" : undefined}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center md:mb-14">
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

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                className={`reveal-on-scroll relative flex h-full min-h-[700px] min-w-0 flex-col rounded-lg border p-5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_84px_rgba(15,23,42,0.14)] md:p-6 xl:p-5 ${cardClass}`}
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
                      ⭐ Le Plus Choisi
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
                  <p className={`mt-5 min-h-[120px] text-sm leading-6 ${mutedTextClass}`}>{pack.description}</p>
                </div>

                <ul className="mt-7 flex-1 space-y-3.5">
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
                  className={`mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-center text-sm font-bold shadow-[0_18px_42px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(37,99,235,0.28)] ${buttonClass}`}
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>{isArabic ? "📲 احجز عبر WhatsApp" : "Réserver sur WhatsApp"}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="reveal-on-scroll mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-3 text-sm font-semibold text-slate-700 sm:flex-row sm:flex-wrap">
          {(isArabic
            ? ["✓ رد سريع", "✓ مواكبة شخصية", "✓ تسليم احترافي"]
            : ["✓ Réponse rapide", "✓ Accompagnement personnalisé", "✓ Livraison professionnelle"]
          ).map((item) => (
            <span key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
