type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionLabel({ kicker, title, subtitle, align = "left" }: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start rtl-items-end rtl-text-right";
  return (
    <div className={`flex flex-col gap-3 reveal-on-scroll md:gap-4 ${alignment}`}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-400" />
        <span className="text-white/72 text-[10px] md:text-[11px] tracking-[0.46em] uppercase cinematic-text">
          {kicker}
        </span>
      </div>
      <h2 className="cinematic-text max-w-[780px] text-2xl font-light leading-[1.08] tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="cinematic-text max-w-[680px] text-sm leading-6 text-white/74 md:text-base md:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
}
