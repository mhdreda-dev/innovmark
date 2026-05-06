"use client";

import { motion } from "framer-motion";

const CARD_GRADIENTS = [
  "from-violet-500/25 via-purple-400/15 to-fuchsia-500/15",
  "from-cyan-400/25 via-sky-400/15 to-blue-500/15",
  "from-emerald-400/25 via-teal-400/15 to-green-500/15",
];

const CARD_DOT_COLORS = ["bg-violet-400", "bg-cyan-400", "bg-emerald-400"];

const CARD_HOVER_SHADOWS = [
  "hover:shadow-[0_0_48px_rgba(139,92,246,0.22)]",
  "hover:shadow-[0_0_48px_rgba(34,211,238,0.22)]",
  "hover:shadow-[0_0_48px_rgba(16,185,129,0.22)]",
];

const CARD_BAR_GRADIENTS = [
  "from-violet-500/40 to-fuchsia-500/20",
  "from-cyan-400/40 to-blue-500/20",
  "from-emerald-400/40 to-teal-500/20",
];

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
      <div className="flex flex-col gap-4">
        {serviceCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.14,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.025, y: -4 }}
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
              <div
                className={`absolute inset-0 bg-gradient-to-r ${CARD_BAR_GRADIENTS[i]}`}
              />
              <div className="shimmer absolute inset-0" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {trustItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1 + 0.4, duration: 0.5 }}
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
