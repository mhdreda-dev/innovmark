/**
 * Hero carousel images — 8 marketing agency themes.
 *
 * To swap in local images:
 *   1. Place files inside /public/hero/  (e.g. camera-production.jpg)
 *   2. Replace the `src` value with the public path: "/hero/camera-production.jpg"
 */

export interface HeroImage {
  id: string
  src: string
  alt: string
  rotation: number
}

export const heroImages: HeroImage[] = [
  {
    id: "1",
    // Local: /public/hero/camera-production.jpg
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=900",
    alt: "Production vidéo",
    rotation: -15,
  },
  {
    id: "2",
    // Local: /public/hero/social-media.jpg
    src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=900",
    alt: "Réseaux sociaux",
    rotation: -8,
  },
  {
    id: "3",
    // Local: /public/hero/branding.jpg
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=900",
    alt: "Branding & identité",
    rotation: 5,
  },
  {
    id: "4",
    // Local: /public/hero/web-design.jpg
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900",
    alt: "Web design",
    rotation: 12,
  },
  {
    id: "5",
    // Local: /public/hero/advertising.jpg
    src: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=900",
    alt: "Campagnes publicitaires",
    rotation: -12,
  },
  {
    id: "6",
    // Local: /public/hero/brainstorming.jpg
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=900",
    alt: "Stratégie créative",
    rotation: 8,
  },
  {
    id: "7",
    // Local: /public/hero/ai-marketing.jpg
    src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=900",
    alt: "Marketing IA",
    rotation: -6,
  },
  {
    id: "8",
    // Local: /public/hero/premium-business.jpg
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900",
    alt: "Business premium",
    rotation: 10,
  },
]
