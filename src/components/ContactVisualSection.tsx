const CONTACT_VISUAL_SRC = "/innovmark-frames/lg/frame_0090.webp";

export default function ContactVisualSection({
  imageAlt = "INNOVMARK creative studio visual",
  imageSrc = CONTACT_VISUAL_SRC,
}: {
  imageAlt?: string;
  imageSrc?: string;
}) {
  return (
    <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/12 bg-white/[0.045] p-2 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-sm lg:h-[560px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-300/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-12 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl"
      />

      <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080c11]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-cyan-300/18 via-transparent to-violet-500/24"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,transparent,rgba(5,8,12,0.42))]"
        />
        <div
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
        />
      </div>
    </div>
  );
}
