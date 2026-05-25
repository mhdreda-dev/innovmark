import type { Locale } from "@/lib/i18n";

export type BlogArticleId =
  | "choisir-agence-marketing-maroc"
  | "identite-visuelle-entreprise"
  | "cout-site-web-professionnel-maroc"
  | "marketing-digital-commerces-locaux-sidi-kacem"
  | "attirer-clients-instagram";

type LocalizedText = Record<Locale, string>;

export type BlogArticle = {
  id: BlogArticleId;
  slugs: Record<Locale, string>;
  date: string;
  coverImage: string;
  coverAlt: LocalizedText;
  readingMinutes: Record<Locale, number>;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  description: LocalizedText;
  sections: Record<Locale, Array<{ heading: string; body: string }>>;
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};

export const blogIndexSeo: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: "Blog marketing digital Maroc et Sidi Kacem · INNOVMARK",
    description:
      "Conseils SEO, branding, Instagram et création de site web pour entreprises locales à Sidi Kacem et au Maroc.",
  },
  en: {
    title: "Digital marketing blog in Morocco · INNOVMARK",
    description:
      "SEO, branding, Instagram and website advice for local businesses in Sidi Kacem and Morocco.",
  },
  ar: {
    title: "مدونة الماركتينغ فالمغرب · INNOVMARK",
    description:
      "نصائح فالمواقع، البراندينغ، إنستغرام والإشهار للمشاريع المحلية ف سيدي قاسم والمغرب.",
  },
};

export const blogArticles: BlogArticle[] = [
  {
    id: "choisir-agence-marketing-maroc",
    slugs: {
      fr: "choisir-agence-marketing-maroc",
      en: "choose-marketing-agency-morocco",
      ar: "اختيار-وكالة-تسويق-المغرب",
    },
    date: "2026-05-25",
    coverImage: "/images/hero-showcase/branding-showcase.jpg",
    coverAlt: {
      fr: "Equipe creative INNOVMARK pour agence marketing au Maroc",
      en: "INNOVMARK creative team for marketing agency work in Morocco",
      ar: "فريق INNOVMARK لخدمات الماركتينغ فالمغرب",
    },
    readingMinutes: { fr: 4, en: 4, ar: 4 },
    category: { fr: "Conseil agence", en: "Agency guide", ar: "اختيار الوكالة" },
    title: {
      fr: "Comment choisir une agence marketing au Maroc ?",
      en: "How to choose a marketing agency in Morocco",
      ar: "كيفاش تختار وكالة ماركتينغ فالمغرب؟",
    },
    excerpt: {
      fr: "Les criteres simples pour choisir une agence capable de comprendre votre marche, votre image et vos objectifs.",
      en: "Simple criteria for choosing an agency that understands your market, brand image and business goals.",
      ar: "معايير بسيطة باش تختار وكالة كتفهم السوق، الصورة ديال المشروع، والاهداف ديالك.",
    },
    description: {
      fr: "Guide pratique pour choisir une agence marketing digital au Maroc, avec les criteres importants pour les entreprises de Sidi Kacem.",
      en: "A practical guide to choosing a digital marketing agency in Morocco, with criteria for Sidi Kacem businesses.",
      ar: "دليل بسيط لاختيار وكالة ماركتينغ رقمي فالمغرب، خصوصا للمشاريع ف سيدي قاسم.",
    },
    sections: {
      fr: [
        {
          heading: "Commencez par le probleme business",
          body:
            "Une bonne agence ne vend pas seulement un logo, une publicite ou un site web. Elle commence par comprendre ce qui bloque la croissance: manque de confiance, offre peu claire, faible visibilite locale ou contenu qui ne convertit pas.",
        },
        {
          heading: "Regardez la qualite de la direction creative",
          body:
            "Au Maroc, beaucoup de marques se ressemblent en ligne. Choisissez une agence capable de construire une image coherente, premium et adaptee a votre secteur, pas seulement une suite de visuels jolis.",
        },
        {
          heading: "Demandez une methode claire",
          body:
            "Avant de signer, vous devez comprendre les etapes, les livrables, les delais et la maniere dont les resultats seront lus. Une agence serieuse explique son processus avec des mots simples.",
        },
      ],
      en: [
        {
          heading: "Start with the business problem",
          body:
            "A strong agency does not only sell a logo, an ad or a website. It first understands what blocks growth: lack of trust, unclear offer, weak local visibility or content that does not convert.",
        },
        {
          heading: "Look at creative direction quality",
          body:
            "Many brands in Morocco look similar online. Choose an agency that can build a coherent, premium image for your market, not just a set of good-looking visuals.",
        },
        {
          heading: "Ask for a clear method",
          body:
            "Before you start, you should understand the steps, deliverables, timeline and how results will be reviewed. A serious agency explains its process in simple terms.",
        },
      ],
      ar: [
        {
          heading: "بدا بالمشكل التجاري",
          body:
            "الوكالة المزيانة ما كتبيعش غير لوغو، إعلان أو موقع. خاصها تفهم فين واقف النمو: الثقة ناقصة، العرض ما واضحش، الظهور المحلي ضعيف، أو المحتوى ما كيجيبش تواصلات.",
        },
        {
          heading: "شوف جودة الاتجاه البصري",
          body:
            "بزاف ديال المشاريع فالمغرب كيبانو بحال بحال فالإنترنت. اختار وكالة تقدر تبني صورة واضحة واحترافية مناسبة للسوق ديالك.",
        },
        {
          heading: "طلب طريقة خدمة واضحة",
          body:
            "قبل ما تبدا، خاصك تعرف المراحل، شنو غادي يتسلم، الوقت، وكيفاش غادي تقراو النتائج. الوكالة الجدية كتشرح الخدمة بكلام مفهوم.",
        },
      ],
    },
    faq: {
      fr: [
        {
          question: "Quel budget prevoir pour une agence marketing au Maroc ?",
          answer:
            "Le budget depend des livrables: branding, site web, contenu, publicite ou accompagnement mensuel. Le plus important est de comparer la clarte de l'offre et la qualite de l'execution.",
        },
        {
          question: "Une agence locale a Sidi Kacem est-elle utile ?",
          answer:
            "Oui, surtout si votre clientele est locale. Une agence qui comprend le terrain peut adapter les messages, les offres et les canaux de communication.",
        },
      ],
      en: [
        {
          question: "What budget should I plan for a marketing agency in Morocco?",
          answer:
            "It depends on the deliverables: branding, website, content, advertising or monthly support. Compare offer clarity and execution quality first.",
        },
        {
          question: "Is a local agency in Sidi Kacem useful?",
          answer:
            "Yes, especially if your customers are local. An agency that understands the area can adapt messaging, offers and communication channels.",
        },
      ],
      ar: [
        {
          question: "شحال خاصني نوجد لوكالة ماركتينغ فالمغرب؟",
          answer:
            "الثمن كيتبدل حسب الخدمة: براندينغ، موقع، محتوى، إعلانات أو مواكبة شهرية. المهم تقارن وضوح العرض وجودة التنفيذ.",
        },
        {
          question: "واش وكالة محلية ف سيدي قاسم مفيدة؟",
          answer:
            "نعم، خصوصا إلا كانو الزبناء ديالك محليين. وكالة كتفهم المدينة كتقدر تضبط الكلام، العرض، وقنوات التواصل.",
        },
      ],
    },
  },
  {
    id: "identite-visuelle-entreprise",
    slugs: {
      fr: "identite-visuelle-entreprise",
      en: "visual-identity-business",
      ar: "هوية-بصرية-للشركة",
    },
    date: "2026-05-25",
    coverImage: "/images/hero-showcase/product-shoot.png",
    coverAlt: {
      fr: "Identite visuelle premium pour entreprise marocaine",
      en: "Premium visual identity for a Moroccan business",
      ar: "هوية بصرية احترافية لمشروع مغربي",
    },
    readingMinutes: { fr: 3, en: 3, ar: 3 },
    category: { fr: "Branding", en: "Branding", ar: "براندينغ" },
    title: {
      fr: "Pourquoi votre entreprise a besoin d'une identite visuelle ?",
      en: "Why your business needs a visual identity",
      ar: "علاش المشروع ديالك محتاج هوية بصرية؟",
    },
    excerpt: {
      fr: "Une identite visuelle claire aide vos clients a vous reconnaitre, vous faire confiance et comprendre votre valeur.",
      en: "A clear visual identity helps customers recognize you, trust you and understand your value.",
      ar: "هوية بصرية واضحة كتعاون الزبناء يعرفوك، يتيقو فيك، ويفهمو القيمة ديالك.",
    },
    description: {
      fr: "Pourquoi une identite visuelle professionnelle est essentielle pour les entreprises au Maroc, de Sidi Kacem aux grandes villes.",
      en: "Why a professional visual identity matters for businesses in Morocco, from Sidi Kacem to larger cities.",
      ar: "علاش الهوية البصرية الاحترافية مهمة للمشاريع فالمغرب، من سيدي قاسم حتى المدن الكبيرة.",
    },
    sections: {
      fr: [
        {
          heading: "La premiere impression travaille avant vous",
          body:
            "Avant de lire vos arguments, le client voit vos couleurs, votre logo, vos photos et votre style. Une identite faible peut donner l'impression d'une entreprise improvisee, meme si votre service est excellent.",
        },
        {
          heading: "La coherence cree la confiance",
          body:
            "Quand votre Instagram, votre site web, vos documents et vos publicites parlent le meme langage visuel, votre marque parait plus solide. Cette coherence rassure et facilite la decision.",
        },
        {
          heading: "Le branding aide a vendre plus cher",
          body:
            "Une image premium ne remplace pas la qualite du produit, mais elle augmente la perception de valeur. Pour beaucoup d'entreprises marocaines, c'est la difference entre etre compare au prix et etre choisi pour la confiance.",
        },
      ],
      en: [
        {
          heading: "The first impression works before you speak",
          body:
            "Before customers read your arguments, they see your colors, logo, photos and style. A weak identity can make a business feel improvised even when the service is excellent.",
        },
        {
          heading: "Consistency creates trust",
          body:
            "When Instagram, website, documents and ads speak the same visual language, your brand feels stronger. That consistency reassures people and makes decisions easier.",
        },
        {
          heading: "Branding helps you sell with more value",
          body:
            "A premium image does not replace product quality, but it increases perceived value. For many Moroccan businesses, it is the difference between price comparison and trust-based choice.",
        },
      ],
      ar: [
        {
          heading: "أول انطباع كيخدم قبل منك",
          body:
            "قبل ما الزبون يقرا العرض ديالك، كيشوف الألوان، اللوغو، التصاور وطريقة العرض. هوية ضعيفة كتقدر تبين المشروع غير منظم حتى إلا كانت الخدمة مزيانة.",
        },
        {
          heading: "التناسق كيبني الثقة",
          body:
            "ملي إنستغرام، الموقع، الوثائق والإعلانات كيهضرو بنفس الشكل، المشروع كيبان أقوى. هاد التناسق كيطمّن الناس وكيعاونهم يقررو.",
        },
        {
          heading: "البراندينغ كيعاونك تبيع بقيمة أعلى",
          body:
            "الصورة الاحترافية ما كتعوضش جودة الخدمة، ولكن كترفع القيمة فالعين ديال الزبون. بزاف ديال المشاريع كتربح الثقة قبل الثمن.",
        },
      ],
    },
    faq: {
      fr: [
        {
          question: "Une identite visuelle se limite-t-elle au logo ?",
          answer:
            "Non. Elle inclut aussi les couleurs, typographies, style photo, mises en page, templates et regles d'utilisation.",
        },
        {
          question: "Quand faut-il refaire son identite visuelle ?",
          answer:
            "Quand votre image ne reflete plus votre niveau, votre cible ou vos prix, une refonte peut rendre votre communication plus credible.",
        },
      ],
      en: [
        {
          question: "Is visual identity only a logo?",
          answer:
            "No. It also includes colors, typography, photo style, layouts, templates and usage rules.",
        },
        {
          question: "When should a business redesign its identity?",
          answer:
            "When the image no longer reflects your level, audience or pricing, a redesign can make communication more credible.",
        },
      ],
      ar: [
        {
          question: "واش الهوية البصرية هي غير اللوغو؟",
          answer:
            "لا. كتدخل فيها الألوان، الخطوط، طريقة التصاور، القوالب، وطريقة استعمال الشكل ديال المشروع.",
        },
        {
          question: "إمتى خاص المشروع يبدل الهوية ديالو؟",
          answer:
            "ملي الصورة ما بقاتش كتعبر على المستوى، الزبناء أو الأثمنة ديالك، التغيير كيعاون التواصل يبان موثوق.",
        },
      ],
    },
  },
  {
    id: "cout-site-web-professionnel-maroc",
    slugs: {
      fr: "cout-site-web-professionnel-maroc",
      en: "professional-website-cost-morocco",
      ar: "تكلفة-موقع-احترافي-المغرب",
    },
    date: "2026-05-25",
    coverImage: "/images/hero-showcase/website-showcase.jpg",
    coverAlt: {
      fr: "Creation site web professionnel au Maroc par INNOVMARK",
      en: "Professional website creation in Morocco by INNOVMARK",
      ar: "تصميم موقع احترافي فالمغرب من INNOVMARK",
    },
    readingMinutes: { fr: 4, en: 4, ar: 4 },
    category: { fr: "Site web", en: "Website", ar: "مواقع" },
    title: {
      fr: "Combien coute un site web professionnel au Maroc ?",
      en: "How much does a professional website cost in Morocco?",
      ar: "شحال كيكلّف موقع احترافي فالمغرب؟",
    },
    excerpt: {
      fr: "Le prix depend du niveau de strategie, design, contenu, developpement et accompagnement apres lancement.",
      en: "The price depends on strategy, design, content, development and launch support.",
      ar: "الثمن كيتبدل حسب الخطة، التصميم، المحتوى، التطوير والمواكبة من بعد الانطلاق.",
    },
    description: {
      fr: "Comprendre le cout d'un site web professionnel au Maroc: landing page, site vitrine, contenu, SEO et maintenance.",
      en: "Understand website costs in Morocco: landing page, business website, content, SEO and maintenance.",
      ar: "فهم تكلفة موقع احترافي فالمغرب: صفحة هبوط، موقع تعريفي، محتوى، SEO وصيانة.",
    },
    sections: {
      fr: [
        {
          heading: "Le prix depend du role du site",
          body:
            "Une landing page pour une campagne ne coute pas comme un site complet avec plusieurs pages, contenu, formulaires et integrations. La bonne question est: quel travail commercial le site doit-il faire ?",
        },
        {
          heading: "Le design et le contenu changent tout",
          body:
            "Un site professionnel ne se limite pas au code. Il faut structurer le message, choisir les visuels, ecrire les textes, optimiser le mobile et preparer les bases SEO.",
        },
        {
          heading: "Prevoyez aussi l'apres lancement",
          body:
            "Maintenance, modifications, suivi des performances et petites evolutions sont importants. Un site rentable est un outil vivant, pas un fichier oublie apres livraison.",
        },
      ],
      en: [
        {
          heading: "The price depends on the website's role",
          body:
            "A campaign landing page does not cost the same as a complete website with multiple pages, content, forms and integrations. The real question is: what sales job should the website do?",
        },
        {
          heading: "Design and content change everything",
          body:
            "A professional website is not only code. You need message structure, visuals, copywriting, mobile optimization and SEO foundations.",
        },
        {
          heading: "Plan for after launch too",
          body:
            "Maintenance, updates, performance review and small improvements matter. A profitable website is a living tool, not a file forgotten after delivery.",
        },
      ],
      ar: [
        {
          heading: "الثمن كيتبدل حسب الدور ديال الموقع",
          body:
            "صفحة هبوط لحملة إعلانية ماشي بحال موقع كامل فيه صفحات، محتوى، فورمات وربط مع أدوات أخرى. السؤال المهم: شنو خاص الموقع يدير للمبيعات ديالك؟",
        },
        {
          heading: "التصميم والمحتوى كيبدلو كلشي",
          body:
            "الموقع الاحترافي ماشي غير كود. خاص ترتيب الكلام، اختيار الصور، كتابة النصوص، تحسين الموبايل، وتجهيز أساسيات الظهور فگوگل.",
        },
        {
          heading: "حسب حتى من بعد الانطلاق",
          body:
            "الصيانة، التعديلات، متابعة الأداء والتحسينات الصغار مهمين. الموقع اللي كيجيب نتيجة خاصو يبقى حي، ماشي يتنسى من بعد التسليم.",
        },
      ],
    },
    faq: {
      fr: [
        {
          question: "Quel est le minimum pour un site professionnel ?",
          answer:
            "Il faut au moins une structure claire, un design responsive, des textes convaincants, un formulaire de contact et des bases SEO propres.",
        },
        {
          question: "Un site web aide-t-il vraiment une entreprise locale ?",
          answer:
            "Oui. Il renforce la confiance, explique l'offre et transforme les recherches Google ou les visites Instagram en demandes concretes.",
        },
      ],
      en: [
        {
          question: "What is the minimum for a professional website?",
          answer:
            "At minimum: clear structure, responsive design, persuasive copy, a contact form and clean SEO basics.",
        },
        {
          question: "Does a website really help a local business?",
          answer:
            "Yes. It builds trust, explains the offer and turns Google searches or Instagram visits into real inquiries.",
        },
      ],
      ar: [
        {
          question: "شنو هو الحد الأدنى لموقع احترافي؟",
          answer:
            "خاص ترتيب واضح، تصميم كيدوز فالموبايل، نصوص مقنعة، فورم للتواصل، وأساسيات SEO نقية.",
        },
        {
          question: "واش الموقع كيعاون المشروع المحلي؟",
          answer:
            "نعم. كيقوي الثقة، كيشرح العرض، وكيحول البحث فگوگل أو الزيارات من إنستغرام لتواصلات حقيقية.",
        },
      ],
    },
  },
  {
    id: "marketing-digital-commerces-locaux-sidi-kacem",
    slugs: {
      fr: "marketing-digital-commerces-locaux-sidi-kacem",
      en: "digital-marketing-local-shops-sidi-kacem",
      ar: "تسويق-رقمي-للمحلات-سيدي-قاسم",
    },
    date: "2026-05-25",
    coverImage: "/images/hero-showcase/ads.png",
    coverAlt: {
      fr: "Marketing digital pour commerces locaux a Sidi Kacem",
      en: "Digital marketing for local shops in Sidi Kacem",
      ar: "ماركتينغ رقمي للمحلات المحلية ف سيدي قاسم",
    },
    readingMinutes: { fr: 4, en: 4, ar: 4 },
    category: { fr: "Marketing local", en: "Local marketing", ar: "إشهار محلي" },
    title: {
      fr: "Marketing digital pour commerces locaux a Sidi Kacem",
      en: "Digital marketing for local shops in Sidi Kacem",
      ar: "ماركتينغ رقمي للمحلات المحلية ف سيدي قاسم",
    },
    excerpt: {
      fr: "Les leviers simples pour rendre un commerce local plus visible, plus credible et plus facile a contacter.",
      en: "Simple levers to make a local shop more visible, credible and easy to contact.",
      ar: "خطوات بسيطة باش المحل المحلي يبان أكثر، يربح الثقة، ويسهل التواصل معاه.",
    },
    description: {
      fr: "Strategies de marketing digital pour commerces locaux a Sidi Kacem: Google, Instagram, WhatsApp, contenus et publicite.",
      en: "Digital marketing strategies for local shops in Sidi Kacem: Google, Instagram, WhatsApp, content and ads.",
      ar: "طرق الماركتينغ الرقمي للمحلات ف سيدي قاسم: گوگل، إنستغرام، واتساب، محتوى وإعلانات.",
    },
    sections: {
      fr: [
        {
          heading: "Rendez l'information facile a trouver",
          body:
            "Adresse, horaires, WhatsApp, services et photos recentes doivent etre accessibles rapidement. Pour un commerce local, la friction tue beaucoup de demandes.",
        },
        {
          heading: "Montrez le vrai niveau du commerce",
          body:
            "Des photos propres, des reels courts et des publications utiles donnent envie de passer, appeler ou demander le prix. Le contenu doit montrer la qualite, pas seulement annoncer des promotions.",
        },
        {
          heading: "Utilisez la publicite pour amplifier ce qui marche",
          body:
            "Une petite campagne locale peut pousser une offre, une nouveaute ou une saison forte. Mais elle fonctionne mieux quand le profil, les visuels et le message sont deja clairs.",
        },
      ],
      en: [
        {
          heading: "Make information easy to find",
          body:
            "Address, opening hours, WhatsApp, services and recent photos should be easy to access. For a local shop, friction kills many potential inquiries.",
        },
        {
          heading: "Show the real quality of the business",
          body:
            "Clean photos, short reels and useful posts make people want to visit, call or ask for prices. Content should show quality, not only announce promotions.",
        },
        {
          heading: "Use ads to amplify what works",
          body:
            "A small local campaign can push an offer, a new product or a strong season. It works better when the profile, visuals and message are already clear.",
        },
      ],
      ar: [
        {
          heading: "خلي المعلومات ساهلة تلقا",
          body:
            "العنوان، أوقات الخدمة، واتساب، الخدمات والتصاور الجديدة خاصها تكون واضحة. فالمحل المحلي، الصعوبة الصغيرة كتضيع بزاف ديال الطلبات.",
        },
        {
          heading: "بيّن المستوى الحقيقي ديال المحل",
          body:
            "تصاور نقية، ريلز قصار ومنشورات مفيدة كيشجعو الناس يزوروك، يتاصلو أو يسولو على الثمن. المحتوى خاصو يبين الجودة ماشي غير التخفيضات.",
        },
        {
          heading: "استعمل الإعلانات باش تكبر اللي خدام",
          body:
            "حملة محلية صغيرة تقدر تدفع عرض، منتوج جديد أو موسم قوي. ولكن كتخدم أحسن ملي يكون البروفايل، الصور والكلام واضحين.",
        },
      ],
    },
    faq: {
      fr: [
        {
          question: "Quel canal choisir pour un commerce a Sidi Kacem ?",
          answer:
            "Instagram et WhatsApp sont souvent prioritaires, avec Google pour rassurer les personnes qui cherchent votre nom ou votre categorie.",
        },
        {
          question: "Faut-il publier tous les jours ?",
          answer:
            "Non. Il vaut mieux publier regulierement avec une bonne qualite, un message clair et des offres faciles a comprendre.",
        },
      ],
      en: [
        {
          question: "Which channel should a Sidi Kacem shop choose?",
          answer:
            "Instagram and WhatsApp are often priorities, with Google used to reassure people searching your name or category.",
        },
        {
          question: "Should a shop post every day?",
          answer:
            "No. Consistency, quality and clear offers matter more than posting every day with weak content.",
        },
      ],
      ar: [
        {
          question: "شنو القناة المناسبة لمحل ف سيدي قاسم؟",
          answer:
            "غالبا إنستغرام وواتساب هما الأهم، ومعاهم گوگل باش يتيقو الناس اللي كيقلبو على الاسم أو النوع ديال الخدمة.",
        },
        {
          question: "واش خاصني ننشر كل نهار؟",
          answer:
            "لا. الأحسن تنشر بانتظام وبجودة، مع كلام واضح وعروض سهلة الفهم.",
        },
      ],
    },
  },
  {
    id: "attirer-clients-instagram",
    slugs: {
      fr: "attirer-clients-instagram",
      en: "attract-more-customers-instagram",
      ar: "جلب-زبناء-من-انستغرام",
    },
    date: "2026-05-25",
    coverImage: "/images/hero-showcase/social-media-showcase.png",
    coverAlt: {
      fr: "Creation contenu Instagram Maroc pour attirer plus de clients",
      en: "Instagram content creation in Morocco to attract more customers",
      ar: "محتوى إنستغرام فالمغرب لجلب زبناء أكثر",
    },
    readingMinutes: { fr: 3, en: 3, ar: 3 },
    category: { fr: "Instagram", en: "Instagram", ar: "إنستغرام" },
    title: {
      fr: "Comment attirer plus de clients avec Instagram ?",
      en: "How to attract more customers with Instagram",
      ar: "كيفاش تجيب زبناء أكثر من إنستغرام؟",
    },
    excerpt: {
      fr: "Instagram devient rentable quand le profil explique vite votre valeur et donne une raison claire de vous contacter.",
      en: "Instagram becomes profitable when your profile quickly explains your value and gives people a clear reason to contact you.",
      ar: "إنستغرام كيولي مفيد ملي البروفايل كيشرح القيمة ديالك بسرعة وكيعطي سبب واضح للتواصل.",
    },
    description: {
      fr: "Conseils pratiques pour attirer plus de clients avec Instagram au Maroc: profil, contenu, reels, offres et WhatsApp.",
      en: "Practical advice to attract more customers with Instagram in Morocco: profile, content, reels, offers and WhatsApp.",
      ar: "نصائح عملية لجلب زبناء من إنستغرام فالمغرب: البروفايل، المحتوى، الريلز، العروض وواتساب.",
    },
    sections: {
      fr: [
        {
          heading: "Clarifiez votre profil",
          body:
            "Votre bio doit dire ce que vous faites, pour qui, dans quelle ville et comment vous contacter. Si le visiteur doit deviner, il part.",
        },
        {
          heading: "Montrez des preuves",
          body:
            "Avant/apres, coulisses, resultats, avis clients, produits en situation et explications simples rassurent plus que des posts trop generiques.",
        },
        {
          heading: "Reliez chaque contenu a une action",
          body:
            "Un reel peut inviter a demander un devis, reserver, visiter le magasin ou envoyer un message WhatsApp. Le contenu doit guider la prochaine etape.",
        },
      ],
      en: [
        {
          heading: "Clarify your profile",
          body:
            "Your bio should say what you do, for whom, in which city and how to contact you. If visitors have to guess, they leave.",
        },
        {
          heading: "Show proof",
          body:
            "Before-and-after posts, behind the scenes, results, customer reviews, product usage and simple explanations build more trust than generic posts.",
        },
        {
          heading: "Connect every post to an action",
          body:
            "A reel can invite people to ask for a quote, book, visit the shop or send a WhatsApp message. Content should guide the next step.",
        },
      ],
      ar: [
        {
          heading: "وضح البروفايل ديالك",
          body:
            "البايو خاصو يقول شنو كتدير، لمن، فاش مدينة، وكيفاش يتواصلو معاك. إلا الزائر خاصو يخمن، غالبا غادي يخرج.",
        },
        {
          heading: "بيّن الدليل",
          body:
            "قبل/بعد، كواليس، نتائج، آراء الزبناء، المنتوج فاستعمال حقيقي وشرح بسيط كيبنيو الثقة أكثر من منشورات عامة.",
        },
        {
          heading: "ربط كل محتوى بخطوة",
          body:
            "ريل يقدر يدعي الناس يطلبو عرض سعر، يحجزو، يزورو المحل أو يصيفطو واتساب. المحتوى خاصو يوجه الخطوة الجاية.",
        },
      ],
    },
    faq: {
      fr: [
        {
          question: "Quel type de contenu Instagram attire des clients ?",
          answer:
            "Le contenu qui montre le resultat, explique l'offre et facilite la prise de contact attire mieux que les posts purement decoratifs.",
        },
        {
          question: "Les reels sont-ils indispensables ?",
          answer:
            "Ils aident beaucoup pour la portee, mais ils doivent rester clairs, courts et lies a une offre ou une preuve.",
        },
      ],
      en: [
        {
          question: "What Instagram content attracts customers?",
          answer:
            "Content that shows results, explains the offer and makes contact easy works better than purely decorative posts.",
        },
        {
          question: "Are reels necessary?",
          answer:
            "They help reach, but they should stay clear, short and connected to an offer or proof.",
        },
      ],
      ar: [
        {
          question: "شنو المحتوى اللي كيجيب زبناء من إنستغرام؟",
          answer:
            "المحتوى اللي كيبين النتيجة، كيشرح العرض، وكيخلي التواصل ساهل كيخدم أحسن من منشورات للزينة فقط.",
        },
        {
          question: "واش الريلز ضروريين؟",
          answer:
            "كيعاونو بزاف فالوصول، ولكن خاصهم يكونو واضحين، قصار، ومربوطين بعرض أو دليل.",
        },
      ],
    },
  },
];

export function blogSlugsForLocale(locale: Locale) {
  return blogArticles.map((article) => article.slugs[locale]);
}

export function blogPath(locale: Locale, article: Pick<BlogArticle, "slugs">) {
  return `/blog/${article.slugs[locale]}`;
}

export function localizedBlogSlugs(article: Pick<BlogArticle, "slugs">) {
  return article.slugs;
}

export function getBlogArticles(locale: Locale) {
  return blogArticles.map((article) => localizeArticle(article, locale));
}

export function getBlogArticle(slug: string, locale: Locale) {
  const normalizedSlug = decodeSlug(slug);
  const article = blogArticles.find((item) => item.slugs[locale] === normalizedSlug);
  return article ? localizeArticle(article, locale) : undefined;
}

export function getRelatedArticles(id: BlogArticleId, locale: Locale) {
  return getBlogArticles(locale)
    .filter((article) => article.id !== id)
    .slice(0, 3);
}

export function blogFaqSchema(article: ReturnType<typeof localizeArticle>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function localizeArticle(article: BlogArticle, locale: Locale) {
  return {
    id: article.id,
    slug: article.slugs[locale],
    slugs: article.slugs,
    date: article.date,
    coverImage: article.coverImage,
    coverAlt: article.coverAlt[locale],
    readingMinutes: article.readingMinutes[locale],
    category: article.category[locale],
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    description: article.description[locale],
    sections: article.sections[locale],
    faq: article.faq[locale],
  };
}

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
