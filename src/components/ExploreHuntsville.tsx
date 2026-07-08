"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import type { ExploreHuntsville } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  fadeInItem,
  getMotionProps,
} from "@/lib/motion";

interface ExploreHuntsvilleProps {
  content: ExploreHuntsville;
}

const accentStyles = {
  teal: "from-forest-600 to-forest-800",
  coral: "from-accent-500 to-accent-600",
  gold: "from-gold-500 to-gold-700",
  sage: "from-sage-500 to-sage-700",
  plum: "from-plum-500 to-plum-700",
  sky: "from-sky-500 to-sky-700",
};

function FlipExploreCard({
  category,
  gradient,
  prefersReducedMotion,
}: {
  category: ExploreHuntsville["categories"][number];
  gradient: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <a
      href={category.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flip-scene block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950 ${
        prefersReducedMotion ? "" : "group"
      }`}
    >
      <div className="flip-inner">
        {/* Front — photo */}
        <div className="flip-face flip-front relative overflow-hidden rounded-2xl ring-1 ring-forest-800">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
          <div
            className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md`}
          >
            {category.linkLabel}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-lg font-semibold text-white">
              {category.title}
            </h3>
            <p className="mt-2 text-sm text-forest-200/90">
              Hover to learn more
            </p>
          </div>
        </div>

        {/* Back — details */}
        <div
          className={`flip-face flip-back flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 ring-1 ring-white/10`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">
              {category.linkLabel}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              {category.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              {category.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            Explore
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ExploreHuntsvilleSection({
  content,
}: ExploreHuntsvilleProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section
      id="explore-huntsville"
      className="section-padding bg-forest-950 text-forest-100"
    >
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900/60 px-4 py-1.5 text-sm font-semibold text-gold-300">
            <Compass className="h-4 w-4" aria-hidden="true" />
            Life in Huntsville
          </p>
          <h2 className="section-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          <p className="mt-4 text-lg text-forest-200">{content.subheadline}</p>
          <p className="mt-4 text-base leading-relaxed text-forest-300/90">
            {content.intro}
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ transformStyle: "preserve-3d" }}
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {content.categories.map((category) => (
            <motion.div
              key={category.id}
              className="[transform-style:preserve-3d]"
              variants={prefersReducedMotion ? undefined : fadeInItem}
            >
              <FlipExploreCard
                category={category}
                gradient={accentStyles[category.accent]}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 text-center text-sm text-forest-400"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true }}
        >
          Local guides courtesy of{" "}
          <a
            href="https://www.huntsvilletexas.com/35/Things-to-Do"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-300 underline-offset-2 hover:text-gold-200 hover:underline"
          >
            Visit Huntsville, TX
          </a>{" "}
          and the City of Huntsville community.
        </motion.p>
      </div>
    </section>
  );
}
