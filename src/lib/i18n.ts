export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePrefix(locale?: Locale) {
  return locale ? `/${locale}` : "";
}

export function localizedHref(path: string, locale?: Locale) {
  if (!locale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  return `/${locale}${path}`;
}

export const dictionaries = {
  fr: {
    nav: {
      services: "Services",
      why: "Pourquoi nous",
      process: "Processus",
      contact: "Contact",
      cta: "Démarrer un projet",
      menu: "Menu",
    },
    home: {
      heroTitle: "INNOVMARK — Transformez votre présence digitale",
      heroSubtitle: "Agence Marketing Premium",
      heroDescription:
        "Sites web, branding, publicité, contenu créatif et stratégie digitale pour faire grandir votre marque.",
      heroCta: "Demander un devis",
      heroSecondaryCta: "Nous contacter",
      heroWhatsappMessage: "Bonjour INNOVMARK, je veux un devis",
      features: [
        {
          title: "Branding Premium",
          description: "Identités visuelles qui marquent les esprits.",
        },
        {
          title: "Contenu HD",
          description: "Vidéos, photos et créatifs publicitaires.",
        },
        {
          title: "Croissance IA",
          description: "Stratégies data-driven, résultats mesurables.",
        },
      ],
    },
    pages: {
      services: {
        kicker: "Premium Services",
        title: "Nos Services",
        subtitle:
          "Une offre integree pour transformer votre marque en experience premium: claire, memorable et orientee conversion.",
      },
      why: {
        kicker: "Trust & Authority",
        title: "Pourquoi choisir INNOVMARK",
        subtitle:
          "Une agence pour les marques qui veulent paraitre plus etablies, vendre avec plus de clarte et avancer sans friction.",
      },
      process: {
        kicker: "Clean Step System",
        title: "Notre Processus",
        subtitle:
          "Une methode lisible en quatre etapes pour passer d'une intention ambitieuse a une livraison precise, sans confusion.",
      },
      contact: {
        kicker: "Brief rapide",
        title: "Parlez-nous de votre projet",
        subtitle: "Réponse en moins de 24h",
        heroSubtitle:
          "Une idée, une marque, une campagne ou un site web ? Transformons-la en expérience digitale premium.",
        processTitle: "La suite après votre contact",
        processSteps: [
          {
            step: "01",
            title: "Analyse du besoin",
            desc: "Nous étudions votre demande pour cerner vos objectifs et vos contraintes.",
          },
          {
            step: "02",
            title: "Proposition claire",
            desc: "Un plan d'action précis et un devis vous sont soumis sous 24h.",
          },
          {
            step: "03",
            title: "Lancement du projet",
            desc: "On démarre ensemble avec un calendrier et des livrables définis.",
          },
        ],
        serviceCards: [
          { label: "Branding", tag: "Identité visuelle" },
          { label: "Site web", tag: "Design & Dev" },
          { label: "Marketing", tag: "Stratégie & Croissance" },
        ],
        trustItems: [
          { value: "< 24h", label: "Réponse rapide" },
          { value: "Premium", label: "Vision créative" },
          { value: "360°", label: "Accompagnement" },
        ],
      },
    },
    contactForm: {
      projectTypes: ["Site web", "Branding", "Marketing", "Autre"],
      budgets: ["< 5 000 MAD", "5 000 - 15 000 MAD", "15 000+"],
      introStep: "Une question a la fois pour un brief plus fluide.",
      introSimple: "Tous les champs sur un seul ecran.",
      simpleMode: "Retour au formulaire simple",
      guidedMode: "Formulaire guide (recommande)",
      successTitle: "Merci ! Votre demande a ete envoyee",
      successBody:
        "Nous avons prepare votre brief. Vous pouvez aussi continuer la discussion directement sur WhatsApp.",
      whatsappIntro: "Bonjour INNOVMARK, je souhaite envoyer une demande.",
      projectTypeLabel: "Type de projet",
      budgetLabel: "Budget",
      projectLabel: "Projet",
      nameLabel: "Nom",
      emailLabel: "Email",
      phoneLabel: "Telephone",
      stepLabel: "Etape",
      projectTypeQuestion: "Quel type de projet ?",
      budgetQuestion: "Quel est votre budget ?",
      projectQuestion: "Parlez-nous de votre projet",
      projectPlaceholder: "Quelques lignes suffisent: objectif, contexte, delai...",
      infoTitle: "Vos informations",
      back: "Retour",
      next: "Suivant",
      send: "Envoyer",
      messageLabel: "Message",
      messagePlaceholder: "Decrivez brievement votre besoin.",
      submitRequest: "Envoyer la demande",
      choose: "Choisir",
      whatsapp: "WhatsApp",
    },
  },
  en: {
    nav: {
      services: "Services",
      why: "Why us",
      process: "Process",
      contact: "Contact",
      cta: "Start a project",
      menu: "Menu",
    },
    home: {
      heroTitle: "INNOVMARK — Transform your digital presence",
      heroSubtitle: "Premium Marketing Agency",
      heroDescription:
        "Websites, branding, advertising, creative content and digital strategy to grow your brand.",
      heroCta: "Request a quote",
      heroSecondaryCta: "Contact us",
      heroWhatsappMessage: "Hello INNOVMARK, I would like a quote",
      features: [
        { title: "Premium Branding", description: "Visual identities that stay in mind." },
        { title: "HD Content", description: "Videos, photos and advertising creatives." },
        { title: "AI Growth", description: "Data-driven strategies with measurable results." },
      ],
    },
    pages: {
      services: {
        kicker: "Premium Services",
        title: "Our Services",
        subtitle:
          "An integrated offer to turn your brand into a premium experience: clear, memorable and conversion-focused.",
      },
      why: {
        kicker: "Trust & Authority",
        title: "Why choose INNOVMARK",
        subtitle:
          "An agency for brands that want to look more established, sell with more clarity and move without friction.",
      },
      process: {
        kicker: "Clean Step System",
        title: "Our Process",
        subtitle:
          "A clear four-step method to move from an ambitious intention to precise delivery, without confusion.",
      },
      contact: {
        kicker: "Quick brief",
        title: "Tell us about your project",
        subtitle: "Reply in less than 24h",
        heroSubtitle:
          "An idea, a brand, a campaign or a website? Let's turn it into a premium digital experience.",
        processTitle: "What happens after you reach out",
        processSteps: [
          {
            step: "01",
            title: "Needs analysis",
            desc: "We review your request to understand your goals and constraints.",
          },
          {
            step: "02",
            title: "Clear proposal",
            desc: "A precise action plan and quote are submitted to you within 24h.",
          },
          {
            step: "03",
            title: "Project launch",
            desc: "We start together with a defined timeline and deliverables.",
          },
        ],
        serviceCards: [
          { label: "Branding", tag: "Visual identity" },
          { label: "Website", tag: "Design & Dev" },
          { label: "Marketing", tag: "Strategy & Growth" },
        ],
        trustItems: [
          { value: "< 24h", label: "Fast reply" },
          { value: "Premium", label: "Creative vision" },
          { value: "360°", label: "Full support" },
        ],
      },
    },
    contactForm: {
      projectTypes: ["Website", "Branding", "Marketing", "Other"],
      budgets: ["< 5,000 MAD", "5,000 - 15,000 MAD", "15,000+"],
      introStep: "One question at a time for a smoother brief.",
      introSimple: "All fields on one simple screen.",
      simpleMode: "Back to simple form",
      guidedMode: "Guided form (recommended)",
      successTitle: "Thank you! Your request has been sent",
      successBody:
        "We prepared your brief. You can also continue the discussion directly on WhatsApp.",
      whatsappIntro: "Hello INNOVMARK, I would like to send a request.",
      projectTypeLabel: "Project type",
      budgetLabel: "Budget",
      projectLabel: "Project",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      stepLabel: "Step",
      projectTypeQuestion: "What type of project?",
      budgetQuestion: "What is your budget?",
      projectQuestion: "Tell us about your project",
      projectPlaceholder: "A few lines are enough: goal, context, timeline...",
      infoTitle: "Your information",
      back: "Back",
      next: "Next",
      send: "Send",
      messageLabel: "Message",
      messagePlaceholder: "Briefly describe what you need.",
      submitRequest: "Send request",
      choose: "Choose",
      whatsapp: "WhatsApp",
    },
  },
  ar: {
    nav: {
      services: "الخدمات",
      why: "لماذا نحن",
      process: "المنهجية",
      contact: "تواصل معنا",
      cta: "ابدأ مشروعك الآن",
      menu: "القائمة",
    },
    home: {
      heroTitle: "INNOVMARK — حضور رقمي يليق بعلامتك",
      heroSubtitle: "وكالة تسويق إبداعية فاخرة",
      heroDescription:
        "نصمم مواقع وهوية بصرية وإعلانات ومحتوى إبداعي يساعد علامتك على الظهور بثقة والنمو بوضوح.",
      heroCta: "اطلب عرض سعر",
      heroSecondaryCta: "تواصل معنا",
      heroWhatsappMessage: "مرحباً INNOVMARK، أود الحصول على عرض سعر لمشروعي.",
      features: [
        { title: "هوية راقية", description: "أنظمة بصرية تمنح علامتك حضوراً لا ينسى." },
        { title: "محتوى احترافي", description: "فيديوهات وصور ومواد إعلانية بجودة عالية." },
        { title: "نمو ذكي", description: "استراتيجيات مبنية على البيانات ونتائج قابلة للقياس." },
      ],
    },
    pages: {
      services: {
        kicker: "خدمات تسويق فاخرة",
        title: "خدماتنا",
        subtitle:
          "حلول متكاملة تحول علامتك إلى تجربة واضحة وراقية ومصممة لزيادة الثقة والتحويل.",
      },
      why: {
        kicker: "ثقة وخبرة تنفيذية",
        title: "لماذا تختار INNOVMARK",
        subtitle:
          "نساعد العلامات التي تريد أن تبدو أكثر احترافية، وتبيع بوضوح أكبر، وتتقدم بخطوات منظمة بدون تعقيد.",
      },
      process: {
        kicker: "منهجية عمل واضحة",
        title: "منهجيتنا",
        subtitle:
          "ننتقل من الفكرة إلى الإطلاق عبر أربع مراحل دقيقة، حتى تعرف ما الذي يحدث ومتى ولماذا.",
      },
      contact: {
        kicker: "موجز سريع",
        title: "أخبرنا عن مشروعك",
        subtitle: "سنرد عليك خلال 24 ساعة",
        heroSubtitle:
          "فكرة، علامة تجارية، حملة أو موقع إلكتروني؟ دعنا نحولها إلى تجربة رقمية راقية.",
        processTitle: "ماذا يحدث بعد تواصلك معنا",
        processSteps: [
          {
            step: "01",
            title: "تحليل الاحتياج",
            desc: "ندرس طلبك لفهم أهدافك ومتطلباتك بدقة.",
          },
          {
            step: "02",
            title: "اقتراح واضح",
            desc: "نقدم لك خطة عمل محددة وعرض سعر خلال 24 ساعة.",
          },
          {
            step: "03",
            title: "إطلاق المشروع",
            desc: "ننطلق معاً بجدول زمني واضح ومخرجات محددة.",
          },
        ],
        serviceCards: [
          { label: "الهوية البصرية", tag: "Branding" },
          { label: "الموقع الإلكتروني", tag: "Design & Dev" },
          { label: "التسويق", tag: "نمو واستراتيجية" },
        ],
        trustItems: [
          { value: "< 24h", label: "رد سريع" },
          { value: "Premium", label: "رؤية إبداعية" },
          { value: "360°", label: "مرافقة كاملة" },
        ],
      },
    },
    contactForm: {
      projectTypes: ["موقع إلكتروني", "هوية بصرية", "تسويق", "أخرى"],
      budgets: ["أقل من 5 000 درهم", "5 000 - 15 000 درهم", "أكثر من 15 000 درهم"],
      introStep: "سؤال واحد في كل خطوة لتجهيز موجز واضح وسريع.",
      introSimple: "كل المعلومات الأساسية في نموذج واحد مختصر.",
      simpleMode: "العودة إلى النموذج البسيط",
      guidedMode: "نموذج موجه (موصى به)",
      successTitle: "شكراً! تم إرسال طلبك",
      successBody:
        "جهزنا موجز مشروعك. يمكنك متابعة النقاش مباشرة عبر واتساب إذا رغبت.",
      whatsappIntro: "مرحباً INNOVMARK، أود إرسال طلب بخصوص مشروعي.",
      projectTypeLabel: "نوع المشروع",
      budgetLabel: "الميزانية",
      projectLabel: "المشروع",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      stepLabel: "المرحلة",
      projectTypeQuestion: "ما نوع المشروع؟",
      budgetQuestion: "ما ميزانيتك؟",
      projectQuestion: "أخبرنا عن مشروعك",
      projectPlaceholder: "اكتب باختصار الهدف، السياق، والموعد المتوقع...",
      infoTitle: "معلوماتك",
      back: "رجوع",
      next: "التالي",
      send: "إرسال",
      messageLabel: "الرسالة",
      messagePlaceholder: "صف احتياجك أو فكرة المشروع باختصار.",
      submitRequest: "إرسال الطلب",
      choose: "اختر",
      whatsapp: "واتساب",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
