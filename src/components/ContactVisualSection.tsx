export default function ContactVisualSection({
  imageAlt = "INNOVMARK creative studio visual",
}: {
  imageAlt?: string;
  imageSrc?: string;
}) {
  const metricBars = ["h-9", "h-12", "h-7", "h-10"];

  return (
    <div
      role="img"
      aria-label={imageAlt}
      className="relative h-[430px] overflow-hidden rounded-[2rem] border border-blue-100/80 bg-white/82 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:h-[640px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-14 top-12 h-44 w-44 rounded-full bg-[#4F8CFF]/14 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-20 h-48 w-48 rounded-full bg-cyan-300/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,140,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.13) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative h-full overflow-hidden rounded-[1.6rem] border border-white/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(244,248,255,0.78)_48%,rgba(255,255,255,0.9))] shadow-inner">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(79,140,255,0.16),transparent_32%),radial-gradient(circle_at_12%_82%,rgba(14,165,233,0.10),transparent_28%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#4F8CFF]/45 to-transparent"
        />

        <div className="relative mx-auto flex h-full max-w-[340px] flex-col justify-center px-4 py-6 sm:max-w-[380px] lg:px-5">
          <div className="rounded-[1.45rem] border border-blue-100/90 bg-white/88 p-4 shadow-[0_18px_55px_rgba(79,140,255,0.13)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="h-2 w-20 rounded-full bg-slate-200" />
                <div className="mt-2 h-2 w-12 rounded-full bg-blue-100" />
              </div>
              <div
                aria-hidden
                className="flex h-8 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50"
              >
                <span className="h-2 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" />
              </div>
            </div>

            <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-950 p-3 shadow-[0_14px_38px_rgba(15,23,42,0.14)]">
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-300" />
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-xl bg-[linear-gradient(135deg,rgba(79,140,255,0.85),rgba(34,211,238,0.42))]" />
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-8 rounded-lg bg-white/16" />
                    <div className="h-8 rounded-lg bg-white/12" />
                    <div className="h-8 rounded-lg bg-white/18" />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="rounded-2xl border border-blue-100 bg-white/86 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                  <div className="mb-3 h-2 w-12 rounded-full bg-blue-200" />
                  <div className="flex h-16 items-end gap-1.5">
                    {metricBars.map((bar) => (
                      <span
                        key={bar}
                        className={`${bar} w-3 rounded-t-full bg-gradient-to-t from-blue-500 to-cyan-300`}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/86 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
                  <div className="grid grid-cols-3 gap-1.5">
                    <span className="h-7 rounded-full bg-slate-950" />
                    <span className="h-7 rounded-full bg-[#4F8CFF]" />
                    <span className="h-7 rounded-full bg-cyan-300" />
                  </div>
                  <div className="mt-3 h-2 w-16 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-3">
            <div className="rounded-[1.25rem] border border-blue-100/80 bg-white/78 p-3 shadow-[0_14px_40px_rgba(79,140,255,0.10)] backdrop-blur-xl">
              <div className="h-20 rounded-2xl bg-[linear-gradient(140deg,rgba(15,23,42,0.95),rgba(79,140,255,0.72))]" />
              <div className="mt-3 h-2 w-16 rounded-full bg-slate-200" />
              <div className="mt-2 h-2 w-10 rounded-full bg-blue-100" />
            </div>

            <div className="rounded-[1.25rem] border border-blue-100/80 bg-white/80 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-16 rounded-2xl bg-blue-50 p-2">
                  <div className="h-3 w-3 rounded-full bg-[#4F8CFF]" />
                  <div className="mt-6 h-1.5 w-10 rounded-full bg-blue-200" />
                </div>
                <div className="h-16 rounded-2xl bg-slate-950 p-2">
                  <div className="h-3 w-8 rounded-full bg-white/28" />
                  <div className="mt-6 h-1.5 w-9 rounded-full bg-cyan-200/70" />
                </div>
              </div>
              <div className="mt-3 h-2 w-24 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="absolute left-3 top-12 hidden w-36 rounded-2xl border border-blue-100/80 bg-white/82 p-3 shadow-[0_16px_44px_rgba(79,140,255,0.13)] backdrop-blur-xl sm:block lg:-left-2">
            <div className="h-2 w-16 rounded-full bg-blue-200" />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <span className="h-10 rounded-xl bg-blue-500/90" />
              <span className="h-10 rounded-xl bg-cyan-200" />
              <span className="h-10 rounded-xl bg-slate-950" />
            </div>
          </div>

          <div className="absolute bottom-14 right-2 hidden w-40 rounded-2xl border border-blue-100/80 bg-white/84 p-3 shadow-[0_18px_46px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:block lg:-right-2">
            <div className="flex items-center justify-between">
              <div className="h-2 w-14 rounded-full bg-slate-200" />
              <div className="h-6 w-6 rounded-full bg-[#4F8CFF]/16" />
            </div>
            <div className="mt-3 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-white p-2">
              <div className="h-full rounded-xl border border-blue-100 bg-white/75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
