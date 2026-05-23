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
      home: "Accueil",
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
        "Création de contenu, branding, publicité et stratégie digitale pour développer votre entreprise.",
      heroCta: "Obtenir un audit gratuit",
      heroSecondaryCta: "Voir nos réalisations",
      heroWhatsappMessage: "Bonjour INNOVMARK, je souhaite obtenir un audit gratuit.",
      heroTrustSignals: ["Réponse sous 24h", "Stratégie personnalisée", "Accompagnement premium"],
      features: [
        {
          title: "Identité de marque premium",
          description: "Identités visuelles qui marquent les esprits.",
        },
        {
          title: "Contenu HD",
          description: "Vidéos, photos et créatifs publicitaires.",
        },
        {
          title: "Croissance IA",
          description: "Stratégies pilotées par les données, résultats mesurables.",
        },
      ],
    },
    pages: {
      services: {
        kicker: "Services premium",
        title: "Nos Services",
        subtitle:
          "Une offre integree pour transformer votre marque en experience premium: claire, memorable et orientee conversion.",
      },
      why: {
        kicker: "Confiance & autorité",
        title: "Pourquoi choisir INNOVMARK",
        subtitle:
          "Une agence pour les marques qui veulent paraitre plus etablies, vendre avec plus de clarte et avancer sans friction.",
      },
      process: {
        kicker: "Méthode structurée",
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
          { label: "Identité de marque", tag: "Univers visuel" },
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
      projectTypes: ["Site web", "Identité de marque", "Communication", "Autre"],
      introStep: "Une question a la fois pour un brief plus fluide.",
      introSimple: "Tous les champs sur un seul ecran.",
      simpleMode: "Retour au formulaire simple",
      guidedMode: "Formulaire guide (recommande)",
      successTitle: "Merci ! Votre demande a ete envoyee",
      successBody:
        "Nous avons prepare votre brief. Vous pouvez aussi continuer la discussion directement sur WhatsApp.",
      whatsappIntro: "Bonjour INNOVMARK, je souhaite envoyer une demande.",
      projectTypeLabel: "Type de projet",
      projectLabel: "Projet",
      nameLabel: "Nom",
      emailLabel: "Email",
      phoneLabel: "Telephone",
      stepLabel: "Etape",
      projectTypeQuestion: "Quel type de projet ?",
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
      home: "Home",
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
      heroTrustSignals: ["Reply within 24h", "Personalized strategy", "Premium support"],
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
      introStep: "One question at a time for a smoother brief.",
      introSimple: "All fields on one simple screen.",
      simpleMode: "Back to simple form",
      guidedMode: "Guided form (recommended)",
      successTitle: "Thank you! Your request has been sent",
      successBody:
        "We prepared your brief. You can also continue the discussion directly on WhatsApp.",
      whatsappIntro: "Hello INNOVMARK, I would like to send a request.",
      projectTypeLabel: "Project type",
      projectLabel: "Project",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      stepLabel: "Step",
      projectTypeQuestion: "What type of project?",
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
      home: "الرئيسية",
      services: "الخدمات",
      why: "علاش حنا",
      process: "طريقة الخدمة",
      contact: "تواصل معنا",
      cta: "بدا مشروعك",
      menu: "المينيو",
    },
    home: {
      heroTitle: "INNOVMARK — خلّي البراند ديالك يبان باحترافية",
      heroSubtitle: "وكالة ماركتينغ بريميوم",
      heroDescription:
        "كنصايبو ليك مواقع، براندينغ، إعلانات ومحتوى كرييتيف باش المشروع ديالك يكبر ويبان بثقة.",
      heroCta: "طلب عرض السعر",
      heroSecondaryCta: "تواصل معنا",
      heroWhatsappMessage: "السلام عليكم INNOVMARK، بغيت عرض سعر للمشروع ديالي.",
      heroTrustSignals: ["جواب فـ 24 ساعة", "خطة على حساب مشروعك", "مواكبة بريميوم"],
      features: [
        { title: "صورة احترافية", description: "لوغو، ألوان وطريقة عرض كتخلي البراند ديالك واضح." },
        { title: "محتوى كيبان", description: "تصاور، فيديوهات ومنشورات بجودة كتليق بالخدمة ديالك." },
        { title: "خطة مفهومة", description: "كنخدمو بخطوات واضحة باش تعرف شنو خدام وشنو خاص يتحسن." },
      ],
    },
    pages: {
      services: {
        kicker: "خدمات باش البراند ديالك يبان",
        title: "الخدمات ديالنا",
        subtitle:
          "مواقع، براندينغ، محتوى وإعلانات كيعونو المشروع ديالك يبان باحترافية ويحوّل الاهتمام لطلبات.",
      },
      why: {
        kicker: "ثقة وتجربة",
        title: "علاش تختار INNOVMARK",
        subtitle:
          "كنخدمو مع مشاريع باغية تبان بقيمة أعلى، تشرح العرض ديالها بوضوح، وتكبر بخطوات منظمة.",
      },
      process: {
        kicker: "طريقة خدمة واضحة",
        title: "كيفاش كنخدمو",
        subtitle:
          "من أول فكرة حتى الانطلاق، كنمشيو معاك فمراحل واضحة باش تعرف شنو غادي يدوز ووقتاش.",
      },
      contact: {
        kicker: "بريف سريع",
        title: "هضر لينا على المشروع ديالك",
        subtitle: "كنجاوبوك فـ 24 ساعة",
        heroSubtitle:
          "عندك فكرة، مشروع، إعلان أو موقع؟ نخليوه يبان واضح واحترافي فالإنترنت.",
        processTitle: "شنو كيوقع من بعد ما تتواصل معنا",
        processSteps: [
          {
            step: "01",
            title: "كنفهمو الهدف",
            desc: "كنقراو الطلب ديالك باش نفهمو المشروع، الجمهور، والنتيجة اللي باغي توصل ليها.",
          },
          {
            step: "02",
            title: "اقتراح واضح",
            desc: "كنعطيوك طريقة خدمة مفهومة وعرض سعر واضح فـ 24 ساعة.",
          },
          {
            step: "03",
            title: "بداية المشروع",
            desc: "كنبداو بجدول زمني ومخرجات محددة باش الخدمة تبقى منظمة.",
          },
        ],
        serviceCards: [
          { label: "براندينغ وهوية", tag: "لوغو، ألوان وتصميم" },
          { label: "الموقع", tag: "موقع واضح وسريع" },
          { label: "إعلانات ومحتوى", tag: "زبناء وخطة واضحة" },
        ],
        trustItems: [
          { value: "< 24h", label: "جواب سريع" },
          { value: "Pro", label: "تنفيذ احترافي" },
          { value: "360°", label: "مواكبة كاملة" },
        ],
      },
    },
    contactForm: {
      projectTypes: ["موقع", "براندينغ وهوية", "إعلانات ومحتوى", "شي حاجة أخرى"],
      introStep: "سؤال بسؤال باش نوجدو بريف واضح وسريع.",
      introSimple: "المعلومات الأساسية كاملة ففورم واحد مختصر.",
      simpleMode: "رجع للفورم السريع",
      guidedMode: "فورم موجه (مقترح)",
      successTitle: "شكراً! توصلنا بالطلب ديالك",
      successBody:
        "وجدنا البريف ديال المشروع. تقدر تكمل الهضرة معنا مباشرة فواتساب.",
      whatsappIntro: "السلام عليكم INNOVMARK، بغيت نصيفط طلب بخصوص المشروع ديالي.",
      projectTypeLabel: "نوع المشروع",
      projectLabel: "المشروع",
      nameLabel: "الاسم",
      emailLabel: "الإيميل",
      phoneLabel: "الهاتف",
      stepLabel: "الخطوة",
      projectTypeQuestion: "شنو نوع الخدمة اللي محتاج؟",
      projectQuestion: "هضر لينا على المشروع ديالك",
      projectPlaceholder: "كتب باختصار الهدف، السياق، والوقت اللي باغي...",
      infoTitle: "معلوماتك",
      back: "رجوع",
      next: "من بعد",
      send: "صيفط",
      messageLabel: "الرسالة",
      messagePlaceholder: "شرح لينا باختصار شنو محتاج أو فكرة المشروع.",
      submitRequest: "صيفط الطلب",
      choose: "اختار",
      whatsapp: "واتساب",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
