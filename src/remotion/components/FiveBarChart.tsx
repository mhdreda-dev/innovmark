import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const data = [
  { label: "Brand", value: 78, color: "#6ee7f9" },
  { label: "Content", value: 54, color: "#8bdaff" },
  { label: "Ads", value: 92, color: "#9f8cff" },
  { label: "Leads", value: 66, color: "#4ade80" },
  { label: "Sales", value: 84, color: "#f8c96a" },
];

const maxValue = Math.max(...data.map((item) => item.value));
const chartHeight = 350;
const chartBottom = 530;
const chartLeft = 245;
const barWidth = 116;
const gap = 58;

export const FiveBarChart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = interpolate(frame, [0, 1.25 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const chartReveal = interpolate(frame, [0.4 * fps, 1.65 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const accentSweep = interpolate(frame, [0.8 * fps, 4.4 * fps], [-360, 1100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#071018",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#f8fbff",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("remotion/studio-motion.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.32,
          filter: "saturate(0.88) contrast(1.08) brightness(0.72)",
          transform: `scale(${1.06 - intro * 0.035})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 72% 20%, rgba(130, 231, 255, 0.22), transparent 34%), linear-gradient(90deg, rgba(4, 10, 16, 0.94), rgba(8, 15, 24, 0.78) 42%, rgba(6, 9, 13, 0.9))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: accentSweep,
          top: 110,
          width: 320,
          height: 520,
          transform: "rotate(18deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(109, 231, 249, 0.2), transparent)",
          filter: "blur(18px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 86,
          top: 62,
          opacity: intro,
          transform: `translateY(${interpolate(intro, [0, 1], [26, 0])}px)`,
        }}
      >
        <div
          style={{
            color: "#78e7ff",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          Innovmark Performance
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Campaign Lift
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 86,
          top: 170,
          width: 1108,
          height: 454,
          border: "1px solid rgba(142, 229, 255, 0.18)",
          borderRadius: 8,
          background: "rgba(5, 13, 21, 0.74)",
          boxShadow:
            "0 28px 70px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
          opacity: chartReveal,
          transform: `translateY(${interpolate(chartReveal, [0, 1], [34, 0])}px)`,
        }}
      >
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = chartBottom - 170 - (tick / 100) * chartHeight;

          return (
            <div key={tick}>
              <div
                style={{
                  position: "absolute",
                  left: 94,
                  right: 72,
                  top: y,
                  height: 1,
                  background:
                    tick === 0
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.09)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 36,
                  top: y - 12,
                  width: 42,
                  textAlign: "right",
                  color: "rgba(226, 241, 255, 0.54)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {tick}
              </div>
            </div>
          );
        })}

        {data.map((item, index) => {
          const growth = spring({
            frame: frame - 22 - index * 8,
            fps,
            config: {
              damping: 18,
              stiffness: 82,
              mass: 0.8,
            },
          });
          const clampedGrowth = Math.min(growth, 1);
          const height = (item.value / maxValue) * chartHeight * clampedGrowth;
          const x = chartLeft - 86 + index * (barWidth + gap);
          const y = chartBottom - 170 - height;
          const valueOpacity = interpolate(frame, [54 + index * 8, 72 + index * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div key={item.label}>
              <div
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: barWidth,
                  height,
                  borderRadius: "8px 8px 3px 3px",
                  background: `linear-gradient(180deg, ${item.color}, rgba(28, 49, 73, 0.86))`,
                  boxShadow: `0 0 34px ${item.color}66, inset 0 1px 0 rgba(255, 255, 255, 0.42)`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg, rgba(255, 255, 255, 0.12), transparent 28%, rgba(255, 255, 255, 0.18) 50%, transparent 72%)",
                    transform: `translateX(${interpolate(frame, [34, 122], [-150, 150], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}px)`,
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: x,
                  top: y - 42,
                  width: barWidth,
                  color: "#ffffff",
                  fontSize: 26,
                  fontWeight: 800,
                  textAlign: "center",
                  opacity: valueOpacity,
                  transform: `translateY(${interpolate(valueOpacity, [0, 1], [12, 0])}px)`,
                }}
              >
                {Math.round(item.value * clampedGrowth)}%
              </div>
              <div
                style={{
                  position: "absolute",
                  left: x - 12,
                  top: 382,
                  width: barWidth + 24,
                  color: "rgba(232, 244, 255, 0.78)",
                  fontSize: 19,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          right: 86,
          top: 66,
          width: 262,
          height: 82,
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderRadius: 8,
          background: "rgba(7, 19, 30, 0.76)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          opacity: interpolate(frame, [56, 82], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            width: 13,
            height: 48,
            borderRadius: 99,
            background: "linear-gradient(#78e7ff, #9f8cff)",
            boxShadow: "0 0 24px rgba(120, 231, 255, 0.68)",
          }}
        />
        <div>
          <div style={{ fontSize: 15, color: "rgba(233, 244, 255, 0.58)", fontWeight: 700 }}>
            Peak Channel
          </div>
          <div style={{ marginTop: 4, fontSize: 28, fontWeight: 800 }}>Ads +92%</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
