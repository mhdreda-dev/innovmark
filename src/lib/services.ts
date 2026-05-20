import type { Locale } from "@/lib/i18n";

export type ServiceSlug =
  | "promotional-videos"
  | "website-creation"
  | "branding"
  | "social-media"
  | "paid-ads"
  | "stock-management";

export type ServiceDetail = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  summary: string;
  intro: string;
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  bestFor: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "promotional-videos",
    eyebrow: "Promotional Videos",
    title: "Cinematic video content built to earn attention quickly.",
    summary:
      "Launch films, ads, reels and campaign videos with premium direction and clean commercial intent.",
    intro:
      "We shape the concept, visuals, rhythm and edit so your brand looks sharper from the first three seconds. Every video is planned around where it will live: social, website, paid ads or launch campaign.",
    outcomes: ["Premium brand perception", "Stronger launch assets", "Social-ready cuts"],
    deliverables: ["Creative direction", "Shot planning", "4K production", "Editing and color", "Short-form variations"],
    timeline: "1-3 weeks",
    bestFor: "Product launches, hospitality, retail, real estate and service brands.",
  },
  {
    slug: "website-creation",
    eyebrow: "Website Creation",
    title: "Fast, elegant websites that make the business easier to trust.",
    summary:
      "Premium websites and landing pages designed for clarity, speed and conversion.",
    intro:
      "Your website should feel expensive, load quickly and guide visitors without friction. We design the message, structure and interface so the brand feels serious on every screen.",
    outcomes: ["Clearer first impression", "Mobile-first conversion", "Better sales conversations"],
    deliverables: ["UX structure", "Responsive UI design", "Next.js development", "SEO basics", "Launch support"],
    timeline: "2-6 weeks",
    bestFor: "Founders, agencies, clinics, boutiques, restaurants and growing companies.",
  },
  {
    slug: "branding",
    eyebrow: "Branding",
    title: "Identity systems for brands that need to feel more established.",
    summary:
      "Logo, visual direction and brand rules that create a consistent premium presence.",
    intro:
      "We build a visual system your team can actually use: logo, typography, color, layout direction and practical brand assets for digital and campaign use.",
    outcomes: ["More premium positioning", "Consistent visuals", "Cleaner launch materials"],
    deliverables: ["Logo system", "Color and type direction", "Brand guidelines", "Social templates", "Launch visuals"],
    timeline: "2-4 weeks",
    bestFor: "New brands, repositioning projects and businesses ready to move upmarket.",
  },
  {
    slug: "social-media",
    eyebrow: "Social Media",
    title: "A cleaner social presence with content that feels intentional.",
    summary:
      "Strategy, content planning and premium creative systems for social channels.",
    intro:
      "We make your social presence easier to understand and easier to maintain, with a visual rhythm, content pillars and assets that support growth without looking generic.",
    outcomes: ["Stronger profile perception", "More consistent posting", "Clearer content direction"],
    deliverables: ["Content strategy", "Monthly calendar", "Creative templates", "Caption direction", "Performance review"],
    timeline: "Monthly",
    bestFor: "Brands that need consistency, quality and a clearer editorial point of view.",
  },
  {
    slug: "paid-ads",
    eyebrow: "Paid Ads",
    title: "Campaign creative and tracking for measurable demand.",
    summary:
      "Meta, Google and TikTok campaign assets built around offers, audiences and results.",
    intro:
      "We connect campaign visuals, copy, landing pages and tracking so paid traffic has a stronger reason to convert. The work is designed to be tested, read and improved.",
    outcomes: ["Sharper offers", "Better campaign learning", "More qualified leads"],
    deliverables: ["Campaign strategy", "Ad creative", "Copy variations", "Tracking setup", "Optimization rhythm"],
    timeline: "2-4 weeks setup",
    bestFor: "Service businesses, e-commerce launches and brands ready to invest in acquisition.",
  },
  {
    slug: "stock-management",
    eyebrow: "Stock Management",
    title: "Custom inventory systems that make operations easier to control.",
    summary:
      "Stock dashboards and workflows for sales, inventory, teams and daily decisions.",
    intro:
      "We build lightweight stock tools around the way your business works, so teams can see what is available, what is moving and what needs attention without spreadsheet chaos.",
    outcomes: ["Live stock visibility", "Cleaner team workflows", "Fewer manual errors"],
    deliverables: ["Workflow mapping", "Dashboard design", "Inventory logic", "User roles", "Training handoff"],
    timeline: "3-8 weeks",
    bestFor: "Retail, food, distribution, warehouses and multi-location operations.",
  },
];

export const arServices: ServiceDetail[] = [
  {
    slug: "promotional-videos",
    eyebrow: "فيديوهات وإعلانات",
    title: "فيديوهات كتشد الانتباه وكتبيّن قيمة البراند ديالك بسرعة.",
    summary:
      "فيديوهات للانطلاق، ريلز وإعلانات بإخراج احترافي وهدف تجاري واضح.",
    intro:
      "كنخدمو على الفكرة، الصورة والمونتاج باش البراند ديالك يبان قوي من أول ثلاث ثواني. كل فيديو كيتوجد على حساب فين غادي يتحط: إنستغرام، الموقع، الإعلانات، أو حملة انطلاق.",
    outcomes: ["صورة أوضح للمشروع", "تصاور وفيديوهات أحسن للانطلاق", "نسخ قصيرة جاهزة للنشر"],
    deliverables: ["اتجاه إبداعي", "تخطيط التصوير", "إنتاج 4K", "مونتاج وتصحيح الألوان", "نسخ قصيرة للإعلانات"],
    timeline: "1-3 سيمانات",
    bestFor: "انطلاق المنتجات، المطاعم، المحلات، العقار، والخدمات.",
  },
  {
    slug: "website-creation",
    eyebrow: "تصميم المواقع",
    title: "مواقع سريعة وأنيقة كتخلي البراند ديالك موثوق.",
    summary:
      "مواقع وصفحات هبوط احترافية مصممة باش تكون واضحة، سريعة، وتجيب تواصلات.",
    intro:
      "الموقع خاصو يبان مزيان، يتحل بسرعة، ويوجه الزائر بلا تعقيد. كنخدمو على الكلام، الترتيب، والتجربة باش البراند ديالك يبان جدي فكل شاشة.",
    outcomes: ["انطباع أول أوضح", "تحويل أحسن فالموبايل", "محادثات بيع أسهل"],
    deliverables: ["ترتيب الصفحات", "تصميم كيخدم فالهاتف والحاسوب", "تطوير الموقع", "أساسيات الظهور فمحركات البحث", "مواكبة الانطلاق"],
    timeline: "2-6 سيمانات",
    bestFor: "المؤسسين، العيادات، البوتيكات، المطاعم، والشركات اللي كتكبر.",
  },
  {
    slug: "branding",
    eyebrow: "براندينغ وهوية",
    title: "نصايبو ليك هوية احترافية للبراند ديالك.",
    summary:
      "لوغو، ألوان وطريقة عرض كتخلي البراند ديالك واضح ومتناسق.",
    intro:
      "كنوجدو ليك شكل بصري تقدر تخدم به: لوغو، خطوط، ألوان، طريقة التصميم، وقوالب عملية للمنشورات والإعلانات.",
    outcomes: ["صورة أكثر احترافية", "شكل متناسق", "مواد انطلاق نقية"],
    deliverables: ["لوغو واضح", "ألوان وخطوط", "دليل بسيط للشكل", "قوالب للمنشورات", "تصاميم للانطلاق"],
    timeline: "2-4 سيمانات",
    bestFor: "مشاريع جديدة، محلات كتبدل الشكل ديالها، وشركات باغية تبان بجودة أعلى.",
  },
  {
    slug: "social-media",
    eyebrow: "صفحات التواصل",
    title: "حضور منظم فصفحات التواصل بمنشورات باينة مقصودة.",
    summary:
      "خطة واضحة، أفكار منشورات، وتصاميم احترافية لصفحات التواصل.",
    intro:
      "كنخليو حضورك فصفحات التواصل أوضح وأسهل فالتسيير: شكل منظم، مواضيع واضحة، وتصاميم كتعاونك تكبر بلا ما يبان النشر عادي.",
    outcomes: ["صفحة أقوى", "نشر منظم", "اتجاه واضح للمنشورات"],
    deliverables: ["خطة منشورات", "برنامج شهري", "قوالب تصميم", "توجيه الكتابة", "مراجعة النتائج"],
    timeline: "شهرياً",
    bestFor: "مشاريع محتاجة الاستمرارية، الجودة، وصوت واضح فالسوق.",
  },
  {
    slug: "paid-ads",
    eyebrow: "الإعلانات المدفوعة",
    title: "إعلانات وتتبع باش الطلبات تكون قابلة للقياس.",
    summary:
      "مواد إعلانات فيسبوك، إنستغرام، گوگل وتيك توك مبنية على العرض، الجمهور، والنتائج.",
    intro:
      "كنربطو التصميم، النصوص، صفحات الهبوط والتتبع باش الناس اللي كيجيو من الإعلانات يلقاو سبب واضح باش يتواصلو أو يشريو. الخدمة كتتصمم باش تتجرب، تتقرا، وتتحسن.",
    outcomes: ["عروض أوضح", "تعلم أسرع من الحملات", "طلبات أكثر جودة"],
    deliverables: ["خطة الحملة", "تصاميم الإعلانات", "نصوص مختلفة", "إعداد التتبع", "طريقة التحسين"],
    timeline: "2-4 سيمانات إعداد",
    bestFor: "الخدمات، البيع فالإنترنت، والمشاريع اللي باغية تستثمر باش تجيب زبناء.",
  },
  {
    slug: "stock-management",
    eyebrow: "تسيير المخزون",
    title: "أنظمة مخزون على القياس كتسهل التحكم فالعمليات.",
    summary:
      "لوحات متابعة وطرق خدمة للمبيعات، المخزون، الفريق، والقرارات اليومية.",
    intro:
      "كنبنو أدوات خفيفة على حسب طريقة الخدمة ديالك، باش الفريق يعرف شنو موجود، شنو كيتحرك، وشنو محتاج متابعة بلا فوضى الإكسيل.",
    outcomes: ["رؤية مباشرة للمخزون", "طريقة خدمة أوضح للفريق", "أخطاء يدوية أقل"],
    deliverables: ["رسم طريقة الخدمة", "تصميم لوحة متابعة", "منطق المخزون", "صلاحيات المستخدمين", "تكوين وتسليم"],
    timeline: "3-8 سيمانات",
    bestFor: "المحلات، الغذاء، التوزيع، المخازن، ونقط بيع متعددة.",
  },
];

export const serviceMap = new Map(services.map((service) => [service.slug, service]));
export const arServiceMap = new Map(arServices.map((service) => [service.slug, service]));

export function getServiceDetail(slug: string, locale?: Locale) {
  return (locale === "ar" ? arServiceMap : serviceMap).get(slug as ServiceSlug);
}
