"use client";

import { motion } from "framer-motion";

const CARD_GRADIENTS = [
  "from-violet-500/25 via-purple-400/15 to-fuchsia-500/15",
  "from-cyan-400/25 via-sky-400/15 to-blue-500/15",
  "from-emerald-400/25 via-teal-400/15 to-green-500/15",
];

const CARD_DOT_COLORS = ["bg-violet-400", "bg-cyan-400", "bg-emerald-400"];

const CARD_HOVER_SHADOWS = [
  "hover:shadow-[0_0_56px_rgba(139,92,246,0.26)]",
  "hover:shadow-[0_0_56px_rgba(34,211,238,0.26)]",
  "hover:shadow-[0_0_56px_rgba(16,185,129,0.26)]",
];

const CARD_BAR_GRADIENTS = [
  "from-violet-500/40 to-fuchsia-500/20",
  "from-cyan-400/40 to-blue-500/20",
  "from-emerald-400/40 to-teal-500/20",
];

/* Cubic bezier as a properly typed tuple */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ServiceCard = { readonly label: string; readonly tag: string };
type TrustItem = { readonly value: string; readonly label: string };

export default function ContactVisualSection({
  serviceCards,
  trustItems,
}: {
  serviceCards: ReadonlyArray<ServiceCard>;
  trustItems: ReadonlyArray<TrustItem>;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Service cards */}
      <div className="flex flex-col gap-4">
        {serviceCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.13, duration: 0.72, ease: EASE }}
            whileHover={{
              scale: 1.025,
              y: -4,
              transition: { type: "spring", stiffness: 320, damping: 24 },
            }}
            className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br ${CARD_GRADIENTS[i]} p-5 transition-shadow duration-300 ${CARD_HOVER_SHADOWS[i]} cursor-default select-none`}
          >
            <div className="absolute inset-0 bg-[#080c11]/70" />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-light tracking-tight text-white">
                  {card.label}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {card.tag}
                </div>
              </div>
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${CARD_DOT_COLORS[i]} opacity-80`}
              />
            </div>

            <div className="relative mt-4 h-12 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03]">
              <div className={`absolute inset-0 bg-gradient-to-r ${CARD_BAR_GRADIENTS[i]}`} />
              <div className="shimmer absolute inset-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust stats */}
      <div className="grid grid-cols-3 gap-3">
        {trustItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.38 + i * 0.1, duration: 0.55, ease: EASE }}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-2 py-4 text-center"
          >
            <div className="text-base font-light tracking-tight text-white">
              {item.value}
            </div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-white/48 leading-tight">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
