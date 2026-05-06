"use client";

import { useEffect, useRef } from "react";

const WHATSAPP_NUMBER = "212771450503";
const WHATSAPP_MSG = encodeURIComponent(
  "Bonjour Innovmark, je souhaite discuter d'un projet."
);

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Letterbox-fit the 1920×1080 stage to the viewport width (desktop only).
  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const STAGE_W = 1920;
    const STAGE_H = 1080;

    const apply = () => {
      const w = wrap.clientWidth || window.innerWidth;
      const scale = w / STAGE_W;
      stage.style.transform = `translate(-50%, 0) scale(${scale})`;
      wrap.style.height = `${STAGE_H * scale}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  // Generate floating particles — pure DOM, no library.
  useEffect(() => {
    const root = particlesRef.current;
    if (!root) return;
    root.innerHTML = "";
    const N = 70;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "imk-particle";
      const x = Math.random() * 100;
      const y = 60 + Math.random() * 60;
      const dx = (Math.random() * 2 - 1) * 60;
      const dy = -(80 + Math.random() * 220);
      const dur = 14 + Math.random() * 14;
      const delay = -Math.random() * dur;
      const size = 1 + Math.random() * 3;
      const o = 0.3 + Math.random() * 0.7;
      p.style.left = `${x}%`;
      p.style.top = `${y}%`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.setProperty("--dx", `${dx}px`);
      p.style.setProperty("--dy", `${dy}px`);
      p.style.setProperty("--o", String(o));
      p.style.animationDuration = `${dur}s`;
      p.style.animationDelay = `${delay}s`;
      if (i % 7 === 0)
        p.style.boxShadow =
          "0 0 10px rgba(154,108,255,.95), 0 0 22px rgba(154,108,255,.6)";
      if (i % 11 === 0)
        p.style.boxShadow =
          "0 0 10px rgba(122,217,255,.95), 0 0 22px rgba(122,217,255,.6)";
      root.appendChild(p);
    }
  }, []);

  return (
    <div id="top">
      {/* ══════════════════════════════════════════════════════════════
          MOBILE HERO — full-viewport, shown only on < 768 px
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="md:hidden relative w-full overflow-hidden bg-black flex flex-col"
        style={{ minHeight: "100svh" }}
        aria-label="Innovmark — Agence Marketing Nouvelle Génération"
      >
        {/* Background FX */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* Cyan orb — top right */}
          <div
            className="absolute -top-16 right-0 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(122,217,255,0.22), transparent 70%)",
            }}
          />
          {/* Violet orb — bottom left */}
          <div
            className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(154,108,255,0.18), transparent 70%)",
            }}
          />
          {/* Perspective grid */}
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.78) 100%)",
            }}
          />
          {/* Horizon glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(122,217,255,0.4) 40%, rgba(154,108,255,0.35) 60%, transparent)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 pt-28 pb-12">
          {/* Eyebrow */}
          <div
            className="fade-up flex items-center gap-2 mb-8"
            style={{ animationDelay: "0.1s" }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full bg-cyan-300 shrink-0"
              style={{
                boxShadow:
                  "0 0 10px rgba(122,217,255,0.9), 0 0 20px rgba(122,217,255,0.5)",
              }}
            />
            <span
              className="text-white/60 text-[10px] tracking-[0.34em] uppercase"
              style={{
                fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              }}
            >
              Agence · Paris — Montréal · 2026
            </span>
          </div>

          {/* Wordmark */}
          <h1
            className="fade-up mb-5"
            style={{
              animationDelay: "0.25s",
              fontSize: "clamp(68px, 19vw, 88px)",
              fontWeight: 200,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
              background:
                "linear-gradient(180deg, #ffffff 0%, #c8d0e4 55%, #8892a6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            INNOV<strong style={{ fontWeight: 700 }}>MARK</strong>
          </h1>

          {/* Tagline */}
          <p
            className="fade-up"
            style={{
              animationDelay: "0.45s",
              fontSize: "clamp(18px, 5.5vw, 22px)",
              fontWeight: 300,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            Agence Marketing{" "}
            <em className="not-italic font-normal text-white">
              Nouvelle Génération
            </em>
            .
          </p>

          {/* Service chips */}
          <div
            className="fade-up flex flex-wrap gap-2 mt-5 mb-8"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              "Branding",
              "Vidéo",
              "Web",
              "Publicités",
              "IA · Croissance",
            ].map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full text-white/55"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "10px",
                  fontFamily:
                    "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="fade-up flex flex-col gap-3"
            style={{ animationDelay: "0.75s" }}
          >
            <a
              href="#contact"
              className="flex items-center justify-center gap-2.5 cursor-pointer"
              style={{
                height: "56px",
                borderRadius: "999px",
                background: "linear-gradient(180deg, #ffffff, #e8ecf5)",
                color: "#0a0c12",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.03em",
                textDecoration: "none",
                boxShadow:
                  "0 12px 40px rgba(91,140,255,0.28), 0 0 0 1px rgba(255,255,255,0.5)",
              }}
            >
              Commencer un projet
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0a0c12",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 cursor-pointer"
              style={{
                height: "56px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.78)",
                fontSize: "14px",
                letterSpacing: "0.03em",
                textDecoration: "none",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#25D366"
                style={{ width: "16px", height: "16px", flexShrink: 0 }}
                aria-hidden
              >
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.8-1.3-1.3-2.9-1.3-4.4 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z" />
              </svg>
              WhatsApp direct
            </a>
          </div>

          {/* Metrics row */}
          <div
            className="fade-up mt-9 pt-7 grid grid-cols-3 gap-3"
            style={{
              animationDelay: "0.95s",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              { value: "+248%", label: "Croissance" },
              { value: "12.4M", label: "Portée" },
              { value: "8.7×", label: "ROAS" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    lineHeight: 1,
                    fontFamily: "var(--font-manrope), system-ui, sans-serif",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    fontFamily:
                      "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.44)",
                    marginTop: "5px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DESKTOP HERO — cinematic stage, shown only on ≥ 768 px
      ══════════════════════════════════════════════════════════════ */}
      <section
        ref={wrapRef}
        className="hidden md:block imk-hero relative w-full overflow-hidden bg-black"
        aria-label="Innovmark — Agence Marketing Nouvelle Génération"
      >
        {/* Scoped styles for the v2 stage */}
        <style>{styles}</style>

        <div ref={stageRef} className="imk-stage" data-screen-label="01 Hero">
          {/* Background layers */}
          <div className="imk-layer-bg">
            <div className="imk-grid" />
            <div className="imk-city">
              <svg viewBox="0 0 1920 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="imkCityG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0e1320" stopOpacity="0" />
                    <stop offset="60%" stopColor="#0a0d16" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#04060b" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="imkWinG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#9ec6ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Far skyline */}
                <g fill="#0a0e18" opacity="0.85">
                  {SKYLINE_RECTS.map((r, i) => (
                    <rect key={`b${i}`} x={r.x} y={r.y} width={r.w} height={r.h} />
                  ))}
                </g>
                {/* Window dots */}
                <g fill="url(#imkWinG)">
                  {WINDOW_DOTS.map((d, i) => (
                    <rect key={`w${i}`} x={d.x} y={d.y} width="3" height="6" />
                  ))}
                </g>
                <rect x="0" y="0" width="1920" height="500" fill="url(#imkCityG)" />
              </svg>
            </div>
            <div className="imk-horizon-glow" />
            <div className="imk-beam imk-beam-1" />
            <div className="imk-beam imk-beam-2" />
          </div>

          {/* Camera-driven content */}
          <div className="imk-camera">
            {/* Particles */}
            <div className="imk-particles" ref={particlesRef} />

            {/* Foreground panels */}
            <div className="imk-layer-fg">
              {/* Analytics card */}
              <div className="imk-panel imk-analytics">
                <div className="imk-an-head">
                  <div className="imk-an-title">Performance · Q2</div>
                  <div className="imk-an-pill">Live</div>
                </div>
                <div className="imk-an-stats">
                  <div className="imk-an-stat">
                    <div className="imk-an-k">
                      <b>+248%</b>
                    </div>
                    <div className="imk-an-l">Growth</div>
                  </div>
                  <div className="imk-an-stat">
                    <div className="imk-an-k">12.4M</div>
                    <div className="imk-an-l">Reach</div>
                  </div>
                  <div className="imk-an-stat">
                    <div className="imk-an-k">8.7×</div>
                    <div className="imk-an-l">ROAS</div>
                  </div>
                </div>
                <div className="imk-an-chart">
                  <svg viewBox="0 0 480 70" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="imkLineG" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#7ad9ff" />
                        <stop offset="60%" stopColor="#9a6cff" />
                        <stop offset="100%" stopColor="#5b8cff" />
                      </linearGradient>
                      <linearGradient id="imkFillG" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#9a6cff" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#9a6cff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 C40,52 70,48 110,42 C150,36 180,38 220,28 C260,18 300,22 340,16 C380,10 420,12 480,4 L480,70 L0,70 Z"
                      fill="url(#imkFillG)"
                    />
                    <path
                      d="M0,55 C40,52 70,48 110,42 C150,36 180,38 220,28 C260,18 300,22 340,16 C380,10 420,12 480,4"
                      fill="none"
                      stroke="url(#imkLineG)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="480" cy="4" r="4" fill="#fff" />
                    <circle cx="480" cy="4" r="9" fill="#fff" opacity="0.18" />
                  </svg>
                </div>
              </div>

              {/* Laptop */}
              <div className="imk-panel imk-laptop">
                <div className="imk-lp-screen">
                  <div className="imk-lp-topbar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="imk-lp-hero">
                    <div className="imk-lp-eyebrow">Case · Maison Lumière</div>
                    <h3 className="imk-lp-h3">
                      Une marque,{" "}
                      <b>réinventée pour 2026.</b>
                    </h3>
                    <p className="imk-lp-p">
                      Identité, site, campagnes coordonnées. Stratégie pilotée
                      par l&apos;IA, exécution humaine.
                    </p>
                    <div className="imk-lp-btnrow">
                      <span>Voir l&apos;étude</span>
                      <em>02:14</em>
                    </div>
                  </div>
                  <div className="imk-lp-stripe" />
                </div>
                <div className="imk-lp-keys" />
              </div>

              {/* Phone */}
              <div className="imk-panel imk-phone">
                <div className="imk-ph-shell">
                  <div className="imk-ph-notch" />
                  <div className="imk-ph-feed">
                    <div className="imk-ph-post">
                      <div className="imk-ph-row">
                        <div className="imk-ph-av" />
                        <div>
                          <div className="imk-ph-name">@innovmark</div>
                          <div className="imk-ph-meta">Sponsorisé · 2h</div>
                        </div>
                      </div>
                      <div className="imk-ph-img" />
                      <div className="imk-ph-cap">
                        Nouvelle collection. Nouvelle énergie. Découvrez la
                        campagne ↗
                      </div>
                      <div className="imk-ph-actions">
                        <span>♥ 24.8k</span>
                        <span>↗ 1.2k</span>
                        <span>◎ 312</span>
                      </div>
                    </div>
                    <div className="imk-ph-post">
                      <div className="imk-ph-row">
                        <div
                          className="imk-ph-av"
                          style={{
                            background:
                              "linear-gradient(135deg,#7ad9ff,#5b8cff)",
                          }}
                        />
                        <div>
                          <div className="imk-ph-name">@studio.nouvelle</div>
                          <div className="imk-ph-meta">Story · 12 min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Orb */}
              <div className="imk-orb-wrap">
                <div className="imk-orb-ring" />
                <div className="imk-orb-ring imk-orb-ring-2" />
                <div className="imk-orb" />
                <div className="imk-orb-tag">IA · Croissance</div>
              </div>
            </div>
            {/* /layer-fg */}

            {/* Center title */}
            <div className="imk-center">
              <div className="imk-eyebrow">
                <span className="imk-dot" />
                Agence · Paris — Montréal · MMXXVI
              </div>
              <div className="imk-logo">
                INNOV<b>MARK</b>
                <div className="imk-sweep">
                  INNOV<b>MARK</b>
                </div>
              </div>
              <div className="imk-tag">
                Agence Marketing <em>Nouvelle Génération</em>.
              </div>
              <div className="imk-services">
                <span>Branding</span>
                <i className="imk-sep" />
                <span>Publicité</span>
                <i className="imk-sep" />
                <span>Création Contenu</span>
                <i className="imk-sep" />
                <span>Web</span>
                <i className="imk-sep" />
                <span>IA</span>
                <i className="imk-sep" />
                <span>Croissance</span>
              </div>
              <div className="imk-cta-wrap">
                <a href="#contact" className="imk-cta">
                  Commencer Maintenant
                  <span className="imk-cta-arrow">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <a href="#work" className="imk-ghost">
                  Voir le showreel · 02:48
                </a>
              </div>
            </div>
          </div>
          {/* /camera */}

          <div className="imk-corner imk-corner-bl">
            <div className="imk-corner-k">Studio</div>
            <div>Paris · Montréal · Dubaï</div>
          </div>
          <div className="imk-corner imk-corner-br">
            <div className="imk-corner-num">+248%</div>
            <div>Croissance moyenne client</div>
          </div>

          <div className="imk-vignette" />
          <div className="imk-noise" />
        </div>
      </section>
    </div>
  );
}

/* ── Skyline / window data ── */
const SKYLINE_RECTS: { x: number; y: number; w: number; h: number }[] = [
  { x: 0, y: 280, w: 80, h: 220 },
  { x: 80, y: 240, w: 60, h: 260 },
  { x: 140, y: 290, w: 100, h: 210 },
  { x: 240, y: 220, w: 80, h: 280 },
  { x: 320, y: 270, w: 120, h: 230 },
  { x: 440, y: 200, w: 70, h: 300 },
  { x: 510, y: 260, w: 90, h: 240 },
  { x: 600, y: 180, w: 110, h: 320 },
  { x: 710, y: 250, w: 80, h: 250 },
  { x: 790, y: 210, w: 140, h: 290 },
  { x: 930, y: 160, w: 90, h: 340 },
  { x: 1020, y: 240, w: 100, h: 260 },
  { x: 1120, y: 200, w: 120, h: 300 },
  { x: 1240, y: 260, w: 80, h: 240 },
  { x: 1320, y: 220, w: 110, h: 280 },
  { x: 1430, y: 180, w: 90, h: 320 },
  { x: 1520, y: 250, w: 120, h: 250 },
  { x: 1640, y: 210, w: 100, h: 290 },
  { x: 1740, y: 270, w: 180, h: 230 },
];

const WINDOW_DOTS: { x: number; y: number }[] = [
  { x: 20, y: 320 }, { x: 40, y: 350 }, { x: 100, y: 280 },
  { x: 170, y: 330 }, { x: 260, y: 260 }, { x: 290, y: 300 },
  { x: 360, y: 320 }, { x: 400, y: 350 }, { x: 470, y: 240 },
  { x: 540, y: 320 }, { x: 630, y: 220 }, { x: 680, y: 280 },
  { x: 740, y: 300 }, { x: 820, y: 260 }, { x: 880, y: 290 },
  { x: 950, y: 200 }, { x: 1000, y: 240 }, { x: 1060, y: 290 },
  { x: 1140, y: 240 }, { x: 1200, y: 280 }, { x: 1270, y: 300 },
  { x: 1350, y: 260 }, { x: 1410, y: 300 }, { x: 1470, y: 220 },
  { x: 1550, y: 290 }, { x: 1620, y: 260 }, { x: 1690, y: 240 },
  { x: 1780, y: 310 }, { x: 1850, y: 290 },
];

/* ── All scoped styles for the desktop hero stage ── */
const styles = `
.imk-hero {
  --imk-bg-0: #06070a;
  --imk-bg-1: #0b0d12;
  --imk-ink: #f5f6f8;
  --imk-ink-dim: rgba(245, 246, 248, 0.62);
  --imk-ink-faint: rgba(245, 246, 248, 0.38);
  --imk-line: rgba(255, 255, 255, 0.08);
  --imk-glow-blue: #5b8cff;
  --imk-glow-violet: #9a6cff;
  --imk-glow-cyan: #7ad9ff;
  font-family: var(--font-manrope), "Manrope", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--imk-ink);
  contain: layout paint;
}

/* Stage: 1920x1080, scaled via JS to viewport width */
.imk-stage {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
  background:
    radial-gradient(120% 80% at 30% 20%, rgba(91, 140, 255, 0.10), transparent 55%),
    radial-gradient(90% 70% at 80% 90%, rgba(154, 108, 255, 0.10), transparent 60%),
    radial-gradient(60% 60% at 50% 50%, #0c0f15 0%, #06070a 60%, #030406 100%);
  overflow: hidden;
  isolation: isolate;
}

.imk-grid {
  position: absolute;
  inset: -5%;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
  -webkit-mask-image: radial-gradient(70% 60% at 50% 55%, black 10%, transparent 80%);
  mask-image: radial-gradient(70% 60% at 50% 55%, black 10%, transparent 80%);
  transform: perspective(1400px) rotateX(62deg) translateY(36%) scale(1.6);
  opacity: 0.45;
}
.imk-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(91, 140, 255, 0.18), transparent 50%);
  mix-blend-mode: screen;
}

.imk-city {
  position: absolute;
  left: 0; right: 0; bottom: 0; height: 46%;
  pointer-events: none; opacity: 0.85;
}
.imk-city svg { width: 100%; height: 100%; display: block; }

.imk-horizon-glow {
  position: absolute;
  left: -10%; right: -10%; bottom: 36%;
  height: 2px;
  background: linear-gradient(90deg, transparent,
    rgba(122, 217, 255, 0) 5%,
    rgba(122, 217, 255, 0.6) 30%,
    rgba(154, 108, 255, 0.7) 55%,
    rgba(91, 140, 255, 0.5) 75%,
    transparent 95%);
  filter: blur(0.5px);
  box-shadow:
    0 0 40px rgba(91, 140, 255, 0.45),
    0 0 100px rgba(154, 108, 255, 0.35);
}

.imk-vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 90% at 50% 50%,
    transparent 40%,
    rgba(0, 0, 0, 0.55) 80%,
    rgba(0, 0, 0, 0.85) 100%);
}

.imk-noise {
  position: absolute; inset: 0; pointer-events: none;
  mix-blend-mode: overlay; opacity: 0.35;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.imk-particles { position: absolute; inset: 0; pointer-events: none; }
.imk-particle {
  position: absolute;
  width: 3px; height: 3px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow:
    0 0 8px rgba(180, 200, 255, 0.9),
    0 0 18px rgba(120, 150, 255, 0.55);
  animation: imk-drift 18s linear infinite;
  opacity: 0;
}
@keyframes imk-drift {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  10%  { opacity: var(--o, 0.9); }
  90%  { opacity: var(--o, 0.9); }
  100% { transform: translate3d(var(--dx, 40px), var(--dy, -120px), 0); opacity: 0; }
}

.imk-camera {
  position: absolute; inset: 0;
  transform-origin: 50% 52%;
  animation:
    imk-pushIn 12s ease-out forwards,
    imk-parallax 14s ease-in-out 1.2s infinite alternate;
}
@keyframes imk-pushIn {
  0%   { transform: scale(1.06) translate3d(-14px, 6px, 0); filter: blur(6px); }
  35%  { filter: blur(0.5px); }
  100% { transform: scale(1.0) translate3d(0, 0, 0); filter: blur(0); }
}
@keyframes imk-parallax {
  0%   { translate: -10px 0; }
  100% { translate: 10px -4px; }
}

.imk-layer-bg { animation: imk-parallax-bg 16s ease-in-out infinite alternate; }
.imk-layer-fg { animation: imk-parallax-fg 12s ease-in-out infinite alternate; }
@keyframes imk-parallax-bg { 0% { transform: translate3d(-8px, -2px, 0); } 100% { transform: translate3d(8px, 2px, 0); } }
@keyframes imk-parallax-fg { 0% { transform: translate3d(14px, 4px, 0); } 100% { transform: translate3d(-14px, -4px, 0); } }

.imk-panel {
  position: absolute;
  border-radius: 22px;
  background: linear-gradient(140deg,
    rgba(255, 255, 255, 0.10),
    rgba(255, 255, 255, 0.02) 55%,
    rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  box-shadow:
    0 30px 80px -20px rgba(0, 0, 0, 0.65),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 1px 0 rgba(255, 255, 255, 0.18) inset;
  overflow: hidden;
  will-change: transform;
}
.imk-panel::before {
  content: "";
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(120% 90% at 0% 0%, rgba(255, 255, 255, 0.18), transparent 45%);
  mix-blend-mode: screen;
}
.imk-panel::after {
  content: "";
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow:
    inset 0 0 40px rgba(91, 140, 255, 0.10),
    inset 0 0 120px rgba(154, 108, 255, 0.08);
}

@keyframes imk-floaty1 { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-14px) rotate(0.4deg); } }
@keyframes imk-floaty2 { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-22px) rotate(-0.5deg); } }
@keyframes imk-floaty3 { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(0.3deg); } }

.imk-laptop {
  left: 90px; top: 330px; width: 560px; height: 360px;
  border-radius: 18px;
  transform: perspective(1400px) rotateY(14deg) rotateX(6deg);
  animation: imk-floaty1 9s ease-in-out infinite;
}
.imk-lp-screen {
  position: absolute; inset: 14px; border-radius: 10px;
  background: linear-gradient(180deg, #0b0f1a 0%, #0a0d18 100%);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.imk-lp-topbar {
  height: 26px; display: flex; align-items: center; gap: 6px; padding: 0 12px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.imk-lp-topbar i { width: 8px; height: 8px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); }
.imk-lp-hero { padding: 22px 24px 0; }
.imk-lp-eyebrow {
  font: 500 10px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.22em; color: #7ad9ff; text-transform: uppercase;
}
.imk-lp-h3 {
  margin-top: 10px; font-weight: 300; font-size: 34px;
  letter-spacing: -0.02em; line-height: 1.05; color: #eef2ff;
}
.imk-lp-h3 b {
  font-weight: 700;
  background: linear-gradient(90deg, #cdd9ff, #a48bff);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.imk-lp-p {
  margin-top: 10px; color: rgba(238, 242, 255, 0.55);
  font-size: 13px; max-width: 340px; line-height: 1.5;
}
.imk-lp-btnrow { margin-top: 14px; display: flex; gap: 8px; }
.imk-lp-btnrow span {
  display: inline-flex; align-items: center; height: 28px; padding: 0 12px;
  border-radius: 999px; font-size: 11px;
  background: linear-gradient(90deg, #5b8cff, #9a6cff);
  color: #fff; letter-spacing: 0.04em;
}
.imk-lp-btnrow em {
  display: inline-flex; align-items: center; height: 28px; padding: 0 12px;
  border-radius: 999px; font-size: 11px;
  background: rgba(255, 255, 255, 0.06); color: rgba(255, 255, 255, 0.7);
  font-style: normal; border: 1px solid rgba(255, 255, 255, 0.1);
}
.imk-lp-stripe {
  position: absolute; left: 24px; right: 24px; bottom: 24px;
  height: 90px; border-radius: 10px;
  background: linear-gradient(135deg,
    rgba(91, 140, 255, 0.35),
    rgba(154, 108, 255, 0.25) 60%,
    rgba(122, 217, 255, 0.2));
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.imk-lp-stripe::after {
  content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 18px);
}
.imk-lp-keys {
  position: absolute; left: -30px; right: -30px; bottom: -22px; height: 24px;
  border-radius: 6px;
  background: linear-gradient(180deg, #1b1f2a, #0a0c12);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
}
.imk-lp-keys::before {
  content: ""; position: absolute; left: 50%; top: 6px;
  width: 120px; height: 5px; border-radius: 6px;
  background: rgba(255, 255, 255, 0.06); transform: translateX(-50%);
}

.imk-phone {
  right: 170px; top: 300px; width: 230px; height: 480px;
  border-radius: 36px;
  transform: perspective(1400px) rotateY(-16deg) rotateX(4deg) rotate(6deg);
  animation: imk-floaty2 10s ease-in-out infinite;
}
.imk-ph-shell {
  position: absolute; inset: 10px; border-radius: 28px;
  background: #07090e; border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.imk-ph-notch {
  position: absolute; left: 50%; top: 10px; transform: translateX(-50%);
  width: 80px; height: 16px; border-radius: 999px;
  background: #000; border: 1px solid rgba(255, 255, 255, 0.1);
}
.imk-ph-feed {
  padding: 42px 14px 14px; display: flex; flex-direction: column;
  gap: 10px; height: 100%;
}
.imk-ph-post {
  border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04); padding: 10px;
}
.imk-ph-row { display: flex; align-items: center; gap: 8px; }
.imk-ph-av {
  width: 22px; height: 22px; border-radius: 50%;
  background: linear-gradient(135deg, #9a6cff, #5b8cff);
}
.imk-ph-name { font-size: 10px; color: #eaeefb; font-weight: 600; }
.imk-ph-meta { font-size: 9px; color: rgba(255, 255, 255, 0.5); }
.imk-ph-img {
  margin-top: 8px; height: 96px; border-radius: 10px;
  background: linear-gradient(135deg, rgba(122, 217, 255, 0.6), rgba(154, 108, 255, 0.55));
  position: relative; overflow: hidden;
}
.imk-ph-img::after {
  content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0 2px, transparent 2px 14px);
}
.imk-ph-cap { margin-top: 6px; font-size: 9px; color: rgba(255, 255, 255, 0.7); line-height: 1.4; }
.imk-ph-actions {
  display: flex; justify-content: space-between; margin-top: 6px;
  color: rgba(255, 255, 255, 0.5); font-size: 9px;
}

.imk-analytics {
  left: 710px; top: 120px; width: 520px; height: 200px;
  transform: perspective(1400px) rotateX(8deg);
  animation: imk-floaty3 11s ease-in-out infinite;
}
.imk-an-head { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px 0; }
.imk-an-title { font-size: 13px; font-weight: 600; letter-spacing: 0.02em; color: #eef2ff; }
.imk-an-pill {
  font: 500 10px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.18em; color: #7ad9ff;
  padding: 6px 10px; border-radius: 999px;
  background: rgba(122, 217, 255, 0.08);
  border: 1px solid rgba(122, 217, 255, 0.18);
  text-transform: uppercase;
}
.imk-an-stats { display: flex; gap: 28px; padding: 14px 22px 0; }
.imk-an-k {
  font: 300 30px/1 var(--font-manrope), "Manrope", sans-serif;
  letter-spacing: -0.02em; color: #fff;
}
.imk-an-k b {
  font-weight: 600;
  background: linear-gradient(90deg, #cdd9ff, #a48bff);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.imk-an-l {
  margin-top: 6px;
  font: 500 10px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.18em; color: rgba(255, 255, 255, 0.5); text-transform: uppercase;
}
.imk-an-chart { position: absolute; left: 22px; right: 22px; bottom: 18px; height: 70px; }
.imk-an-chart svg { width: 100%; height: 100%; display: block; }

.imk-orb-wrap {
  position: absolute;
  right: 120px; bottom: 230px;
  width: 260px; height: 260px;
  animation: imk-floaty1 12s ease-in-out infinite;
  pointer-events: none;
}
.imk-orb {
  position: absolute; inset: 30px; border-radius: 50%;
  background: radial-gradient(60% 60% at 35% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(173, 200, 255, 0.45) 25%,
    rgba(91, 140, 255, 0.35) 45%,
    rgba(35, 30, 70, 0.7) 70%,
    rgba(0, 0, 0, 0.9) 100%);
  box-shadow:
    0 0 80px rgba(91, 140, 255, 0.55),
    0 0 160px rgba(154, 108, 255, 0.35),
    inset 0 0 60px rgba(154, 108, 255, 0.35);
  filter: saturate(1.05);
}
.imk-orb::before {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background:
    radial-gradient(40% 30% at 70% 75%, rgba(154, 108, 255, 0.6), transparent 60%),
    radial-gradient(30% 25% at 25% 75%, rgba(122, 217, 255, 0.45), transparent 60%);
  mix-blend-mode: screen;
}
.imk-orb-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  animation: imk-spin 22s linear infinite;
}
.imk-orb-ring-2 {
  inset: 14px; border-style: solid; border-color: rgba(122, 217, 255, 0.18);
  animation-duration: 30s; animation-direction: reverse;
}
@keyframes imk-spin { to { transform: rotate(360deg); } }
.imk-orb-tag {
  position: absolute; left: 50%; bottom: -6px; transform: translateX(-50%);
  font: 500 10px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.28em; color: rgba(255, 255, 255, 0.7); text-transform: uppercase;
  padding: 8px 12px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
}

.imk-center {
  position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);
  width: 1100px; text-align: center; z-index: 5;
}
.imk-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font: 500 12px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.32em; color: rgba(255, 255, 255, 0.7); text-transform: uppercase;
  padding: 10px 16px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(10px);
  opacity: 0; transform: translateY(8px);
  animation: imk-rise 0.9s 0.2s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.imk-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #7ad9ff; box-shadow: 0 0 10px #7ad9ff;
}
.imk-logo {
  position: relative;
  margin-top: 26px;
  font-weight: 200;
  font-size: 200px; line-height: 0.92; letter-spacing: -0.045em;
  background: linear-gradient(180deg, #ffffff 0%, #cfd6e6 60%, #8d94a8 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 60px rgba(120, 150, 255, 0.10);
  opacity: 0; transform: translateY(24px);
  animation: imk-rise 1.1s 0.35s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.imk-logo b { font-weight: 600; }
.imk-sweep {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg,
    transparent 30%,
    rgba(255, 255, 255, 0.85) 48%,
    rgba(180, 200, 255, 0.6) 52%,
    transparent 70%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  mix-blend-mode: screen;
  transform: translateX(-120%);
  animation: imk-sweep 4.2s 1.4s ease-in-out infinite;
}
@keyframes imk-sweep {
  0%   { transform: translateX(-120%); }
  55%  { transform: translateX(120%); }
  100% { transform: translateX(120%); }
}

.imk-tag {
  margin-top: 18px;
  font-weight: 300; font-size: 30px; letter-spacing: -0.005em;
  color: rgba(255, 255, 255, 0.78);
  opacity: 0; transform: translateY(14px);
  animation: imk-rise 1s 0.65s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.imk-tag em { font-style: normal; color: #fff; font-weight: 400; }

.imk-services {
  margin-top: 22px;
  display: inline-flex; align-items: center; gap: 14px;
  font: 500 13px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.22em; color: rgba(255, 255, 255, 0.62); text-transform: uppercase;
  opacity: 0; transform: translateY(10px);
  animation: imk-rise 0.9s 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.imk-services span { display: inline-flex; align-items: center; gap: 14px; }
.imk-sep { width: 4px; height: 4px; border-radius: 50%; background: rgba(255, 255, 255, 0.35); }

.imk-cta-wrap {
  margin-top: 46px; display: flex; justify-content: center; align-items: center; gap: 24px;
  opacity: 0; transform: translateY(12px);
  animation: imk-rise 0.9s 1.15s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.imk-cta {
  position: relative;
  display: inline-flex; align-items: center; gap: 14px;
  height: 62px; padding: 0 30px 0 34px; border-radius: 999px;
  background: linear-gradient(180deg, #ffffff, #e6e9f1);
  color: #0a0c12; font-weight: 600; font-size: 16px; letter-spacing: 0.02em;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 20px 60px -10px rgba(91, 140, 255, 0.55),
    0 0 0 6px rgba(255, 255, 255, 0.04);
  overflow: hidden; cursor: pointer;
  text-decoration: none;
}
.imk-cta::after {
  content: ""; position: absolute; inset: -2px; border-radius: 999px; pointer-events: none;
  box-shadow:
    0 0 60px 10px rgba(91, 140, 255, 0.35),
    0 0 120px 20px rgba(154, 108, 255, 0.25);
  animation: imk-pulse 2.6s ease-in-out infinite;
}
@keyframes imk-pulse {
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.02); }
}
.imk-cta-arrow {
  width: 30px; height: 30px; border-radius: 50%;
  background: #0a0c12; color: #fff;
  display: grid; place-items: center;
  transition: transform 0.3s ease;
}
.imk-cta:hover .imk-cta-arrow { transform: translateX(4px); }

.imk-ghost {
  display: inline-flex; align-items: center; gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font: 500 12px/1 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.22em; text-transform: uppercase;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer; text-decoration: none;
}
.imk-ghost:hover { color: #fff; }

@keyframes imk-rise { to { opacity: 1; transform: translateY(0); } }

.imk-corner {
  position: absolute; color: rgba(255, 255, 255, 0.5);
  font: 500 11px/1.5 var(--font-jetbrains-mono), "JetBrains Mono", monospace;
  letter-spacing: 0.22em; text-transform: uppercase;
  z-index: 6;
  opacity: 0; animation: imk-rise 0.8s 1.4s ease forwards;
}
.imk-corner-bl { left: 60px; bottom: 42px; }
.imk-corner-br { right: 60px; bottom: 42px; text-align: right; }
.imk-corner-k { color: rgba(255, 255, 255, 0.85); font-weight: 600; }
.imk-corner-num {
  font-size: 22px; letter-spacing: 0.04em; color: #fff; font-weight: 300;
}

.imk-beam {
  position: absolute; width: 2px;
  background: linear-gradient(180deg, transparent, rgba(122, 217, 255, 0.6), transparent);
  filter: blur(0.6px);
  box-shadow: 0 0 40px rgba(122, 217, 255, 0.6);
}
.imk-beam-1 { left: 18%; top: 0; height: 60%; transform: rotate(8deg); opacity: 0.5; }
.imk-beam-2 {
  right: 22%; top: 0; height: 55%;
  background: linear-gradient(180deg, transparent, rgba(154, 108, 255, 0.6), transparent);
  box-shadow: 0 0 40px rgba(154, 108, 255, 0.6);
  transform: rotate(-6deg); opacity: 0.45;
}

@media (prefers-reduced-motion: reduce) {
  .imk-camera,
  .imk-layer-bg,
  .imk-layer-fg,
  .imk-laptop,
  .imk-phone,
  .imk-analytics,
  .imk-orb-wrap,
  .imk-orb-ring,
  .imk-particle,
  .imk-sweep,
  .imk-cta::after,
  .imk-eyebrow,
  .imk-logo,
  .imk-tag,
  .imk-services,
  .imk-cta-wrap,
  .imk-corner {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
    filter: none !important;
  }
  .imk-particle { display: none; }
}
`;
