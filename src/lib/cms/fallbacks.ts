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
    { slug: "promotional-videos", title: "Vidéos promotionnelles", description: "Films, reels et publicités premium conçus pour capter l'attention et élever la perception.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "Création de sites web", description: "Sites vitrines, pages d'atterrissage et expériences rapides qui inspirent confiance sur chaque écran.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "Identité de marque", description: "Logo, direction artistique et système visuel pour installer une marque plus désirable.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
  ],
  en: [
    { slug: "promotional-videos", title: "Promotional Videos", description: "Premium films, reels and ads designed to stop the scroll and raise perception.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "Website Creation", description: "Fast websites and landing pages that build trust on every screen.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "Branding & Identity", description: "Logo, art direction and visual systems for a more desirable brand.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
  ],
  ar: [
    { slug: "promotional-videos", title: "فيديوهات إعلانية", description: "فيديوهات قصيرة وإعلانات مصممة باش تشد الانتباه وتوصل قيمة المشروع ديالك بسرعة.", icon: "Clapperboard", tone: "cyan", isActive: true, sortOrder: 0 },
    { slug: "website-creation", title: "تصميم المواقع", description: "مواقع وصفحات هبوط سريعة وواضحة كتخلي الزائر يثق فخدمتك من أول لحظة.", icon: "Globe2", tone: "violet", isActive: true, sortOrder: 1 },
    { slug: "branding", title: "البراندينغ والهوية", description: "لوغو، ألوان وطريقة عرض كتخلي الإسم ديال خدمتك واضح، منظم وساهل يتفكر.", icon: "Palette", tone: "emerald", isActive: true, sortOrder: 2 },
    { slug: "social-media", title: "تسيير السوشيال ميديا", description: "خطة منشورات وتصاميم منظمة باش تبقى حاضر فالسوشيال ميديا بصورة احترافية.", icon: "Share2", tone: "cyan", isActive: true, sortOrder: 3 },
    { slug: "paid-ads", title: "الإعلانات الممولة", description: "إعلانات Meta وGoogle وTikTok مبنية على عرض واضح وتتبع كيبين شنو خدام.", icon: "Megaphone", tone: "violet", isActive: true, sortOrder: 4 },
    { slug: "stock-management", title: "الاستراتيجية الرقمية", description: "خطة واضحة فالإنترنت كتجمع الرسالة، المحتوى والإعلانات باش الخدمة تجيب نتائج مفهومة.", icon: "Boxes", tone: "emerald", isActive: true, sortOrder: 5 },
  ],
};

export const fallbackTestimonials: Record<Locale, CmsTestimonial[]> = {
  fr: [
    { quote: "Innovmark a donné à notre marque une présence plus haut de gamme. Le travail était précis, rapide et très clair commercialement.", name: "Yassine B.", role: "Fondateur · Marque retail", rating: 5, isActive: true, sortOrder: 0 },
    { quote: "Le site, les vidéos et les supports de campagne sont enfin devenus cohérents. Nous n'avions plus besoin d'expliquer notre valeur, elle se voyait.", name: "Salma A.", role: "Associée gérante · Société de services", rating: 5, isActive: true, sortOrder: 1 },
    { quote: "La communication était directe, premium et structurée. Ils ont compris les enjeux business, pas seulement l'esthétique.", name: "Omar L.", role: "Dirigeant · Groupe immobilier", rating: 5, isActive: true, sortOrder: 2 },
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
    description: "Vidéos promotionnelles, sites web, identité de marque, réseaux sociaux, publicités et systèmes de gestion.",
    keywords: ["Innovmark", "communication", "identité de marque", "création site web"],
    noIndex: false,
  },
  en: {
    title: "Innovmark — Premium Creative Studio · Casablanca",
    description: "Promotional videos, websites, branding, social media, ads and management systems.",
    keywords: ["Innovmark", "marketing", "branding", "web design"],
    noIndex: false,
  },
  ar: {
    title: "Innovmark — وكالة ماركتينغ بريميوم فالدار البيضاء",
    description:
      "مواقع، براندينغ، إعلانات ومحتوى كرييتيف كيعونو المشاريع المغربية تبان باحترافية فالإنترنت وتكبر بثقة.",
    keywords: ["Innovmark", "ماركتينغ", "براندينغ", "تصميم المواقع", "الإعلانات", "دار البيضاء"],
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
      secondaryCtaHref: locale === "fr" ? "/fr#work" : localizedHref("/contact", locale),
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
