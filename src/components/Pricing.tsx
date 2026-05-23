import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const tiers = [
  {
    name: "Essentiel",
    line: "Pour les marques qui veulent installer une première impression premium.",
    scope: ["Page d'atterrissage ou rafraîchissement de marque", "Direction visuelle fondamentale", "Kit de lancement prêt à publier"],
  },
  {
    name: "Croissance",
    line: "Pour les entreprises prêtes à transformer l'attention en demande.",
    scope: ["Site web + système de campagne", "Direction créative des publicités payantes", "Configuration conversion et analyse"],
    featured: true,
  },
  {
    name: "Signature",
    line: "Pour les lancements ambitieux qui exigent une direction créative complète.",
    scope: ["Marque, web, vidéo et publicités", "Cadence de production prioritaire", "Reporting stratégique pour la direction"],
  },
];

const arTiers = [
  {
    name: "البداية",
    line: "للمشاريع اللي محتاجة انطباع أول احترافي ومقنع.",
    scope: ["صفحة هبوط أو تحسين شكل البراند", "طريقة عرض أساسية", "محتوى جاهز للانطلاق"],
  },
  {
    name: "النمو",
    line: "للمشاريع اللي باغية تحول الانتباه لطلبات وزبناء.",
    scope: ["موقع + نظام حملات", "اتجاه إبداعي للإعلانات", "إعداد التحويل والتحليلات"],
    featured: true,
  },
  {
    name: "النخبة",
    line: "للانطلاقات الجدية اللي محتاجة قيادة إبداعية كاملة.",
    scope: ["براندينغ، موقع، فيديو وإعلانات", "إيقاع إنتاج بأولوية أعلى", "تقارير واضحة للإدارة"],
  },
];

export default function Pricing({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedTiers = isArabic ? arTiers : tiers;

  return (
    <section className="relative py-16 md:py-24" dir={isArabic ? "rtl" : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-8 md:mb-12">
          <SectionLabel
            kicker={isArabic ? "باقات الخدمة" : "Accompagnements"}
            title={isArabic ? "باقات احترافية لمشاريع جدية." : "Des solutions pensées pour votre croissance."}
            subtitle={isArabic ? "ما كنقدموش لائحة خدمات عامة. كل تعاون كنحددو فيه الهدف، السرعة، ومستوى الجودة اللي محتاج المشروع ديالك." : "Pas de catalogue générique. Chaque collaboration est cadrée autour du résultat attendu, du rythme et du niveau d'exigence dont votre marque a besoin."}
            align={isArabic ? "center" : "left"}
          />
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {displayedTiers.map((tier) => (
            <article
              key={tier.name}
              dir={isArabic ? "rtl" : "ltr"}
              className={`relative flex h-full min-h-[390px] min-w-0 flex-col rounded-2xl border bg-white/88 shadow-[0_16px_44px_rgba(15,23,42,0.075)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(15,23,42,0.10)] md:min-h-[390px] ${
                isArabic ? "border-blue-100/80 p-6 text-right md:p-8" : "border-blue-100/80 p-5 text-left md:p-8"
              } ${tier.featured ? "border-blue-300/55 bg-white shadow-[0_20px_58px_rgba(79,140,255,0.14)]" : ""}`}
            >
              {tier.featured && (
                <div className={`mb-5 w-fit rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-700 ${isArabic ? "self-start" : ""}`}>
                  {isArabic ? "الأكثر اختياراً" : "Le plus choisi"}
                </div>
              )}
              <h3 className="text-2xl font-light tracking-tight text-slate-950 md:text-3xl">{tier.name}</h3>
              <p className={`mt-3 max-w-sm text-sm leading-6 text-slate-600 md:mt-4 md:leading-7 ${isArabic ? "text-right" : ""}`}>{tier.line}</p>
              <ul className={`mt-6 flex-1 space-y-3 md:mt-8 ${isArabic ? "text-right" : ""}`}>
                {tier.scope.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm leading-7 text-slate-700 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                    <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(79,140,255,0.34)]" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={localizedHref("/contact", locale)}
                className={`mt-8 inline-flex min-h-11 w-full max-w-full items-center justify-center rounded-full border border-blue-500/25 bg-blue-600 px-5 py-3 text-center text-[11px] uppercase tracking-[0.12em] text-[#fff] shadow-[0_12px_28px_rgba(79,140,255,0.24)] transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_16px_34px_rgba(79,140,255,0.30)] md:w-fit md:min-w-44 md:tracking-[0.18em] ${isArabic ? "self-stretch md:self-start" : ""}`}
              >
                {isArabic ? "طلب نطاق الخدمة" : "Définir le périmètre"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
