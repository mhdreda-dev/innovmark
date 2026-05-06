"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"

// ─── WhatsApp CTA ────────────────────────────────────────────────────────────
const WHATSAPP_URL =
  "https://wa.me/212771450503?text=Bonjour%20INNOVMARK%2C%20je%20veux%20un%20devis"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CarouselImage {
  id: string
  src: string
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
}

// ─── Card geometry per fan slot (-2 … +2) ────────────────────────────────────
const GEO_DESKTOP = [
  { w: 175, h: 220, x: -340, opacity: 0.30 },
  { w: 205, h: 260, x: -170, opacity: 0.60 },
  { w: 245, h: 308, x:    0, opacity: 1.00 },
  { w: 205, h: 260, x:  170, opacity: 0.60 },
  { w: 175, h: 220, x:  340, opacity: 0.30 },
] as const

const GEO_MOBILE = [
  { w:   0, h:   0, x:   0, opacity: 0.00 },
  { w: 145, h: 184, x: -115, opacity: 0.48 },
  { w: 175, h: 222, x:    0, opacity: 1.00 },
  { w: 145, h: 184, x:  115, opacity: 0.48 },
  { w:   0, h:   0, x:   0, opacity: 0.00 },
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
  features = [],
}: Props) {
  const [mounted, setMounted]         = useState(false)
  const [isMobile, setIsMobile]       = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // Pause state lives in a ref — no re-render needed, avoids restarting the timer
  const pausedRef      = useRef(false)
  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Start (or restart) the 1.9 s interval from zero
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((i) => (i + 1) % images.length)
      }
    }, 1900)
  }, [images.length])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current)       clearInterval(timerRef.current)
      if (touchResumeRef.current) clearTimeout(touchResumeRef.current)
    }
  }, [startTimer])

  // Navigate manually and reset countdown so the next auto-advance is a full 1.9 s away
  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx)
    startTimer()
  }, [startTimer])

  // Desktop hover — pause / resume without touching the timer
  const handleMouseEnter = () => { pausedRef.current = true }
  const handleMouseLeave = () => { pausedRef.current = false }

  // Mobile touch — pause immediately, resume 1.5 s after finger lifts
  const handleTouchStart = () => {
    pausedRef.current = true
    if (touchResumeRef.current) clearTimeout(touchResumeRef.current)
  }
  const handleTouchEnd = () => {
    if (touchResumeRef.current) clearTimeout(touchResumeRef.current)
    touchResumeRef.current = setTimeout(() => {
      pausedRef.current = false
    }, 1500)
  }

  const GEO = isMobile ? GEO_MOBILE : GEO_DESKTOP

  const slots = Array.from({ length: 5 }, (_, offset) => {
    const slotIdx = offset - 2
    const imgIdx  = (activeIndex + slotIdx + images.length) % images.length
    return { ...images[imgIdx], slotIdx, imgIdx, geo: GEO[offset] }
  })

  return (
    <>
      <style>{css}</style>

      <section
        className="ihc-section"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Background layers ── */}
        <div className="ihc-bg" aria-hidden>
          <div className="ihc-orb ihc-orb-1" />
          <div className="ihc-orb ihc-orb-2" />
          <div className="ihc-orb ihc-orb-3" />
          <div className="ihc-grid" />
          <div className="ihc-horizon" />
          <div className="ihc-vignette" />
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

          {/* ── Fan carousel ── */}
          <div
            className={`ihc-stage${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.60s" }}
          >
            {slots.map(({ id, src, alt, rotation, slotIdx, imgIdx, geo }) => {
              if (geo.w === 0) return null
              const isCenter = slotIdx === 0
              return (
                <button
                  key={`${id}-${slotIdx}`}
                  onClick={() => goTo(imgIdx)}
                  className={`ihc-card${isCenter ? " ihc-card--center" : ""}`}
                  style={{
                    width:     geo.w,
                    height:    geo.h,
                    transform: `translateX(${geo.x}px) rotate(${rotation}deg)`,
                    opacity:   geo.opacity,
                    zIndex:    5 - Math.abs(slotIdx),
                  }}
                  aria-label={alt}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={
                      isCenter
                        ? "(max-width:767px) 175px, 245px"
                        : "(max-width:767px) 145px, 205px"
                    }
                    className="ihc-card-img"
                    priority={isCenter}
                    draggable={false}
                  />
                  <span className="ihc-card-gradient" aria-hidden />
                  <span className="ihc-card-label">{alt}</span>
                  {isCenter && <span className="ihc-card-ring" aria-hidden />}
                </button>
              )
            })}
          </div>

          {/* Dots */}
          <div
            className={`ihc-dots${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.80s" }}
            role="tablist"
            aria-label="Carousel navigation"
          >
            {images.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={img.alt}
                onClick={() => goTo(i)}
                className={`ihc-dot${i === activeIndex ? " ihc-dot--active" : ""}`}
              />
            ))}
          </div>

          {/* CTA row — WhatsApp (primary) + Contact (secondary) */}
          <div
            className={`ihc-cta-wrap${mounted ? " ihc-in" : ""}`}
            style={{ animationDelay: "0.96s" }}
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

          {/* Feature pills */}
          {features.length > 0 && (
            <div
              className={`ihc-features${mounted ? " ihc-in" : ""}`}
              style={{ animationDelay: "1.14s" }}
            >
              {features.map((f) => (
                <div key={f.title} className="ihc-feature">
                  <div className="ihc-feature-title">{f.title}</div>
                  <div className="ihc-feature-desc">{f.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

// ─── Scoped styles ────────────────────────────────────────────────────────────
const css = `
.ihc-section {
  position: relative;
  min-height: 100svh;
  background: #06070a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6.5rem 1.5rem 5rem;
  font-family: var(--font-geist-sans), var(--font-sans), system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.ihc-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.ihc-orb { position: absolute; border-radius: 50%; }

.ihc-orb-1 {
  width: 900px; height: 700px;
  top: -260px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at 50% 40%, rgba(91,140,255,0.13), transparent 68%);
}

.ihc-orb-2 {
  width: 640px; height: 560px;
  bottom: -140px; right: -120px;
  background: radial-gradient(ellipse at 55% 55%, rgba(154,108,255,0.11), transparent 68%);
}

.ihc-orb-3 {
  width: 460px; height: 400px;
  top: 30%; left: -100px;
  background: radial-gradient(ellipse at 40% 50%, rgba(122,217,255,0.07), transparent 70%);
}

.ihc-grid {
  position: absolute;
  inset: -10%;
  background-image:
    linear-gradient(rgba(255,255,255,0.042) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.042) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent 88%);
  -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent 88%);
  transform: perspective(1200px) rotateX(58deg) translateY(28%) scale(1.5);
  opacity: 0.5;
}

.ihc-horizon {
  position: absolute;
  left: -5%; right: -5%;
  bottom: 42%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(122,217,255,0.0) 8%,
    rgba(122,217,255,0.45) 30%,
    rgba(154,108,255,0.5) 55%,
    rgba(91,140,255,0.4) 75%,
    transparent 94%
  );
  filter: blur(0.4px);
  box-shadow: 0 0 30px rgba(91,140,255,0.3), 0 0 80px rgba(154,108,255,0.2);
}

.ihc-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 110% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.88) 100%);
}

.ihc-noise {
  position: absolute;
  inset: 0;
  opacity: 0.028;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.ihc-col {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 920px;
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
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #ccd3e6 55%, #8891a4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 780px;
  margin-bottom: 18px;
}

/* Description */
.ihc-desc {
  font-size: clamp(0.92rem, 1.6vw, 1.07rem);
  color: rgba(255,255,255,0.52);
  line-height: 1.7;
  max-width: 520px;
}

/* Stage */
.ihc-stage {
  position: relative;
  width: 100%;
  height: 330px;
  margin-top: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card */
.ihc-card {
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.11);
  background: #0d0f14;
  box-shadow: 0 20px 60px -14px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04) inset;
  cursor: pointer;
  transition:
    transform  0.58s cubic-bezier(0.34, 1.15, 0.64, 1),
    opacity    0.48s ease,
    width      0.48s ease,
    height     0.48s ease,
    box-shadow 0.48s ease;
}
.ihc-card:focus-visible {
  outline: 2px solid rgba(122,217,255,0.55);
  outline-offset: 3px;
}
.ihc-card--center {
  box-shadow:
    0 28px 72px -16px rgba(0,0,0,0.85),
    0 0 0 1px rgba(122,217,255,0.18) inset,
    0 0 55px -12px rgba(91,140,255,0.28);
}
.ihc-card-img {
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.ihc-card:hover .ihc-card-img { transform: scale(1.05); }

/* Bottom gradient overlay — text always readable */
.ihc-card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 38%, rgba(4,5,9,0.48) 70%, rgba(4,5,9,0.84) 100%);
  pointer-events: none;
}

.ihc-card-label {
  position: absolute;
  bottom: 11px;
  left: 0; right: 0;
  text-align: center;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.72);
  pointer-events: none;
}

/* Active glow ring */
.ihc-card-ring {
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  border: 1px solid rgba(122,217,255,0.28);
  box-shadow: 0 0 28px rgba(91,140,255,0.28), inset 0 0 22px rgba(91,140,255,0.06);
  pointer-events: none;
  animation: ihc-ring-pulse 3.2s ease-in-out infinite;
}
@keyframes ihc-ring-pulse {
  0%, 100% { opacity: 0.65; }
  50%       { opacity: 1; }
}

/* Pagination dots */
.ihc-dots {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 26px;
}
.ihc-dot {
  height: 6px; width: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.20);
  transition: width 0.38s cubic-bezier(0.34,1.2,0.64,1), background 0.38s ease;
  cursor: pointer;
}
.ihc-dot--active {
  width: 26px;
  background: #7ad9ff;
  box-shadow: 0 0 10px rgba(122,217,255,0.55);
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
  .ihc-section { padding: 5.5rem 1.25rem 4rem; }
  .ihc-stage   { height: 250px; margin-top: 2.75rem; }
  .ihc-cta-wrap { flex-direction: column; gap: 12px; }
  .ihc-cta           { height: 54px; padding: 0 22px 0 18px; font-size: 14px; width: 100%; max-width: 280px; }
  .ihc-cta-secondary { height: 54px; font-size: 14px; width: 100%; max-width: 280px; }
  .ihc-features { gap: 9px; margin-top: 40px; }
  .ihc-feature { min-width: 135px; padding: 14px 16px; }
  .ihc-feature-title { font-size: 12px; }
  .ihc-feature-desc  { font-size: 10.5px; }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .ihc-in, .ihc-card, .ihc-card-img, .ihc-dot,
  .ihc-cta, .ihc-cta-secondary, .ihc-cta-arrow, .ihc-feature,
  .ihc-pulse, .ihc-card-ring {
    animation: none !important;
    transition: none !important;
  }
  .ihc-badge, .ihc-title, .ihc-desc, .ihc-stage,
  .ihc-dots, .ihc-cta-wrap, .ihc-features {
    opacity: 1 !important;
    transform: none !important;
  }
}
`
