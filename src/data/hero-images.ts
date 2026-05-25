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
    alt: "Création de contenu produit par INNOVMARK à Sidi Kacem",
    rotation: -3,
  },
  {
    id: "branding-showcase",
    src: "/images/hero-showcase/branding-showcase.jpg",
    alt: "Identité de marque premium et branding au Maroc par INNOVMARK",
    rotation: 2,
  },
  {
    id: "website-showcase",
    src: "/images/hero-showcase/website-showcase.jpg",
    alt: "Création de site web à Sidi Kacem pour marque marocaine",
    rotation: -2,
  },
  {
    id: "social-media-showcase",
    src: "/images/hero-showcase/social-media-showcase.png",
    alt: "Création de contenu Instagram au Maroc pour marque locale",
    rotation: 3,
  },
]
