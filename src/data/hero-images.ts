/**
 * Hero carousel fallback images.
 *
 * CMS carousel images are used first. These local showcase images are used only
 * when the CMS carousel is empty or unavailable.
 */

export interface HeroImage {
  id: string
  src: string
  alt: string
  rotation: number
}

export const heroImages: HeroImage[] = [
  {
    id: "product-shoot",
    src: "/images/hero-showcase/product-shoot.png",
    alt: "Product shoot showcase",
    rotation: -3,
  },
  {
    id: "branding-showcase",
    src: "/images/hero-showcase/branding-showcase.jpg",
    alt: "Branding showcase",
    rotation: 2,
  },
  {
    id: "website-showcase",
    src: "/images/hero-showcase/website-showcase.jpg",
    alt: "Website showcase",
    rotation: -2,
  },
  {
    id: "social-media-showcase",
    src: "/images/hero-showcase/social-media-showcase.png",
    alt: "Social media showcase",
    rotation: 3,
  },
]
