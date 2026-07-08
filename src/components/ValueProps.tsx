"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Home, MapPin, HeartHandshake, Sparkles } from "lucide-react";
import type { ArkDifference } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface ValuePropsProps {
  content: ArkDifference;
}

const accentStyles = {
  teal: {
    ring: "ring-forest-400/40",
    badge: "bg-forest-600 text-white",
    iconBg: "bg-forest-500",
    gradient: "from-forest-700/80 to-forest-900/90",
    dot: "bg-forest-400",
  },
  coral: {
    ring: "ring-accent-500/40",
    badge: "bg-accent-600 text-white",
    iconBg: "bg-accent-500",
    gradient: "from-accent-600/80 to-forest-900/90",
    dot: "bg-accent-500",
  },
  gold: {
    ring: "ring-gold-400/40",
    badge: "bg-gold-600 text-white",
    iconBg: "bg-gold-500",
    gradient: "from-gold-600/80 to-forest-950/90",
    dot: "bg-gold-400",
  },
  sage: {
    ring: "ring-sage-400/40",
    badge: "bg-sage-600 text-white",
    iconBg: "bg-sage-500",
    gradient: "from-sage-600/80 to-forest-900/90",
    dot: "bg-sage-400",
  },
};

const cardIcons = [Home, MapPin, HeartHandshake];

export default function ValueProps({ content }: ValuePropsProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section id="difference" className="section-padding overflow-hidden bg-gradient-to-b from-ivory via-forest-50/60 to-white">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-600/10 px-4 py-1.5 text-sm font-semibold text-accent-600">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Why residents choose us
          </p>
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-warm-700">
            {content.subheadline}
          </p>
        </motion.div>

        <motion.div
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {content.stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/80 bg-white/90 p-4 text-center shadow-sm ring-1 ring-forest-100 backdrop-blur-sm"
              variants={prefersReducedMotion ? undefined : fadeUpItem}
            >
              <p className="font-display text-2xl font-bold text-forest-800 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-warm-600 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3 lg:gap-8"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {content.cards.map((card, index) => {
            const styles = accentStyles[card.accent];
            const Icon = cardIcons[index] ?? Home;

            return (
              <motion.article
                key={card.id}
                className={`group overflow-hidden rounded-3xl bg-white shadow-lg ring-2 ${styles.ring} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                variants={prefersReducedMotion ? undefined : fadeUpItem}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${styles.gradient}`}
                  />
                  <div
                    className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconBg} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="leading-relaxed text-slate-warm-700">
                    {card.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {card.highlights.map((item) => (
                      <li key={item}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                            aria-hidden="true"
                          />
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
