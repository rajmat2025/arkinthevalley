"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { HeroContent, Promotions } from "@/types/apartment";
import { useMotionSafe, fadeUpVariants, getMotionProps } from "@/lib/motion";

interface HeroProps {
  hero: HeroContent;
  promotions?: Promotions;
  unitCount: number;
}

export default function Hero({ hero, promotions, unitCount }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);
  const slides = hero.slides;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, prefersReducedMotion, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.src}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/55 via-forest-900/40 to-forest-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/75 via-forest-950/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,33,25,0.2)_100%)]" />
      </div>

      {!prefersReducedMotion && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-forest-950/30 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-forest-950/50 sm:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-forest-950/30 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-forest-950/50 sm:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div className="container-narrow relative z-10 px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center lg:text-left"
          variants={prefersReducedMotion ? undefined : fadeUpVariants}
          {...motionProps}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {promotions?.offerAmount && (
            <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-ivory backdrop-blur-sm">
              ${promotions.offerAmount} off with a{" "}
              {promotions.leaseTermRequired ?? "12-month"} lease
            </p>
          )}

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-forest-100/90">
            Huntsville, Texas · {unitCount}-Unit Community
          </p>

          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            A Peaceful Place to Call Home in Huntsville
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-forest-50/95 sm:text-xl lg:mx-0">
            Spacious 1 &amp; 2 bedroom apartments minutes from SHSU — without the
            congestion of a big complex.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#contact"
              className="btn-primary min-w-[200px] shadow-lg shadow-forest-950/30"
            >
              Schedule a Tour
            </a>
            <a href="#floor-plans" className="btn-secondary min-w-[200px]">
              View Floor Plans
            </a>
          </div>
        </motion.div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.alt}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}

      <a
        href="#difference"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Scroll to learn more"
      >
        <ArrowDown className="h-6 w-6 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
