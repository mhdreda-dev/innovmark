import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const tiers = [
  {
    name: "Starter",
    line: "For brands that need a premium first impression.",
    scope: ["Landing page or brand refresh", "Core visual direction", "Launch-ready content kit"],
  },
  {
    name: "Growth",
    line: "For businesses ready to turn attention into demand.",
    scope: ["Website + campaign system", "Paid ads creative direction", "Conversion and analytics setup"],
    featured: true,
  },
  {
    name: "Elite",
    line: "For serious launches requiring full creative command.",
    scope: ["Brand, web, video and ads", "Priority production cadence", "Executive-level reporting"],
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
    <section className="relative py-12 md:py-20" dir={isArabic ? "rtl" : undefined}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-8 md:mb-12">
          <SectionLabel
            kicker={isArabic ? "باقات الخدمة" : "Engagements"}
            title={isArabic ? "باقات احترافية لمشاريع جدية." : "Premium packages for serious business."}
            subtitle={isArabic ? "ما كنقدموش لائحة خدمات عامة. كل تعاون كنحددو فيه الهدف، السرعة، ومستوى الجودة اللي محتاج المشروع ديالك." : "No commodity agency menu. Each engagement is scoped around outcome, speed and the level of polish your brand needs."}
            align={isArabic ? "center" : "left"}
          />
        </div>

        <div className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 ${isArabic ? "items-stretch" : ""}`}>
          {displayedTiers.map((tier) => (
            <article
              key={tier.name}
              dir={isArabic ? "rtl" : "ltr"}
              className={`premium-glass relative flex min-h-[300px] min-w-0 flex-col rounded-2xl md:min-h-[340px] ${
                isArabic ? "h-full border-white/14 bg-white/[0.065] p-6 text-right md:p-8" : "p-5 text-left md:p-8"
              } ${tier.featured ? "border-cyan-200/30 bg-white/[0.09]" : ""}`}
            >
              {tier.featured && (
                <div className={`mb-5 w-fit rounded-full border border-cyan-200/24 bg-cyan-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100 ${isArabic ? "self-start" : ""}`}>
                  {isArabic ? "الأكثر اختياراً" : "Most chosen"}
                </div>
              )}
              <h3 className="text-2xl font-light tracking-tight text-white md:text-3xl">{tier.name}</h3>
              <p className={`mt-3 max-w-sm text-sm leading-6 md:mt-4 md:leading-7 ${isArabic ? "text-white/82" : "text-white/72"}`}>{tier.line}</p>
              <ul className={`mt-6 space-y-3 md:mt-8 ${isArabic ? "text-right" : ""}`}>
                {tier.scope.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm leading-7 ${isArabic ? "text-right text-white/84" : "text-white/76"}`}>
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/80" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={localizedHref("/contact", locale)}
                className={`mt-7 inline-flex min-h-11 w-full max-w-full items-center justify-center rounded-full border border-white/18 px-5 py-3 text-center text-[11px] uppercase tracking-[0.12em] text-white/84 transition-all hover:border-cyan-200/50 hover:bg-white/[0.08] hover:text-white md:mt-auto md:w-fit md:min-w-44 md:tracking-[0.18em] ${isArabic ? "self-stretch border-white/24 bg-white/[0.035] text-white/90 md:self-start" : ""}`}
              >
                {isArabic ? "طلب نطاق الخدمة" : "Request scope"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
