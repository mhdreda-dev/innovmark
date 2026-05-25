import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { services, type ServiceDetail, type ServiceSlug } from "@/lib/services";

const fallbackSiteUrl = "https://innovmark.site";
const productionUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl;

export const siteUrl = normalizeSiteUrl(productionUrl);
export const ogImagePath = "/images/hero-showcase/branding-showcase.jpg";
export const ogImageUrl = absoluteUrl(ogImagePath);

export const seoKeywords = [
  "Agence marketing digital Sidi Kacem",
  "Création site web Sidi Kacem",
  "Agence branding Maroc",
  "Publicité digitale Maroc",
  "Création contenu Instagram Maroc",
  "Studio créatif Sidi Kacem",
  "marketing digital Maroc",
  "agence communication Sidi Kacem",
];

type PageSeo = {
  title: string;
  description: string;
};

const serviceSeoBySlug: Record<ServiceSlug, Record<Locale, PageSeo>> = {
  "promotional-videos": {
    fr: {
      title: "Création vidéo publicitaire au Maroc · INNOVMARK Sidi Kacem",
      description:
        "Création de vidéos promotionnelles, reels et contenus publicitaires pour marques à Sidi Kacem et au Maroc.",
    },
    en: {
      title: "Promotional video production in Morocco · INNOVMARK",
      description:
        "Promotional videos, reels and campaign films for brands in Sidi Kacem and across Morocco.",
    },
    ar: {
      title: "فيديوهات إعلانية فالمغرب · INNOVMARK سيدي قاسم",
      description:
        "تصوير وإنتاج فيديوهات، ريلز وإعلانات للمشاريع ف سيدي قاسم والمغرب.",
    },
  },
  "website-creation": {
    fr: {
      title: "Création site web Sidi Kacem · INNOVMARK",
      description:
        "Création de sites web rapides, premium et responsive à Sidi Kacem pour entreprises, marques locales et projets au Maroc.",
    },
    en: {
      title: "Website creation in Sidi Kacem · INNOVMARK",
      description:
        "Fast, premium and responsive websites for businesses, local brands and projects in Sidi Kacem and Morocco.",
    },
    ar: {
      title: "تصميم مواقع ف سيدي قاسم · INNOVMARK",
      description:
        "تصميم مواقع سريعة واحترافية للمشاريع والشركات ف سيدي قاسم والمغرب.",
    },
  },
  branding: {
    fr: {
      title: "Agence branding Maroc · INNOVMARK Sidi Kacem",
      description:
        "Branding, logo, direction artistique et identité visuelle premium pour marques à Sidi Kacem et au Maroc.",
    },
    en: {
      title: "Branding agency in Morocco · INNOVMARK",
      description:
        "Branding, logo systems and premium visual identity for brands in Sidi Kacem and Morocco.",
    },
    ar: {
      title: "وكالة براندينغ فالمغرب · INNOVMARK",
      description:
        "لوغو، هوية بصرية وبراندينغ احترافي للمشاريع ف سيدي قاسم والمغرب.",
    },
  },
  "social-media": {
    fr: {
      title: "Création contenu Instagram Maroc · INNOVMARK",
      description:
        "Stratégie social media, création de contenu Instagram et visuels premium pour marques à Sidi Kacem et au Maroc.",
    },
    en: {
      title: "Instagram content creation in Morocco · INNOVMARK",
      description:
        "Social media strategy, Instagram content and premium creative systems for Moroccan brands.",
    },
    ar: {
      title: "محتوى إنستغرام فالمغرب · INNOVMARK",
      description:
        "خطة سوشيال ميديا، محتوى إنستغرام وتصاميم احترافية للمشاريع المغربية.",
    },
  },
  "paid-ads": {
    fr: {
      title: "Publicité digitale Maroc · INNOVMARK Sidi Kacem",
      description:
        "Campagnes Meta, Google et TikTok avec contenus publicitaires, landing pages et suivi pour marques au Maroc.",
    },
    en: {
      title: "Digital advertising in Morocco · INNOVMARK",
      description:
        "Meta, Google and TikTok advertising campaigns with creative assets, landing pages and tracking for Moroccan brands.",
    },
    ar: {
      title: "إعلانات رقمية فالمغرب · INNOVMARK",
      description:
        "حملات فيسبوك، إنستغرام، گوگل وتيك توك مع تصاميم وتتبع للمشاريع فالمغرب.",
    },
  },
  "stock-management": {
    fr: {
      title: "Solutions gestion de stock au Maroc · INNOVMARK",
      description:
        "Dashboards et systèmes de gestion de stock sur mesure pour commerces, équipes et opérations à Sidi Kacem et au Maroc.",
    },
    en: {
      title: "Stock management systems in Morocco · INNOVMARK",
      description:
        "Custom stock dashboards and inventory workflows for shops, teams and operations in Sidi Kacem and Morocco.",
    },
    ar: {
      title: "أنظمة تسيير المخزون فالمغرب · INNOVMARK",
      description:
        "لوحات متابعة وأنظمة مخزون على القياس للمحلات والفرق ف سيدي قاسم والمغرب.",
    },
  },
};

export const localizedSeo: Record<Locale, Record<"home" | "services" | "why" | "process" | "contact", PageSeo>> = {
  fr: {
    home: {
      title: "Agence marketing digital à Sidi Kacem · INNOVMARK",
      description:
        "INNOVMARK est un studio créatif à Sidi Kacem pour création de sites web, branding, publicité digitale, contenu Instagram et croissance locale au Maroc.",
    },
    services: {
      title: "Services marketing digital à Sidi Kacem · INNOVMARK",
      description:
        "Création de site web à Sidi Kacem, branding, vidéos, contenu Instagram, publicité digitale et stratégie pour marques au Maroc.",
    },
    why: {
      title: "Agence branding Maroc et Sidi Kacem · Pourquoi INNOVMARK",
      description:
        "Une agence marketing digital à Sidi Kacem pensée pour les marques marocaines qui veulent une image premium, claire et mesurable.",
    },
    process: {
      title: "Processus marketing digital clair · INNOVMARK Sidi Kacem",
      description:
        "Une méthode en quatre étapes pour créer votre site web, branding, contenu Instagram ou campagne de publicité digitale au Maroc.",
    },
    contact: {
      title: "Contact agence marketing digital Sidi Kacem · INNOVMARK",
      description:
        "Contactez INNOVMARK à Sidi Kacem pour un site web, une identité de marque, du contenu Instagram ou une campagne digitale au Maroc.",
    },
  },
  en: {
    home: {
      title: "Digital marketing agency in Sidi Kacem · INNOVMARK",
      description:
        "INNOVMARK is a creative studio in Sidi Kacem, Morocco for websites, branding, Instagram content, digital advertising and local growth.",
    },
    services: {
      title: "Digital marketing services in Morocco · INNOVMARK",
      description:
        "Website creation in Sidi Kacem, branding in Morocco, Instagram content, videos and digital advertising for ambitious brands.",
    },
    why: {
      title: "Branding agency in Morocco · Why INNOVMARK",
      description:
        "A Sidi Kacem creative studio helping Moroccan brands look premium, communicate clearly and grow with measurable digital assets.",
    },
    process: {
      title: "Digital marketing process · INNOVMARK Morocco",
      description:
        "A clear process for websites, branding, Instagram content and digital advertising campaigns in Sidi Kacem and Morocco.",
    },
    contact: {
      title: "Contact digital marketing agency Morocco · INNOVMARK",
      description:
        "Talk to INNOVMARK in Sidi Kacem about websites, branding, Instagram content or digital advertising for your Moroccan brand.",
    },
  },
  ar: {
    home: {
      title: "وكالة ماركتينغ رقمي بسيدي قاسم · INNOVMARK",
      description:
        "INNOVMARK ستوديو كرييتيف بسيدي قاسم كيصاوب مواقع، براندينغ، محتوى إنستغرام وإعلانات للمشاريع فالمغرب.",
    },
    services: {
      title: "خدمات ماركتينغ رقمي فالمغرب · INNOVMARK",
      description:
        "تصميم مواقع بسيدي قاسم، براندينغ، محتوى إنستغرام، فيديوهات وإعلانات رقمية للمشاريع المغربية.",
    },
    why: {
      title: "وكالة براندينغ فالمغرب · علاش INNOVMARK",
      description:
        "ستوديو ف سيدي قاسم كيساعد المشاريع المغربية تبان بصورة احترافية وتخدم بتواصل واضح ونتائج قابلة للقياس.",
    },
    process: {
      title: "طريقة خدمة واضحة للماركتينغ الرقمي · INNOVMARK",
      description:
        "مراحل واضحة لتصميم الموقع، البراندينغ، محتوى إنستغرام أو حملة إعلانات رقمية فالمغرب.",
    },
    contact: {
      title: "تواصل مع وكالة ماركتينغ بسيدي قاسم · INNOVMARK",
      description:
        "تواصل مع INNOVMARK ف سيدي قاسم باش تخدم موقع، براندينغ، محتوى إنستغرام أو إعلانات رقمية فالمغرب.",
    },
  },
};

export function normalizeSiteUrl(value: string) {
  const url = value.startsWith("http") ? value : `https://${value}`;
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedPath(locale: Locale, path = "/") {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(locale: Locale, path = "/") {
  return absoluteUrl(localizedPath(locale, path));
}

export function languageAlternates(path = "/") {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, canonicalUrl(locale, path)])),
    "x-default": canonicalUrl("fr", path),
  };
}

export function buildPageMetadata(locale: Locale, path: string, seo: PageSeo): Metadata {
  const url = canonicalUrl(locale, path);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seoKeywords,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "INNOVMARK",
      locale: openGraphLocale(locale),
      alternateLocale: locales.filter((item) => item !== locale).map(openGraphLocale),
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "INNOVMARK studio créatif à Sidi Kacem au Maroc",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
    },
  };
}

export function buildServiceMetadata(locale: Locale, service: ServiceDetail): Metadata {
  const path = `/services/${service.slug}`;
  return buildPageMetadata(locale, path, serviceSeoBySlug[service.slug][locale]);
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: "INNOVMARK",
    url: canonicalUrl(locale),
    image: ogImageUrl,
    logo: ogImageUrl,
    description: localizedSeo[locale].home.description,
    telephone: "+212771450503",
    email: "contact@innovmark.ma",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sidi Kacem",
      addressCountry: "MA",
    },
    areaServed: [
      { "@type": "City", name: "Sidi Kacem" },
      { "@type": "Country", name: "Morocco" },
    ],
    sameAs: [
      "https://www.instagram.com/innovmark",
      "https://www.facebook.com/innovmark",
      "https://www.linkedin.com/company/innovmark",
    ],
    priceRange: "$$",
    knowsAbout: seoKeywords,
  };
}

export function faqSchema(locale: Locale, service: ServiceDetail) {
  const questionsByLocale: Record<Locale, Array<{ question: string; answer: string }>> = {
    fr: [
      {
        question: `Est-ce que INNOVMARK propose ${service.eyebrow} à Sidi Kacem ?`,
        answer: `Oui. INNOVMARK accompagne les marques à Sidi Kacem et au Maroc avec ${service.eyebrow}, une direction créative premium et une exécution adaptée aux objectifs business.`,
      },
      {
        question: "Combien de temps prend ce service ?",
        answer: `Le délai indicatif est ${service.timeline}. Le calendrier exact dépend du brief, du volume de livrables et du niveau de validation demandé.`,
      },
      {
        question: "À qui ce service convient-il ?",
        answer: service.bestFor,
      },
    ],
    en: [
      {
        question: `Does INNOVMARK provide ${service.eyebrow} in Morocco?`,
        answer: `Yes. INNOVMARK supports brands in Sidi Kacem and across Morocco with ${service.eyebrow}, premium creative direction and business-focused execution.`,
      },
      {
        question: "How long does this service take?",
        answer: `The typical timeline is ${service.timeline}. The exact schedule depends on the brief, deliverables and validation rhythm.`,
      },
      {
        question: "Who is this service best for?",
        answer: service.bestFor,
      },
    ],
    ar: [
      {
        question: `واش INNOVMARK كتقدم ${service.eyebrow} ف سيدي قاسم؟`,
        answer: `نعم. INNOVMARK كتخدم مع المشاريع ف سيدي قاسم والمغرب ف ${service.eyebrow} بتنفيذ احترافي ومركز على الهدف التجاري.`,
      },
      {
        question: "شحال كتحتاج الخدمة من الوقت؟",
        answer: `المدة التقريبية هي ${service.timeline}. الوقت النهائي كيتحدد حسب البريف، عدد المخرجات، وطريقة الاعتماد.`,
      },
      {
        question: "لمن مناسبة هاد الخدمة؟",
        answer: service.bestFor,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questionsByLocale[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function servicesForSitemap() {
  return services.map((service) => service.slug);
}

function openGraphLocale(locale: Locale) {
  if (locale === "en") return "en_US";
  if (locale === "ar") return "ar_MA";
  return "fr_MA";
}
