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

export const serviceMap = new Map(services.map((service) => [service.slug, service]));
