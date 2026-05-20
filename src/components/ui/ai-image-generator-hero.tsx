"use client"

import { useState, useEffect, useCallback, PointerEvent as ReactPointerEvent } from "react"

// ─── WhatsApp CTA ────────────────────────────────────────────────────────────
const WHATSAPP_URL =
  "https://wa.me/212771450503?text=Bonjour%20INNOVMARK%2C%20je%20veux%20un%20devis"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CarouselImage {
  id: string
  src: string
  imageUrl?: string
  url?: string
  secureUrl?: string
  mediaUrl?: string
  alt: string
  rotation: number
}

export interface CarouselFeature {
  title: string
  description: string
}

interface Props {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  /** Optional callback for analytics — CTA always navigates to WhatsApp. */
  onCtaClick?: () => void
  images: CarouselImage[]
  features?: CarouselFeature[]
  heroVideoUrl?: string
}

// ─── Particles (static positions — no hydration mismatch) ────────────────────
const PARTICLES = [
  { l: "7%",  t: "80%", d: "11s", e: "0s"   },
  { l: "14%", t: "58%", d: "14s", e: "2.4s" },
  { l: "23%", t: "88%", d: "9s",  e: "5.1s" },
  { l: "35%", t: "42%", d: "13s", e: "1.2s" },
  { l: "44%", t: "72%", d: "10s", e: "7.0s" },
  { l: "52%", t: "55%", d: "12s", e: "3.3s" },
  { l: "62%", t: "84%", d: "8s",  e: "0.8s" },
  { l: "71%", t: "38%", d: "15s", e: "4.6s" },
  { l: "80%", t: "68%", d: "11s", e: "6.2s" },
  { l: "88%", t: "48%", d: "13s", e: "2.0s" },
  { l: "93%", t: "82%", d: "9s",  e: "8.5s" },
  { l: "28%", t: "30%", d: "16s", e: "3.9s" },
] as const

// ─── Component ────────────────────────────────────────────────────────────────
export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref = WHATSAPP_URL,
  secondaryCtaText = "Nous contacter",
  secondaryCtaHref = "/contact",
  onCtaClick,
  images,
  heroVideoUrl,
}: Props) {
  const safeImages = images
    .map((image) => {
      const imageUrl = image.imageUrl || image.url || image.secureUrl || image.src || image.mediaUrl
      if (!imageUrl) {
        console.warn("Missing hero carousel imageUrl", image)
        return null
      }

      return { ...image, imageUrl }
    })
    .filter((image): image is CarouselImage & { imageUrl: string } => Boolean(image))
  const marqueeSource = safeImages.length
    ? Array.from({ length: Math.max(8, safeImages.length) }, (_, index) => safeImages[index % safeImages.length])
    : []
  const marqueeSets = marqueeSource.length ? [marqueeSource, marqueeSource] : []
  const [mounted, setMounted]         = useState(false)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    const t = setTimeout(() => setMounted(true), 60)
    mq.addEventListener("change", onChange)
    return () => {
      clearTimeout(t)
      mq.removeEventListener("change", onChange)
    }
  }, [])

  // Mouse-reactive glow — updates CSS custom properties directly (no re-render)
  const handlePointerMove = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1)
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1)
    el.style.setProperty("--mx", `${x}%`)
    el.style.setProperty("--my", `${y}%`)
  }, [])

  return (
    <>
      <style>{css}</style>

      <section
        className={`ihc-section${heroVideoUrl ? " ihc-has-video" : ""}`}
        onPointerMove={handlePointerMove}
      >
        {/* ── Background layers ── */}
        <div className="ihc-bg" aria-hidden>
          {/* Deep base gradient */}
          <div className="ihc-base" />
          {heroVideoUrl && (
            <video
              src={heroVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="ihc-video absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Aurora conic layer */}
          <div className="ihc-aurora" />
          {/* Ambient orbs */}
          <div className="ihc-orb ihc-orb-1" />
          <div className="ihc-orb ihc-orb-2" />
          <div className="ihc-orb ihc-orb-3" />
          <div className="ihc-orb ihc-orb-4" />
          <div className="ihc-orb ihc-orb-5" />
          {/* Perspective grid */}
          <div className="ihc-grid" />
          {/* Horizon glow line */}
          <div className="ihc-horizon" />
          {/* Light streaks */}
          <div className="ihc-streak ihc-streak-1" />
          <div className="ihc-streak ihc-streak-2" />
          <div className="ihc-streak ihc-streak-3" />
          {/* Floating particles */}
          <div className="ihc-particles">
            {PARTICLES.map((p, i) => (
              <span key={i} className="ihc-p" style={{ left: p.l, top: p.t, "--dur": p.d, "--delay": p.e } as React.CSSProperties} />
            ))}
          </div>
          {/* Mouse-reactive glow */}
          <div className="ihc-mouse-glow" />
          {/* Edge vignette */}
          <div className="ihc-vignette" />
          {/* Film grain */}
          <div className="ihc-noise" />
        </div>

        {/* ── Content column ── */}
        <div className="ihc-col">

          {/* Badge */}
          <div
            className={`ihc-badge${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.10s" }}
          >
            <span className="ihc-pulse" />
            <span>{subtitle}</span>
          </div>

          {/* Title */}
          <h1
            className={`ihc-title${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.28s" }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={`ihc-desc${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.46s" }}
          >
            {description}
          </p>

          {/* CTA row — WhatsApp (primary) + Contact (secondary) */}
          <div
            className={`ihc-cta-wrap${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.60s" }}
          >
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ihc-cta"
              onClick={onCtaClick}
            >
              <svg className="ihc-cta-wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
              </svg>
              <span>{ctaText}</span>
              <span className="ihc-cta-arrow" aria-hidden>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <a href={secondaryCtaHref} className="ihc-cta-secondary">
              {secondaryCtaText}
            </a>
          </div>

        </div>

        {/* ── Bottom image marquee ── */}
        {!heroVideoUrl && marqueeSets.length > 0 && (
          <div
            className={`ihc-stage${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.78s" }}
          >
            <span className="ihc-rail-glow" aria-hidden />
            <div className="ihc-track" aria-label="Hero media gallery">
              {marqueeSets.map((set, setIndex) => (
                <div className="ihc-loop" key={setIndex} aria-hidden={setIndex === 1}>
                  {set.map(({ id, imageUrl, alt }, index) => (
                    <figure
                      key={`${id}-${setIndex}-${index}`}
                      className="ihc-card"
                      aria-label={alt}
                    >
                      <img
                        src={imageUrl}
                        alt={alt}
                        className="ihc-card-img"
                        draggable={false}
                        loading={setIndex === 0 && index < (isMobile ? 3 : 6) ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <span className="ihc-card-gradient" aria-hidden />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

// ─── Scoped styles ────────────────────────────────────────────────────────────
const css = `
.ihc-section {
  position: relative;
  min-height: 100svh;
  background: #040610;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7.25rem 1.25rem 34svh;
  font-family: var(--font-geist-sans), var(--font-sans), system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.ihc-section.ihc-has-video {
  padding-bottom: 7.5rem;
}

.ihc-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.ihc-video {
  opacity: 0.52;
  filter: saturate(1.08) contrast(1.08);
}

/* ── Deep base gradient ── */
.ihc-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 120% 80% at 50% -10%, rgba(60,100,255,0.18) 0%, transparent 55%),
    radial-gradient(ellipse 80% 60% at 85% 90%, rgba(120,60,255,0.12) 0%, transparent 55%),
    radial-gradient(ellipse 60% 50% at 5% 60%, rgba(0,200,255,0.08) 0%, transparent 55%),
    linear-gradient(175deg, #060c1e 0%, #040810 40%, #030710 70%, #030510 100%);
}

/* ── Aurora conic layer ── */
.ihc-aurora {
  position: absolute;
  inset: -25% -40% auto -40%;
  height: 80%;
  background: conic-gradient(
    from 215deg at 50% 0%,
    rgba(80,130,255,0.22) 0deg,
    rgba(140,90,255,0.16) 60deg,
    transparent 115deg,
    transparent 195deg,
    rgba(100,210,255,0.13) 252deg,
    rgba(80,130,255,0.18) 315deg,
    transparent 360deg
  );
  filter: blur(88px);
  animation: ihc-aurora-shift 36s ease-in-out infinite;
  opacity: 0.75;
}
@keyframes ihc-aurora-shift {
  0%,100% { opacity: 0.68; transform: rotate(-3deg) scaleX(1.00); }
  30%      { opacity: 0.92; transform: rotate( 2deg) scaleX(1.12); }
  65%      { opacity: 0.52; transform: rotate(-1deg) scaleX(0.93); }
}

/* ── Ambient orbs ── */
.ihc-orb { position: absolute; border-radius: 50%; }

.ihc-orb-1 {
  width: 1200px; height: 900px;
  top: -340px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at 50% 35%, rgba(91,140,255,0.26), transparent 60%);
  animation: ihc-drift-1 22s ease-in-out infinite;
}
.ihc-orb-2 {
  width: 820px; height: 720px;
  bottom: -220px; right: -160px;
  background: radial-gradient(ellipse at 55% 55%, rgba(154,108,255,0.20), transparent 60%);
  animation: ihc-drift-2 28s ease-in-out infinite;
}
.ihc-orb-3 {
  width: 600px; height: 520px;
  top: 26%; left: -130px;
  background: radial-gradient(ellipse at 40% 50%, rgba(122,217,255,0.14), transparent 62%);
  animation: ihc-drift-3 19s ease-in-out infinite;
}
.ihc-orb-4 {
  width: 540px; height: 440px;
  bottom: 5%; right: 6%;
  background: radial-gradient(ellipse at 50% 60%, rgba(20,184,166,0.13), transparent 64%);
  animation: ihc-drift-2 24s ease-in-out infinite reverse;
}
.ihc-orb-5 {
  width: 400px; height: 330px;
  top: 8%; right: 4%;
  background: radial-gradient(ellipse at 50% 40%, rgba(200,100,255,0.09), transparent 66%);
  animation: ihc-drift-1 30s ease-in-out infinite 7s;
}

@keyframes ihc-drift-1 {
  0%,100% { transform: translateX(-50%) translateY(  0px) scale(1.00); }
  33%      { transform: translateX(-50%) translateY(-30px) scale(1.05); }
  66%      { transform: translateX(-50%) translateY( 18px) scale(0.97); }
}
@keyframes ihc-drift-2 {
  0%,100% { transform: translateY(  0px) scale(1.00); }
  50%      { transform: translateY(-38px) scale(1.07); }
}
@keyframes ihc-drift-3 {
  0%,100% { transform: translateY(  0px); }
  38%      { transform: translateY( 24px); }
  78%      { transform: translateY(-15px); }
}

/* ── Perspective grid ── */
.ihc-grid {
  position: absolute;
  inset: -10%;
  background-image:
    linear-gradient(rgba(120,160,255,0.065) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120,160,255,0.065) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: radial-gradient(ellipse 78% 68% at 50% 50%, black, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse 78% 68% at 50% 50%, black, transparent 85%);
  transform: perspective(1200px) rotateX(58deg) translateY(28%) scale(1.5);
  opacity: 0.60;
}

/* ── Horizon glow ── */
.ihc-horizon {
  position: absolute;
  left: -5%; right: -5%;
  bottom: 42%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 2%,
    rgba(122,217,255,0.55) 28%,
    rgba(154,108,255,0.62) 52%,
    rgba(91,140,255,0.50) 74%,
    transparent 96%
  );
  filter: blur(0.5px);
  box-shadow: 0 0 36px rgba(91,140,255,0.40), 0 0 90px rgba(154,108,255,0.22);
}

/* ── Light streaks ── */
.ihc-streak {
  position: absolute;
  height: 1px;
  border-radius: 999px;
  pointer-events: none;
}
.ihc-streak-1 {
  width: 45%; top: 36%; left: 4%;
  background: linear-gradient(90deg, transparent, rgba(122,217,255,0.60) 40%, rgba(154,108,255,0.50) 70%, transparent);
  filter: blur(0.5px);
  box-shadow: 0 0 32px rgba(91,140,255,0.36), 0 0 80px rgba(154,108,255,0.20);
  animation: ihc-streak-glow 7s ease-in-out infinite;
}
.ihc-streak-2 {
  width: 26%; top: 55%; right: 6%;
  background: linear-gradient(90deg, transparent, rgba(91,140,255,0.40) 55%, transparent);
  filter: blur(0.4px);
  box-shadow: 0 0 22px rgba(91,140,255,0.24);
  animation: ihc-streak-glow 9s ease-in-out infinite 2.5s;
}
.ihc-streak-3 {
  width: 18%; top: 22%; left: 60%;
  background: linear-gradient(90deg, transparent, rgba(20,184,166,0.32) 55%, transparent);
  filter: blur(0.3px);
  animation: ihc-streak-glow 11s ease-in-out infinite 5s;
}
@keyframes ihc-streak-glow {
  0%,100% { opacity: 0.65; }
  50%      { opacity: 1.00; }
}

/* ── Floating particles ── */
.ihc-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.ihc-p {
  position: absolute;
  width: 2px; height: 2px;
  border-radius: 50%;
  background: rgba(140,210,255,0.9);
  box-shadow: 0 0 7px rgba(122,217,255,0.85), 0 0 14px rgba(91,140,255,0.45);
  opacity: 0;
  animation: ihc-p-rise var(--dur,10s) ease-in-out var(--delay,0s) infinite;
}
@keyframes ihc-p-rise {
  0%        { opacity: 0;   transform: translateY(  0) scale(0.3); }
  8%        { opacity: 0.9; transform: translateY(  0) scale(1.0); }
  88%       { opacity: 0.4; }
  100%      { opacity: 0;   transform: translateY(-110px) scale(0.4); }
}

/* ── Mouse-reactive glow ── */
.ihc-mouse-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(540px circle at var(--mx,50%) var(--my,32%), rgba(91,140,255,0.14), transparent 52%);
  pointer-events: none;
}

/* ── Vignette ── */
.ihc-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 110% 100% at 50% 50%, transparent 34%, rgba(0,0,0,0.58) 76%, rgba(0,0,0,0.88) 100%);
}

/* ── Film grain ── */
.ihc-noise {
  position: absolute;
  inset: 0;
  opacity: 0.030;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.ihc-col {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 920px;
  min-width: 0;
}

/* ── Entrance animations ── */
.ihc-badge, .ihc-title, .ihc-desc,
.ihc-stage, .ihc-dots, .ihc-cta-wrap, .ihc-features {
  opacity: 0;
  transform: translateY(22px);
}
.ihc-in {
  animation: ihc-rise 0.85s cubic-bezier(0.22, 0.82, 0.22, 1) forwards;
}
@keyframes ihc-rise {
  to { opacity: 1; transform: translateY(0); }
}

/* Badge */
.ihc-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.62);
  margin-bottom: 22px;
  max-width: 100%;
  text-align: center;
}

.ihc-pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #7ad9ff;
  box-shadow: 0 0 0 0 rgba(122,217,255,0.7);
  animation: ihc-ping 2.4s cubic-bezier(0.4,0,0.6,1) infinite;
  flex-shrink: 0;
}
@keyframes ihc-ping {
  0%   { box-shadow: 0 0 0 0 rgba(122,217,255,0.7); }
  70%  { box-shadow: 0 0 0 8px rgba(122,217,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(122,217,255,0); }
}

/* Title */
.ihc-title {
  font-size: clamp(1.85rem, 4.8vw, 3.6rem);
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: 0;
  background: linear-gradient(180deg, #ffffff 0%, #ccd3e6 55%, #8891a4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 780px;
  margin-bottom: 18px;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

/* Description */
.ihc-desc {
  font-size: clamp(0.92rem, 1.6vw, 1.07rem);
  color: rgba(255,255,255,0.52);
  line-height: 1.7;
  max-width: 520px;
  text-wrap: balance;
}

/* Stage */
.ihc-stage {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 30svh;
  overflow: hidden;
  mask-image:
    linear-gradient(to bottom, transparent 0%, black 18%, black 86%, transparent 100%),
    linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0%, black 18%, black 86%, transparent 100%),
    linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-composite: source-in;
}

.ihc-rail-glow {
  position: absolute;
  left: 50%;
  bottom: -18%;
  width: min(980px, 92vw);
  height: 58%;
  transform: translateX(-50%);
  border-radius: 999px;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(122,217,255,0.18), transparent 62%),
    radial-gradient(ellipse at 48% 40%, rgba(154,108,255,0.18), transparent 66%);
  filter: blur(24px);
  opacity: 0.72;
  pointer-events: none;
}

.ihc-track {
  position: absolute;
  left: 0;
  bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  width: max-content;
  animation: ihc-rail-scroll 42s linear infinite;
  will-change: transform;
}

.ihc-stage:hover .ihc-track {
  animation-play-state: paused;
}

@keyframes ihc-rail-scroll {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

.ihc-loop {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  width: max-content;
  padding-right: 0.75rem;
}

/* Card */
.ihc-card {
  position: relative;
  flex: 0 0 auto;
  height: 11rem;
  aspect-ratio: 3 / 4;
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.15);
  background: linear-gradient(180deg, rgba(255,255,255,0.11), rgba(13,15,20,0.55));
  box-shadow:
    0 30px 80px -34px rgba(0,0,0,0.76),
    0 0 0 1px rgba(255,255,255,0.08) inset;
  transform-origin: 50% 70%;
  will-change: transform, opacity;
  transition: transform 0.45s ease, opacity 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease;
}
.ihc-card:nth-child(odd) { transform: rotate(-2deg); }
.ihc-card:nth-child(even) { transform: rotate(3deg); }
.ihc-card:hover {
  transform: translateY(-3px) rotate(0deg);
  border-color: rgba(255,255,255,0.24);
  box-shadow:
    0 42px 100px -34px rgba(0,0,0,0.92),
    0 0 65px -28px rgba(122,217,255,0.45),
    0 0 0 1px rgba(255,255,255,0.12) inset;
}
.ihc-card:focus-visible {
  outline: 2px solid rgba(122,217,255,0.55);
  outline-offset: 3px;
}
.ihc-card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}
.ihc-card:hover .ihc-card-img { transform: scale(1.045); }

/* Bottom gradient overlay — text always readable */
.ihc-card-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(255,255,255,0.07), transparent 50%, rgba(4,5,9,0.08) 100%),
    radial-gradient(circle at 50% 0%, rgba(255,255,255,0.14), transparent 44%);
  pointer-events: none;
}

/* CTA row */
.ihc-cta-wrap {
  margin-top: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}
.ihc-cta {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  height: 58px;
  padding: 0 26px 0 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #25d366 0%, #128c5e 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.015em;
  text-decoration: none;
  box-shadow: 0 14px 44px -8px rgba(37,211,102,0.48), 0 0 0 1px rgba(255,255,255,0.08) inset;
  transition: transform 0.24s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.24s ease;
}
.ihc-cta:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 22px 56px -8px rgba(37,211,102,0.58), 0 0 0 1px rgba(255,255,255,0.14) inset;
}
.ihc-cta:focus-visible {
  outline: 2px solid rgba(37,211,102,0.6);
  outline-offset: 3px;
}
.ihc-cta-wa  { width: 20px; height: 20px; flex-shrink: 0; }

/* Secondary CTA */
.ihc-cta-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  padding: 0 26px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.20);
  background: transparent;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.015em;
  text-decoration: none;
  transition: background 0.22s ease, border-color 0.22s ease, transform 0.24s cubic-bezier(0.34,1.2,0.64,1);
}
.ihc-cta-secondary:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.30);
  transform: translateY(-2px);
}
.ihc-cta-secondary:focus-visible {
  outline: 2px solid rgba(255,255,255,0.35);
  outline-offset: 3px;
}
.ihc-cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: rgba(0,0,0,0.18);
  flex-shrink: 0;
  transition: transform 0.24s ease;
}
.ihc-cta:hover .ihc-cta-arrow { transform: translateX(3px); }

/* Feature pills */
.ihc-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 52px;
  width: 100%;
}
.ihc-feature {
  border-radius: 18px;
  padding: 18px 22px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.028);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  flex: 1;
  min-width: 155px;
  max-width: 240px;
  text-align: center;
  transition: border-color 0.25s ease, background 0.25s ease;
}
.ihc-feature:hover {
  border-color: rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.045);
}
.ihc-feature-title { font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 5px; }
.ihc-feature-desc  { font-size: 11.5px; color: rgba(255,255,255,0.45); line-height: 1.55; }

@media (min-width: 768px) {
  .ihc-section { padding-bottom: 40svh; }
  .ihc-section.ihc-has-video { padding-bottom: 7.5rem; }
  .ihc-stage { height: 34svh; }
  .ihc-track {
    bottom: 2rem;
  }
  .ihc-loop {
    gap: 1rem;
    padding-right: 1rem;
  }
  .ihc-card {
    height: 14rem;
    border-radius: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .ihc-card { height: 16rem; }
}

[dir="rtl"] .ihc-section {
  font-family: var(--font-cairo), "Tajawal", "IBM Plex Sans Arabic", system-ui, sans-serif;
}
[dir="rtl"] .ihc-title {
  letter-spacing: 0;
  line-height: 1.22;
  font-size: clamp(2.05rem, 5vw, 3.85rem);
}
[dir="rtl"] .ihc-desc {
  line-height: 1.95;
  font-size: clamp(1rem, 1.7vw, 1.16rem);
}
[dir="rtl"] .ihc-badge,
[dir="rtl"] .ihc-cta-wrap {
  flex-direction: row-reverse;
}
[dir="rtl"] .ihc-cta-arrow {
  transform: scaleX(-1);
}

/* ── Mobile ── */
@media (max-width: 767px) {
  .ihc-section {
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100svh;
    padding: 6rem 1rem 33svh;
  }
  .ihc-section.ihc-has-video {
    align-items: center;
    padding-bottom: 5rem;
  }
  .ihc-col { max-width: 620px; }
  .ihc-badge {
    margin-bottom: 16px;
    padding: 7px 13px;
    font-size: 9.5px;
    letter-spacing: 0.18em;
  }
  .ihc-title {
    font-size: clamp(2rem, 11vw, 3rem);
    line-height: 1.08;
  }
  .ihc-title { margin-bottom: 16px; }
  .ihc-desc {
    max-width: 460px;
    font-size: 0.94rem;
    line-height: 1.65;
  }
  .ihc-stage { height: 28svh; }
  .ihc-track {
    animation-duration: 36s;
    bottom: 1.1rem;
  }
  .ihc-card { border-radius: 1.5rem; }
  .ihc-cta-wrap { flex-direction: column; gap: 12px; }
  .ihc-cta           { height: 54px; padding: 0 22px 0 18px; font-size: 14px; width: 100%; max-width: 280px; }
  .ihc-cta-secondary { height: 54px; font-size: 14px; width: 100%; max-width: 280px; }
  /* Background perf on mobile */
  .ihc-orb-1 { width: 700px; height: 550px; }
  .ihc-orb-2 { width: 500px; height: 440px; }
  .ihc-orb-3, .ihc-orb-4, .ihc-orb-5 { display: none; }
  .ihc-aurora { filter: blur(60px); opacity: 0.55; }
  .ihc-streak-2, .ihc-streak-3 { display: none; }
  .ihc-p { display: none; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .ihc-in, .ihc-track, .ihc-card, .ihc-card-img, .ihc-dot,
  .ihc-cta, .ihc-cta-secondary, .ihc-cta-arrow, .ihc-feature,
  .ihc-pulse, .ihc-card-ring,
  .ihc-orb-1, .ihc-orb-2, .ihc-orb-3, .ihc-orb-4, .ihc-orb-5,
  .ihc-aurora, .ihc-streak-1, .ihc-streak-2, .ihc-streak-3, .ihc-p {
    animation: none !important;
    transition: none !important;
  }
  .ihc-badge, .ihc-title, .ihc-desc, .ihc-stage,
  .ihc-dots, .ihc-cta-wrap, .ihc-features {
    opacity: 1 !important;
    transform: none !important;
  }
  .ihc-p { opacity: 0 !important; }
}
`
