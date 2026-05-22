type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionLabel({ kicker, title, subtitle, align = "left" }: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start rtl-items-end rtl-text-right";
  return (
    <div className={`reveal-on-scroll flex min-w-0 flex-col gap-3 md:gap-4 ${alignment}`}>
      <div className="flex max-w-full items-center gap-3">
        <span className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-400" />
        <span className="cinematic-text text-[10px] uppercase tracking-[0.22em] text-blue-700/72 md:text-[11px] md:tracking-[0.46em]">
          {kicker}
        </span>
      </div>
      <h2 className="cinematic-text max-w-[780px] text-2xl font-light leading-[1.12] tracking-tight text-slate-950 md:text-5xl md:leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="cinematic-text max-w-[680px] text-sm leading-6 text-slate-600 md:text-base md:leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
}
