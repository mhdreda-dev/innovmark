"use client";

import { useEffect, useMemo, useRef } from "react";

type CardKind = "chart" | "counter" | "gradient" | "code" | "logo" | "stat" | "bars";

type CardDef = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: CardKind;
  hue: number;
  label?: string;
};

const SUPER_W = 3000;
const SUPER_H = 1900;

const cards: CardDef[] = [
  { x: 70, y: 70, w: 420, h: 250, kind: "chart", hue: 215, label: "Revenue" },
  { x: 530, y: 70, w: 250, h: 250, kind: "counter", hue: 275, label: "Leads" },
  { x: 820, y: 70, w: 360, h: 180, kind: "gradient", hue: 195 },
  { x: 1220, y: 70, w: 440, h: 250, kind: "code", hue: 0, label: "campaign.ts" },
  { x: 1700, y: 70, w: 260, h: 250, kind: "logo", hue: 310 },
  { x: 2000, y: 70, w: 360, h: 180, kind: "stat", hue: 165, label: "ROI" },
  { x: 2400, y: 70, w: 350, h: 250, kind: "bars", hue: 45, label: "Visits" },
  { x: 820, y: 290, w: 360, h: 210, kind: "counter", hue: 180, label: "Audience" },
  { x: 2000, y: 290, w: 360, h: 210, kind: "chart", hue: 105, label: "Retention" },
  { x: 70, y: 360, w: 270, h: 260, kind: "gradient", hue: 335 },
  { x: 380, y: 360, w: 400, h: 260, kind: "code", hue: 0, label: "brand.ts" },
  { x: 1220, y: 360, w: 270, h: 260, kind: "stat", hue: 60, label: "P95" },
  { x: 1530, y: 360, w: 390, h: 260, kind: "bars", hue: 260, label: "Launches" },
  { x: 2400, y: 360, w: 350, h: 260, kind: "logo", hue: 200 },
  { x: 70, y: 660, w: 420, h: 230, kind: "chart", hue: 290, label: "Demand" },
  { x: 530, y: 660, w: 250, h: 230, kind: "stat", hue: 20, label: "CPL" },
  { x: 820, y: 680, w: 380, h: 210, kind: "gradient", hue: 235 },
  { x: 1220, y: 680, w: 350, h: 210, kind: "counter", hue: 140, label: "Active" },
  { x: 1610, y: 680, w: 430, h: 230, kind: "code", hue: 0, label: "website.tsx" },
  { x: 2080, y: 680, w: 350, h: 230, kind: "bars", hue: 320, label: "Pipeline" },
  { x: 70, y: 930, w: 340, h: 210, kind: "logo", hue: 180 },
  { x: 450, y: 930, w: 360, h: 210, kind: "stat", hue: 80, label: "Trust" },
  { x: 850, y: 930, w: 440, h: 210, kind: "chart", hue: 200, label: "Traffic" },
  { x: 1330, y: 930, w: 260, h: 210, kind: "counter", hue: 355, label: "Jobs" },
  { x: 1630, y: 950, w: 360, h: 210, kind: "gradient", hue: 125 },
  { x: 2030, y: 950, w: 370, h: 210, kind: "code", hue: 0, label: "stock.sql" },
  { x: 2440, y: 950, w: 360, h: 210, kind: "bars", hue: 280, label: "Tasks" },
  { x: 70, y: 1200, w: 430, h: 240, kind: "code", hue: 0, label: "ads.ts" },
  { x: 540, y: 1200, w: 360, h: 240, kind: "chart", hue: 240, label: "ROAS" },
  { x: 940, y: 1200, w: 270, h: 240, kind: "logo", hue: 60 },
  { x: 1250, y: 1200, w: 360, h: 240, kind: "stat", hue: 200, label: "Reach" },
  { x: 1650, y: 1200, w: 350, h: 240, kind: "counter", hue: 300, label: "Clicks" },
  { x: 2040, y: 1200, w: 360, h: 240, kind: "gradient", hue: 160 },
  { x: 2440, y: 1200, w: 360, h: 240, kind: "bars", hue: 0, label: "Signals" },
];

// ─── Pre-computed deterministic constants ────────────────────────────────────
// All values are computed at module level (never inside a render function) so
// the server and client always produce identical strings → no hydration mismatch.

/** Round to 2 dp then drop trailing zeros so `50.00` becomes `50`. */
function r2(n: number): string {
  return +n.toFixed(2) + "";
}

function buildChartPoints(cardIndex: number): string {
  return Array.from({ length: 12 }, (_, i) => {
    const x = r2((i / 11) * 100);
    const y = r2(
      50 -
        (Math.sin(i * 0.72 + cardIndex * 0.2) * 18 +
          Math.cos(i * 0.43 + cardIndex * 0.18) * 8)
    );
    return `${x},${y}`;
  }).join(" ");
}

// Build lookup after `cards` is defined (hoisting order: declaration → usage below).
// We compute lazily in a getter so the array isn't referenced before it's assigned.
let _chartPointsMap: Record<number, string> | null = null;
function getChartPoints(index: number): string {
  if (!_chartPointsMap) {
    _chartPointsMap = {};
    cards.forEach((card, i) => {
      if (card.kind === "chart") _chartPointsMap![i] = buildChartPoints(i);
    });
  }
  return _chartPointsMap[index] ?? buildChartPoints(index);
}

// Counter display values — Intl.NumberFormat output can differ between Node
// versions and browsers; pre-format them at module level to guarantee identity.
let _counterValues: Record<number, { number: string; delta: string }> | null = null;
function getCounterValue(index: number): { number: string; delta: string } {
  if (!_counterValues) {
    _counterValues = {};
    cards.forEach((card, i) => {
      if (card.kind === "counter") {
        _counterValues![i] = {
          number: new Intl.NumberFormat("en-US").format(1200 + i * 83),
          delta: `+${(8.4 + i * 0.3).toFixed(1)}%`,
        };
      }
    });
  }
  return (
    _counterValues[index] ?? {
      number: String(1200 + index * 83),
      delta: `+${(8.4 + index * 0.3).toFixed(1)}%`,
    }
  );
}

const codeLines = [
  { indent: 0, width: 58, color: "#7dd3fc" },
  { indent: 1, width: 78, color: "rgba(255,255,255,0.72)" },
  { indent: 1, width: 46, color: "#c4b5fd" },
  { indent: 2, width: 68, color: "rgba(255,255,255,0.64)" },
  { indent: 2, width: 38, color: "#67e8f9" },
  { indent: 1, width: 28, color: "rgba(255,255,255,0.42)" },
];

export default function InfiniteBentoHeroBackground({
  intensity = 1,
  className = "",
}: {
  intensity?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const cardsWithAccent = useMemo(
    () =>
      cards.map((card) => ({
        ...card,
        accent: `hsl(${card.hue} 88% 70%)`,
      })),
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const start = performance.now();

    const apply = (now: number) => {
      const rect = root.getBoundingClientRect();
      const isMobile = mobileQuery.matches;
      const reducedMotion = motionQuery.matches;
      const scale = isMobile ? 0.34 : Math.min(0.72, Math.max(0.48, rect.width / 2100));
      const maxX = Math.max(0, SUPER_W * scale - rect.width);
      const maxY = Math.max(0, SUPER_H * scale - rect.height);
      const duration = isMobile ? 46000 : 34000;
      const progress = reducedMotion ? 0.18 : ((now - start) % duration) / duration;
      const mobileSoftener = isMobile ? 0.48 : 1;
      const distance = Math.max(0.25, Math.min(1, intensity)) * mobileSoftener;
      const x = maxX * progress * distance;
      const y = maxY * progress * distance;

      stage.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(${scale})`;

      if (!reducedMotion) {
        frameRef.current = requestAnimationFrame(apply);
      }
    };

    frameRef.current = requestAnimationFrame(apply);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [intensity]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#03040a] ${className}`}
    >
      <div
        ref={stageRef}
        className="absolute left-0 top-0 h-[1900px] w-[3000px] origin-top-left will-change-transform"
      >
        {cardsWithAccent.map((card, index) => (
          <BentoCard key={`${card.kind}-${index}`} card={card} index={index} />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(139,92,246,0.2),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.5)_46%,rgba(0,0,0,0.82)),linear-gradient(180deg,rgba(0,0,0,0.68),rgba(0,0,0,0.12)_44%,rgba(0,0,0,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgba(0,0,0,0.72)_78%,#000_100%)]" />
    </div>
  );
}

function BentoCard({
  card,
  index,
}: {
  card: CardDef & { accent: string };
  index: number;
}) {
  const style = {
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    animationDelay: `${-(index % 11) * 0.45}s`,
  };

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-[18px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(22,24,34,0.92),rgba(6,7,12,0.96))] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.36)] bento-hero-card"
      style={style}
    >
      {card.label && (
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
          {card.label}
        </div>
      )}
      <div className="min-h-0 flex-1">
        <CardBody card={card} index={index} />
      </div>
    </div>
  );
}

function CardBody({
  card,
  index,
}: {
  card: CardDef & { accent: string };
  index: number;
}) {
  if (card.kind === "chart") return <Chart accent={card.accent} index={index} />;
  if (card.kind === "bars") return <Bars index={index} />;
  if (card.kind === "code") return <Code />;
  if (card.kind === "logo") return <Logo accent={card.accent} hue={card.hue} />;
  if (card.kind === "gradient") return <Gradient hue={card.hue} />;
  if (card.kind === "counter") {
    // Pre-computed at module level — no Intl divergence between server and client.
    const cv = getCounterValue(index);
    return (
      <div className="flex h-full flex-col justify-center">
        <div className="text-5xl font-semibold tracking-[-0.05em] text-white">
          {cv.number}
        </div>
        <div className="mt-3 text-sm font-semibold" style={{ color: card.accent }}>
          {cv.delta}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center text-5xl font-semibold tracking-[-0.04em] text-white">
      {(92 + (index % 8)).toFixed(2)}
      <span className="ml-1 text-xl text-white/42">%</span>
    </div>
  );
}

function Chart({ accent, index }: { accent: string; index: number }) {
  // Points are pre-computed at module level — never recalculated during render.
  const pts = getChartPoints(index);

  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full">
      <polyline
        points={pts}
        fill="none"
        stroke={accent}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <polyline points={`${pts} 100,60 0,60`} fill={`${accent}24`} />
    </svg>
  );
}

const BAR_HEIGHTS = [34, 52, 71, 88, 64, 45, 77, 92, 58, 39];

function Bars({ index }: { index: number }) {
  return (
    <div className="flex h-full items-end gap-1.5">
      {Array.from({ length: 10 }).map((_, item) => {
        const height = BAR_HEIGHTS[(item + index) % BAR_HEIGHTS.length];
        return (
          <div
            key={item}
            className="flex-1 rounded-t"
            style={{
              height: `${height}%`,
              background:
                "linear-gradient(180deg, hsl(260 88% 70%), hsl(260 88% 70% / 66%))",
            }}
          />
        );
      })}
    </div>
  );
}

function Code() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {codeLines.map((line, index) => (
        <span
          key={index}
          className="h-2 rounded"
          style={{
            marginLeft: line.indent * 14,
            width: `${line.width}%`,
            background: line.color,
          }}
        />
      ))}
    </div>
  );
}

function Logo({ accent, hue }: { accent: string; hue: number }) {
  return (
    <div className="grid h-full place-items-center">
      <div
        className="grid h-20 w-20 place-items-center rounded-2xl text-xl font-semibold text-black shadow-[0_16px_42px_rgba(0,0,0,0.35)]"
        style={{
          background: `linear-gradient(135deg, ${accent}, hsl(${hue + 48} 84% 74%))`,
          boxShadow: `0 16px 44px ${accent}44`,
        }}
      >
        IM
      </div>
    </div>
  );
}

function Gradient({ hue }: { hue: number }) {
  return (
    <div
      className="-m-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
      style={{
        background: `radial-gradient(circle at 28% 28%, hsl(${hue} 90% 68%), hsl(${hue + 62} 80% 42%) 48%, #05060b 100%)`,
      }}
    />
  );
}
