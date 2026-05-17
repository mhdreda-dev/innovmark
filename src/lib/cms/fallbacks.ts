import { heroImages } from "@/data/hero-images";
import { dictionaries, localizedHref, type Locale } from "@/lib/i18n";
import type { CmsHomeContent, CmsPartner, CmsService, CmsTestimonial } from "./types";

export const defaultHomeSections = [
  "creative-formats",
  "brand-marquee",
  "stats",
  "saad-belkaadi",
  "capabilities",
  "partners",
  "testimonials",
  "pricing",
  "cta",
];

export const fallbackServices: Record<Locale, CmsService[]> = {
  fr: [
    { slug: "promotional-videos", title: "Videos Promotionnelles", description: "Films, reels et publicites premium concus pour arreter le scroll et elever la perception.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "Creation de Sites Web", description: "Sites vitrines, landing pages et experiences rapides qui inspirent confiance sur chaque ecran.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "Branding & Identite", description: "Logo, direction artistique et systeme visuel pour installer une marque plus desirable.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
  ],
  en: [
    { slug: "promotional-videos", title: "Promotional Videos", description: "Premium films, reels and ads designed to stop the scroll and raise perception.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "Website Creation", description: "Fast websites and landing pages that build trust on every screen.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "Branding & Identity", description: "Logo, art direction and visual systems for a more desirable brand.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
  ],
  ar: [
    { slug: "promotional-videos", title: "فيديوهات إعلانية", description: "فيديوهات قصيرة وإعلانات كتشد الانتباه وكتبيّن قيمة المشروع ديالك.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "تصميم المواقع", description: "مواقع وصفحات هبوط سريعة كتخلي الزائر يثق فالمشروع.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "لوغو وشكل المشروع", description: "نصاوبو ليك لوغو وألوان وشكل احترافي يخلي المشروع ديالك واضح ومميز.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
  ],
};

export const fallbackTestimonials: Record<Locale, CmsTestimonial[]> = {
  fr: [
    { quote: "Innovmark made our brand look like it belonged in a higher category. The work was sharp, fast, and commercially clear.", name: "Yassine B.", role: "Founder · Retail Brand", rating: 5, isActive: true, sortOrder: 0 },
    { quote: "The website, videos and campaign assets finally felt connected. We stopped explaining our value and started showing it.", name: "Salma A.", role: "Managing Partner · Service Co.", rating: 5, isActive: true, sortOrder: 1 },
    { quote: "Communication was direct, premium and structured. They understood the business side, not only the visuals.", name: "Omar L.", role: "Owner · Real Estate Group", rating: 5, isActive: true, sortOrder: 2 },
  ],
  en: [
    { quote: "Innovmark made our brand look like it belonged in a higher category. The work was sharp, fast, and commercially clear.", name: "Yassine B.", role: "Founder · Retail Brand", rating: 5, isActive: true, sortOrder: 0 },
    { quote: "The website, videos and campaign assets finally felt connected. We stopped explaining our value and started showing it.", name: "Salma A.", role: "Managing Partner · Service Co.", rating: 5, isActive: true, sortOrder: 1 },
    { quote: "Communication was direct, premium and structured. They understood the business side, not only the visuals.", name: "Omar L.", role: "Owner · Real Estate Group", rating: 5, isActive: true, sortOrder: 2 },
  ],
  ar: [
    { quote: "المشروع ديالنا ولى كيبان فمستوى أحسن. الخدمة كانت نقية وسريعة وواضحة.", name: "ياسين ب.", role: "مؤسس · محل تجاري", rating: 5, isActive: true, sortOrder: 0 },
    { quote: "الموقع والفيديوهات ومواد الحملات ولاو خدامين كمنظومة وحدة.", name: "سلمى أ.", role: "مسيرة · شركة خدمات", rating: 5, isActive: true, sortOrder: 1 },
  ],
};

export const fallbackPartners: Record<Locale, CmsPartner[]> = {
  fr: [],
  en: [],
  ar: [],
};

const seoByLocale: Record<Locale, NonNullable<CmsHomeContent["seo"]>> = {
  fr: {
    title: "Innovmark — Studio Créatif Premium · Casablanca",
    description: "Vidéos promotionnelles, sites web, branding, réseaux sociaux, publicités et systèmes de gestion.",
    keywords: ["Innovmark", "marketing", "branding", "web design"],
    noIndex: false,
  },
  en: {
    title: "Innovmark — Premium Creative Studio · Casablanca",
    description: "Promotional videos, websites, branding, social media, ads and management systems.",
    keywords: ["Innovmark", "marketing", "branding", "web design"],
    noIndex: false,
  },
  ar: {
    title: "Innovmark — الإشهار والتواصل للمشاريع المغربية فالدار البيضاء",
    description:
      "مواقع، لوغو، تصاور وفيديوهات ومنشورات وإعلانات كيعونو المشاريع المغربية تبان مزيان فالإنترنت وتجيب زبناء أكثر.",
    keywords: ["Innovmark", "الإشهار والتواصل", "لوغو", "المواقع", "الإعلانات"],
    noIndex: false,
  },
};

export function getFallbackHomeContent(locale: Locale): CmsHomeContent {
  const dict = dictionaries[locale];
  return {
    locale,
    sections: defaultHomeSections,
    hero: {
      eyebrow: dict.home.heroSubtitle,
      title: dict.home.heroTitle,
      description: dict.home.heroDescription,
      ctaLabel: dict.home.heroCta,
      ctaHref: `https://wa.me/212771450503?text=${encodeURIComponent(dict.home.heroWhatsappMessage)}`,
      secondaryCtaLabel: dict.home.heroSecondaryCta,
      secondaryCtaHref: localizedHref("/contact", locale),
      whatsappMessage: dict.home.heroWhatsappMessage,
      heroVideoUrl: "",
      features: [...dict.home.features],
      carouselImages: heroImages,
    },
    services: fallbackServices[locale],
    partners: fallbackPartners[locale],
    testimonials: fallbackTestimonials[locale],
    seo: seoByLocale[locale],
  };
}
